'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Activity,
  CheckCircle2,
  Save,
  Globe,
  ShoppingBag,
  ExternalLink,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { updateMarketingIntegrations } from '../actions';
import { MarketplaceInstallDialog } from '../components/MarketplaceInstallDialog';

const AVAILABLE_APPS = [
  {
    id: 'openship-shop',
    title: 'Openship Shop',
    description: 'Connect to Openship to manage your orders and sync products from connected shops.',
    type: 'shop' as const,
    svgUrl: 'https://openship.org/images/integrations/openship.svg',
  },
  {
    id: 'openship-channel',
    title: 'Openship Channel',
    description: 'Allow Openship to use this store as a fulfillment channel for order processing.',
    type: 'channel' as const,
    svgUrl: 'https://openship.org/images/integrations/openship.svg',
  },
];

interface AppsPageClientProps {
  existingApps: any[];
  marketingData?: {
    storeId: string;
    analyticsConfig: {
      metaPixelId?: string;
      metaCapiToken?: string;
      googleAnalyticsId?: string;
      tiktokPixelId?: string;
      gtmId?: string;
      metaPixelEnabled?: boolean;
      gaEnabled?: boolean;
    };
  } | null;
}

export function AppsPageClient({ existingApps, marketingData }: AppsPageClientProps) {
  // Marketing Config State
  const initialConfig = marketingData?.analyticsConfig || {};
  const [metaPixelId, setMetaPixelId] = useState(initialConfig.metaPixelId || '');
  const [metaCapiToken, setMetaCapiToken] = useState(initialConfig.metaCapiToken || '');
  const [metaPixelEnabled, setMetaPixelEnabled] = useState(initialConfig.metaPixelEnabled ?? true);

  const [googleAnalyticsId, setGoogleAnalyticsId] = useState(initialConfig.googleAnalyticsId || '');
  const [gaEnabled, setGaEnabled] = useState(initialConfig.gaEnabled ?? true);

  const [tiktokPixelId, setTiktokPixelId] = useState(initialConfig.tiktokPixelId || '');
  const [gtmId, setGtmId] = useState(initialConfig.gtmId || '');

  const [isSaving, setIsSaving] = useState(false);
  const [installingApp, setInstallingApp] = useState<any | null>(null);

  const handleSaveMarketing = async () => {
    if (!marketingData?.storeId) {
      toast.error('Store record not found to save integrations.');
      return;
    }

    setIsSaving(true);
    const updated = {
      metaPixelId: metaPixelId.trim(),
      metaCapiToken: metaCapiToken.trim(),
      metaPixelEnabled,
      googleAnalyticsId: googleAnalyticsId.trim(),
      gaEnabled,
      tiktokPixelId: tiktokPixelId.trim(),
      gtmId: gtmId.trim(),
    };

    const res = await updateMarketingIntegrations(marketingData.storeId, updated);

    if (res.success) {
      toast.success('Marketing & Tracking Integrations published live!');
    } else {
      toast.error(res.error || 'Failed to save integrations.');
    }
    setIsSaving(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl">
      <Tabs defaultValue="marketing" className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 w-full sm:w-[480px] p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <TabsTrigger value="marketing" className="gap-2 py-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Marketing & Pixels</span>
          </TabsTrigger>
          <TabsTrigger value="omnichannel" className="gap-2 py-2">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>Fulfillment Apps</span>
          </TabsTrigger>
          <TabsTrigger value="developer" className="gap-2 py-2">
            <Globe className="w-4 h-4 text-slate-600" />
            <span>Custom OAuth</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: MARKETING & AD PIXELS */}
        <TabsContent value="marketing" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Marketing & Ad Attribution Pixels</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Connect Meta Pixel, Google Analytics 4, TikTok, and GTM for full-funnel e-commerce tracking.
              </p>
            </div>

            <Button
              onClick={handleSaveMarketing}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save & Publish Live'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Meta (Facebook) Pixel & CAPI Card */}
            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-lg">
                      f
                    </div>
                    <div>
                      <CardTitle className="text-base">Meta (Facebook) Pixel</CardTitle>
                      <CardDescription className="text-xs">
                        Tracks full-funnel ad conversions & ROAS
                      </CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={metaPixelEnabled}
                    onCheckedChange={setMetaPixelEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-1.5">
                  <Label htmlFor="meta-id" className="text-xs font-semibold">
                    Pixel ID
                  </Label>
                  <Input
                    id="meta-id"
                    value={metaPixelId}
                    onChange={(e) => setMetaPixelId(e.target.value)}
                    placeholder="e.g. 123456789012345"
                    className="font-mono text-xs"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Found in Meta Events Manager &rarr; Data Sources &rarr; Pixel ID.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="meta-capi" className="text-xs font-semibold">
                    Conversions API (CAPI) Token <span className="text-muted-foreground font-normal">(Optional)</span>
                  </Label>
                  <Input
                    id="meta-capi"
                    type="password"
                    value={metaCapiToken}
                    onChange={(e) => setMetaCapiToken(e.target.value)}
                    placeholder="EAAG..."
                    className="font-mono text-xs"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    For server-side deduplication against ad-blockers.
                  </p>
                </div>

                {/* Automated Tracking Status */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Active Standard Events:</span>
                    <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                      Full-Funnel
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>PageView</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>ViewContent</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>AddToCart</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>InitiateCheckout</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground col-span-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Purchase (Revenue, Tax, Shipping)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Analytics 4 (GA4) Card */}
            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 font-bold text-lg">
                      G
                    </div>
                    <div>
                      <CardTitle className="text-base">Google Analytics 4 (GA4)</CardTitle>
                      <CardDescription className="text-xs">
                        Enhanced e-commerce conversion tracking
                      </CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={gaEnabled}
                    onCheckedChange={setGaEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-1.5">
                  <Label htmlFor="ga4-id" className="text-xs font-semibold">
                    Measurement ID
                  </Label>
                  <Input
                    id="ga4-id"
                    value={googleAnalyticsId}
                    onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                    placeholder="e.g. G-XXXXXXXXXX"
                    className="font-mono text-xs"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Found in Google Analytics &rarr; Admin &rarr; Data Streams.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="gtm-id" className="text-xs font-semibold">
                    Google Tag Manager ID <span className="text-muted-foreground font-normal">(Optional)</span>
                  </Label>
                  <Input
                    id="gtm-id"
                    value={gtmId}
                    onChange={(e) => setGtmId(e.target.value)}
                    placeholder="e.g. GTM-XXXXXXX"
                    className="font-mono text-xs"
                  />
                </div>

                {/* GA4 e-commerce events */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">GA4 E-commerce Events:</span>
                    <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">
                      Enhanced Stream
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>page_view</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>view_item</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>add_to_cart</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>begin_checkout</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground col-span-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>purchase (with transaction ID)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TikTok Pixel Card */}
            <Card className="border-border md:col-span-2">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 font-bold text-lg">
                      TT
                    </div>
                    <div>
                      <CardTitle className="text-base">TikTok Ads Pixel</CardTitle>
                      <CardDescription className="text-xs">
                        Track viral TikTok shop campaigns and ad attribution
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="tiktok-id" className="text-xs font-semibold">
                      TikTok Pixel ID
                    </Label>
                    <Input
                      id="tiktok-id"
                      value={tiktokPixelId}
                      onChange={(e) => setTiktokPixelId(e.target.value)}
                      placeholder="e.g. CXXXXXXXXXXXXXXX"
                      className="font-mono text-xs"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    Enter your TikTok Pixel ID to automatically fire CompletePayment and AddToCart events from your campaigns.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 2: OMNICHANNEL & FULFILLMENT APPS */}
        <TabsContent value="omnichannel" className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Fulfillment & Marketplace Integrations</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sync orders, multi-warehouse routing, and third-party logistics through Openship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AVAILABLE_APPS.map((app) => (
              <Card key={app.id} className="p-6 border border-border flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <img src={app.svgUrl} alt={app.title} className="w-12 h-12" />
                  <div>
                    <h3 className="text-base font-bold text-foreground">{app.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{app.description}</p>
                  </div>
                </div>
                <Button
                  onClick={() => setInstallingApp(app)}
                  className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold"
                >
                  Configure Integration
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* TAB 3: DEVELOPER & OAUTH */}
        <TabsContent value="developer" className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Custom OAuth & API Applications</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage OAuth client credentials, custom webhooks, and private API keys.
            </p>
          </div>

          {existingApps.length === 0 ? (
            <Card className="p-12 text-center border-dashed">
              <p className="text-sm text-muted-foreground">No custom OAuth applications created yet.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {existingApps.map((app) => (
                <Card key={app.id} className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold">{app.name}</h4>
                    <p className="text-xs text-muted-foreground font-mono">Client ID: {app.clientId}</p>
                  </div>
                  <Badge variant={app.status === 'active' ? 'default' : 'secondary'}>
                    {app.status}
                  </Badge>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Install Dialog */}
      {installingApp && (
        <MarketplaceInstallDialog
          isOpen={true}
          onClose={() => setInstallingApp(null)}
          app={installingApp}
        />
      )}
    </div>
  );
}