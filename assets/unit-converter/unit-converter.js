document.addEventListener('DOMContentLoaded', () => {
  const inputValue = document.getElementById('input-value');
  const inputUnit = document.getElementById('input-unit');
  const convertButton = document.getElementById('convert-button');
  const resultsContainer = document.getElementById('results-container');

  const units = ['px', 'em', 'rem', '%', 'vw', 'vh'];
  const baseSize = 16; // Base font size in pixels

  function convertUnits(value, fromUnit) {
    const results = {};
    let pxValue;

    switch(fromUnit) {
      case 'px':
        pxValue = value;
        break;
      case 'em':
      case 'rem':
        pxValue = value * baseSize;
        break;
      case '%':
        pxValue = (value / 100) * baseSize;
        break;
      case 'vw':
        pxValue = (value / 100) * window.innerWidth;
        break;
      case 'vh':
        pxValue = (value / 100) * window.innerHeight;
        break;
    }

    units.forEach(unit => {
      switch(unit) {
        case 'px':
          results[unit] = pxValue;
          break;
        case 'em':
        case 'rem':
          results[unit] = pxValue / baseSize;
          break;
        case '%':
          results[unit] = (pxValue / baseSize) * 100;
          break;
        case 'vw':
          results[unit] = (pxValue / window.innerWidth) * 100;
          break;
        case 'vh':
          results[unit] = (pxValue / window.innerHeight) * 100;
          break;
      }
    });

    return results;
  }

  function displayResults(results) {
    resultsContainer.innerHTML = '';
    Object.entries(results).forEach(([unit, value]) => {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      resultItem.innerHTML = `
        <span class="value">${value.toFixed(2)}</span>
        <span class="unit">${unit}</span>
      `;
      resultsContainer.appendChild(resultItem);
    });
  }

  convertButton.addEventListener('click', () => {
    const value = parseFloat(inputValue.value);
    if (isNaN(value)) {
      alert('Por favor, ingresa un valor numérico válido.');
      return;
    }
    const results = convertUnits(value, inputUnit.value);
    displayResults(results);
  });
});