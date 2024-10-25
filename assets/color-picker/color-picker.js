document.addEventListener('DOMContentLoaded', () => {
  const colorInput = document.getElementById('color-input');
  const colorValue = document.getElementById('color-value');
  const colorPalette = document.getElementById('color-palette');

  colorInput.addEventListener('input', updateColor);
  colorInput.addEventListener('change', updateColor);

  function updateColor() {
    const color = colorInput.value;
    colorValue.value = color;
    generatePalette(color);
  }

  function generatePalette(baseColor) {
    colorPalette.innerHTML = '';
    const colors = generateColors(baseColor, 5);
    colors.forEach(color => {
      const swatch = document.createElement('div');
      swatch.className = 'color-swatch';
      swatch.style.backgroundColor = color;
      swatch.title = color;
      swatch.addEventListener('click', () => {
        navigator.clipboard.writeText(color).then(() => {
          alert(`Color ${color} copiado al portapapeles!`);
        });
      });
      colorPalette.appendChild(swatch);
    });
  }

  function generateColors(baseColor, count) {
    const colors = [baseColor];
    const hsl = hexToHSL(baseColor);
    for (let i = 1; i < count; i++) {
      hsl.l = Math.max(0, Math.min(100, hsl.l + (i * 10)));
      colors.push(hslToHex(hsl));
    }
    return colors;
  }

  function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  function hslToHex({ h, s, l }) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  updateColor();
});