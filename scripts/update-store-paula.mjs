import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Updating store branding to Paula's Choice...");

  const store = await prisma.store.findFirst();

  const paulaMetadata = {
    announcementBar: {
      enabled: true,
      text: "✨ BEAUTY BEGINS WITH TRUTH | Use WELCOME10 for 10% off your first purchase • Free shipping over $50",
      linkUrl: "/store",
      bgColor: "#1c1917",
      textColor: "#ffffff",
    },
    heroBanner: {
      headline: "Smart, Safe & Science-Backed Skincare",
      subheadline: "Formulated with clinically proven active concentrations to transform your skin. 100% fragrance-free, cruelty-free, and backed by independent dermatological research.",
      badgeText: "BEAUTY BEGINS WITH TRUTH",
      primaryCtaText: "Shop Best Sellers",
      primaryCtaLink: "/store",
      secondaryCtaText: "Take Routine Quiz",
      secondaryCtaLink: "/store",
      bgImageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1920&q=85",
      overlayOpacity: 0.45,
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
        name: "PAULA'S CHOICE",
        homepageTitle: "Smart, Safe & Science-Backed Skincare",
        homepageDescription: "Formulated with clinically proven active concentrations. 100% fragrance-free, cruelty-free, and dermatologist tested.",
        metadata: paulaMetadata,
      },
    });
    console.log("Updated existing store to PAULA'S CHOICE!");
  } else {
    console.log("No store found to update.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
