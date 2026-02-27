import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { VulnSig } from '../src/index.js';

const LOG4SHELL = 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H';
const CVSS31_LOG4SHELL = 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H';
const CVSS30_HEARTBLEED = 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N';

describe('VulnSig', () => {
  it('renders an SVG element', () => {
    const { container } = render(<VulnSig vector={LOG4SHELL} />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('defaults size to 120', () => {
    const { container } = render(<VulnSig vector={LOG4SHELL} />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('120');
    expect(svg.getAttribute('height')).toBe('120');
  });

  it('respects the size prop', () => {
    const { container } = render(<VulnSig vector={LOG4SHELL} size={64} />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('64');
    expect(svg.getAttribute('height')).toBe('64');
  });

  it('applies className to the wrapper', () => {
    const { container } = render(<VulnSig vector={LOG4SHELL} className="my-glyph" />);
    expect((container.firstChild as HTMLElement).className).toBe('my-glyph');
  });

  it('merges style onto the wrapper', () => {
    const { container } = render(<VulnSig vector={LOG4SHELL} style={{ opacity: 0.5 }} />);
    expect((container.firstChild as HTMLElement).style.opacity).toBe('0.5');
  });

  it('wrapper retains display:inline-block regardless of custom style', () => {
    const { container } = render(<VulnSig vector={LOG4SHELL} style={{ color: 'red' }} />);
    expect((container.firstChild as HTMLElement).style.display).toBe('inline-block');
  });

  it('accepts a score override', () => {
    const { container } = render(<VulnSig vector={LOG4SHELL} score={5.0} />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('accepts score={null} (auto-calculate)', () => {
    const { container } = render(<VulnSig vector={LOG4SHELL} score={null} />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('renders CVSS 3.1 vectors', () => {
    const { container } = render(<VulnSig vector={CVSS31_LOG4SHELL} />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('renders CVSS 3.0 vectors', () => {
    const { container } = render(<VulnSig vector={CVSS30_HEARTBLEED} />);
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
