import { PageBreadcrumbs } from "@/features/dashboard/components/PageBreadcrumbs";
import { OAuthInstallDialog } from "../../order-management-system/components/OAuthInstallDialog";
import { AppsPageClient } from "./AppsPageClient";
import { getOAuthApps, getMarketingIntegrations } from "../actions";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function AppsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  // Check if install popup should be shown
  const shouldShowInstall = resolvedSearchParams.install === "true";

  // OAuth parameters for installation
  const oauthParams = shouldShowInstall
    ? {
        clientId: typeof resolvedSearchParams.client_id === "string" ? resolvedSearchParams.client_id : "",
        scope: typeof resolvedSearchParams.scope === "string" ? resolvedSearchParams.scope : "",
        redirectUri: typeof resolvedSearchParams.redirect_uri === "string" ? resolvedSearchParams.redirect_uri : "",
        state: typeof resolvedSearchParams.state === "string" ? resolvedSearchParams.state : "",
        responseType: typeof resolvedSearchParams.response_type === "string" ? resolvedSearchParams.response_type : "",
      }
    : null;

  // Fetch existing OAuth apps and marketing integrations from database
  const [oauthAppsResponse, marketingResponse] = await Promise.all([
    getOAuthApps(),
    getMarketingIntegrations(),
  ]);

  const existingApps = oauthAppsResponse.success ? oauthAppsResponse.data.items : [];
  const marketingData = marketingResponse.success ? marketingResponse.data : null;

  return (
    <section
      aria-label="Apps overview"
      className="overflow-hidden flex flex-col"
    >
      <PageBreadcrumbs
        items={[
          {
            type: "link",
            label: "Dashboard",
            href: "/",
          },
          {
            type: "page",
            label: "Platform",
          },
          {
            type: "page",
            label: "Apps & Integrations",
          },
        ]}
      />

      <div className="flex flex-col flex-1 min-h-0">
        <div className="border-b border-border">
          <div className="px-4 md:px-6 pt-4 md:pt-6 pb-4">
            <h1 className="text-2xl font-semibold text-foreground">
              Apps & Marketing Integrations
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Connect full-funnel Meta Pixel, Google Analytics, TikTok, and fulfillment channel integrations.
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <AppsPageClient
            existingApps={existingApps}
            marketingData={marketingData}
          />
        </div>
      </div>

      {/* OAuth Install Dialog */}
      {shouldShowInstall && oauthParams && (
        <OAuthInstallDialog 
          isOpen={true}
          oauthParams={oauthParams}
        />
      )}
    </section>
  );
}