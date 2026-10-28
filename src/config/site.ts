export const site = {
  name: "Nexora",
  domain: "nexora-ai-hq.vercel.app",
  get url() {
    return process.env.NEXT_PUBLIC_SITE_URL || `https://${this.domain}`;
  },
  defaultLocale: "en" as const,
  locales: ["en", "es"] as const,
};
