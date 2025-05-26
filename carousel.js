function carousels() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);

    // Calcula largura total dos slides originais (com margens)
    let totalWidth = 0;
    slides.forEach(slide => {
      const style = getComputedStyle(slide);
      const width = slide.getBoundingClientRect().width;
      const marginRight = parseFloat(style.marginRight);
      totalWidth += width + marginRight;
    });

    // Duplica os slides até o track ter largura >= 3x o totalWidth original
    let currentWidth = totalWidth;
    while (currentWidth < totalWidth * 3) {
      track.innerHTML += track.innerHTML;
      currentWidth *= 2;
    }

    // Agora, pegar todos os slides de novo, após múltiplas duplicações
    const allSlides = Array.from(track.children);

    // Ajustar a largura do track para conter todos os slides
    track.style.width = `${currentWidth}px`;

    let position = 0;
    const speed = 2.5; // pixels por frame

    function animate() {
      position -= speed;

      // Resetar a posição quando atingir metade do track para loop suave
      if (position <= -currentWidth / 2) {
        position = 0;
      }

      track.style.transform = `translateX(${position}px)`;

      requestAnimationFrame(animate);
    }

    animate();
  });
}

window.addEventListener('load', carousels);
