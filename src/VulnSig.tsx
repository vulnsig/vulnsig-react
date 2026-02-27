import { useId } from "react";
import { renderGlyph } from "vulnsig";
import type { CSSProperties } from "react";

export interface VulnSigProps {
  /** CVSS 4.0, 3.1, or 3.0 vector string */
  vector: string;
  /** Explicit score override (0–10). Auto-calculated when omitted. */
  score?: number | null;
  /** Rendered size in pixels. Default: 120 */
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function VulnSig({
  vector,
  score,
  size = 120,
  className,
  style,
}: VulnSigProps) {
  const uid = useId();
  let svg = renderGlyph({ vector, score, size });
  // Make gradient IDs unique per instance to avoid collisions when
  // multiple glyphs with the same vector appear on one page.
  svg = svg
    .replace(/id="(sg-[^"]+)"/g, `id="$1${uid}"`)
    .replace(/url\(#(sg-[^)]+)\)/g, `url(#$1${uid})`);

  return (
    <span
      className={className}
      style={{ display: "inline-block", lineHeight: 0, ...style }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
