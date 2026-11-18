<?php
/**
 * Xporus International — MySQL Database Connection & Auto-Schema Initializer (`api/db.php`)
 * Automatically creates database `xporus_db` and all 9 relational tables in local XAMPP MySQL.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$DB_CONFIG = [
    'host' => getenv('XPORUS_DB_HOST') ?: '127.0.0.1',
    'port' => getenv('XPORUS_DB_PORT') ?: '3306',
    'name' => getenv('XPORUS_DB_NAME') ?: 'xporus_db',
    'user' => getenv('XPORUS_DB_USER') ?: 'root',
    'pass' => getenv('XPORUS_DB_PASS') !== false ? getenv('XPORUS_DB_PASS') : ''
];

function get_db_connection(array $cfg): PDO {
    // 1. Connect to MySQL server and ensure database exists
    $dsnServer = "mysql:host={$cfg['host']};port={$cfg['port']};charset=utf8mb4";
    $pdoServer = new PDO($dsnServer, $cfg['user'], $cfg['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    $dbName = preg_replace('/[^a-zA-Z0-9_]/', '', $cfg['name']);
    $pdoServer->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

    // 2. Connect directly to `xporus_db`
    $dsnDb = "mysql:host={$cfg['host']};port={$cfg['port']};dbname={$dbName};charset=utf8mb4";
    $pdo = new PDO($dsnDb, $cfg['user'], $cfg['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    ensure_schema_exists($pdo);
    return $pdo;
}

function ensure_schema_exists(PDO $pdo): void {
    // 1. Site Settings Table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `site_settings` (
            `setting_key` VARCHAR(64) NOT NULL PRIMARY KEY,
            `setting_value` TEXT NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 2. Impact Metrics Table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `metrics` (
            `id` VARCHAR(32) NOT NULL PRIMARY KEY,
            `value` VARCHAR(64) NOT NULL,
            `label` VARCHAR(128) NOT NULL,
            `sort_order` INT NOT NULL DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 3. Core Services Table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `services` (
            `id` VARCHAR(32) NOT NULL PRIMARY KEY,
            `title` VARCHAR(255) NOT NULL,
            `short_desc` TEXT NOT NULL,
            `full_desc` TEXT NOT NULL,
            `icon` VARCHAR(64) NOT NULL DEFAULT 'briefcase',
            `image` TEXT NOT NULL,
            `case_study` TEXT NOT NULL,
            `deliverables_json` TEXT NOT NULL,
            `sort_order` INT NOT NULL DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    try {
        $cols = $pdo->query("SHOW COLUMNS FROM `services` LIKE 'image'")->fetchAll();
        if (count($cols) === 0) {
            $pdo->exec("ALTER TABLE `services` ADD COLUMN `image` TEXT NOT NULL AFTER `icon`");
        }
    } catch (Throwable $e) {}

    // 4. Product Categories Table (Medoc 3D Flip-Cards)
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `categories` (
            `id` VARCHAR(32) NOT NULL PRIMARY KEY,
            `title` VARCHAR(255) NOT NULL,
            `category_group` VARCHAR(64) NOT NULL,
            `featured` TINYINT(1) NOT NULL DEFAULT 1,
            `image` TEXT NOT NULL,
            `subcategories_json` TEXT NOT NULL,
            `sort_order` INT NOT NULL DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 5. Individual Products Table (All 36 Products across 12 Categories)
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `products` (
            `id` VARCHAR(32) NOT NULL PRIMARY KEY,
            `sku` VARCHAR(64) NOT NULL,
            `title` VARCHAR(255) NOT NULL,
            `category` VARCHAR(128) NOT NULL,
            `category_key` VARCHAR(64) NOT NULL,
            `material` VARCHAR(255) NOT NULL,
            `dimensions` VARCHAR(255) NOT NULL,
            `moq` VARCHAR(128) NOT NULL,
            `origin` VARCHAR(128) NOT NULL,
            `image` TEXT NOT NULL,
            `short_desc` TEXT NOT NULL,
            `sort_order` INT NOT NULL DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 6. Leadership Team Table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `team_members` (
            `id` VARCHAR(32) NOT NULL PRIMARY KEY,
            `name` VARCHAR(255) NOT NULL,
            `role` VARCHAR(128) NOT NULL,
            `badge` VARCHAR(64) NOT NULL DEFAULT 'Executive',
            `specialty` VARCHAR(255) NOT NULL,
            `bio` TEXT NOT NULL,
            `image` TEXT NOT NULL,
            `sort_order` INT NOT NULL DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 7. Client Testimonials Table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `testimonials` (
            `id` VARCHAR(32) NOT NULL PRIMARY KEY,
            `client_name` VARCHAR(255) NOT NULL,
            `client_role` VARCHAR(255) NOT NULL,
            `company` VARCHAR(255) NOT NULL,
            `country` VARCHAR(128) NOT NULL DEFAULT 'Global',
            `rating` INT NOT NULL DEFAULT 5,
            `quote` TEXT NOT NULL,
            `avatar` TEXT NOT NULL,
            `sort_order` INT NOT NULL DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 8. Buyer Inquiries / Leads CRM Table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `inquiries` (
            `id` VARCHAR(32) NOT NULL PRIMARY KEY,
            `name` VARCHAR(255) NOT NULL,
            `email` VARCHAR(255) NOT NULL,
            `phone` VARCHAR(128) NOT NULL,
            `company` VARCHAR(255) NOT NULL,
            `interest` VARCHAR(255) NOT NULL,
            `message` TEXT NOT NULL,
            `status` VARCHAR(64) NOT NULL DEFAULT 'New',
            `created_at` VARCHAR(64) NOT NULL,
            `sort_order` INT NOT NULL AUTO_INCREMENT UNIQUE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 9. Newsletter Subscribers Table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `subscribers` (
            `id` VARCHAR(32) NOT NULL PRIMARY KEY,
            `email` VARCHAR(255) NOT NULL UNIQUE,
            `subscribed_date` VARCHAR(32) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
}
