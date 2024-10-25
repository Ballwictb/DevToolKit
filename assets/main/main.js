document.addEventListener('DOMContentLoaded', () => {
  const toolCards = document.querySelectorAll('.tool-card');

  toolCards.forEach(card => {
    card.addEventListener('mouseover', () => {
      card.style.backgroundColor = '#ff69b4';
      card.style.color = '#ffffff';
    });

    card.addEventListener('mouseout', () => {
      card.style.backgroundColor = '#ffffff';
      card.style.color = '#000000';
    });
  });
});