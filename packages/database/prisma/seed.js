require('dotenv').config({ path: '../../.env' });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@traveloop.com' },
    update: {},
    create: {
      email: 'admin@traveloop.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      bio: 'Platform administrator',
    },
  });

  // Create demo user
  const demoPassword = await bcrypt.hash('demo123', 12);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@traveloop.com' },
    update: {},
    create: {
      email: 'demo@traveloop.com',
      password: demoPassword,
      name: 'Alex Wanderer',
      bio: 'Passionate traveler and adventure seeker 🌍',
    },
  });

  // Seed destinations
  const destinations = [
    { name: 'Paris', country: 'France', region: 'Île-de-France', continent: 'Europe', popularity: 98, estimatedCost: 150, currency: 'EUR', timezone: 'Europe/Paris', lat: 48.8566, lng: 2.3522, imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', description: 'The City of Light — iconic Eiffel Tower, world-class cuisine, and art.' },
    { name: 'Tokyo', country: 'Japan', region: 'Kanto', continent: 'Asia', popularity: 97, estimatedCost: 120, currency: 'JPY', timezone: 'Asia/Tokyo', lat: 35.6762, lng: 139.6503, imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', description: 'Where tradition meets futurism — temples, anime, sushi, and neon lights.' },
    { name: 'New York City', country: 'USA', region: 'New York', continent: 'North America', popularity: 96, estimatedCost: 200, currency: 'USD', timezone: 'America/New_York', lat: 40.7128, lng: -74.0060, imageUrl: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=800', description: 'The Big Apple — Times Square, Central Park, and endless culture.' },
    { name: 'Rome', country: 'Italy', region: 'Lazio', continent: 'Europe', popularity: 94, estimatedCost: 130, currency: 'EUR', timezone: 'Europe/Rome', lat: 41.9028, lng: 12.4964, imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800', description: 'The Eternal City — Colosseum, Vatican, and incredible Italian food.' },
    { name: 'Bali', country: 'Indonesia', region: 'Bali', continent: 'Asia', popularity: 93, estimatedCost: 60, currency: 'IDR', timezone: 'Asia/Makassar', lat: -8.3405, lng: 115.0920, imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', description: 'Island of gods — rice terraces, temples, beaches, and spiritual retreat.' },
    { name: 'Barcelona', country: 'Spain', region: 'Catalonia', continent: 'Europe', popularity: 92, estimatedCost: 120, currency: 'EUR', timezone: 'Europe/Madrid', lat: 41.3851, lng: 2.1734, imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800', description: 'Gaudí architecture, vibrant nightlife, and stunning Mediterranean beaches.' },
    { name: 'Dubai', country: 'UAE', region: 'Dubai', continent: 'Asia', popularity: 91, estimatedCost: 180, currency: 'AED', timezone: 'Asia/Dubai', lat: 25.2048, lng: 55.2708, imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', description: 'Futuristic skylines, luxury shopping, and desert adventures.' },
    { name: 'Santorini', country: 'Greece', region: 'South Aegean', continent: 'Europe', popularity: 90, estimatedCost: 160, currency: 'EUR', timezone: 'Europe/Athens', lat: 36.3932, lng: 25.4615, imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', description: 'Iconic white-washed cliffs, blue domes, and breathtaking sunsets.' },
    { name: 'Machu Picchu', country: 'Peru', region: 'Cusco', continent: 'South America', popularity: 89, estimatedCost: 80, currency: 'PEN', timezone: 'America/Lima', lat: -13.1631, lng: -72.5450, imageUrl: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800', description: 'Ancient Incan citadel perched high in the Andes mountains.' },
    { name: 'Sydney', country: 'Australia', region: 'New South Wales', continent: 'Oceania', popularity: 88, estimatedCost: 170, currency: 'AUD', timezone: 'Australia/Sydney', lat: -33.8688, lng: 151.2093, imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800', description: 'Opera House, Harbour Bridge, and beautiful coastal beaches.' },
    { name: 'Amsterdam', country: 'Netherlands', region: 'North Holland', continent: 'Europe', popularity: 87, estimatedCost: 140, currency: 'EUR', timezone: 'Europe/Amsterdam', lat: 52.3676, lng: 4.9041, imageUrl: 'https://images.unsplash.com/photo-1576924542622-772281b13ea3?w=800', description: 'Canal rings, world-class museums, and a cycling paradise.' },
    { name: 'Kyoto', country: 'Japan', region: 'Kansai', continent: 'Asia', popularity: 86, estimatedCost: 100, currency: 'JPY', timezone: 'Asia/Tokyo', lat: 35.0116, lng: 135.7681, imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', description: 'Ancient temples, geisha districts, and stunning bamboo forests.' },
  ];

  for (const dest of destinations) {
    await prisma.destination.upsert({
      where: { id: dest.name.toLowerCase().replace(/\s/g, '-') },
      update: dest,
      create: { id: dest.name.toLowerCase().replace(/\s/g, '-'), ...dest },
    });
  }

  // Create demo trip for demo user
  const existingTrip = await prisma.trip.findFirst({ where: { userId: demoUser.id } });
  if (!existingTrip) {
    const trip = await prisma.trip.create({
      data: {
        userId: demoUser.id,
        name: 'European Dream Tour 2024',
        description: 'A magical journey through Europe\'s most iconic cities — Paris, Rome, and Barcelona.',
        startDate: new Date('2024-06-15'),
        endDate: new Date('2024-06-30'),
        status: 'PLANNED',
        tags: ['Europe', 'Culture', 'Food', 'Art'],
        coverImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
        budget: {
          create: {
            totalBudget: 5000,
            currency: 'USD',
            expenses: [
              { category: 'Flights', amount: 1200, date: '2024-05-01', note: 'Round trip flights' },
              { category: 'Accommodation', amount: 1800, date: '2024-05-15', note: 'Hotels' },
              { category: 'Food', amount: 600, date: '2024-06-15', note: 'Estimated food budget' },
            ],
            categories: {
              Flights: 1200,
              Accommodation: 1800,
              Food: 600,
              Activities: 400,
              Transport: 300,
              Shopping: 700,
            },
          },
        },
        stops: {
          create: [
            {
              destinationId: 'paris',
              order: 1,
              startDate: new Date('2024-06-15'),
              endDate: new Date('2024-06-20'),
              notes: 'Must see the Eiffel Tower at night!',
              activities: {
                create: [
                  { name: 'Eiffel Tower Visit', category: 'Sightseeing', cost: 26, duration: 180, time: '10:00', description: 'Visit the iconic iron tower, consider going to the top floor.' },
                  { name: 'Louvre Museum', category: 'Culture', cost: 17, duration: 240, time: '14:00', description: 'World\'s largest art museum. Book tickets in advance!' },
                  { name: 'Seine River Cruise', category: 'Experience', cost: 15, duration: 60, time: '20:00', description: 'Evening cruise along the Seine with city lights.' },
                ],
              },
            },
            {
              destinationId: 'rome',
              order: 2,
              startDate: new Date('2024-06-20'),
              endDate: new Date('2024-06-25'),
              notes: 'Book Colosseum tickets well in advance!',
              activities: {
                create: [
                  { name: 'Colosseum & Roman Forum', category: 'History', cost: 18, duration: 300, time: '09:00', description: 'Ancient amphitheater, one of the greatest architectural achievements.' },
                  { name: 'Vatican Museums & Sistine Chapel', category: 'Culture', cost: 20, duration: 240, time: '14:00', description: 'Michelangelo\'s masterpiece ceiling painting.' },
                  { name: 'Authentic Pizza & Gelato Tour', category: 'Food', cost: 35, duration: 180, time: '19:00', description: 'Walking food tour through Rome\'s best eateries.' },
                ],
              },
            },
            {
              destinationId: 'barcelona',
              order: 3,
              startDate: new Date('2024-06-25'),
              endDate: new Date('2024-06-30'),
              notes: 'Sagrada Família is a must-see!',
              activities: {
                create: [
                  { name: 'Sagrada Família', category: 'Architecture', cost: 26, duration: 180, time: '10:00', description: 'Gaudí\'s unfinished masterpiece basilica.' },
                  { name: 'Park Güell', category: 'Sightseeing', cost: 10, duration: 120, time: '15:00', description: 'Colorful mosaic park with panoramic city views.' },
                  { name: 'La Boqueria Market', category: 'Food', cost: 20, duration: 90, time: '11:00', description: 'Famous public market with fresh produce and tapas.' },
                ],
              },
            },
          ],
        },
        packingItems: {
          create: [
            { name: 'Passport', category: 'Documents', packed: true },
            { name: 'Travel Insurance', category: 'Documents', packed: true },
            { name: 'Euros', category: 'Money', packed: false },
            { name: 'Universal Power Adapter', category: 'Electronics', packed: false },
            { name: 'Camera', category: 'Electronics', packed: true },
            { name: 'Comfortable Walking Shoes', category: 'Clothing', packed: false },
            { name: 'Light Jacket', category: 'Clothing', packed: false },
            { name: 'Sunscreen SPF 50', category: 'Health', packed: false },
            { name: 'Travel Pillow', category: 'Comfort', packed: false },
            { name: 'Portable Charger', category: 'Electronics', packed: true },
          ],
        },
      },
    });

    // Add notes to the trip
    await prisma.note.createMany({
      data: [
        {
          tripId: trip.id,
          userId: demoUser.id,
          title: 'Trip Planning Notes',
          content: '<p>So excited for this European adventure! Need to remember to check visa requirements and get travel insurance sorted before departure. Also, exchange some euros at a good rate.</p>',
          mood: '😄',
        },
        {
          tripId: trip.id,
          userId: demoUser.id,
          title: 'Paris Tips from Friends',
          content: '<p>Sarah recommended the <strong>Marais district</strong> for the best falafel. Also said to avoid tourist traps near the Eiffel Tower for food — walk 5 minutes away for better prices.</p><ul><li>Metro is easy to use</li><li>Museum Pass is worth it</li><li>Learn a few French phrases</li></ul>',
          mood: '✈️',
        },
      ],
    });
  }

  // Create a second trip for the demo user
  const existingTrip2 = await prisma.trip.findFirst({ where: { userId: demoUser.id, name: 'Bali Retreat' } });
  if (!existingTrip2) {
    await prisma.trip.create({
      data: {
        userId: demoUser.id,
        name: 'Bali Retreat',
        description: 'A serene spiritual retreat in the Island of Gods.',
        startDate: new Date('2024-09-10'),
        endDate: new Date('2024-09-20'),
        status: 'DRAFT',
        tags: ['Asia', 'Wellness', 'Beach', 'Culture'],
        coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
        budget: {
          create: {
            totalBudget: 2000,
            currency: 'USD',
            expenses: [],
            categories: { Flights: 800, Accommodation: 600, Food: 300, Activities: 200, Transport: 100 },
          },
        },
        stops: {
          create: [
            {
              destinationId: 'bali',
              order: 1,
              startDate: new Date('2024-09-10'),
              endDate: new Date('2024-09-20'),
              activities: {
                create: [
                  { name: 'Ubud Monkey Forest', category: 'Nature', cost: 5, duration: 120, time: '09:00' },
                  { name: 'Tegallalang Rice Terraces', category: 'Sightseeing', cost: 3, duration: 90, time: '07:00' },
                  { name: 'Traditional Balinese Cooking Class', category: 'Food', cost: 35, duration: 240, time: '10:00' },
                  { name: 'Sunrise Yoga at Campuhan Ridge', category: 'Wellness', cost: 0, duration: 90, time: '06:00' },
                ],
              },
            },
          ],
        },
        packingItems: {
          create: [
            { name: 'Passport', category: 'Documents', packed: false },
            { name: 'Sarong (required at temples)', category: 'Clothing', packed: false },
            { name: 'Mosquito Repellent', category: 'Health', packed: false },
            { name: 'Sunscreen', category: 'Health', packed: false },
          ],
        },
      },
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('👤 Demo credentials: demo@traveloop.com / demo123');
  console.log('🔑 Admin credentials: admin@traveloop.com / admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
