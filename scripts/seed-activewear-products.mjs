import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ACTIVEWEAR_PRODUCTS = [
  {
    handle: "penrose-triangle-tshirt",
    title: "Core Studio Performance Tee",
    subtitle: "4-Way Stretch • Moisture-Wicking Antimicrobial Fabric",
  },
  {
    handle: "eschers-staircase-hoodie",
    title: "Heavyweight Oversized French Terry Hoodie",
    subtitle: "480 GSM Organic Cotton • Double-Layer Hood",
  },
  {
    handle: "mobius-strip-scarf",
    title: "Merino Wool Thermal Neck Gaiter",
    subtitle: "100% ZQ-Certified New Zealand Merino Wool",
  },
  {
    handle: "fibonacci-spiral-crop-top",
    title: "Aura Seamless Ribbed Crop Top",
    subtitle: "Medium Support • Second-Skin Sculpt Fit",
  },
  {
    handle: "quantum-entanglement-socks",
    title: "All-Day Performance Crew Socks (3-Pack)",
    subtitle: "Arch Support Cushioning • Breathable Mesh",
  },
  {
    handle: "schrodingers-cat-tank-top",
    title: "Motion Sculpt Ribbed Tank Top",
    subtitle: "Buttery-Soft Ribbed Knit • Racerback Design",
  },
  {
    handle: "klein-bottle-beanie",
    title: "Merino Wool Ribbed Studio Beanie",
    subtitle: "Temperature Regulating • Zero-Itch Softness",
  },
  {
    handle: "paradox-puzzle-sweater",
    title: "Heavyweight Knit Crewneck Sweater",
    subtitle: "500 GSM Carded Cotton • Relaxed Athletic Drape",
  },
  {
    handle: "heisenberg-uncertainty-joggers",
    title: "Velocity Tapered Training Joggers",
    subtitle: "Water-Repellent DWR Finish • Ankle Zippers",
  },
  {
    handle: "mandelbrot-set-infinity-shawl",
    title: "Studio Layering Recovery Wrap",
    subtitle: "Ultra-Lightweight Modal Blend • Post-Workout Comfort",
  },
];

async function main() {
  console.log("Updating store branding to APEX ATHLETICS (Alo / Gymshark / Allbirds)...");

  const store = await prisma.store.findFirst();

  const activewearMetadata = {
    announcementBar: {
      enabled: true,
      text: "⚡ NEW SEASON DROP 01 LIVE • USE CODE: DROP20 FOR 20% OFF • FREE EXPRESS SHIPPING OVER $50",
      linkUrl: "/store",
      bgColor: "#09090b",
      textColor: "#ffffff",
    },
    heroBanner: {
      headline: "ENGINEERED FOR UNCOMPROMISED MOVEMENT",
      subheadline: "Premium activewear, seamless ribbed leggings, and heavyweight hoodies engineered for studio workouts, running, and elevated daily wear.",
      badgeText: "SEASON 2026 DROP 01 LIVE",
      primaryCtaText: "Shop New Releases",
      primaryCtaLink: "/store",
      secondaryCtaText: "Explore Best Sellers",
      secondaryCtaLink: "/store",
      bgImageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1920&q=85",
      overlayOpacity: 0.6,
    },
    marquee: {
      enabled: true,
    },
    testimonials: {
      enabled: true,
    },
    trustBadges: {
      enabled: true,
    },
  };

  if (store) {
    await prisma.store.update({
      where: { id: store.id },
      data: {
        name: "APEX ATHLETICS",
        homepageTitle: "APEX ATHLETICS — Performance Activewear & Studio Apparel",
        homepageDescription: "Engineered activewear, seamless leggings, oversized hoodies, and technical layers for high-velocity movement.",
        metadata: activewearMetadata,
      },
    });
    console.log("Updated store record to APEX ATHLETICS!");
  }

  console.log("Updating products to activewear catalog...");
  for (const item of ACTIVEWEAR_PRODUCTS) {
    const existing = await prisma.product.findUnique({
      where: { handle: item.handle },
    });

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          title: item.title,
          subtitle: item.subtitle,
        },
      });
      console.log(`Updated product: ${item.title} (${item.handle})`);
    }
  }

  // Update Collection Titles
  const collections = await prisma.collection.findMany();
  for (const col of collections) {
    let newTitle = col.title;
    if (col.handle.includes('hoodie') || col.title.toLowerCase().includes('hoodie')) {
      newTitle = "Hoodies & Sweatshirts";
    } else if (col.handle.includes('tshirt') || col.title.toLowerCase().includes('t-shirt')) {
      newTitle = "Performance Tees & Tops";
    } else if (col.handle.includes('accessories') || col.title.toLowerCase().includes('accessories')) {
      newTitle = "Training Accessories";
    } else {
      newTitle = "New Season Active Drops";
    }

    await prisma.collection.update({
      where: { id: col.id },
      data: { title: newTitle }
    });
    console.log(`Updated collection: ${newTitle}`);
  }

  // Update Category Titles
  const categories = await prisma.productCategory.findMany();
  for (const cat of categories) {
    let newTitle = cat.title;
    if (cat.handle.includes('clothing') || cat.title.toLowerCase().includes('clothing')) {
      newTitle = "Activewear & Apparel";
    } else if (cat.handle.includes('accessories') || cat.title.toLowerCase().includes('accessories')) {
      newTitle = "Headwear & Gear";
    }

    await prisma.productCategory.update({
      where: { id: cat.id },
      data: { title: newTitle }
    });
    console.log(`Updated category: ${newTitle}`);
  }

  console.log("Activewear catalog seed completed successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
