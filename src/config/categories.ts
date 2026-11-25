export interface CategoryMenuData {
  id: string;
  name: string;
  iconName: string;
  description: string;
  subcategories: string[];
}

export const CATEGORY_NAVIGATION_DATA: CategoryMenuData[] = [
  {
    id: 'restaurants-cafes',
    name: 'Restaurants & Cafes',
    iconName: 'UtensilsCrossed',
    description: 'Dining, cafes, food trucks and culinary specialties',
    subcategories: [
      'Takeout',
      'Delivery',
      'Lunch',
      'Dinner',
      'Coffee & Cafes',
      'Pizza',
      'Chinese',
      'Sports Bars & Pubs',
      'Food Trucks',
      'Italian Restaurants',
      'Bakeries',
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Clinics',
    iconName: 'Stethoscope',
    description: 'Certified doctors, dental studios and rehabilitation care',
    subcategories: [
      'Dentists & Orthodontics',
      'General Physicians & Clinics',
      'Physiotherapy & Rehab',
      'Diagnostic Labs & Scans',
      'Eye Clinics & Optometry',
      'Pediatric Care',
    ],
  },
  {
    id: 'beauty-wellness',
    name: 'Beauty & Wellness',
    iconName: 'Sparkles',
    description: 'Salons, luxury day spas and holistic wellness therapies',
    subcategories: [
      'Hair Salons & Styling',
      'Luxury Day Spas',
      'Skincare & Facials',
      'Nail Salons',
      'Ayurvedic & Holistic Wellness',
      'Makeup & Bridal Studios',
    ],
  },
  {
    id: 'home-services',
    name: 'Home Services',
    iconName: 'Home',
    description: 'Verified interior designers, electricians, and home repairs',
    subcategories: [
      'Modular Kitchens & Interiors',
      'Electricians & Wiring',
      'Plumbers & Sanitation',
      'Home Cleaning & Deep Wash',
      'Appliance Repair & AC Service',
      'Painting & Waterproofing',
    ],
  },
  {
    id: 'automotive',
    name: 'Automotive Care',
    iconName: 'Car',
    description: 'Ceramic detailing, mechanics, tyre alignment and car care',
    subcategories: [
      'Car Detailing & Ceramic Coat',
      'Multi-Brand Car Service & Mechanics',
      'Car Wash & Sanitization',
      'Wheel Alignment & Tyres',
      'Denting & Painting',
      'Bike Servicing & Repair',
    ],
  },
  {
    id: 'education',
    name: 'Education & Tutoring',
    iconName: 'GraduationCap',
    description: 'STEM maker labs, competitive coaching and tutoring',
    subcategories: [
      'STEM & Robotics',
      'Competitive Exam Coaching',
      'Language & Communication',
      'Music & Arts Academies',
      'Private Tutors & Math Lab',
      'Preschool & Early Learning',
    ],
  },
  {
    id: 'shopping',
    name: 'Local Boutiques & Retail',
    iconName: 'ShoppingBag',
    description: 'Artisanal handlooms, bespoke fashion and retail boutiques',
    subcategories: [
      'Ethnic Wear & Handlooms',
      'Bespoke Tailoring & Boutiques',
      'Artisanal Jewelry',
      'Home Decor & Craftware',
      'Organic Food & Grocery',
      'Footwear & Leather Goods',
    ],
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    iconName: 'Briefcase',
    description: 'Legal advisors, chartered accountants and enterprise consultants',
    subcategories: [
      'Legal & Compliance Advisory',
      'Chartered Accountants & Tax',
      'Business & Startup Consulting',
      'Architecture & Structural Design',
      'Trademark & Patent Filing',
      'Digital Marketing & Branding',
    ],
  },
];
