/**
 * Portfólio Luiz - Scripts Principais
 * HTML, CSS e JavaScript puros
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeaderScroll();
  initScrollReveal();
  initContactForm();
  initSmoothScroll();
});

/**
 * Gerencia o comportamento do menu de navegação responsivo (Mobile & Desktop)
 */
function initNavbar() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !nav) return;

  // Alterna o menu ao clicar no botão hamburger
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));

    // Evita scroll no fundo quando o menu mobile está aberto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fecha o menu ao clicar em qualquer link da navegação
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // Fecha o menu ao redimensionar para tela grande
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Fecha o menu ao pressionar a tecla Escape (acessibilidade)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener('click', (event) => {
    if (
      nav.classList.contains('open') &&
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Adiciona sombra e realce no header ao rolar a página
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Ativa animações suaves de revelação quando elementos entram na viewport
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  // Se o navegador não suportar IntersectionObserver, exibe todos diretamente
  if (!('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/**
 * Validação e tratamento do formulário de contato demonstrativo
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Regex para formato de e-mail padrão
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Função para exibir erro em um campo
  const setError = (input, message) => {
    const parent = input.closest('.form-group');
    if (!parent) return;

    parent.classList.add('has-error');
    const errorSpan = parent.querySelector('.form-error');
    if (errorSpan) {
      errorSpan.textContent = message;
    }
  };

  // Função para limpar erro de um campo
  const clearError = (input) => {
    const parent = input.closest('.form-group');
    if (!parent) return;

    parent.classList.remove('has-error');
    const errorSpan = parent.querySelector('.form-error');
    if (errorSpan) {
      errorSpan.textContent = '';
    }
  };

  // Limpa o erro assim que o usuário começa a digitar no campo
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', () => {
      clearError(input);
      if (feedback) {
        feedback.className = 'form-feedback';
        feedback.innerHTML = '';
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true;

    // Validação do campo Nome
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      setError(nameInput, 'Por favor, informe seu nome.');
      isValid = false;
    } else if (nameVal.length < 2) {
      setError(nameInput, 'O nome deve ter no mínimo 2 caracteres.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validação do campo E-mail
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      setError(emailInput, 'Por favor, informe seu e-mail.');
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      setError(emailInput, 'Por favor, insira um endereço de e-mail válido.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validação do campo Mensagem
    const messageVal = messageInput.value.trim();
    if (!messageVal) {
      setError(messageInput, 'Por favor, escreva sua mensagem.');
      isValid = false;
    } else if (messageVal.length < 10) {
      setError(messageInput, 'A mensagem deve conter pelo menos 10 caracteres.');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    // Caso formulário não seja válido, encerra
    if (!isValid) return;

    // Se válido, exibe feedback honesto informando que o formulário é demonstrativo
    if (feedback) {
      feedback.className = 'form-feedback info show';
      feedback.innerHTML = `
        <p><strong>Validação concluída com sucesso</strong></p>
        <p style="margin-top: 0.35rem;">
          Este portfólio é um projeto demonstrativo e não possui servidor backend para envio real de mensagens.
          Para conversar diretamente com Luiz, utilize o <strong>GitHub</strong> ou envie um <strong>e-mail</strong> pelos canais ao lado.
        </p>
      `;
      // Reseta os campos após a validação bem-sucedida
      form.reset();
    }
  });
}

/**
 * Garante rolagem suave e precisa para todos os links internos (incluindo o botão da Hero)
 * compensando dinamicamente a altura do cabeçalho fixo
 */
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();

        // Se o menu mobile estiver aberto, fecha-o
        const nav = document.querySelector('.nav');
        const menuToggle = document.querySelector('.menu-toggle');
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
          if (menuToggle) menuToggle.classList.remove('active');
          document.body.style.overflow = '';
        }

        // Obtém altura do cabeçalho fixo
        const navHeight =
          parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              '--nav-height'
            )
          ) || 80;

        const elementPosition =
          targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });

        // Atualiza a hash na URL sem recarregar
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });
}

