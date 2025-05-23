function carousels() {
  const carousels = document.querySelectorAll('.carousel');
  
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);

    // Duplicar os slides para loop infinito
    track.innerHTML += track.innerHTML;

    // Recalcula os slides após duplicação
    const allSlides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
    const totalSlides = allSlides.length;

    // Ajustar largura do track para caber todos os slides (duplicados)
    track.style.width = `${slideWidth * totalSlides}px`;

    let position = 0;
    const speed = 1; // pixels por frame, ajuste para controlar velocidade

    function animate() {
      position -= speed;
      // Quando atingir a metade da largura (tamanho original), reinicia posição
      if (position <= -slideWidth * (totalSlides / 2)) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    }

    animate();
  });
}