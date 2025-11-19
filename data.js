/* * DATA.JS
 * Berisi semua data statis untuk StyleMatch:
 * - Style Dictionary
 * - Color Palettes
 * - Mix Items
 * - Quiz Questions
 * - Gacha Pool
 */

const APP_DATA = {
  // 1. Style Dictionary Data
  styles: [
    { 
      id: 's1', 
      name: 'Korean Minimalist', 
      category: 'modern', 
      img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80', 
      desc: 'Gaya fashion Korea yang mengutamakan kesederhanaan, warna netral (beige, cream, putih), dan siluet oversized yang nyaman namun rapi.',
      tags: ['daily', 'campus', 'cafe'],
      keyItems: ['Oversized Blazer', 'Wide Leg Pants', 'White Sneakers']
    },
    { 
      id: 's2', 
      name: 'Y2K Aesthetic', 
      category: 'trendy', 
      img: 'https://images.unsplash.com/photo-1610384104075-e05c8cf200c3?auto=format&fit=crop&w=800&q=80', 
      desc: 'Tren fashion awal tahun 2000-an yang kembali viral. Identik dengan warna cerah, crop top, low-rise jeans, dan aksesori playful.',
      tags: ['party', 'hangout', 'viral'],
      keyItems: ['Baby Tee', 'Mini Skirt', 'Chunky Shoes']
    },
    { 
      id: 's3', 
      name: 'Old Money / Quiet Luxury', 
      category: 'classic', 
      img: 'https://images.unsplash.com/photo-1548539896-2d9144c4c9d4?auto=format&fit=crop&w=800&q=80', 
      desc: 'Estetika klasik orang kaya lama. Fokus pada kualitas bahan, warna netral gelap/earthy, dan tanpa logo besar.',
      tags: ['formal', 'luxury', 'timeless'],
      keyItems: ['Polo Shirt', 'Loafers', 'Linen Trousers']
    },
    { 
      id: 's4', 
      name: 'Streetwear Hype', 
      category: 'street', 
      img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', 
      desc: 'Gaya urban yang dipengaruhi budaya skate dan hip-hop. Mengutamakan hoodie, sneakers hype, dan layering.',
      tags: ['outdoor', 'cool', 'hype'],
      keyItems: ['Hoodie', 'Cargo Pants', 'High-top Sneakers']
    },
    { 
      id: 's5', 
      name: 'Cottagecore', 
      category: 'aesthetic', 
      img: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80', 
      desc: 'Romantisasi kehidupan pedesaan. Identik dengan dress bunga-bunga, bahan katun/linen, dan warna pastel lembut.',
      tags: ['picnic', 'soft', 'feminine'],
      keyItems: ['Floral Dress', 'Straw Hat', 'Cardigan']
    },
    { 
      id: 's6', 
      name: 'Techwear', 
      category: 'street', 
      img: 'https://images.unsplash.com/photo-1523396870177-b7b422037374?auto=format&fit=crop&w=800&q=80', 
      desc: 'Fashion futuristik yang mengutamakan fungsi (utility). Banyak saku, warna hitam/abu gelap, dan bahan tahan air.',
      tags: ['utility', 'dark', 'future'],
      keyItems: ['Windbreaker', 'Utility Vest', 'Combat Boots']
    }
  ],

  // 2. Color Palettes
  palettes: [
    { 
      id: 'sunset', 
      name: 'Pink → Blue (Sunset)', 
      colors: ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb'], 
      desc: 'Gradasi romantis seperti langit sore. Cocok untuk vibe feminin dan soft.',
      matchStyle: 'Cottagecore / Korean Soft'
    },
    { 
      id: 'ocean', 
      name: 'Ocean Breeze', 
      colors: ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'], 
      desc: 'Segar dan menenangkan. Kombinasi biru ke hijau.',
      matchStyle: 'Summer Casual / Sporty'
    },
    { 
      id: 'earth', 
      name: 'Earth Tones', 
      colors: ['#d4fc79', '#96e6a1', '#84fab0', '#8fd3f4'],
      desc: 'Warna alam yang natural. Sangat cocok untuk kulit sawo matang.',
      matchStyle: 'Old Money / Casual'
    },
    { 
      id: 'mono', 
      name: 'Monochrome Dark', 
      colors: ['#232526', '#414345', '#536976', '#292E49'], 
      desc: 'Elegan, misterius, dan tegas. Pilihan aman untuk tampil cool.',
      matchStyle: 'Streetwear / Techwear'
    },
    { 
      id: 'pastel', 
      name: 'Unicorn Pastel', 
      colors: ['#e0c3fc', '#8ec5fc', '#ffdee9', '#b5fffc'], 
      desc: 'Ceria dan muda. Kombinasi warna permen.',
      matchStyle: 'Y2K / Cute'
    }
  ],

  // 3. Mix & Match Items
  mixItems: [
    { id: 't1', slot: 'top', name: 'White Tee', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=60' },
    { id: 't2', slot: 'top', name: 'Black Hoodie', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=60' },
    { id: 't3', slot: 'top', name: 'Flannel Shirt', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=60' },
    { id: 'b1', slot: 'bottom', name: 'Blue Jeans', img: 'https://images.unsplash.com/photo-1542272617-08f08637533d?auto=format&fit=crop&w=400&q=60' },
    { id: 'b2', slot: 'bottom', name: 'Cargo Pants', img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=60' },
    { id: 'b3', slot: 'bottom', name: 'Mini Skirt', img: 'https://images.unsplash.com/photo-1582142407894-ec85f1260a46?auto=format&fit=crop&w=400&q=60' },
    { id: 's1', slot: 'shoes', name: 'Sneakers', img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=60' },
    { id: 's2', slot: 'shoes', name: 'Boots', img: 'https://images.unsplash.com/photo-1608256246200-53e635b5b69f?auto=format&fit=crop&w=400&q=60' },
    { id: 'a1', slot: 'acc', name: 'Cap', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89d?auto=format&fit=crop&w=400&q=60' },
    { id: 'a2', slot: 'acc', name: 'Tote Bag', img: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=400&q=60' }
  ],

  // 4. Quiz Data
  quizQs: [
    { q: 'Apa warna favoritmu?', opts: ['Pastel / Soft', 'Hitam / Gelap', 'Earth Tone (Coklat/Cream)', 'Neon / Cerah'] },
    { q: 'Dimana kamu biasa nongkrong?', opts: ['Cafe Aesthetic', 'Concert / Club', 'Taman / Alam', 'Mall / Kota'] },
    { q: 'Pilih satu item wajib:', opts: ['Cardigan Rajut', 'Leather Jacket', 'Kemeja Linen', 'Oversized T-shirt'] },
    { q: 'Bagaimana kepribadianmu?', opts: ['Kalem & Pemalu', 'Berani & Edgy', 'Dewasa & Elegan', 'Santai & Asik'] },
    { q: 'Siapa icon style kamu?', opts: ['Idol K-Pop', 'Rockstar', 'Old Hollywood', 'Street Skater'] }
  ],

  // 5. Gacha Pool
  gachaPool: [
    { gender: 'female', name: 'Date Night Chic', desc: 'Slip dress + Heels + Clutch' },
    { gender: 'female', name: 'Campus Casual', desc: 'Jeans + Tote bag + Sweater' },
    { gender: 'female', name: 'Office Lady', desc: 'Blazer + Culottes + Loafers' },
    { gender: 'male', name: 'Coffee Run', desc: 'Shorts + Hoodie + Slides' },
    { gender: 'male', name: 'Friday Night', desc: 'Leather Jacket + Black Jeans + Boots' },
    { gender: 'male', name: 'Smart Casual', desc: 'Polo Shirt + Chinos + White Sneakers' }
  ]
};