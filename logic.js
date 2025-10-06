// O import continua o mesmo
import emailjs from '@emailjs/browser';

// --- CHAVES PUXADAS DAS VARIÁVEIS DE AMBIENTE DA VERCEL ---
// O código agora pega as chaves do ambiente de deploy
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// --- SELEÇÃO DOS ELEMENTOS DO DOM ---
const contactForm = document.getElementById('contact-form');
const serviceButtons = document.querySelectorAll('.contact-service-button');
const hiddenServiceInput = document.getElementById('contact_service');
const submitButton = document.querySelector('.contact-submit-button');


// --- LÓGICA DOS BOTÕES DE SERVIÇO ---
serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        serviceButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        hiddenServiceInput.value = button.getAttribute('data-service');
    });
});


// --- LÓGICA DO ENVIO DO FORMULÁRIO ---
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!hiddenServiceInput.value) {
        alert('Por favor, selecione um motivo para o contato.');
        return;
    }

    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    // A função agora usa as constantes definidas no topo do arquivo
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this, PUBLIC_KEY)
        .then(() => {
            alert('E-mail enviado com sucesso!');
            contactForm.reset();
            serviceButtons.forEach(btn => btn.classList.remove('active'));
            location.reload();
        }, (err) => {
            alert('Ocorreu um erro ao enviar o e-mail. Tente novamente.');
            console.error('EmailJS Error:', JSON.stringify(err));
        })
        .finally(() => {
            // Este bloco será executado em caso de sucesso ou erro
            submitButton.textContent = 'Enviar';
            submitButton.disabled = false;
        });
});