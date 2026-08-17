import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Updating store branding to APEX STUDIO (Concept 4)...");

  const store = await prisma.store.findFirst();

  const apexMetadata = {
    announcementBar: {
      enabled: true,
      text: "⚡ SEASON 2026 DROP 01 LIVE • USE CODE: DROP20 FOR 20% OFF • FREE EXPRESS SHIPPING OVER $50",
      linkUrl: "/store",
      bgColor: "#09090b",
      textColor: "#ffffff",
    },
    heroBanner: {
      headline: "ENGINEERED FOR UNCOMPROMISED PERFORMANCE",
      subheadline: "Precision tailoring meets technical fabrics. Designed for durability, movement, and effortless everyday style.",
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
        name: "APEX STUDIO",
        homepageTitle: "APEX STUDIO - Engineered Performance & Streetwear",
        homepageDescription: "Engineered for uncompromised performance and timeless daily wear.",
        metadata: apexMetadata,
      },
    });
    console.log("Successfully updated existing store to APEX STUDIO!");
  } else {
    console.log("No store found to update.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
