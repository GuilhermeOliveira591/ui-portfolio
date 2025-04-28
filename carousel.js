const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const slidesPerView = 5;
let currentIndex = 0;

// Função para atualizar a posição
function updateSlidePosition() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  const newTransform = -(slideWidth * slidesPerView) * currentIndex;
  track.style.transform = `translateX(${newTransform}px)`;
}

// Função para avançar automaticamente os slides
function autoSlide() {
  currentIndex++;
  // Volta ao início quando chegar ao final
  if (currentIndex >= Math.ceil(slides.length / slidesPerView)) {
    currentIndex = 0;
  }
  updateSlidePosition();
}

// Intervalo para rotação automática (exemplo: a cada 3 segundos)
setInterval(autoSlide, 3000);

// Atualiza a posição inicial dos slides
updateSlidePosition();
