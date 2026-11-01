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
