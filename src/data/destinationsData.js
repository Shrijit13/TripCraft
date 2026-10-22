export const DESTINATIONS_DATA = [
  {
    id: 'dest-1',
    name: 'Bali',
    country: 'Indonesia',
    category: 'Beaches',
    description: 'Tropical paradise renowned for forested volcanic mountains, iconic rice paddies, beaches and coral reefs.',
    baseCost: 45000,
    rating: 4.9,
    reviewsCount: 1420,
    coordinates: { lat: -8.4095, lng: 115.1889 },
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    tags: ['Beaches', 'Tropical', 'Culture', 'Temples'],
    defaultActivities: [
      { id: 'act-101', name: 'Tanah Lot Sunset Tour', category: 'Sightseeing', cost: 3500, duration: '4 hrs', day: 1 },
      { id: 'act-102', name: 'Ubud Rice Terrace & Swing', category: 'Adventure', cost: 4200, duration: '5 hrs', day: 2 },
      { id: 'act-103', name: 'Nusa Penida Snorkeling Day Trip', category: 'Watersports', cost: 6800, duration: '8 hrs', day: 3 },
      { id: 'act-104', name: 'Traditional Balinese Spa & Massage', category: 'Wellness', cost: 2500, duration: '2 hrs', day: 4 }
    ]
  },
  {
    id: 'dest-2',
    name: 'Manali',
    country: 'India',
    category: 'Mountains',
    description: 'High-altitude Himalayan resort town known as a backpacking center and honeymoon destination in Himachal Pradesh.',
    baseCost: 32000,
    rating: 4.8,
    reviewsCount: 2310,
    coordinates: { lat: 32.2432, lng: 77.1892 },
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Snow', 'Adventure', 'Nature'],
    defaultActivities: [
      { id: 'act-201', name: 'Solang Valley Paragliding', category: 'Adventure', cost: 3500, duration: '3 hrs', day: 1 },
      { id: 'act-202', name: 'Rohtang Pass Snow Scooter & Skiing', category: 'Adventure', cost: 5500, duration: '6 hrs', day: 2 },
      { id: 'act-203', name: 'Old Manali Cafe Crawl & Hadimba Temple', category: 'Culture', cost: 1800, duration: '4 hrs', day: 3 }
    ]
  },
  {
    id: 'dest-3',
    name: 'Rome',
    country: 'Italy',
    category: 'Historical',
    description: 'Sprawling cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display.',
    baseCost: 85000,
    rating: 4.9,
    reviewsCount: 3105,
    coordinates: { lat: 41.9028, lng: 12.4964 },
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    tags: ['Historical', 'Architecture', 'Food', 'Museums'],
    defaultActivities: [
      { id: 'act-301', name: 'Colosseum & Roman Forum Guided Walk', category: 'Historical', cost: 6200, duration: '4 hrs', day: 1 },
      { id: 'act-302', name: 'Vatican Museums & Sistine Chapel', category: 'Sightseeing', cost: 7500, duration: '5 hrs', day: 2 },
      { id: 'act-303', name: 'Trastevere Food & Wine Walking Tour', category: 'Culinary', cost: 5400, duration: '3 hrs', day: 3 }
    ]
  },
  {
    id: 'dest-4',
    name: 'Dubai',
    country: 'UAE',
    category: 'Cities',
    description: 'Ultra-modern city known for luxury shopping, futuristic architecture and a lively nightlife scene in the Persian Gulf.',
    baseCost: 70000,
    rating: 4.7,
    reviewsCount: 1980,
    coordinates: { lat: 25.2048, lng: 55.2708 },
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    tags: ['Cities', 'Luxury', 'Desert', 'Shopping'],
    defaultActivities: [
      { id: 'act-401', name: 'Burj Khalifa At the Top Observation', category: 'Sightseeing', cost: 5800, duration: '2 hrs', day: 1 },
      { id: 'act-402', name: 'Evening Desert Safari with BBQ Dinner', category: 'Adventure', cost: 6500, duration: '6 hrs', day: 2 },
      { id: 'act-403', name: 'Dubai Marina Luxury Yacht Cruise', category: 'Leisure', cost: 7200, duration: '3 hrs', day: 3 }
    ]
  },
  {
    id: 'dest-5',
    name: 'Singapore',
    country: 'Singapore',
    category: 'Cities',
    description: 'Global financial hub renowned for tropical flora, Marina Bay Sands, futuristic supertrees, and diverse street food.',
    baseCost: 60000,
    rating: 4.8,
    reviewsCount: 2240,
    coordinates: { lat: 1.3521, lng: 103.8198 },
    imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    tags: ['Cities', 'Modern', 'Gardens', 'Family'],
    defaultActivities: [
      { id: 'act-501', name: 'Gardens by the Bay & Flower Dome', category: 'Sightseeing', cost: 4200, duration: '4 hrs', day: 1 },
      { id: 'act-502', name: 'Universal Studios Sentosa Island Pass', category: 'Entertainment', cost: 8400, duration: '7 hrs', day: 2 },
      { id: 'act-503', name: 'Night Safari Tram Ride & Trail', category: 'Wildlife', cost: 4800, duration: '3 hrs', day: 3 }
    ]
  },
  {
    id: 'dest-6',
    name: 'Tokyo',
    country: 'Japan',
    category: 'Cities',
    description: 'Bustling metropolis blending ultramodern neon-lit skyscrapers with historic temples and world-class culinary experiences.',
    baseCost: 95000,
    rating: 4.9,
    reviewsCount: 4210,
    coordinates: { lat: 35.6762, lng: 139.6503 },
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    tags: ['Cities', 'Culture', 'Technology', 'Food'],
    defaultActivities: [
      { id: 'act-601', name: 'Shibuya Crossing & Harajuku Culture Tour', category: 'Sightseeing', cost: 3800, duration: '4 hrs', day: 1 },
      { id: 'act-602', name: 'Mount Fuji & Lake Kawaguchiko Day Trip', category: 'Nature', cost: 8900, duration: '9 hrs', day: 2 },
      { id: 'act-603', name: 'teamLab Planets Digital Art Exhibition', category: 'Art', cost: 4100, duration: '3 hrs', day: 3 }
    ]
  },
  {
    id: 'dest-7',
    name: 'Interlaken',
    country: 'Switzerland',
    category: 'Mountains',
    description: 'Traditional resort town nestled in the Bernese Oberland region, surrounded by alpine peaks, lakes, and meadows.',
    baseCost: 120000,
    rating: 4.9,
    reviewsCount: 1530,
    coordinates: { lat: 46.6863, lng: 7.8632 },
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Scenic', 'Alpine', 'Hiking'],
    defaultActivities: [
      { id: 'act-701', name: 'Jungfraujoch - Top of Europe Cogwheel Train', category: 'Sightseeing', cost: 18500, duration: '7 hrs', day: 1 },
      { id: 'act-702', name: 'Lake Brienz Kayak & Waterfall Tour', category: 'Adventure', cost: 7200, duration: '4 hrs', day: 2 }
    ]
  },
  {
    id: 'dest-8',
    name: 'Cairo',
    country: 'Egypt',
    category: 'Historical',
    description: 'Egypt’s sprawling capital on the Nile river, home to the Great Pyramids of Giza and ancient pharaonic treasures.',
    baseCost: 55000,
    rating: 4.6,
    reviewsCount: 1820,
    coordinates: { lat: 30.0444, lng: 31.2357 },
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80',
    tags: ['Historical', 'Pyramids', 'Culture', 'Heritage'],
    defaultActivities: [
      { id: 'act-801', name: 'Giza Pyramids & Sphinx Camel Trek', category: 'Historical', cost: 5200, duration: '5 hrs', day: 1 },
      { id: 'act-802', name: 'Grand Egyptian Museum Guided Tour', category: 'Museums', cost: 4400, duration: '4 hrs', day: 2 },
      { id: 'act-803', name: 'Nile Dinner Cruise with Folkloric Show', category: 'Culinary', cost: 4800, duration: '3 hrs', day: 3 }
    ]
  }
];

export const CATEGORIES = ['All', 'Beaches', 'Mountains', 'Cities', 'Adventure', 'Historical'];
