document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password-input');
  const strengthBar = document.getElementById('strength-bar');
  const strengthText = document.getElementById('strength-text');
  const requirementsList = document.getElementById('requirements-list');

  const requirements = [
    { id: 'length-req', regex: /.{8,}/, description: 'Al menos 8 caracteres' },
    { id: 'uppercase-req', regex: /[A-Z]/, description: 'Al menos una mayúscula' },
    { id: 'lowercase-req', regex: /[a-z]/, description: 'Al menos una minúscula' },
    { id: 'number-req', regex: /[0-9]/, description: 'Al menos un número' },
    { id: 'special-req', regex: /[!@#$%^&*(),.?":{}|<>]/, description: 'Al menos un carácter especial' }
  ];

  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    let strength = 0;

    requirements.forEach(req => {
      const li = document.getElementById(req.id);
      if (req.regex.test(password)) {
        li.classList.add('met');
        strength++;
      } else {
        li.classList.remove('met');
      }
    });

    // Actualizar la barra de fuerza
    const percentage = (strength / requirements.length) * 100;
    strengthBar.style.width = `${percentage}%`;

    // Actualizar el color de la barra y el texto
    if (percentage <= 20) {
      strengthBar.style.backgroundColor = '#ff0000';
      strengthText.textContent = 'Muy débil';
    } else if (percentage <= 40) {
      strengthBar.style.backgroundColor = '#ff8c00';
      strengthText.textContent = 'Débil';
    } else if (percentage <= 60) {
      strengthBar.style.backgroundColor = '#ffd700';
      strengthText.textContent = 'Moderada';
    } else if (percentage <= 80) {
      strengthBar.style.backgroundColor = '#9acd32';
      strengthText.textContent = 'Fuerte';
    } else {
      strengthBar.style.backgroundColor = '#008000';
      strengthText.textContent = 'Muy fuerte';
    }
  });
});