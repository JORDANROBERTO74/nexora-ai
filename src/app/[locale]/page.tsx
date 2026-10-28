import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { constructMetadata } from "@/lib/seo";
import { Hero } from "@/components/site/hero";
import { SystemsStrip } from "@/components/site/systems-strip";
import { ServiceSection } from "@/components/site/service-section";
import { SolutionsSection } from "@/components/site/solutions-section";
import { ControlSection } from "@/components/site/control-section";
import { LeverageSection } from "@/components/site/leverage-section";
import { GovernanceSection } from "@/components/site/governance-section";
import { DemosSection } from "@/components/site/demos-section";
import { PilotSection } from "@/components/site/pilot-section";
import { SiteFooter } from "@/components/site/site-footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale as Locale);
  return constructMetadata({
    locale: locale as Locale,
    title: dict.meta.title,
    description: dict.meta.description,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale as Locale);

  return (
    <main className="kh-marketing min-h-screen overflow-x-hidden bg-[#f7f8fb] text-[#111827]">
      <Hero content={dict.hero} nav={dict.nav} locale={locale as Locale} />
      <SystemsStrip content={dict.systems} />
      <ServiceSection content={dict.service} features={dict.features}>
        <SolutionsSection content={dict.solutions} />
      </ServiceSection>
      <ControlSection content={dict.control} />
      <LeverageSection content={dict.leverage} />
      <GovernanceSection content={dict.governance} />
      <DemosSection content={dict.demos} />
      <PilotSection content={dict.pilot} />
      <SiteFooter content={dict.footer} locale={locale as Locale} />
    </main>
  );
}
