document.addEventListener('DOMContentLoaded', () => {
  const color1 = document.getElementById('color1');
  const color2 = document.getElementById('color2');
  const gradientType = document.getElementById('gradient-type');
  const angle = document.getElementById('angle');
  const angleValue = document.getElementById('angle-value');
  const gradientPreview = document.getElementById('gradient-preview');
  const cssOutput = document.getElementById('css-output');
  const copyCss = document.getElementById('copy-css');

  function updateGradient() {
    const type = gradientType.value;
    const direction = type === 'linear' ? `${angle.value}deg` : 'circle';
    const gradient = `${type}-gradient(${direction}, ${color1.value}, ${color2.value})`;
    
    gradientPreview.style.background = gradient;
    cssOutput.value = `background: ${gradient};`;
    angleValue.textContent = `${angle.value}°`;
  }

  [color1, color2, gradientType, angle].forEach(el => {
    el.addEventListener('input', updateGradient);
  });

  copyCss.addEventListener('click', () => {
    cssOutput.select();
    document.execCommand('copy');
    alert('CSS copiado al portapapeles!');
  });

  updateGradient();
});