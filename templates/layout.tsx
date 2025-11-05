/**
 * Capital Markets Hub Template Layout
 *
 * Asset manager / investment firm / fund platform
 * Structure: Thesis + AUM + portfolio snapshot, portfolio grid, research & thought leadership
 */

import ComponentComposer from "@/components/ir/composition/ComponentComposer";
import { ComponentClusters } from "@/components/ir/composition/component-config";
import { prepareComponentData } from "@/lib/component-data-helpers";
import type { Company } from "@prisma/client";

// Type aliases for Template and Theme (until Prisma Client regenerates)
type Template = any;
type Theme = any;

interface CapitalMarketsHubLayoutProps {
  company: Company & {
    pressReleases?: any[];
  };
  template: Template | null;
  theme: Theme | null;
}

export default async function CapitalMarketsHubLayout({
  company,
  template,
  theme,
}: CapitalMarketsHubLayoutProps) {
  // Prepare base component data from company (with CMS integration)
  const baseData = await prepareComponentData(company, true);

  // Merge with Capital Markets Hub specific data
  const componentData = {
    ...baseData,
    // Market data is already fetched from CMS/market data API in baseData
    metrics: {
      ...baseData.metrics,
      aum: "$2.5B",
    },
    kpis: [
      {
        label: "AUM",
        gaapValue: "$2.5B",
        change: "+25%",
        changePercent: "25.0",
        period: "Q4 2024",
        trend: "up" as const,
      },
      {
        label: "Portfolio Companies",
        gaapValue: "45",
        change: "+8",
        period: "Active Investments",
        trend: "up" as const,
      },
      {
        label: "IRR",
        gaapValue: "18.5%",
        change: "+2.5%",
        changePercent: "2.5",
        period: "Since Inception",
        trend: "up" as const,
      },
    ],
    analysts: [
      {
        id: "1",
        bank: "Goldman Sachs",
        analystName: "Jane Smith",
        rating: "Strong Buy" as const,
        targetPrice: "275",
        date: "2024-01-15",
      },
      {
        id: "2",
        bank: "Morgan Stanley",
        analystName: "John Doe",
        rating: "Buy" as const,
        targetPrice: "265",
        date: "2024-01-10",
      },
    ],
    // Leaders are already fetched from CMS in baseData
  };

  // Get component configuration for Capital Markets Hub template
  const components = ComponentClusters.capitalMarketsHub(componentData);

  // Apply theme styles
  const primaryColor = (theme?.colors as any)?.primary || "#0A0A0A";
  const accentColor = (theme?.colors as any)?.accent || "#F5C55A";
  const backgroundColor = (theme?.colors as any)?.background || "#0F0F0F";
  const textColor = (theme?.colors as any)?.text || "#FFFFFF";
  const primaryFont =
    (theme?.typography as any)?.primaryFont ||
    (company as any).primaryFontFamily ||
    "IBM Plex Sans";
  const secondaryFont =
    (theme?.typography as any)?.secondaryFont ||
    (company as any).secondaryFontFamily ||
    primaryFont;

  return (
    <div
      className="ir-site capital-markets-hub"
      style={{
        backgroundColor,
        color: textColor,
        fontFamily: primaryFont,
        minHeight: "100vh",
      }}
    >
      {/* Theme CSS Variables */}
      <style>{`
        :root {
          --primary-color: ${primaryColor};
          --accent-color: ${accentColor};
          --background-color: ${backgroundColor};
          --text-color: ${textColor};
          --primary-font: ${primaryFont};
          --secondary-font: ${secondaryFont};
        }
      `}</style>

      {/* Header */}
      <header
        className="border-b sticky top-0 z-50"
        style={{ borderColor: accentColor, backgroundColor }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {company.logoUrl && (
                <img
                  src={company.logoUrl}
                  alt={`${company.name} Logo`}
                  className="h-12"
                />
              )}
              <h1 className="text-2xl font-bold" style={{ color: accentColor }}>
                {company.name}
              </h1>
              {company.tickerSymbol && (
                <span
                  className="text-sm px-2 py-1 rounded"
                  style={{
                    backgroundColor: `${accentColor}30`,
                    color: textColor,
                  }}
                >
                  {company.tickerSymbol}
                </span>
              )}
            </div>
            <nav>
              <ul className="flex items-center gap-6">
                <li>
                  <a
                    href="#portfolio"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href="#research"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Research
                  </a>
                </li>
                <li>
                  <a
                    href="#team"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Render components using ComponentComposer */}
      <ComponentComposer
        template={template}
        theme={theme}
        company={company}
        components={components}
      />
    </div>
  );
}
