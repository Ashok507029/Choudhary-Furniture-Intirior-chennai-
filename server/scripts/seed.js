const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('../models/Project');
const Admin = require('../models/Admin');

dotenv.config();

const initialProjects = [
  {
    title: 'Oakwood Villa Living Suite',
    category: 'Residential',
    location: 'Boat Club Road, Chennai',
    description: 'Bespoke walnut paneling, custom curved bouclé sectional, and book-matched calacatta marble table.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
    ],
    area: '4,500 sq.ft',
    duration: '10 Weeks',
    materials: ['Walnut Veneer', 'Calacatta Marble', 'Bouclé Fabric', 'Brass Accents'],
    featured: true,
  },
  {
    title: 'Synergy Tech Headquarters',
    category: 'Commercial & Retail',
    location: 'OMR IT Corridor, Chennai',
    description: 'Ergonomic acoustic felt-lined walls, shared executive pods, and 24-seater solid oak boardroom table.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    area: '12,000 sq.ft',
    duration: '14 Weeks',
    materials: ['American White Oak', 'Acoustic Wool Felt', 'Powder-coated Aluminium'],
    featured: true,
  },
  {
    title: 'Aurelia Designer Showroom',
    category: 'Commercial & Retail',
    location: 'Nungambakkam, Chennai',
    description: 'Brushed champagne gold hanging rails, fluted glass changing pods, and custom velvet lounge seating.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'
    ],
    area: '3,200 sq.ft',
    duration: '8 Weeks',
    materials: ['Champagne Gold PVD Stainless Steel', 'Fluted Glass', 'Italian Terrazzo'],
    featured: true,
  },
  {
    title: 'Grand Zenith Hotel Lobby',
    category: 'Commercial & Retail',
    location: 'Anna Salai, Chennai',
    description: 'Double-height architectural fluted timber columns, illuminated stone reception, and custom armchairs.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    area: '8,000 sq.ft',
    duration: '16 Weeks',
    materials: ['Backlit Onyx Stone', 'Teak Wood Fluting', 'Leather Upholstery'],
    featured: false,
  },
  {
    title: 'Urban Penthouse Culinary Suite',
    category: 'Modular Kitchens',
    location: 'Poes Garden, Chennai',
    description: 'High-gloss matte charcoal PU cabinets, waterfall marble island counter, and hidden motorized pantry bar.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    area: '950 sq.ft',
    duration: '5 Weeks',
    materials: ['Anti-fingerprint Soft PU Lacquer', 'Blum Servo-Drive', 'Calacatta Gold Quartz'],
    featured: true,
  },
  {
    title: 'Royal Heritage Master Suite',
    category: 'Custom Furniture',
    location: 'Alwarpet, Chennai',
    description: 'Handcrafted rosewood king bed with integrated floating nightstands and brass inlay wardrobe partitions.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    area: '1,800 sq.ft',
    duration: '6 Weeks',
    materials: ['Solid Indian Rosewood', 'Brushed Brass Inlay', 'Top-grain Nappa Leather'],
    featured: true,
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/choudhary_interiors';
    console.log(`Connecting to MongoDB for seeding: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB!');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects.');

    // Seed projects
    await Project.insertMany(initialProjects);
    console.log(`Successfully seeded ${initialProjects.length} luxury projects!`);

    // Ensure Admin exists
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cfinteriors.com';
    const adminExists = await Admin.findOne({ email: adminEmail });
    if (!adminExists) {
      await Admin.create({
        username: 'Lead Administrator',
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'admin123',
      });
      console.log(`Created default admin account: ${adminEmail} (password: ${process.env.ADMIN_PASSWORD || 'admin123'})`);
    }

    console.log('Data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedData();
