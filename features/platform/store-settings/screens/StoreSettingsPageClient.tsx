'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LOGO_ICONS, HUE_PRESETS } from '../lib/icon-registry';
import { updateStoreSettings } from '../actions';
import { toast } from 'sonner';
import Link from 'next/link';
import {
  Palette,
  Megaphone,
  LayoutTemplate,
  Sparkles,
  Save,
  Store as StoreIcon,
  Activity,
  ArrowRight,
} from 'lucide-react';

interface StoreSettingsPageClientProps {
  initialData: {
    id: string;
    name: string;
    logoIcon: string;
    logoColor: string;
    homepageTitle: string;
    homepageDescription: string;
    metadata?: any;
  } | null;
  initialError: string | null;
}

export function StoreSettingsPageClient({
  initialData,
  initialError,
}: StoreSettingsPageClientProps) {
  // Store Branding
  const [name, setName] = useState(initialData?.name || 'Openfront Store');
  const [logoIcon, setLogoIcon] = useState(
    initialData?.logoIcon || LOGO_ICONS[0].lightSvg
  );
  const [logoColor, setLogoColor] = useState(initialData?.logoColor || '0');

  // Metadata Configurations
  const metadata = initialData?.metadata || {};

  // Announcement Bar
  const [announcementEnabled, setAnnouncementEnabled] = useState(
    metadata.announcementBar?.enabled ?? true
  );
  const [announcementText, setAnnouncementText] = useState(
    metadata.announcementBar?.text ||
      '✨ Free express shipping on orders over $50 | 30-Day Money-Back Guarantee'
  );
  const [announcementLink, setAnnouncementLink] = useState(
    metadata.announcementBar?.linkUrl || '/store'
  );
  const [announcementBg, setAnnouncementBg] = useState(
    metadata.announcementBar?.bgColor || '#0f172a'
  );
  const [announcementTextCol, setAnnouncementTextCol] = useState(
    metadata.announcementBar?.textColor || '#ffffff'
  );

  // Hero Banner
  const [heroHeadline, setHeroHeadline] = useState(
    metadata.heroBanner?.headline ||
      initialData?.homepageTitle ||
      'Modern Commerce Engineered for Performance'
  );
  const [heroSubheadline, setHeroSubheadline] = useState(
    metadata.heroBanner?.subheadline ||
      initialData?.homepageDescription ||
      'Explore our latest collection crafted with premium materials and sustainable design.'
  );
  const [heroBadge, setHeroBadge] = useState(
    metadata.heroBanner?.badgeText || 'New Season Collection 2026'
  );
  const [heroPrimaryCtaText, setHeroPrimaryCtaText] = useState(
    metadata.heroBanner?.primaryCtaText || 'Explore Catalog'
  );
  const [heroPrimaryCtaLink, setHeroPrimaryCtaLink] = useState(
    metadata.heroBanner?.primaryCtaLink || '/store'
  );
  const [heroSecondaryCtaText, setHeroSecondaryCtaText] = useState(
    metadata.heroBanner?.secondaryCtaText || 'View Categories'
  );
  const [heroSecondaryCtaLink, setHeroSecondaryCtaLink] = useState(
    metadata.heroBanner?.secondaryCtaLink || '/categories'
  );
  const [heroBgImage, setHeroBgImage] = useState(
    metadata.heroBanner?.bgImageUrl ||
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80'
  );

  // Section Toggles
  const [marqueeEnabled, setMarqueeEnabled] = useState(
    metadata.marquee?.enabled ?? true
  );
  const [testimonialsEnabled, setTestimonialsEnabled] = useState(
    metadata.testimonials?.enabled ?? true
  );
  const [trustBadgesEnabled, setTrustBadgesEnabled] = useState(
    metadata.trustBadges?.enabled ?? true
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!initialData?.id) {
      toast.error('No store record found to update.');
      return;
    }

    setIsLoading(true);

    const updatedMetadata = {
      ...metadata,
      announcementBar: {
        enabled: announcementEnabled,
        text: announcementText,
        linkUrl: announcementLink,
        bgColor: announcementBg,
        textColor: announcementTextCol,
      },
      heroBanner: {
        headline: heroHeadline,
        subheadline: heroSubheadline,
        badgeText: heroBadge,
        primaryCtaText: heroPrimaryCtaText,
        primaryCtaLink: heroPrimaryCtaLink,
        secondaryCtaText: heroSecondaryCtaText,
        secondaryCtaLink: heroSecondaryCtaLink,
        bgImageUrl: heroBgImage,
      },
      marquee: {
        enabled: marqueeEnabled,
      },
      testimonials: {
        enabled: testimonialsEnabled,
      },
      trustBadges: {
        enabled: trustBadgesEnabled,
      },
    };

    const result = await updateStoreSettings(initialData.id, {
      name,
      logoIcon,
      logoColor,
      homepageTitle: heroHeadline,
      homepageDescription: heroSubheadline,
      metadata: updatedMetadata,
    });

    if (result.success) {
      toast.success('Store & Theme configuration published live successfully!');
    } else {
      toast.error(result.error || 'Failed to update store settings.');
    }
    setIsLoading(false);
  };

  if (initialError) {
    return (
      <div className="p-6">
        <div className="text-red-500 font-semibold">Error: {initialError}</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <StoreIcon className="w-6 h-6 text-blue-600" />
            Visual Theme & Storefront Customizer
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Customize branding, announcement banners, and modular homepage sections.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
        >
          <Save className="w-4 h-4" />
          {isLoading ? 'Publishing...' : 'Save & Publish Live'}
        </Button>
      </div>

      {/* Quick link banner to Integrations */}
      <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">Looking for Meta Pixel & Google Analytics tracking?</h4>
            <p className="text-xs text-muted-foreground">
              Manage ad attribution, GA4, TikTok Pixel, and marketing integrations under the Apps & Integrations hub.
            </p>
          </div>
        </div>

        <Button asChild variant="outline" size="sm" className="text-xs shrink-0 gap-1.5 border-blue-300">
          <Link href="/dashboard/platform/apps">
            <span>Manage Integrations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sections" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full sm:w-[480px] p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <TabsTrigger value="sections" className="gap-2 py-2.5">
            <LayoutTemplate className="w-4 h-4" />
            <span>Sections</span>
          </TabsTrigger>
          <TabsTrigger value="announcement" className="gap-2 py-2.5">
            <Megaphone className="w-4 h-4" />
            <span>Announcement</span>
          </TabsTrigger>
          <TabsTrigger value="branding" className="gap-2 py-2.5">
            <Palette className="w-4 h-4" />
            <span>Branding</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: HOMEPAGE SECTIONS */}
        <TabsContent value="sections" className="space-y-6">
          {/* Hero Banner Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Hero Banner Customization
              </CardTitle>
              <CardDescription>
                Configure the primary visual hero section at the top of your homepage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-badge">Badge Pill Text</Label>
                  <Input
                    id="hero-badge"
                    value={heroBadge}
                    onChange={(e) => setHeroBadge(e.target.value)}
                    placeholder="e.g. New Season Collection 2026"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero-bg">Background Image URL</Label>
                  <Input
                    id="hero-bg"
                    value={heroBgImage}
                    onChange={(e) => setHeroBgImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-headline">Main Headline</Label>
                <Input
                  id="hero-headline"
                  value={heroHeadline}
                  onChange={(e) => setHeroHeadline(e.target.value)}
                  placeholder="e.g. Modern Commerce Engineered for Performance"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-subheadline">Subheadline / Supporting Copy</Label>
                <Textarea
                  id="hero-subheadline"
                  value={heroSubheadline}
                  onChange={(e) => setHeroSubheadline(e.target.value)}
                  rows={2}
                  placeholder="e.g. Explore our latest collection crafted with premium materials."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
                <div className="space-y-2">
                  <Label htmlFor="primary-cta-text">Primary CTA Text</Label>
                  <Input
                    id="primary-cta-text"
                    value={heroPrimaryCtaText}
                    onChange={(e) => setHeroPrimaryCtaText(e.target.value)}
                    placeholder="e.g. Explore Catalog"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary-cta-link">Primary CTA Link</Label>
                  <Input
                    id="primary-cta-link"
                    value={heroPrimaryCtaLink}
                    onChange={(e) => setHeroPrimaryCtaLink(e.target.value)}
                    placeholder="e.g. /store"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary-cta-text">Secondary CTA Text</Label>
                  <Input
                    id="secondary-cta-text"
                    value={heroSecondaryCtaText}
                    onChange={(e) => setHeroSecondaryCtaText(e.target.value)}
                    placeholder="e.g. View Categories"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-cta-link">Secondary CTA Link</Label>
                  <Input
                    id="secondary-cta-link"
                    value={heroSecondaryCtaLink}
                    onChange={(e) => setHeroSecondaryCtaLink(e.target.value)}
                    placeholder="e.g. /categories"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section Toggles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Modular Section Controls</CardTitle>
              <CardDescription>
                Enable or disable additional conversion sections on your homepage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold">Infinite Marquee USP Ticker</Label>
                  <p className="text-xs text-muted-foreground">
                    Displays scrolling trust points (Fast Shipping, 30-Day Returns, SSL Checkout).
                  </p>
                </div>
                <Switch
                  checked={marqueeEnabled}
                  onCheckedChange={setMarqueeEnabled}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold">Customer Testimonials & Reviews</Label>
                  <p className="text-xs text-muted-foreground">
                    Displays verified buyer testimonials with 5-star ratings for social proof.
                  </p>
                </div>
                <Switch
                  checked={testimonialsEnabled}
                  onCheckedChange={setTestimonialsEnabled}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold">Trust & Security Guarantees</Label>
                  <p className="text-xs text-muted-foreground">
                    Highlights Worldwide Delivery, 256-bit SSL, Money-Back Guarantee, and 24/7 Support.
                  </p>
                </div>
                <Switch
                  checked={trustBadgesEnabled}
                  onCheckedChange={setTrustBadgesEnabled}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: ANNOUNCEMENT BAR */}
        <TabsContent value="announcement" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Top Announcement Bar</CardTitle>
                  <CardDescription>
                    Promote free shipping thresholds, discount codes, or seasonal announcements.
                  </CardDescription>
                </div>
                <Switch
                  checked={announcementEnabled}
                  onCheckedChange={setAnnouncementEnabled}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="announcement-text">Banner Text</Label>
                <Input
                  id="announcement-text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="e.g. Free express shipping on orders over $50 | Use code WELCOME10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="announcement-link">Click Action Link (Optional)</Label>
                <Input
                  id="announcement-link"
                  value={announcementLink}
                  onChange={(e) => setAnnouncementLink(e.target.value)}
                  placeholder="e.g. /store or /collections/featured"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="announcement-bg">Background Color</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      id="announcement-bg"
                      value={announcementBg}
                      onChange={(e) => setAnnouncementBg(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                    />
                    <Input
                      value={announcementBg}
                      onChange={(e) => setAnnouncementBg(e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="announcement-text-col">Text Color</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      id="announcement-text-col"
                      value={announcementTextCol}
                      onChange={(e) => setAnnouncementTextCol(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                    />
                    <Input
                      value={announcementTextCol}
                      onChange={(e) => setAnnouncementTextCol(e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="pt-4 border-t border-border">
                <Label className="text-xs text-muted-foreground mb-2 block">Live Preview</Label>
                <div
                  className="py-2.5 px-4 text-center text-xs font-semibold rounded-lg shadow-sm"
                  style={{ backgroundColor: announcementBg, color: announcementTextCol }}
                >
                  {announcementText || 'Announcement text preview'}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: BRANDING & LOGO */}
        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Store Identity & Visuals</CardTitle>
              <CardDescription>
                Update your store business name and visual logo accent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input
                  id="store-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Apex Apparel"
                />
              </div>

              {/* Logo Hue Presets */}
              <div className="space-y-3">
                <Label>Brand Accent Preset</Label>
                <div className="flex flex-wrap gap-2">
                  {HUE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setLogoColor(preset.hue.toString())}
                      className="px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: preset.color }}
                      />
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
