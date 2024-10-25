document.addEventListener('DOMContentLoaded', () => {
  const backgroundColorInput = document.getElementById('background-color');
  const textColorInput = document.getElementById('text-color');
  const primaryColorInput = document.getElementById('primary-color');
  const secondaryColorInput = document.getElementById('secondary-color');
  const generateButton = document.getElementById('generate-button');
  const lightThemePreview = document.getElementById('light-theme-preview');
  const darkThemePreview = document.getElementById('dark-theme-preview');
  const cssOutput = document.getElementById('css-output');
  const copyCssButton = document.getElementById('copy-css');

  function updateLightTheme() {
    lightThemePreview.style.backgroundColor = backgroundColorInput.value;
    lightThemePreview.style.color = textColorInput.value;
    lightThemePreview.querySelector('.primary-btn').style.backgroundColor = primaryColorInput.value;
    lightThemePreview.querySelector('.secondary-btn').style.backgroundColor = secondaryColorInput.value;
  }

  function generateDarkTheme() {
    const backgroundColor = invertColor(backgroundColorInput.value);
    const textColor = invertColor(textColorInput.value);
    const primaryColor = adjustColor(primaryColorInput.value, -20);
    const secondaryColor = adjustColor(secondaryColorInput.value, -20);

    darkThemePreview.style.backgroundColor = backgroundColor;
    darkThemePreview.style.color = textColor;
    darkThemePreview.querySelector('.primary-btn').style.backgroundColor = primaryColor;
    darkThemePreview.querySelector('.secondary-btn').style.backgroundColor = secondaryColor;

    return { backgroundColor, textColor, primaryColor, secondaryColor };
  }

  function invertColor(hex) {
    hex = hex.replace('#', '');
    return `#${(Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()}`;
  }

  function adjustColor(hex, amount) {
    return '#' + hex.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  function generateCSS(lightTheme, darkTheme) {
    return `
/* Light Theme */
.light-theme {
  background-color: ${lightTheme.backgroundColor};
  color: ${lightTheme.textColor};
}
.light-theme .primary-btn {
  background-color: ${lightTheme.primaryColor};
}
.light-theme .secondary-btn {
  background-color: ${lightTheme.secondaryColor};
}

/* Dark Theme */
.dark-theme {
  background-color: ${darkTheme.backgroundColor};
  color: ${darkTheme.textColor};
}
.dark-theme .primary-btn {
  background-color: ${darkTheme.primaryColor};
}
.dark-theme .secondary-btn {
  background-color: ${darkTheme.secondaryColor};
}
    `.trim();
  }

  [backgroundColorInput, textColorInput, primaryColorInput, secondaryColorInput].forEach(input => {
    input.addEventListener('input', updateLightTheme);
  });

  generateButton.addEventListener('click', () => {
    const lightTheme = {
      backgroundColor: backgroundColorInput.value,
      textColor: textColorInput.value,
      primaryColor: primaryColorInput.value,
      secondaryColor: secondaryColorInput.value
    };
    const darkTheme = generateDarkTheme();
    const css = generateCSS(lightTheme, darkTheme);
    cssOutput.textContent = css;
  });

  copyCssButton.addEventListener('click', () => {
    navigator.clipboard.writeText(cssOutput.textContent).then(() => {
      alert('CSS copiado al portapapeles!');
    });
  });

  updateLightTheme();
});