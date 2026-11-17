<?php
/**
 * Xporus International — Dynamic PHP + MySQL REST API (`api/cms.php`)
 * Connects all website pages (`index.html`, `about.html`, `services.html`,
 * `products.html`, `contact.html`) and the Admin Panel (`admin.html`)
 * to the local XAMPP / Hostinger MySQL Database (`xporus_db`).
 */

require_once __DIR__ . '/db.php';

try {
    $pdo = get_db_connection($DB_CONFIG);
    ensure_initial_seed($pdo);

    $method = $_SERVER['REQUEST_METHOD'];
    $action = $_GET['action'] ?? 'get_all';

    if ($method === 'GET' && $action === 'get_all') {
        $data = fetch_all_cms_data($pdo);
        echo json_encode([
            'ok' => true,
            'source' => 'mysql',
            'database' => $DB_CONFIG['name'],
            'data' => $data
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    if ($method === 'POST') {
        $rawBody = file_get_contents('php://input');
        $payload = json_decode($rawBody, true) ?: [];

        if ($action === 'save_all') {
            save_all_cms_data($pdo, $payload);
            echo json_encode([
                'ok' => true,
                'message' => 'Saved to MySQL database successfully',
                'data' => fetch_all_cms_data($pdo)
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            exit;
        }

        if ($action === 'add_inquiry') {
            $entry = insert_single_inquiry($pdo, $payload);
            echo json_encode([
                'ok' => true,
                'message' => 'Inquiry logged in MySQL database',
                'entry' => $entry
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            exit;
        }

        if ($action === 'add_subscriber') {
            $email = trim($payload['email'] ?? '');
            if ($email !== '') {
                insert_single_subscriber($pdo, $email);
            }
            echo json_encode([
                'ok' => true,
                'message' => 'Subscriber saved to MySQL database'
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            exit;
        }

        if ($action === 'reset_default') {
            $seedFile = __DIR__ . '/default_seed.json';
            $seedData = json_decode(file_get_contents($seedFile), true);
            save_all_cms_data($pdo, $seedData);
            echo json_encode([
                'ok' => true,
                'message' => 'Database reset to default seed data',
                'data' => fetch_all_cms_data($pdo)
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            exit;
        }
    }

    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid action or request method']);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => $e->getMessage()
    ]);
}

/**
 * Automatically seeds `xporus_db` from `default_seed.json` if tables are empty.
 */
function ensure_initial_seed(PDO $pdo): void {
    $countSettings = (int) $pdo->query("SELECT COUNT(*) FROM `site_settings`")->fetchColumn();
    $countProducts = (int) $pdo->query("SELECT COUNT(*) FROM `products`")->fetchColumn();

    if ($countSettings === 0 || $countProducts === 0) {
        $seedFile = __DIR__ . '/default_seed.json';
        if (file_exists($seedFile)) {
            $seedData = json_decode(file_get_contents($seedFile), true);
            if (is_array($seedData)) {
                save_all_cms_data($pdo, $seedData);
            }
        }
    }
}

/**
 * Fetches all 9 tables from MySQL and formats them for the frontend/admin store.
 */
function fetch_all_cms_data(PDO $pdo): array {
    // 1. Settings
    $settings = [];
    $stmt = $pdo->query("SELECT `setting_key`, `setting_value` FROM `site_settings`");
    foreach ($stmt->fetchAll() as $row) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }

    // 2. Metrics
    $metrics = [];
    $stmt = $pdo->query("SELECT `id`, `value`, `label` FROM `metrics` ORDER BY `sort_order` ASC");
    foreach ($stmt->fetchAll() as $row) {
        $metrics[] = [
            'id' => $row['id'],
            'value' => $row['value'],
            'label' => $row['label']
        ];
    }

    // 3. Services
    $services = [];
    $stmt = $pdo->query("SELECT * FROM `services` ORDER BY `sort_order` ASC");
    foreach ($stmt->fetchAll() as $row) {
        $services[] = [
            'id' => $row['id'],
            'title' => $row['title'],
            'shortDesc' => $row['short_desc'],
            'fullDesc' => $row['full_desc'],
            'icon' => $row['icon'],
            'caseStudy' => $row['case_study'],
            'deliverables' => json_decode($row['deliverables_json'], true) ?: []
        ];
    }

    // 4. Categories
    $categories = [];
    $stmt = $pdo->query("SELECT * FROM `categories` ORDER BY `sort_order` ASC");
    foreach ($stmt->fetchAll() as $row) {
        $categories[] = [
            'id' => $row['id'],
            'title' => $row['title'],
            'group' => $row['category_group'],
            'featured' => (bool) $row['featured'],
            'image' => $row['image'],
            'subcategories' => json_decode($row['subcategories_json'], true) ?: []
        ];
    }

    // 5. Individual Products
    $products = [];
    $stmt = $pdo->query("SELECT * FROM `products` ORDER BY `sort_order` ASC");
    foreach ($stmt->fetchAll() as $row) {
        $products[] = [
            'id' => $row['id'],
            'sku' => $row['sku'],
            'title' => $row['title'],
            'category' => $row['category'],
            'categoryKey' => $row['category_key'],
            'material' => $row['material'],
            'dimensions' => $row['dimensions'],
            'moq' => $row['moq'],
            'origin' => $row['origin'],
            'image' => $row['image'],
            'shortDesc' => $row['short_desc']
        ];
    }

    // 6. Team
    $team = [];
    $stmt = $pdo->query("SELECT * FROM `team_members` ORDER BY `sort_order` ASC");
    foreach ($stmt->fetchAll() as $row) {
        $team[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'role' => $row['role'],
            'badge' => $row['badge'],
            'specialty' => $row['specialty'],
            'bio' => $row['bio'],
            'image' => $row['image']
        ];
    }

    // 7. Testimonials
    $testimonials = [];
    $stmt = $pdo->query("SELECT * FROM `testimonials` ORDER BY `sort_order` ASC");
    foreach ($stmt->fetchAll() as $row) {
        $testimonials[] = [
            'id' => $row['id'],
            'clientName' => $row['client_name'],
            'clientRole' => $row['client_role'],
            'company' => $row['company'],
            'country' => $row['country'],
            'rating' => (int) $row['rating'],
            'quote' => $row['quote'],
            'avatar' => $row['avatar']
        ];
    }

    // 8. Inquiries
    $inquiries = [];
    $stmt = $pdo->query("SELECT * FROM `inquiries` ORDER BY `sort_order` DESC");
    foreach ($stmt->fetchAll() as $row) {
        $inquiries[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'email' => $row['email'],
            'phone' => $row['phone'],
            'company' => $row['company'],
            'interest' => $row['interest'],
            'message' => $row['message'],
            'status' => $row['status'],
            'createdAt' => $row['created_at']
        ];
    }

    // 9. Subscribers
    $subscribers = [];
    $stmt = $pdo->query("SELECT * FROM `subscribers` ORDER BY `subscribed_date` DESC");
    foreach ($stmt->fetchAll() as $row) {
        $subscribers[] = [
            'id' => $row['id'],
            'email' => $row['email'],
            'date' => $row['subscribed_date']
        ];
    }

    return [
        'settings' => $settings,
        'metrics' => $metrics,
        'services' => $services,
        'categories' => $categories,
        'products' => $products,
        'team' => $team,
        'testimonials' => $testimonials,
        'inquiries' => $inquiries,
        'subscribers' => $subscribers
    ];
}

/**
 * Saves the complete CMS state into all 9 MySQL tables inside a transaction.
 */
function save_all_cms_data(PDO $pdo, array $data): void {
    $pdo->beginTransaction();
    try {
        // 1. Settings
        if (!empty($data['settings']) && is_array($data['settings'])) {
            $pdo->exec("DELETE FROM `site_settings`");
            $stmt = $pdo->prepare("INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES (?, ?)");
            foreach ($data['settings'] as $k => $v) {
                $stmt->execute([(string) $k, (string) $v]);
            }
        }

        // 2. Metrics
        if (isset($data['metrics']) && is_array($data['metrics'])) {
            $pdo->exec("DELETE FROM `metrics`");
            $stmt = $pdo->prepare("INSERT INTO `metrics` (`id`, `value`, `label`, `sort_order`) VALUES (?, ?, ?, ?)");
            foreach (array_values($data['metrics']) as $idx => $m) {
                $stmt->execute([
                    $m['id'] ?? ('m' . ($idx + 1)),
                    $m['value'] ?? '',
                    $m['label'] ?? '',
                    $idx + 1
                ]);
            }
        }

        // 3. Services
        if (isset($data['services']) && is_array($data['services'])) {
            $pdo->exec("DELETE FROM `services`");
            $stmt = $pdo->prepare("
                INSERT INTO `services` (`id`, `title`, `short_desc`, `full_desc`, `icon`, `case_study`, `deliverables_json`, `sort_order`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ");
            foreach (array_values($data['services']) as $idx => $s) {
                $stmt->execute([
                    $s['id'] ?? ('srv-' . ($idx + 1)),
                    $s['title'] ?? '',
                    $s['shortDesc'] ?? '',
                    $s['fullDesc'] ?? '',
                    $s['icon'] ?? 'briefcase',
                    $s['caseStudy'] ?? '',
                    json_encode($s['deliverables'] ?? [], JSON_UNESCAPED_UNICODE),
                    $idx + 1
                ]);
            }
        }

        // 4. Categories
        if (isset($data['categories']) && is_array($data['categories'])) {
            $pdo->exec("DELETE FROM `categories`");
            $stmt = $pdo->prepare("
                INSERT INTO `categories` (`id`, `title`, `category_group`, `featured`, `image`, `subcategories_json`, `sort_order`)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");
            foreach (array_values($data['categories']) as $idx => $c) {
                $stmt->execute([
                    $c['id'] ?? ('cat-' . ($idx + 1)),
                    $c['title'] ?? '',
                    $c['group'] ?? 'furniture',
                    !empty($c['featured']) ? 1 : 0,
                    $c['image'] ?? '',
                    json_encode($c['subcategories'] ?? [], JSON_UNESCAPED_UNICODE),
                    $idx + 1
                ]);
            }
        }

        // 5. Individual Products
        if (isset($data['products']) && is_array($data['products'])) {
            $pdo->exec("DELETE FROM `products`");
            $stmt = $pdo->prepare("
                INSERT INTO `products` (`id`, `sku`, `title`, `category`, `category_key`, `material`, `dimensions`, `moq`, `origin`, `image`, `short_desc`, `sort_order`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            foreach (array_values($data['products']) as $idx => $p) {
                $stmt->execute([
                    $p['id'] ?? ('prd-' . ($idx + 1)),
                    $p['sku'] ?? ('XP-' . ($idx + 101)),
                    $p['title'] ?? '',
                    $p['category'] ?? 'Furniture',
                    $p['categoryKey'] ?? 'furniture',
                    $p['material'] ?? '',
                    $p['dimensions'] ?? '',
                    $p['moq'] ?? '',
                    $p['origin'] ?? 'India',
                    $p['image'] ?? '',
                    $p['shortDesc'] ?? '',
                    $idx + 1
                ]);
            }
        }

        // 6. Team
        if (isset($data['team']) && is_array($data['team'])) {
            $pdo->exec("DELETE FROM `team_members`");
            $stmt = $pdo->prepare("
                INSERT INTO `team_members` (`id`, `name`, `role`, `badge`, `specialty`, `bio`, `image`, `sort_order`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ");
            foreach (array_values($data['team']) as $idx => $t) {
                $stmt->execute([
                    $t['id'] ?? ('tm-' . ($idx + 1)),
                    $t['name'] ?? '',
                    $t['role'] ?? 'Co-Founder',
                    $t['badge'] ?? 'Executive',
                    $t['specialty'] ?? '',
                    $t['bio'] ?? '',
                    $t['image'] ?? '',
                    $idx + 1
                ]);
            }
        }

        // 7. Testimonials
        if (isset($data['testimonials']) && is_array($data['testimonials'])) {
            $pdo->exec("DELETE FROM `testimonials`");
            $stmt = $pdo->prepare("
                INSERT INTO `testimonials` (`id`, `client_name`, `client_role`, `company`, `country`, `rating`, `quote`, `avatar`, `sort_order`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            foreach (array_values($data['testimonials']) as $idx => $tst) {
                $stmt->execute([
                    $tst['id'] ?? ('tst-' . ($idx + 1)),
                    $tst['clientName'] ?? '',
                    $tst['clientRole'] ?? '',
                    $tst['company'] ?? '',
                    $tst['country'] ?? 'Global',
                    (int) ($tst['rating'] ?? 5),
                    $tst['quote'] ?? '',
                    $tst['avatar'] ?? '',
                    $idx + 1
                ]);
            }
        }

        // 8. Inquiries (preserve reverse chronological sort_order)
        if (isset($data['inquiries']) && is_array($data['inquiries'])) {
            $pdo->exec("DELETE FROM `inquiries`");
            $stmt = $pdo->prepare("
                INSERT INTO `inquiries` (`id`, `name`, `email`, `phone`, `company`, `interest`, `message`, `status`, `created_at`, `sort_order`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $reversed = array_reverse(array_values($data['inquiries']));
            foreach ($reversed as $idx => $inq) {
                $stmt->execute([
                    $inq['id'] ?? ('INQ-' . (1001 + $idx)),
                    $inq['name'] ?? 'Anonymous Buyer',
                    $inq['email'] ?? '',
                    $inq['phone'] ?? 'N/A',
                    $inq['company'] ?? 'International Buyer',
                    $inq['interest'] ?? 'General Sourcing',
                    $inq['message'] ?? '',
                    $inq['status'] ?? 'New',
                    $inq['createdAt'] ?? date('Y-m-d H:i'),
                    $idx + 1
                ]);
            }
        }

        // 9. Subscribers
        if (isset($data['subscribers']) && is_array($data['subscribers'])) {
            $pdo->exec("DELETE FROM `subscribers`");
            $stmt = $pdo->prepare("
                INSERT IGNORE INTO `subscribers` (`id`, `email`, `subscribed_date`)
                VALUES (?, ?, ?)
            ");
            foreach (array_values($data['subscribers']) as $idx => $sub) {
                $stmt->execute([
                    $sub['id'] ?? ('SUB-' . ($idx + 1)),
                    $sub['email'] ?? '',
                    $sub['date'] ?? date('Y-m-d')
                ]);
            }
        }

        $pdo->commit();
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $e;
    }
}

function insert_single_inquiry(PDO $pdo, array $inq): array {
    $id = $inq['id'] ?? ('INQ-' . rand(1000, 9999));
    $createdAt = $inq['createdAt'] ?? date('Y-m-d H:i');
    $entry = [
        'id' => $id,
        'name' => $inq['name'] ?? 'Anonymous Buyer',
        'email' => $inq['email'] ?? '',
        'phone' => $inq['phone'] ?? 'N/A',
        'company' => $inq['company'] ?? 'International Buyer',
        'interest' => $inq['interest'] ?? 'General Sourcing & Consulting',
        'message' => $inq['message'] ?? '',
        'status' => 'New',
        'createdAt' => $createdAt
    ];

    $stmt = $pdo->prepare("
        INSERT INTO `inquiries` (`id`, `name`, `email`, `phone`, `company`, `interest`, `message`, `status`, `created_at`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $entry['id'],
        $entry['name'],
        $entry['email'],
        $entry['phone'],
        $entry['company'],
        $entry['interest'],
        $entry['message'],
        $entry['status'],
        $entry['createdAt']
    ]);
    return $entry;
}

function insert_single_subscriber(PDO $pdo, string $email): void {
    $stmt = $pdo->prepare("
        INSERT IGNORE INTO `subscribers` (`id`, `email`, `subscribed_date`)
        VALUES (?, ?, ?)
    ");
    $stmt->execute([
        'SUB-' . substr((string) time(), -4),
        $email,
        date('Y-m-d')
    ]);
}
