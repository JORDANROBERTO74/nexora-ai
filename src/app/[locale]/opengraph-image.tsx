import { ImageResponse } from "next/og";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/config/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? (locale as Locale) : "en";
  const dict = getDictionary(currentLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#07182e",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              width: "34px",
              height: "34px",
              borderRadius: "9px",
              background: "#005ea8",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            N
          </div>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Nexora
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ fontSize: "20px", color: "#8fcfff", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            {dict.hero.eyebrow}
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.06,
              maxWidth: "960px",
            }}
          >
            {dict.hero.subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(143, 207, 255, 0.28)",
            paddingTop: "24px",
            fontSize: "16px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <span>{site.domain}</span>
          <span>nexora</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
