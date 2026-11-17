/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.16-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: xporus_db
-- ------------------------------------------------------
-- Server version	10.11.16-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `xporus_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `xporus_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `xporus_db`;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` varchar(32) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category_group` varchar(64) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 1,
  `image` text NOT NULL,
  `subcategories_json` text NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES
('cat-1','FURNITURE','furniture',1,'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80','[\"Bedroom Furniture\",\"Living Room Sets\",\"Dining Room Tables & Chairs\",\"Accent & Coffee Tables\",\"Solid Wood & Cane Collections\"]',1),
('cat-10','SEASONAL & CHRISTMAS','decor',0,'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80','[\"Christmas Ornaments & Décor\",\"Easter & Autumn Collections\",\"Scented Candles & Fragrances\",\"Party & Festive Supplies\"]',10),
('cat-11','KIDS & NURSERY','furniture',0,'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80','[\"Kids Room Décor\",\"Organic Soft Furnishings\",\"Nursery Furniture\",\"Handcrafted Soft Toys & Lighting\"]',11),
('cat-12','HOME IMPROVEMENT & DIY','decor',0,'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80','[\"Architectural Home Hardware\",\"Cabinet Knobs & Pulls\",\"Handcrafted Tiles\",\"Stationery, Books & DIY Kits\",\"Pets & Sporting Goods\"]',12),
('cat-2','LAMPS & LIGHTING','lighting',1,'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80','[\"Table & Floor Lamps\",\"Pendant Lamps\",\"Handcrafted Chandeliers\",\"Wall Mounted Sconces\",\"Brass & Woven Rattan Shades\"]',2),
('cat-3','HOME TEXTILES','textiles',1,'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80','[\"Bed Linen & Duvet Sets\",\"Home Linen & Throws\",\"Table Linen & Runners\",\"Kitchen Linen\",\"Organic Cotton Collections\"]',3),
('cat-4','KITCHEN & DINING','kitchen',1,'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80','[\"Artisanal Serveware\",\"Cookware & Cast Iron\",\"Bakeware\",\"Brass & Copper Barware\",\"Flatware & Cutlery Sets\"]',4),
('cat-5','HOME DÉCOR & ACCESSORIES','decor',1,'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80','[\"Wall Décor & Mirrors\",\"Table Top Décor\",\"Candle Holders & Lanterns\",\"Decorative Baskets & Storage\",\"Handcrafted Vases\"]',5),
('cat-6','BATH COLLECTION','textiles',1,'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80','[\"Luxury Bath Linen & Towels\",\"Bath Décor & Utility\",\"Marble & Stone Dispensers\",\"Vanity Storage & Organizers\"]',6),
('cat-7','BAGS & ACCESSORIES','fashion',1,'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80','[\"Handcrafted Leather Bags\",\"Canvas & Jute Tote Bags\",\"Fashion Jewellery\",\"Travel Duffels & Pouches\",\"Garment & Footwear\"]',7),
('cat-8','OUTDOOR LIVING','furniture',1,'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80','[\"Patio & Garden Furniture\",\"Outdoor Lanterns & Lighting\",\"Planters & Garden Décor\",\"All-Weather Loungers & Umbrellas\"]',8),
('cat-9','CUSHIONS & RUGS','textiles',0,'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80','[\"Embroidered Accent Cushions\",\"Hand-Tufted Wool Rugs\",\"Jute & Kilim Dhurries\",\"Outdoor Poufs\"]',9);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquiries`
--

DROP TABLE IF EXISTS `inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `inquiries` (
  `id` varchar(32) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(128) NOT NULL,
  `company` varchar(255) NOT NULL,
  `interest` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(64) NOT NULL DEFAULT 'New',
  `created_at` varchar(64) NOT NULL,
  `sort_order` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sort_order` (`sort_order`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquiries`
--

LOCK TABLES `inquiries` WRITE;
/*!40000 ALTER TABLE `inquiries` DISABLE KEYS */;
INSERT INTO `inquiries` VALUES
('INQ-1001','David Sterling','d.sterling@sterlinghomeusa.com','+1 (310) 555-0194','Sterling Home Retail LLC (USA)','Furniture & Lamps Sourcing','Looking to source 5x40HQ containers of solid mango wood dining tables and brass pendant lamps for our Q3 retail launch.','New','2026-10-29 14:20',3),
('INQ-1002','Sophie Laurent','sophie@maisonlaurent.fr','+33 1 42 68 55 10','Maison Laurent Paris','Home Textiles & Linen','We require organic cotton bedding and embroidered cushion covers with custom private label packaging.','In Progress','2026-10-28 11:05',2),
('INQ-1003','Henrik Lindholm','hlindholm@nordicdecor.se','+46 8 501 234 56','Nordic Decor AB','Quality Assurance & Factory Audit','Need pre-shipment quality inspection and factory audit for our upcoming shipment in Jodhpur and Moradabad.','Quoted','2026-10-26 16:45',1);
/*!40000 ALTER TABLE `inquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metrics`
--

DROP TABLE IF EXISTS `metrics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `metrics` (
  `id` varchar(32) NOT NULL,
  `value` varchar(64) NOT NULL,
  `label` varchar(128) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metrics`
--

LOCK TABLES `metrics` WRITE;
/*!40000 ALTER TABLE `metrics` DISABLE KEYS */;
INSERT INTO `metrics` VALUES
('m1','10+','Years Experience',1),
('m2','50+','Product Categories',2),
('m3','8+','Global Markets',3),
('m4','250+','Audited Vendors',4);
/*!40000 ALTER TABLE `metrics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(32) NOT NULL,
  `sku` varchar(64) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(128) NOT NULL,
  `category_key` varchar(64) NOT NULL,
  `material` varchar(255) NOT NULL,
  `dimensions` varchar(255) NOT NULL,
  `moq` varchar(128) NOT NULL,
  `origin` varchar(128) NOT NULL,
  `image` text NOT NULL,
  `short_desc` text NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
('prd-1','XP-FUR-101','Solid Mango Wood & Cane Sideboard','Furniture','furniture','Kiln-Dried Mango Wood & Natural Rattan Cane','160 x 45 x 80 cm | KD / Assembled','25 Pcs','Jodhpur Cluster','https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80','Three-door handcrafted solid mango wood credenza featuring natural woven rattan cane panels, adjustable internal shelving, and matte water-based lacquer finish.',1),
('prd-10','XP-KIT-401','Acacia Wood & White Marble Charcuterie Board','Kitchen & Dining','kitchen','Food-Safe Seasoned Acacia Wood & Makrana Marble','48 x 24 x 2 cm | Laser-Engraved Logo Option','100 Pcs','Saharanpur / Agra','https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80','Precision-joined marble and wood serving paddle finished with food-grade beeswax oil, brass inlay strip, and hanging leather loop.',10),
('prd-11','XP-KIT-402','Hand-Forged Matte Gold 24-Piece Cutlery Set','Kitchen & Dining','kitchen','18/8 Food-Grade Stainless Steel (PVD Finish)','6 Forks, 6 Knives, 6 Spoons, 6 Teaspoons','100 Gift Sets','Moradabad Cluster','https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&w=800&q=80','Artisanal slender-handle flatware set available in Champagne Gold, Vintage Brushed Silver, Matte Black, and Antique Copper PVD finishes.',11),
('prd-12','XP-KIT-403','Reactive Glaze Handcrafted Stoneware Dinner Set','Kitchen & Dining','kitchen','High-Fired Lead-Free Ceramic Stoneware (1220°C)','16-Piece Set (Dinner Plates, Side Plates, Bowls, Mugs)','120 Sets','Khurja Cluster','https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80','Microwave and dishwasher-safe artisanal stoneware with organic speckled reactive glaze rims and raw unglazed stoneware base.',12),
('prd-13','XP-DEC-501','Arch Minimalist Brass-Framed Wall Mirror','Home Décor & Accessories','decor','5mm Copper-Free HD Mirror & Welded Brass Frame','90 x 60 cm & 160 x 70 cm Floor Mirror','40 Pcs','Jodhpur / Moradabad','https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80','Slim-profile architectural arch mirror with moisture-resistant MDF backing, heavy-duty D-ring wall mounts, and drop-tested carton packaging.',13),
('prd-14','XP-DEC-502','Ribbed Recycled Glass & Brass Hurricane Lanterns','Home Décor & Accessories','decor','Mouth-Blown Fluted Glass & Antique Brass Frame','Set of 2 (Small: H 28 cm / Large: H 38 cm)','80 Sets','Firozabad / Moradabad','https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80','Hand-soldered brass pillar candle lanterns with removable fluted glass cylinders for indoor tabletops and covered patio entertaining.',14),
('prd-15','XP-DEC-503','Textured Terracotta & Ceramic Amphora Vase','Home Décor & Accessories','decor','Hand-Thrown Terracotta & Matte Stone Finish','Dia 26 cm x H 42 cm | Waterproof Interior','60 Pcs','Jaipur / Khurja','https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80','Mediterranean-inspired twin-handle sculptural vessel with aged limestone texture finish, designed for dried botanicals and statement shelf styling.',15),
('prd-16','XP-BTH-601','Green Marble & Brass 4-Piece Bath Vanity Set','Bath Collection','bath','Natural Rainforest Green Marble & Brass Pump','Lotion Dispenser, Tumbler, Soap Dish & Tray','100 Sets','Agra Cluster','https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80','Hand-carved and honed solid marble bathroom accessories available in White Makrana, Green Marble, Black Marquina, and Beige Travertine.',16),
('prd-17','XP-BTH-602','650 GSM Zero-Twist Combed Cotton Bath Towel Set','Bath Collection','bath','100% Ring-Spun Combed Cotton (650 GSM)','2 Bath Sheets, 2 Hand Towels, 2 Washcloths','150 Sets','Karur / Solapur','https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=800&q=80','Hotel-grade ultra-absorbent zero-twist plush terry towel collection with double-stitched hemmed borders and custom woven jacquard labels.',17),
('prd-18','XP-BTH-603','Handwoven Seagrass & Cotton Rope Laundry Hamper','Bath Collection','bath','Natural Woven Seagrass & Removable Cotton Liner','Dia 42 cm x H 56 cm | Collapsible / Nested Set','80 Pcs','Noida / Kolkata','https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80','Sturdy wire-reinforced natural seagrass bath storage hamper with fitted lid, leather carry handles, and washable pre-shrunk cotton liner bag.',18),
('prd-19','XP-BAG-701','Full-Grain Vegetable-Tanned Leather Weekender Bag','Bags & Accessories','fashion','Full-Grain Buffalo Leather & YKK Brass Zippers','54 x 26 x 28 cm | Cabin-Approved Size','50 Pcs','Kanpur / Chennai','https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80','Heirloom-grade travel duffel handcrafted from drum-dyed vegetable-tanned leather with solid antique brass buckles, luggage sleeve, and shoe compartment.',19),
('prd-2','XP-FUR-102','Industrial Reclaimed Acacia Dining Table','Furniture','furniture','Solid Seasoned Acacia Wood & Powder-Coated Iron','200 x 100 x 76 cm | KD Metal Legs','20 Pcs','Jodhpur Cluster','https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80','Live-edge and straight-edge dining table crafted from sustainably harvested Indian acacia wood paired with heavy-gauge matte black iron legs.',2),
('prd-20','XP-BAG-702','Heavyweight Washed Canvas & Leather Market Tote','Bags & Accessories','fashion','16 oz Organic Cotton Canvas & Saddle Leather','44 x 36 x 16 cm | Zippered Inner Pocket','150 Pcs','Kolkata / Mumbai','https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80','Eco-conscious everyday carryall featuring reinforced leather base corners, antique brass rivets, magnetic snap closure, and custom embossed branding.',20),
('prd-21','XP-BAG-703','Handwoven Raffia & Braided Jute Resort Beach Bag','Bags & Accessories','fashion','100% Natural Raffia Straw, Jute & Leather Handles','48 x 32 x 18 cm | Cotton Drawstring Pouch','120 Pcs','Kolkata / Jaipur','https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80','Artisanal hand-crocheted summer resort basket tote featuring rolled vegetable-tanned leather shoulder straps and water-resistant lining.',21),
('prd-22','XP-OUT-801','All-Weather Teak & Woven Rope Patio Lounge Set','Outdoor Living','outdoor','Seasoned Teak, UV Polyolefin Rope & Olefin Fabric','3-Seater Sofa + 2 Armchairs + Coffee Table','15 Sets','Jodhpur Cluster','https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80','Engineered for outdoor resorts and patio living with water-repellent quick-dry foam cushions and weather-resistant handwoven olefin rope backrests.',22),
('prd-23','XP-OUT-802','Fluted Galvanized Iron & Brass Stand Planters','Outdoor Living','outdoor','Rust-Resistant Galvanized Iron (Powder-Coated)','Set of 2 (H 55 cm & H 42 cm with Folding Stand)','80 Sets','Moradabad Cluster','https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80','Nested indoor/outdoor architectural metal planters with removable solid rod iron stands in matte sage, terracotta, charcoal, and brushed brass.',23),
('prd-24','XP-OUT-803','Solar & Candle Weatherproof Bamboo Garden Lantern','Outdoor Living','outdoor','Treated Split Bamboo, Powder-Coated Metal & Glass','Dia 32 cm x H 54 cm | Hemp Rope Handle','60 Pcs','Noida / Moradabad','https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80','Oversized coastal floor lantern with UV-treated natural bamboo ribs, inner borosilicate hurricane cylinder, and optional IP65 warm LED module.',24),
('prd-25','XP-RUG-901','Hand-Tufted New Zealand Wool Sculpted Area Rug','Cushions & Rugs','rugs','80% New Zealand Wool & 20% Bamboo Viscose','160x230 cm, 200x300 cm & Custom Sizes','25 Rugs','Bhadohi Cluster','https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=800&q=80','Plush 14mm hand-tufted wool rug featuring sculpted geometric high-low relief carving and heavy organic cotton canvas backing.',25),
('prd-26','XP-RUG-902','Embroidered Crewel & Tufted Accent Cushion Cover','Cushions & Rugs','rugs','Heavyweight Cotton Slub & Wool Yarn Embroidery','45x45 cm, 50x50 cm & 30x50 cm Lumbar','150 Pcs','Panipat Cluster','https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80','Artisanal chain-stitch crewel embroidery and raised bouclé tufting with concealed YKK metal zipper and knife-edge or fringed borders.',26),
('prd-27','XP-RUG-903','Handwoven Braided Jute & Wool Pouf Ottoman','Cushions & Rugs','rugs','80% Natural Braided Jute, 20% Wool & EPS Beads','45 x 45 x 40 cm Cube / Dia 50 x 35 cm Round','60 Pcs','Panipat / Jaipur','https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80','Dense hand-braided floor pouf ottoman filled with high-recovery compressed EPS beads and double-stitched bottom zipper liner.',27),
('prd-28','XP-SEA-1001','Handcrafted Beaded & Velvet Christmas Ornaments (Set of 12)','Seasonal & Christmas','seasonal','Cotton Velvet, Zari Bullion & Recycled Glass Beads','Dia 8 cm Baubles & Assorted Festive Shapes','100 Gift Boxes','Moradabad / Noida','https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80','Heirloom zardozi hand-embroidered holiday tree ornaments packaged in compartmentalized fabric-lined retail gift boxes.',28),
('prd-29','XP-SEA-1002','Carved Mango Wood & Brass Holiday Candle Holders','Seasonal & Christmas','seasonal','Turned Mango Wood & Spun Antique Brass Cups','Set of 3 Pillar & Taper Holders (H 20, 26, 32 cm)','80 Sets','Jodhpur / Moradabad','https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&q=80','Warm rustic-luxe festive centerpiece candle holders combining lathe-turned solid wood silhouettes with drip-catching brass bobeches.',29),
('prd-3','XP-FUR-103','Bouclé & Solid Ash Lounge Accent Chair','Furniture','furniture','Solid Ash Wood Frame & 520 GSM Textured Bouclé','74 x 78 x 79 cm | High-Resilience Foam','30 Pcs','Jodhpur Cluster','https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80','Ergonomically curved lounge armchair upholstered in European-grade ivory bouclé over a mortise-and-tenon solid hardwood frame.',3),
('prd-30','XP-SEA-1003','Mercury Glass & Soy Wax Scented Holiday Jar Candles','Seasonal & Christmas','seasonal','Silvered Mercury Glass, 100% Soy Wax & Essential Oils','300g Twin-Wick Vessel | 55 Hours Burn Time','200 Pcs','Firozabad / Noida','https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=80','Poured in mouth-blown antiqued mercury glass vessels with winter cedar, spiced cinnamon, and sandalwood IFRA-compliant fragrance blends.',30),
('prd-31','XP-KID-1101','Handwoven Rattan Cane & Solid Wood Nursery Crib','Kids & Nursery','kids','Solid Beech / Mango Wood & Natural Rattan Webbing','140 x 70 x 92 cm | 3-Height Adjustable Base','20 Pcs','Jodhpur Cluster','https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80','Convertible baby crib finished with EN71-3 child-safe non-toxic water-based coating and rounded ergonomic safety spindles.',31),
('prd-32','XP-KID-1102','Organic Muslin Quilted Playmat & Nursery Bedding Set','Kids & Nursery','kids','100% Organic Double-Gauze Cotton Muslin','Playmat Dia 120 cm + Fitted Crib Sheet + Quilt','100 Sets','Karur / Jaipur','https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80','Hypoallergenic, ultra-breathable quilted nursery bedding and padded floor playmat featuring hand-stitched kantha quilting and botanical prints.',32),
('prd-33','XP-KID-1103','Braided Cotton Cord Animal Storage Basket Set','Kids & Nursery','kids','100% Soft Braided Recycled Cotton Rope','Set of 2 (Large Toy Bin H 45 cm + Small Organizer)','100 Sets','Panipat / Noida','https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80','Soft, pinch-free coiled cotton rope nursery toy baskets with embroidered animal faces and sturdy integrated side handles.',33),
('prd-34','XP-DIY-1201','Solid Cast Brass Knurled Cabinet Handles & Knobs Set','Home Improvement & DIY','hardware','100% Solid Forged Brass (Unlacquered / Brushed)','T-Bars (128mm / 160mm / 224mm) & Dia 32mm Knobs','200 Sets','Aligarh / Moradabad','https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80','Precision-machined diamond-knurled architectural cabinet hardware supplied with M4 break-away mounting screws and retail blister or box packs.',34),
('prd-35','XP-DIY-1202','Hand-Painted Blue Pottery & Mother-of-Pearl Knob Box (Assorted 24)','Home Improvement & DIY','hardware','Jaipur Quartz Blue Pottery, Bone Inlay & Brass Hardware','Assorted 40mm Drawer Knobs in Retail Display Box','100 Display Boxes','Jaipur / Sambhal','https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80','Bestselling DIY furniture upcycling assortment featuring hand-glazed ceramic, mother-of-pearl, and horn/resin dresser knobs with brass backplates.',35),
('prd-36','XP-DIY-1203','Handcrafted Cast Iron & Mango Wood Floating Wall Shelf Brackets','Home Improvement & DIY','hardware','Sand-Cast Antique Iron Brackets & Solid Mango Wood Shelf','60 x 20 cm & 90 x 22 cm | Heavy-Duty 35 kg Load','80 Sets','Jodhpur / Aligarh','https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80','Complete DIY floating wall shelf kit including pre-drilled solid timber board, pair of architectural cast-iron brackets, and masonry wall anchors.',36),
('prd-4','XP-LGT-201','Hammered Antique Brass Dome Pendant Lamp','Lamps & Lighting','lighting','Heavy-Gauge Hand-Hammered Solid Brass','Dia 45 cm x H 38 cm | CE / UL Wired','50 Pcs','Moradabad Cluster','https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80','Hand-spun and hand-hammered by master metal artisans with antique patinated exterior, warm gold interior reflector, and braided fabric cord.',4),
('prd-5','XP-LGT-202','Travertine Marble & Brushed Brass Table Lamp','Lamps & Lighting','lighting','Natural Honed Marble & Slub Linen Drum Shade','Dia 36 cm x H 62 cm | E26 / E27 Holder','50 Pcs','Moradabad / Agra','https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80','Architectural monolithic stone base turned from solid natural marble, accented with antique brass hardware and a natural oatmeal linen shade.',5),
('prd-6','XP-LGT-203','Woven Seagrass & Rattan Coastal Chandelier','Lamps & Lighting','lighting','Natural Rattan Cane, Seagrass & Iron Frame','Dia 60 cm x H 52 cm | Custom Drop Chain','40 Pcs','Noida / Kolkata','https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80','Multi-tiered organic woven pendant shade casting warm ambient shadow patterns, ideal for hospitality, coastal living, and boutique retail collections.',6),
('prd-7','XP-TXT-301','Organic Washed Percale Cotton Duvet Set','Home Textiles','textiles','100% Long-Staple Combed Cotton (300 TC)','Twin / Queen / King / Super King (US & EU)','100 Sets','Panipat / Karur','https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80','Enzyme garment-washed crisp percale bedding set (duvet cover + 2 pillow shams) with coconut shell buttons and self-fabric storage pouch.',7),
('prd-8','XP-TXT-302','Waffle Weave Organic Cotton Bed Throw Blanket','Home Textiles','textiles','100% Yarn-Dyed Combed Cotton (380 GSM)','150 x 200 cm & 220 x 240 cm | Hand-Fringed','120 Pcs','Karur Cluster','https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80','Breathable honeycomb waffle-weave throw blanket pre-washed for ultra-soft handfeel and finished with hand-knotted twisted tassels.',8),
('prd-9','XP-TXT-303','Block-Printed Linen & Cotton Table Runner Set','Home Textiles','textiles','55% European Flax Linen & 45% Indian Cotton','Runner 40x220 cm + 6 Matching Napkins (45x45 cm)','100 Sets','Jaipur Cluster','https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80','Artisanal wooden hand-block printed dining table runner and mitered-corner napkin set crafted with azo-free vat dyes.',9);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` varchar(32) NOT NULL,
  `title` varchar(255) NOT NULL,
  `short_desc` text NOT NULL,
  `full_desc` text NOT NULL,
  `icon` varchar(64) NOT NULL DEFAULT 'briefcase',
  `case_study` text NOT NULL,
  `deliverables_json` text NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES
('srv-1','Consultancy Service','Strategic business advice and growth planning.','We provide comprehensive strategic business consulting to help international retailers, wholesalers, and D2C brands establish resilient sourcing roadmaps and scale sustainably across global markets.','briefcase','Guided a US-based multi-store home retailer in restructuring their Indian vendor portfolio, achieving a 22% cost reduction within two quarters.','[\"Market Entry Strategy\",\"Supplier Portfolio Optimization\",\"Cost-Benefit Restructuring\",\"Long-Term Growth Roadmap\"]',1),
('srv-2','Business Advisory','Financial forecasting, risk management, and operational efficiency.','Our advisory practice delivers data-backed financial forecasting, supply chain risk mitigation, and factory floor operational efficiency audits tailored for high-volume cross-border trade.','trending-up','Negotiated favorable multi-year pricing agreements and hedging structures for a European distributor, protecting margins against raw material fluctuations.','[\"Financial & Margin Forecasting\",\"Supply Chain Risk Audits\",\"Vendor Contract Negotiation\",\"Operational Bottleneck Removal\"]',2),
('srv-3','Export & Import Services','Global trade solutions, customs clearance, and supply chain management.','End-to-end export-import execution covering vendor liaison, HS code classification, letter of credit (LC) documentation, customs clearance, and seamless international trade compliance.','globe','Managed end-to-end export compliance and customs documentation for 85+ forty-foot containers of handcrafted furniture & textiles across the US, UK, and EU.','[\"Customs & Regulatory Clearance\",\"End-to-End Supply Chain Execution\",\"Duty & Tariff Optimization\",\"Multi-Vendor Consolidation\"]',3),
('srv-4','Market Research','Target market analysis, competitor benchmarking, and consumer trends.','Deep-dive global market intelligence, material trend forecasting, competitor price benchmarking, and regional manufacturing capability mapping across India and South Asia.','search','Delivered a seasonal trend & material feasibility study for a UK lifestyle brand, resulting in a bestselling sustainable jute & acacia wood collection.','[\"Competitor Price Benchmarking\",\"Raw Material & Artisanal Mapping\",\"Global Consumer Trend Reports\",\"Factory Capability Assessments\"]',4),
('srv-5','Quality Assurance','Product inspection, compliance verification, and standard maintenance.','At Xporus International, quality is non-negotiable. Our on-ground QA engineers conduct rigorous inline, mid-production, and pre-shipment quality inspections alongside thorough product testing.','shield-check','Identified and rectified finish defects during inline inspection for a 12,000-unit US furniture & lighting order, ensuring 100% defect-free on-time delivery.','[\"Pre-Shipment Quality Inspections\",\"Production Standard Verification\",\"Inline Factory Floor Audits\",\"Safety & Durability Testing\"]',5),
('srv-6','Logistics Management','Freight forwarding, warehousing, and international shipping coordination.','We take the complexity out of international shipping by coordinating ocean/air freight forwarding, bonded warehousing, packaging optimization, and real-time container tracking.','truck','Consolidated shipments from 9 artisan clusters in Rajasthan and UP into synchronized FOB & DDP deliveries for a leading Australian retail chain.','[\"Ocean & Air Freight Forwarding\",\"Multi-Cluster Warehousing\",\"Transit Packaging Engineering\",\"FOB \\/ CIF \\/ DDP Coordination\"]',6);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_settings` (
  `setting_key` varchar(64) NOT NULL,
  `setting_value` text NOT NULL,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_settings`
--

LOCK TABLES `site_settings` WRITE;
/*!40000 ALTER TABLE `site_settings` DISABLE KEYS */;
INSERT INTO `site_settings` VALUES
('address','Plot No. 18, Heavy Industrial Area, Jodhpur, Rajasthan 342003, India'),
('companyName','Xporus International'),
('email','contact@xporusinternational.com'),
('heroBadge','GLOBAL TRADE & CONSULTING'),
('heroHeadline','Experienced In Consult & Business Advice — Sourcing From India For The World'),
('heroPrimaryCta','Explore Services'),
('heroSecondaryCta','Contact Us'),
('heroSubtext','Your premier end-to-end global trade partner specializing in strategic business consulting, custom product development, audited factory supply chains, and export excellence.'),
('linkedin','https://www.linkedin.com/company/xporus-international/'),
('phone','+91 291 274 8890 / +91 98290 56789'),
('tagline','Sourcing From India For The World');
/*!40000 ALTER TABLE `site_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribers`
--

DROP TABLE IF EXISTS `subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscribers` (
  `id` varchar(32) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subscribed_date` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribers`
--

LOCK TABLES `subscribers` WRITE;
/*!40000 ALTER TABLE `subscribers` DISABLE KEYS */;
INSERT INTO `subscribers` VALUES
('SUB-1','procurement@urbanhabitat.co.uk','2026-10-25'),
('SUB-2','buyers@pacificlifestyle.com.au','2026-10-28');
/*!40000 ALTER TABLE `subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_members`
--

DROP TABLE IF EXISTS `team_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_members` (
  `id` varchar(32) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(128) NOT NULL,
  `badge` varchar(64) NOT NULL DEFAULT 'Executive',
  `specialty` varchar(255) NOT NULL,
  `bio` text NOT NULL,
  `image` text NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_members`
--

LOCK TABLES `team_members` WRITE;
/*!40000 ALTER TABLE `team_members` DISABLE KEYS */;
INSERT INTO `team_members` VALUES
('tm-1','Rohit Joshi','Co-Founder','Executive','Global Strategy & Business Consultancy','Spearheads international market expansion, corporate advisory, and strategic retail partnerships across North America and Europe.','https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',1),
('tm-2','Swati Yadav','Co-Founder','Executive','Supply Chain & Operations Excellence','Leads vendor onboarding, ethical compliance audits, and end-to-end production scheduling across 250+ partner factories.','https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',2),
('tm-3','Kshitij Vyas','Co-Founder','Executive','Product Development & Quality Assurance','Oversees custom prototyping, material engineering, and multi-stage quality control inspections across India.','https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80',3),
('tm-4','Girija Shrivastava','Co-Founder','Executive','International Trade & Client Relations','Directs global buyer merchandising, export documentation, and seamless multimodal logistics coordination.','https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',4);
/*!40000 ALTER TABLE `team_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` varchar(32) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `client_role` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `country` varchar(128) NOT NULL DEFAULT 'Global',
  `rating` int(11) NOT NULL DEFAULT 5,
  `quote` text NOT NULL,
  `avatar` text NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES
('tst-1','Kelly Burt-Deasy','Head Designer & Sourcing Director','Emily Joubert (USA)','USA',5,'Flawless quality control and inspiring product development! Our sourcing trips and container shipments from India have been extraordinary thanks to Xporus International. Their vendor coordination and attention to detail make international buying completely stress-free.','https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',1),
('tst-2','Tanja Gobitz','Founder & Creative Director','Studio Commaniago (Netherlands)','Netherlands',5,'My European retail customers demand only high-end quality production and strict traceability. I feel completely reassured knowing that Xporus International’s impeccable processes, factory controls, and checks ensure consistent excellence across every single shipment.','https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',2),
('tst-3','Marcus Vance','VP of Global Merchandising','Harbor & Home Living (UK)','United Kingdom',5,'From CAD prototyping in Jodhpur to final customs clearance, Xporus International reduced our procurement lead times by 28% while maintaining zero-defect quality across 18 handcrafted furniture and lighting collections.','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',3),
('tst-4','Claire Lindqvist','Head of Global Procurement','Nordic Living Collective (Sweden)','Sweden',5,'Their transparent cost negotiations and rigorous inline factory inspections gave us the confidence to scale our Indian sourcing portfolio from 3 product lines to over 20 lifestyle categories within a single year.','https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',4);
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-17 20:56:47
