/**
 * Xporus International — Pure HTML/JS Centralized CMS Data Store (`store.js`)
 * Synchronizes Frontend (`index.html`) and Admin Panel (`admin.html`) instantly
 * using Browser Storage + Real-Time Cross-Tab Events (Zero PHP/Server required).
 */

const STORAGE_KEY = 'xporus_international_cms_v2';

const DEFAULT_CMS_DATA = {
  settings: {
    companyName: 'Xporus International',
    tagline: 'Sourcing From India For The World',
    heroBadge: 'GLOBAL TRADE & CONSULTING',
    heroHeadline: 'Experienced In Consult & Business Advice — Sourcing From India For The World',
    heroSubtext: 'Your premier end-to-end global trade partner specializing in strategic business consulting, custom product development, audited factory supply chains, and export excellence.',
    heroPrimaryCta: 'Explore Services',
    heroSecondaryCta: 'Contact Us',
    address: 'Plot No. 18, Heavy Industrial Area, Jodhpur, Rajasthan 342003, India',
    phone: '+91 291 274 8890 / +91 98290 56789',
    email: 'contact@xporusinternational.com',
    linkedin: 'https://www.linkedin.com/company/xporus-international/'
  },

  metrics: [
    { id: 'm1', value: '10+', label: 'Years Experience' },
    { id: 'm2', value: '50+', label: 'Product Categories' },
    { id: 'm3', value: '8+', label: 'Global Markets' },
    { id: 'm4', value: '250+', label: 'Audited Vendors' }
  ],

  services: [
    {
      id: 'srv-1',
      title: 'Consultancy Service',
      shortDesc: 'Strategic business advice and growth planning.',
      fullDesc: 'We provide comprehensive strategic business consulting to help international retailers, wholesalers, and D2C brands establish resilient sourcing roadmaps and scale sustainably across global markets.',
      icon: 'briefcase',
      caseStudy: 'Guided a US-based multi-store home retailer in restructuring their Indian vendor portfolio, achieving a 22% cost reduction within two quarters.',
      deliverables: ['Market Entry Strategy', 'Supplier Portfolio Optimization', 'Cost-Benefit Restructuring', 'Long-Term Growth Roadmap']
    },
    {
      id: 'srv-2',
      title: 'Business Advisory',
      shortDesc: 'Financial forecasting, risk management, and operational efficiency.',
      fullDesc: 'Our advisory practice delivers data-backed financial forecasting, supply chain risk mitigation, and factory floor operational efficiency audits tailored for high-volume cross-border trade.',
      icon: 'trending-up',
      caseStudy: 'Negotiated favorable multi-year pricing agreements and hedging structures for a European distributor, protecting margins against raw material fluctuations.',
      deliverables: ['Financial & Margin Forecasting', 'Supply Chain Risk Audits', 'Vendor Contract Negotiation', 'Operational Bottleneck Removal']
    },
    {
      id: 'srv-3',
      title: 'Export & Import Services',
      shortDesc: 'Global trade solutions, customs clearance, and supply chain management.',
      fullDesc: 'End-to-end export-import execution covering vendor liaison, HS code classification, letter of credit (LC) documentation, customs clearance, and seamless international trade compliance.',
      icon: 'globe',
      caseStudy: 'Managed end-to-end export compliance and customs documentation for 85+ forty-foot containers of handcrafted furniture & textiles across the US, UK, and EU.',
      deliverables: ['Customs & Regulatory Clearance', 'End-to-End Supply Chain Execution', 'Duty & Tariff Optimization', 'Multi-Vendor Consolidation']
    },
    {
      id: 'srv-4',
      title: 'Market Research',
      shortDesc: 'Target market analysis, competitor benchmarking, and consumer trends.',
      fullDesc: 'Deep-dive global market intelligence, material trend forecasting, competitor price benchmarking, and regional manufacturing capability mapping across India and South Asia.',
      icon: 'search',
      caseStudy: 'Delivered a seasonal trend & material feasibility study for a UK lifestyle brand, resulting in a bestselling sustainable jute & acacia wood collection.',
      deliverables: ['Competitor Price Benchmarking', 'Raw Material & Artisanal Mapping', 'Global Consumer Trend Reports', 'Factory Capability Assessments']
    },
    {
      id: 'srv-5',
      title: 'Quality Assurance',
      shortDesc: 'Product inspection, compliance verification, and standard maintenance.',
      fullDesc: 'At Xporus International, quality is non-negotiable. Our on-ground QA engineers conduct rigorous inline, mid-production, and pre-shipment quality inspections alongside thorough product testing.',
      icon: 'shield-check',
      caseStudy: 'Identified and rectified finish defects during inline inspection for a 12,000-unit US furniture & lighting order, ensuring 100% defect-free on-time delivery.',
      deliverables: ['Pre-Shipment Quality Inspections', 'Production Standard Verification', 'Inline Factory Floor Audits', 'Safety & Durability Testing']
    },
    {
      id: 'srv-6',
      title: 'Logistics Management',
      shortDesc: 'Freight forwarding, warehousing, and international shipping coordination.',
      fullDesc: 'We take the complexity out of international shipping by coordinating ocean/air freight forwarding, bonded warehousing, packaging optimization, and real-time container tracking.',
      icon: 'truck',
      caseStudy: 'Consolidated shipments from 9 artisan clusters in Rajasthan and UP into synchronized FOB & DDP deliveries for a leading Australian retail chain.',
      deliverables: ['Ocean & Air Freight Forwarding', 'Multi-Cluster Warehousing', 'Transit Packaging Engineering', 'FOB / CIF / DDP Coordination']
    }
  ],

  categories: [
    {
      id: 'cat-1',
      title: 'FURNITURE',
      group: 'furniture',
      featured: true,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      subcategories: ['Bedroom Furniture', 'Living Room Sets', 'Dining Room Tables & Chairs', 'Accent & Coffee Tables', 'Solid Wood & Cane Collections']
    },
    {
      id: 'cat-2',
      title: 'LAMPS & LIGHTING',
      group: 'lighting',
      featured: true,
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      subcategories: ['Table & Floor Lamps', 'Pendant Lamps', 'Handcrafted Chandeliers', 'Wall Mounted Sconces', 'Brass & Woven Rattan Shades']
    },
    {
      id: 'cat-3',
      title: 'HOME TEXTILES',
      group: 'textiles',
      featured: true,
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      subcategories: ['Bed Linen & Duvet Sets', 'Home Linen & Throws', 'Table Linen & Runners', 'Kitchen Linen', 'Organic Cotton Collections']
    },
    {
      id: 'cat-4',
      title: 'KITCHEN & DINING',
      group: 'kitchen',
      featured: true,
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80',
      subcategories: ['Artisanal Serveware', 'Cookware & Cast Iron', 'Bakeware', 'Brass & Copper Barware', 'Flatware & Cutlery Sets']
    },
    {
      id: 'cat-5',
      title: 'HOME DÉCOR & ACCESSORIES',
      group: 'decor',
      featured: true,
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      subcategories: ['Wall Décor & Mirrors', 'Table Top Décor', 'Candle Holders & Lanterns', 'Decorative Baskets & Storage', 'Handcrafted Vases']
    },
    {
      id: 'cat-6',
      title: 'BATH COLLECTION',
      group: 'textiles',
      featured: true,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      subcategories: ['Luxury Bath Linen & Towels', 'Bath Décor & Utility', 'Marble & Stone Dispensers', 'Vanity Storage & Organizers']
    },
    {
      id: 'cat-7',
      title: 'BAGS & ACCESSORIES',
      group: 'fashion',
      featured: true,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      subcategories: ['Handcrafted Leather Bags', 'Canvas & Jute Tote Bags', 'Fashion Jewellery', 'Travel Duffels & Pouches', 'Garment & Footwear']
    },
    {
      id: 'cat-8',
      title: 'OUTDOOR LIVING',
      group: 'furniture',
      featured: true,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      subcategories: ['Patio & Garden Furniture', 'Outdoor Lanterns & Lighting', 'Planters & Garden Décor', 'All-Weather Loungers & Umbrellas']
    },
    {
      id: 'cat-9',
      title: 'CUSHIONS & RUGS',
      group: 'textiles',
      featured: false,
      image: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80',
      subcategories: ['Embroidered Accent Cushions', 'Hand-Tufted Wool Rugs', 'Jute & Kilim Dhurries', 'Outdoor Poufs']
    },
    {
      id: 'cat-10',
      title: 'SEASONAL & CHRISTMAS',
      group: 'decor',
      featured: false,
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80',
      subcategories: ['Christmas Ornaments & Décor', 'Easter & Autumn Collections', 'Scented Candles & Fragrances', 'Party & Festive Supplies']
    },
    {
      id: 'cat-11',
      title: 'KIDS & NURSERY',
      group: 'furniture',
      featured: false,
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      subcategories: ['Kids Room Décor', 'Organic Soft Furnishings', 'Nursery Furniture', 'Handcrafted Soft Toys & Lighting']
    },
    {
      id: 'cat-12',
      title: 'HOME IMPROVEMENT & DIY',
      group: 'decor',
      featured: false,
      image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80',
      subcategories: ['Architectural Home Hardware', 'Cabinet Knobs & Pulls', 'Handcrafted Tiles', 'Stationery, Books & DIY Kits', 'Pets & Sporting Goods']
    }
  ],

  products: [
    // 01. FURNITURE (3 Sample Products)
    {
      id: 'prd-1',
      sku: 'XP-FUR-101',
      title: 'Solid Mango Wood & Cane Sideboard',
      category: 'Furniture',
      categoryKey: 'furniture',
      material: 'Kiln-Dried Mango Wood & Natural Rattan Cane',
      dimensions: '160 x 45 x 80 cm | KD / Assembled',
      moq: '25 Pcs',
      origin: 'Jodhpur Cluster',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Three-door handcrafted solid mango wood credenza featuring natural woven rattan cane panels, adjustable internal shelving, and matte water-based lacquer finish.'
    },
    {
      id: 'prd-2',
      sku: 'XP-FUR-102',
      title: 'Industrial Reclaimed Acacia Dining Table',
      category: 'Furniture',
      categoryKey: 'furniture',
      material: 'Solid Seasoned Acacia Wood & Powder-Coated Iron',
      dimensions: '200 x 100 x 76 cm | KD Metal Legs',
      moq: '20 Pcs',
      origin: 'Jodhpur Cluster',
      image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Live-edge and straight-edge dining table crafted from sustainably harvested Indian acacia wood paired with heavy-gauge matte black iron legs.'
    },
    {
      id: 'prd-3',
      sku: 'XP-FUR-103',
      title: 'Bouclé & Solid Ash Lounge Accent Chair',
      category: 'Furniture',
      categoryKey: 'furniture',
      material: 'Solid Ash Wood Frame & 520 GSM Textured Bouclé',
      dimensions: '74 x 78 x 79 cm | High-Resilience Foam',
      moq: '30 Pcs',
      origin: 'Jodhpur Cluster',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Ergonomically curved lounge armchair upholstered in European-grade ivory bouclé over a mortise-and-tenon solid hardwood frame.'
    },

    // 02. LAMPS & LIGHTING (3 Sample Products)
    {
      id: 'prd-4',
      sku: 'XP-LGT-201',
      title: 'Hammered Antique Brass Dome Pendant Lamp',
      category: 'Lamps & Lighting',
      categoryKey: 'lighting',
      material: 'Heavy-Gauge Hand-Hammered Solid Brass',
      dimensions: 'Dia 45 cm x H 38 cm | CE / UL Wired',
      moq: '50 Pcs',
      origin: 'Moradabad Cluster',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Hand-spun and hand-hammered by master metal artisans with antique patinated exterior, warm gold interior reflector, and braided fabric cord.'
    },
    {
      id: 'prd-5',
      sku: 'XP-LGT-202',
      title: 'Travertine Marble & Brushed Brass Table Lamp',
      category: 'Lamps & Lighting',
      categoryKey: 'lighting',
      material: 'Natural Honed Marble & Slub Linen Drum Shade',
      dimensions: 'Dia 36 cm x H 62 cm | E26 / E27 Holder',
      moq: '50 Pcs',
      origin: 'Moradabad / Agra',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Architectural monolithic stone base turned from solid natural marble, accented with antique brass hardware and a natural oatmeal linen shade.'
    },
    {
      id: 'prd-6',
      sku: 'XP-LGT-203',
      title: 'Woven Seagrass & Rattan Coastal Chandelier',
      category: 'Lamps & Lighting',
      categoryKey: 'lighting',
      material: 'Natural Rattan Cane, Seagrass & Iron Frame',
      dimensions: 'Dia 60 cm x H 52 cm | Custom Drop Chain',
      moq: '40 Pcs',
      origin: 'Noida / Kolkata',
      image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Multi-tiered organic woven pendant shade casting warm ambient shadow patterns, ideal for hospitality, coastal living, and boutique retail collections.'
    },

    // 03. HOME TEXTILES (3 Sample Products)
    {
      id: 'prd-7',
      sku: 'XP-TXT-301',
      title: 'Organic Washed Percale Cotton Duvet Set',
      category: 'Home Textiles',
      categoryKey: 'textiles',
      material: '100% Long-Staple Combed Cotton (300 TC)',
      dimensions: 'Twin / Queen / King / Super King (US & EU)',
      moq: '100 Sets',
      origin: 'Panipat / Karur',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Enzyme garment-washed crisp percale bedding set (duvet cover + 2 pillow shams) with coconut shell buttons and self-fabric storage pouch.'
    },
    {
      id: 'prd-8',
      sku: 'XP-TXT-302',
      title: 'Waffle Weave Organic Cotton Bed Throw Blanket',
      category: 'Home Textiles',
      categoryKey: 'textiles',
      material: '100% Yarn-Dyed Combed Cotton (380 GSM)',
      dimensions: '150 x 200 cm & 220 x 240 cm | Hand-Fringed',
      moq: '120 Pcs',
      origin: 'Karur Cluster',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Breathable honeycomb waffle-weave throw blanket pre-washed for ultra-soft handfeel and finished with hand-knotted twisted tassels.'
    },
    {
      id: 'prd-9',
      sku: 'XP-TXT-303',
      title: 'Block-Printed Linen & Cotton Table Runner Set',
      category: 'Home Textiles',
      categoryKey: 'textiles',
      material: '55% European Flax Linen & 45% Indian Cotton',
      dimensions: 'Runner 40x220 cm + 6 Matching Napkins (45x45 cm)',
      moq: '100 Sets',
      origin: 'Jaipur Cluster',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Artisanal wooden hand-block printed dining table runner and mitered-corner napkin set crafted with azo-free vat dyes.'
    },

    // 04. KITCHEN & DINING (3 Sample Products)
    {
      id: 'prd-10',
      sku: 'XP-KIT-401',
      title: 'Acacia Wood & White Marble Charcuterie Board',
      category: 'Kitchen & Dining',
      categoryKey: 'kitchen',
      material: 'Food-Safe Seasoned Acacia Wood & Makrana Marble',
      dimensions: '48 x 24 x 2 cm | Laser-Engraved Logo Option',
      moq: '100 Pcs',
      origin: 'Saharanpur / Agra',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Precision-joined marble and wood serving paddle finished with food-grade beeswax oil, brass inlay strip, and hanging leather loop.'
    },
    {
      id: 'prd-11',
      sku: 'XP-KIT-402',
      title: 'Hand-Forged Matte Gold 24-Piece Cutlery Set',
      category: 'Kitchen & Dining',
      categoryKey: 'kitchen',
      material: '18/8 Food-Grade Stainless Steel (PVD Finish)',
      dimensions: '6 Forks, 6 Knives, 6 Spoons, 6 Teaspoons',
      moq: '100 Gift Sets',
      origin: 'Moradabad Cluster',
      image: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Artisanal slender-handle flatware set available in Champagne Gold, Vintage Brushed Silver, Matte Black, and Antique Copper PVD finishes.'
    },
    {
      id: 'prd-12',
      sku: 'XP-KIT-403',
      title: 'Reactive Glaze Handcrafted Stoneware Dinner Set',
      category: 'Kitchen & Dining',
      categoryKey: 'kitchen',
      material: 'High-Fired Lead-Free Ceramic Stoneware (1220°C)',
      dimensions: '16-Piece Set (Dinner Plates, Side Plates, Bowls, Mugs)',
      moq: '120 Sets',
      origin: 'Khurja Cluster',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Microwave and dishwasher-safe artisanal stoneware with organic speckled reactive glaze rims and raw unglazed stoneware base.'
    },

    // 05. HOME DÉCOR & ACCESSORIES (3 Sample Products)
    {
      id: 'prd-13',
      sku: 'XP-DEC-501',
      title: 'Arch Minimalist Brass-Framed Wall Mirror',
      category: 'Home Décor & Accessories',
      categoryKey: 'decor',
      material: '5mm Copper-Free HD Mirror & Welded Brass Frame',
      dimensions: '90 x 60 cm & 160 x 70 cm Floor Mirror',
      moq: '40 Pcs',
      origin: 'Jodhpur / Moradabad',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Slim-profile architectural arch mirror with moisture-resistant MDF backing, heavy-duty D-ring wall mounts, and drop-tested carton packaging.'
    },
    {
      id: 'prd-14',
      sku: 'XP-DEC-502',
      title: 'Ribbed Recycled Glass & Brass Hurricane Lanterns',
      category: 'Home Décor & Accessories',
      categoryKey: 'decor',
      material: 'Mouth-Blown Fluted Glass & Antique Brass Frame',
      dimensions: 'Set of 2 (Small: H 28 cm / Large: H 38 cm)',
      moq: '80 Sets',
      origin: 'Firozabad / Moradabad',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Hand-soldered brass pillar candle lanterns with removable fluted glass cylinders for indoor tabletops and covered patio entertaining.'
    },
    {
      id: 'prd-15',
      sku: 'XP-DEC-503',
      title: 'Textured Terracotta & Ceramic Amphora Vase',
      category: 'Home Décor & Accessories',
      categoryKey: 'decor',
      material: 'Hand-Thrown Terracotta & Matte Stone Finish',
      dimensions: 'Dia 26 cm x H 42 cm | Waterproof Interior',
      moq: '60 Pcs',
      origin: 'Jaipur / Khurja',
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Mediterranean-inspired twin-handle sculptural vessel with aged limestone texture finish, designed for dried botanicals and statement shelf styling.'
    },

    // 06. BATH COLLECTION (3 Sample Products)
    {
      id: 'prd-16',
      sku: 'XP-BTH-601',
      title: 'Green Marble & Brass 4-Piece Bath Vanity Set',
      category: 'Bath Collection',
      categoryKey: 'bath',
      material: 'Natural Rainforest Green Marble & Brass Pump',
      dimensions: 'Lotion Dispenser, Tumbler, Soap Dish & Tray',
      moq: '100 Sets',
      origin: 'Agra Cluster',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Hand-carved and honed solid marble bathroom accessories available in White Makrana, Green Marble, Black Marquina, and Beige Travertine.'
    },
    {
      id: 'prd-17',
      sku: 'XP-BTH-602',
      title: '650 GSM Zero-Twist Combed Cotton Bath Towel Set',
      category: 'Bath Collection',
      categoryKey: 'bath',
      material: '100% Ring-Spun Combed Cotton (650 GSM)',
      dimensions: '2 Bath Sheets, 2 Hand Towels, 2 Washcloths',
      moq: '150 Sets',
      origin: 'Karur / Solapur',
      image: 'https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Hotel-grade ultra-absorbent zero-twist plush terry towel collection with double-stitched hemmed borders and custom woven jacquard labels.'
    },
    {
      id: 'prd-18',
      sku: 'XP-BTH-603',
      title: 'Handwoven Seagrass & Cotton Rope Laundry Hamper',
      category: 'Bath Collection',
      categoryKey: 'bath',
      material: 'Natural Woven Seagrass & Removable Cotton Liner',
      dimensions: 'Dia 42 cm x H 56 cm | Collapsible / Nested Set',
      moq: '80 Pcs',
      origin: 'Noida / Kolkata',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Sturdy wire-reinforced natural seagrass bath storage hamper with fitted lid, leather carry handles, and washable pre-shrunk cotton liner bag.'
    },

    // 07. BAGS & ACCESSORIES (3 Sample Products)
    {
      id: 'prd-19',
      sku: 'XP-BAG-701',
      title: 'Full-Grain Vegetable-Tanned Leather Weekender Bag',
      category: 'Bags & Accessories',
      categoryKey: 'fashion',
      material: 'Full-Grain Buffalo Leather & YKK Brass Zippers',
      dimensions: '54 x 26 x 28 cm | Cabin-Approved Size',
      moq: '50 Pcs',
      origin: 'Kanpur / Chennai',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Heirloom-grade travel duffel handcrafted from drum-dyed vegetable-tanned leather with solid antique brass buckles, luggage sleeve, and shoe compartment.'
    },
    {
      id: 'prd-20',
      sku: 'XP-BAG-702',
      title: 'Heavyweight Washed Canvas & Leather Market Tote',
      category: 'Bags & Accessories',
      categoryKey: 'fashion',
      material: '16 oz Organic Cotton Canvas & Saddle Leather',
      dimensions: '44 x 36 x 16 cm | Zippered Inner Pocket',
      moq: '150 Pcs',
      origin: 'Kolkata / Mumbai',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Eco-conscious everyday carryall featuring reinforced leather base corners, antique brass rivets, magnetic snap closure, and custom embossed branding.'
    },
    {
      id: 'prd-21',
      sku: 'XP-BAG-703',
      title: 'Handwoven Raffia & Braided Jute Resort Beach Bag',
      category: 'Bags & Accessories',
      categoryKey: 'fashion',
      material: '100% Natural Raffia Straw, Jute & Leather Handles',
      dimensions: '48 x 32 x 18 cm | Cotton Drawstring Pouch',
      moq: '120 Pcs',
      origin: 'Kolkata / Jaipur',
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Artisanal hand-crocheted summer resort basket tote featuring rolled vegetable-tanned leather shoulder straps and water-resistant lining.'
    },

    // 08. OUTDOOR LIVING (3 Sample Products)
    {
      id: 'prd-22',
      sku: 'XP-OUT-801',
      title: 'All-Weather Teak & Woven Rope Patio Lounge Set',
      category: 'Outdoor Living',
      categoryKey: 'outdoor',
      material: 'Seasoned Teak, UV Polyolefin Rope & Olefin Fabric',
      dimensions: '3-Seater Sofa + 2 Armchairs + Coffee Table',
      moq: '15 Sets',
      origin: 'Jodhpur Cluster',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Engineered for outdoor resorts and patio living with water-repellent quick-dry foam cushions and weather-resistant handwoven olefin rope backrests.'
    },
    {
      id: 'prd-23',
      sku: 'XP-OUT-802',
      title: 'Fluted Galvanized Iron & Brass Stand Planters',
      category: 'Outdoor Living',
      categoryKey: 'outdoor',
      material: 'Rust-Resistant Galvanized Iron (Powder-Coated)',
      dimensions: 'Set of 2 (H 55 cm & H 42 cm with Folding Stand)',
      moq: '80 Sets',
      origin: 'Moradabad Cluster',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Nested indoor/outdoor architectural metal planters with removable solid rod iron stands in matte sage, terracotta, charcoal, and brushed brass.'
    },
    {
      id: 'prd-24',
      sku: 'XP-OUT-803',
      title: 'Solar & Candle Weatherproof Bamboo Garden Lantern',
      category: 'Outdoor Living',
      categoryKey: 'outdoor',
      material: 'Treated Split Bamboo, Powder-Coated Metal & Glass',
      dimensions: 'Dia 32 cm x H 54 cm | Hemp Rope Handle',
      moq: '60 Pcs',
      origin: 'Noida / Moradabad',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Oversized coastal floor lantern with UV-treated natural bamboo ribs, inner borosilicate hurricane cylinder, and optional IP65 warm LED module.'
    },

    // 09. CUSHIONS & RUGS (3 Sample Products)
    {
      id: 'prd-25',
      sku: 'XP-RUG-901',
      title: 'Hand-Tufted New Zealand Wool Sculpted Area Rug',
      category: 'Cushions & Rugs',
      categoryKey: 'rugs',
      material: '80% New Zealand Wool & 20% Bamboo Viscose',
      dimensions: '160x230 cm, 200x300 cm & Custom Sizes',
      moq: '25 Rugs',
      origin: 'Bhadohi Cluster',
      image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Plush 14mm hand-tufted wool rug featuring sculpted geometric high-low relief carving and heavy organic cotton canvas backing.'
    },
    {
      id: 'prd-26',
      sku: 'XP-RUG-902',
      title: 'Embroidered Crewel & Tufted Accent Cushion Cover',
      category: 'Cushions & Rugs',
      categoryKey: 'rugs',
      material: 'Heavyweight Cotton Slub & Wool Yarn Embroidery',
      dimensions: '45x45 cm, 50x50 cm & 30x50 cm Lumbar',
      moq: '150 Pcs',
      origin: 'Panipat Cluster',
      image: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Artisanal chain-stitch crewel embroidery and raised bouclé tufting with concealed YKK metal zipper and knife-edge or fringed borders.'
    },
    {
      id: 'prd-27',
      sku: 'XP-RUG-903',
      title: 'Handwoven Braided Jute & Wool Pouf Ottoman',
      category: 'Cushions & Rugs',
      categoryKey: 'rugs',
      material: '80% Natural Braided Jute, 20% Wool & EPS Beads',
      dimensions: '45 x 45 x 40 cm Cube / Dia 50 x 35 cm Round',
      moq: '60 Pcs',
      origin: 'Panipat / Jaipur',
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Dense hand-braided floor pouf ottoman filled with high-recovery compressed EPS beads and double-stitched bottom zipper liner.'
    },

    // 10. SEASONAL & CHRISTMAS (3 Sample Products)
    {
      id: 'prd-28',
      sku: 'XP-SEA-1001',
      title: 'Handcrafted Beaded & Velvet Christmas Ornaments (Set of 12)',
      category: 'Seasonal & Christmas',
      categoryKey: 'seasonal',
      material: 'Cotton Velvet, Zari Bullion & Recycled Glass Beads',
      dimensions: 'Dia 8 cm Baubles & Assorted Festive Shapes',
      moq: '100 Gift Boxes',
      origin: 'Moradabad / Noida',
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Heirloom zardozi hand-embroidered holiday tree ornaments packaged in compartmentalized fabric-lined retail gift boxes.'
    },
    {
      id: 'prd-29',
      sku: 'XP-SEA-1002',
      title: 'Carved Mango Wood & Brass Holiday Candle Holders',
      category: 'Seasonal & Christmas',
      categoryKey: 'seasonal',
      material: 'Turned Mango Wood & Spun Antique Brass Cups',
      dimensions: 'Set of 3 Pillar & Taper Holders (H 20, 26, 32 cm)',
      moq: '80 Sets',
      origin: 'Jodhpur / Moradabad',
      image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Warm rustic-luxe festive centerpiece candle holders combining lathe-turned solid wood silhouettes with drip-catching brass bobeches.'
    },
    {
      id: 'prd-30',
      sku: 'XP-SEA-1003',
      title: 'Mercury Glass & Soy Wax Scented Holiday Jar Candles',
      category: 'Seasonal & Christmas',
      categoryKey: 'seasonal',
      material: 'Silvered Mercury Glass, 100% Soy Wax & Essential Oils',
      dimensions: '300g Twin-Wick Vessel | 55 Hours Burn Time',
      moq: '200 Pcs',
      origin: 'Firozabad / Noida',
      image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Poured in mouth-blown antiqued mercury glass vessels with winter cedar, spiced cinnamon, and sandalwood IFRA-compliant fragrance blends.'
    },

    // 11. KIDS & NURSERY (3 Sample Products)
    {
      id: 'prd-31',
      sku: 'XP-KID-1101',
      title: 'Handwoven Rattan Cane & Solid Wood Nursery Crib',
      category: 'Kids & Nursery',
      categoryKey: 'kids',
      material: 'Solid Beech / Mango Wood & Natural Rattan Webbing',
      dimensions: '140 x 70 x 92 cm | 3-Height Adjustable Base',
      moq: '20 Pcs',
      origin: 'Jodhpur Cluster',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Convertible baby crib finished with EN71-3 child-safe non-toxic water-based coating and rounded ergonomic safety spindles.'
    },
    {
      id: 'prd-32',
      sku: 'XP-KID-1102',
      title: 'Organic Muslin Quilted Playmat & Nursery Bedding Set',
      category: 'Kids & Nursery',
      categoryKey: 'kids',
      material: '100% Organic Double-Gauze Cotton Muslin',
      dimensions: 'Playmat Dia 120 cm + Fitted Crib Sheet + Quilt',
      moq: '100 Sets',
      origin: 'Karur / Jaipur',
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Hypoallergenic, ultra-breathable quilted nursery bedding and padded floor playmat featuring hand-stitched kantha quilting and botanical prints.'
    },
    {
      id: 'prd-33',
      sku: 'XP-KID-1103',
      title: 'Braided Cotton Cord Animal Storage Basket Set',
      category: 'Kids & Nursery',
      categoryKey: 'kids',
      material: '100% Soft Braided Recycled Cotton Rope',
      dimensions: 'Set of 2 (Large Toy Bin H 45 cm + Small Organizer)',
      moq: '100 Sets',
      origin: 'Panipat / Noida',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Soft, pinch-free coiled cotton rope nursery toy baskets with embroidered animal faces and sturdy integrated side handles.'
    },

    // 12. HOME IMPROVEMENT & DIY (3 Sample Products)
    {
      id: 'prd-34',
      sku: 'XP-DIY-1201',
      title: 'Solid Cast Brass Knurled Cabinet Handles & Knobs Set',
      category: 'Home Improvement & DIY',
      categoryKey: 'hardware',
      material: '100% Solid Forged Brass (Unlacquered / Brushed)',
      dimensions: 'T-Bars (128mm / 160mm / 224mm) & Dia 32mm Knobs',
      moq: '200 Sets',
      origin: 'Aligarh / Moradabad',
      image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Precision-machined diamond-knurled architectural cabinet hardware supplied with M4 break-away mounting screws and retail blister or box packs.'
    },
    {
      id: 'prd-35',
      sku: 'XP-DIY-1202',
      title: 'Hand-Painted Blue Pottery & Mother-of-Pearl Knob Box (Assorted 24)',
      category: 'Home Improvement & DIY',
      categoryKey: 'hardware',
      material: 'Jaipur Quartz Blue Pottery, Bone Inlay & Brass Hardware',
      dimensions: 'Assorted 40mm Drawer Knobs in Retail Display Box',
      moq: '100 Display Boxes',
      origin: 'Jaipur / Sambhal',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Bestselling DIY furniture upcycling assortment featuring hand-glazed ceramic, mother-of-pearl, and horn/resin dresser knobs with brass backplates.'
    },
    {
      id: 'prd-36',
      sku: 'XP-DIY-1203',
      title: 'Handcrafted Cast Iron & Mango Wood Floating Wall Shelf Brackets',
      category: 'Home Improvement & DIY',
      categoryKey: 'hardware',
      material: 'Sand-Cast Antique Iron Brackets & Solid Mango Wood Shelf',
      dimensions: '60 x 20 cm & 90 x 22 cm | Heavy-Duty 35 kg Load',
      moq: '80 Sets',
      origin: 'Jodhpur / Aligarh',
      image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Complete DIY floating wall shelf kit including pre-drilled solid timber board, pair of architectural cast-iron brackets, and masonry wall anchors.'
    }
  ],

  team: [
    {
      id: 'tm-1',
      name: 'Rohit Joshi',
      role: 'Co-Founder',
      badge: 'Executive',
      specialty: 'Global Strategy & Business Consultancy',
      bio: 'Spearheads international market expansion, corporate advisory, and strategic retail partnerships across North America and Europe.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'tm-2',
      name: 'Swati Yadav',
      role: 'Co-Founder',
      badge: 'Executive',
      specialty: 'Supply Chain & Operations Excellence',
      bio: 'Leads vendor onboarding, ethical compliance audits, and end-to-end production scheduling across 250+ partner factories.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'tm-3',
      name: 'Kshitij Vyas',
      role: 'Co-Founder',
      badge: 'Executive',
      specialty: 'Product Development & Quality Assurance',
      bio: 'Oversees custom prototyping, material engineering, and multi-stage quality control inspections across India.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'tm-4',
      name: 'Girija Shrivastava',
      role: 'Co-Founder',
      badge: 'Executive',
      specialty: 'International Trade & Client Relations',
      bio: 'Directs global buyer merchandising, export documentation, and seamless multimodal logistics coordination.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80'
    }
  ],

  testimonials: [
    {
      id: 'tst-1',
      clientName: 'Kelly Burt-Deasy',
      clientRole: 'Head Designer & Sourcing Director',
      company: 'Emily Joubert (USA)',
      country: 'USA',
      rating: 5,
      quote: 'Flawless quality control and inspiring product development! Our sourcing trips and container shipments from India have been extraordinary thanks to Xporus International. Their vendor coordination and attention to detail make international buying completely stress-free.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'tst-2',
      clientName: 'Tanja Gobitz',
      clientRole: 'Founder & Creative Director',
      company: 'Studio Commaniago (Netherlands)',
      country: 'Netherlands',
      rating: 5,
      quote: 'My European retail customers demand only high-end quality production and strict traceability. I feel completely reassured knowing that Xporus International’s impeccable processes, factory controls, and checks ensure consistent excellence across every single shipment.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'tst-3',
      clientName: 'Marcus Vance',
      clientRole: 'VP of Global Merchandising',
      company: 'Harbor & Home Living (UK)',
      country: 'United Kingdom',
      rating: 5,
      quote: 'From CAD prototyping in Jodhpur to final customs clearance, Xporus International reduced our procurement lead times by 28% while maintaining zero-defect quality across 18 handcrafted furniture and lighting collections.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'tst-4',
      clientName: 'Claire Lindqvist',
      clientRole: 'Head of Global Procurement',
      company: 'Nordic Living Collective (Sweden)',
      country: 'Sweden',
      rating: 5,
      quote: 'Their transparent cost negotiations and rigorous inline factory inspections gave us the confidence to scale our Indian sourcing portfolio from 3 product lines to over 20 lifestyle categories within a single year.',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80'
    }
  ],

  inquiries: [
    {
      id: 'INQ-1001',
      name: 'David Sterling',
      email: 'd.sterling@sterlinghomeusa.com',
      phone: '+1 (310) 555-0194',
      company: 'Sterling Home Retail LLC (USA)',
      interest: 'Furniture & Lamps Sourcing',
      message: 'Looking to source 5x40HQ containers of solid mango wood dining tables and brass pendant lamps for our Q3 retail launch.',
      status: 'New',
      createdAt: '2026-10-29 14:20'
    },
    {
      id: 'INQ-1002',
      name: 'Sophie Laurent',
      email: 'sophie@maisonlaurent.fr',
      phone: '+33 1 42 68 55 10',
      company: 'Maison Laurent Paris',
      interest: 'Home Textiles & Linen',
      message: 'We require organic cotton bedding and embroidered cushion covers with custom private label packaging.',
      status: 'In Progress',
      createdAt: '2026-10-28 11:05'
    },
    {
      id: 'INQ-1003',
      name: 'Henrik Lindholm',
      email: 'hlindholm@nordicdecor.se',
      phone: '+46 8 501 234 56',
      company: 'Nordic Decor AB',
      interest: 'Quality Assurance & Factory Audit',
      message: 'Need pre-shipment quality inspection and factory audit for our upcoming shipment in Jodhpur and Moradabad.',
      status: 'Quoted',
      createdAt: '2026-10-26 16:45'
    }
  ],

  subscribers: [
    { id: 'SUB-1', email: 'procurement@urbanhabitat.co.uk', date: '2026-10-25' },
    { id: 'SUB-2', email: 'buyers@pacificlifestyle.com.au', date: '2026-10-28' }
  ]
};

