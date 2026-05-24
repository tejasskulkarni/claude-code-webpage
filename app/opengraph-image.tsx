import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#FAF7F2",
        padding: "60px 80px",
        fontFamily: "serif",
        position: "relative",
      }}
    >
      {/* Left accent rule */}
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 60,
          bottom: 60,
          width: 4,
          backgroundColor: "#E54B2A",
        }}
      />

      {/* Headline */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: "#111111",
          lineHeight: 1.05,
          marginBottom: 24,
          maxWidth: 900,
        }}
      >
        The AI stack, decoded daily.
      </h1>

      {/* Byline */}
      <p
        style={{
          fontSize: 28,
          color: "#5A5A5A",
          fontFamily: "sans-serif",
          marginBottom: 0,
        }}
      >
        by Tejas Kulkarni
      </p>

      {/* Eyebrow */}
      <p
        style={{
          position: "absolute",
          bottom: 60,
          left: 80,
          fontSize: 16,
          color: "#5A5A5A",
          fontFamily: "monospace",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        AI Daily · Free Newsletter
      </p>
    </div>,
    size,
  );
}
