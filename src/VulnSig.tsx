import { renderGlyph } from 'vulnsig';
import type { CSSProperties } from 'react';

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

export function VulnSig({ vector, score, size = 120, className, style }: VulnSigProps) {
  const svg = renderGlyph({ vector, score, size });
  return (
    <span
      className={className}
      style={{ display: 'inline-block', lineHeight: 0, ...style }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
