document.addEventListener('DOMContentLoaded', () => {
  const baseColorInput = document.getElementById('base-color');
  const backgroundColorInput = document.getElementById('background-color');
  const wcagAA = document.getElementById('wcag-aa');
  const wcagAAA = document.getElementById('wcag-aaa');
  const generateButton = document.getElementById('generate-button');
  const palettePreview = document.getElementById('palette-preview');
  const cssOutput = document.getElementById('css-output');
  const copyCssButton = document.getElementById('copy-css');

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function luminance(r, g, b) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function contrastRatio(rgb1, rgb2) {
    const lum1 = luminance(...rgb1);
    const lum2 = luminance(...rgb2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  function adjustColor(rgb, amount) {
    return rgb.map(v => Math.max(0, Math.min(255, v + amount)));
  }

  function generateAccessibleColors(baseColor, backgroundColor, wcagLevel) {
    const baseRgb = hexToRgb(baseColor);
    const bgRgb = hexToRgb(backgroundColor);
    const colors = [];
    const minContrast = wcagLevel === 'AAA' ? 7 : 4.5;

    // Lighter shades
    let currentColor = baseRgb;
    while (contrastRatio(currentColor, bgRgb) >= minContrast) {
      colors.unshift(currentColor);
      currentColor = adjustColor(currentColor, 10);
    }

    // Darker shades
    currentColor = baseRgb;
    while (contrastRatio(currentColor, bgRgb) >= minContrast) {
      if (!colors.includes(currentColor)) {
        colors.push(currentColor);
      }
      currentColor = adjustColor(currentColor, -10);
    }

    return colors.map(rgb => ({
      hex: rgbToHex(...rgb),
      contrast: contrastRatio(rgb, bgRgb).toFixed(2)
    }));
  }

  function updatePalettePreview(colors, backgroundColor) {
    palettePreview.innerHTML = '';
    colors.forEach(color => {
      const swatch = document.createElement('div');
      swatch.className = 'color-swatch';
      swatch.style.backgroundColor = color.hex;
      swatch.style.color = contrastRatio(hexToRgb(color.hex), hexToRgb(backgroundColor)) >= 4.5 ? '#000' : '#fff';
      swatch.innerHTML = `
        <span class="color-hex">${color.hex}</span>
        <span class="contrast-ratio">Contraste: ${color.contrast}</span>
      `;
      palettePreview.appendChild(swatch);
    });
  }

  function generateCSS(colors) {
    return colors.map((color, index) => `
.color-${index + 1} {
  background-color: ${color.hex};
  color: ${contrastRatio(hexToRgb(color.hex), hexToRgb(backgroundColorInput.value)) >= 4.5 ? '#000' : '#fff'};
}
    `).join('\n');
  }

  generateButton.addEventListener('click', () => {
    const baseColor = baseColorInput.value;
    const backgroundColor = backgroundColorInput.value;
    const wcagLevel = wcagAAA.checked ? 'AAA' : 'AA';

    const accessibleColors = generateAccessibleColors(baseColor, backgroundColor, wcagLevel);
    updatePalettePreview(accessibleColors, backgroundColor);

    const css = generateCSS(accessibleColors);
    cssOutput.textContent = css;
  });

  copyCssButton.addEventListener('click', () => {
    navigator.clipboard.writeText(cssOutput.textContent).then(() => {
      alert('CSS copiado al portapapeles!');
    });
  });
});