const XporusStore = {
  getData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CMS_DATA));
        return JSON.parse(JSON.stringify(DEFAULT_CMS_DATA));
      }
      const parsed = JSON.parse(raw);
      return {
        settings: { ...DEFAULT_CMS_DATA.settings, ...(parsed.settings || {}) },
        metrics: parsed.metrics || DEFAULT_CMS_DATA.metrics,
        services: parsed.services || DEFAULT_CMS_DATA.services,
        categories: parsed.categories || DEFAULT_CMS_DATA.categories,
        products:
          Array.isArray(parsed.products) && parsed.products.length >= 36
            ? parsed.products
            : DEFAULT_CMS_DATA.products,
        team: parsed.team || DEFAULT_CMS_DATA.team,
        testimonials: parsed.testimonials || DEFAULT_CMS_DATA.testimonials,
        inquiries: parsed.inquiries || DEFAULT_CMS_DATA.inquiries,
        subscribers: parsed.subscribers || DEFAULT_CMS_DATA.subscribers
      };
    } catch (err) {
      return JSON.parse(JSON.stringify(DEFAULT_CMS_DATA));
    }
  },

  saveData(newData) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      window.dispatchEvent(new CustomEvent('xporus-cms-updated', { detail: newData }));
      return true;
    } catch (err) {
      console.error('Error saving CMS data:', err);
      return false;
    }
  },

  resetToDefault() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CMS_DATA));
    window.dispatchEvent(new CustomEvent('xporus-cms-updated', { detail: DEFAULT_CMS_DATA }));
    return JSON.parse(JSON.stringify(DEFAULT_CMS_DATA));
  },

  addInquiry(inquiry) {
    const data = this.getData();
    const newEntry = {
      id: 'INQ-' + Math.floor(1000 + Math.random() * 9000),
      name: inquiry.name || 'Anonymous Buyer',
      email: inquiry.email || '',
      phone: inquiry.phone || 'N/A',
      company: inquiry.company || 'International Buyer',
      interest: inquiry.interest || 'General Sourcing & Consulting',
      message: inquiry.message || '',
      status: 'New',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    data.inquiries.unshift(newEntry);
    this.saveData(data);
    return newEntry;
  },

  addSubscriber(email) {
    const data = this.getData();
    const exists = data.subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase());
    if (!exists) {
      data.subscribers.unshift({
        id: 'SUB-' + Date.now().toString().slice(-4),
        email,
        date: new Date().toISOString().slice(0, 10)
      });
      this.saveData(data);
    }
    return true;
  }
};

window.XporusStore = XporusStore;
