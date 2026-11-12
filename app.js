/**
 * COSMOPOLITAN - INTERACTIVE ENGINE
 * Regras anti-slop: animações táteis refinadas, comportamento 100% funcional.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initHeroFacadeSwitcher();
  initPhoneMask();
  initPlansNavigator();
  initAmenitiesFilter();
  initShowroomLightbox();
  initLeadForm();
  initSmoothScroll();
  initDynamicWhatsApp();
});

/* ==========================================================================
   1. SCROLL REVEAL SUAVE & ELEGANTE
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   2. HERO FAÇADE PERSPECTIVE SWITCHER
   ========================================================================== */
function initHeroFacadeSwitcher() {
  const buttons = document.querySelectorAll('.btn-view-toggle');
  const heroImg = document.getElementById('hero-facade-img');
  const captionText = document.getElementById('hero-caption-text');

  if (!buttons.length || !heroImg) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const newSrc = btn.getAttribute('data-img');
      const caption = btn.getAttribute('data-caption');

      heroImg.style.opacity = '0.3';
      setTimeout(() => {
        heroImg.src = newSrc;
        if (captionText && caption) captionText.textContent = caption;
        heroImg.style.opacity = '1';
      }, 150);
    });
  });
}

/* ==========================================================================
   3. MÁSCARA INTELIGENTE DE TELEFONE BRASILEIRO
   ========================================================================== */
function initPhoneMask() {
  const phoneInput = document.getElementById('lead-phone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.substring(0, 11);

    if (val.length > 10) {
      e.target.value = `(${val.substring(0, 2)}) ${val.substring(2, 7)}-${val.substring(7)}`;
    } else if (val.length > 6) {
      e.target.value = `(${val.substring(0, 2)}) ${val.substring(2, 6)}-${val.substring(6)}`;
    } else if (val.length > 2) {
      e.target.value = `(${val.substring(0, 2)}) ${val.substring(2)}`;
    } else if (val.length > 0) {
      e.target.value = `(${val}`;
    }
  });
}

/* ==========================================================================
   4. NAVEGADOR DE PLANTAS HUMANIZADAS
   ========================================================================== */
const plansData = {
  studio: {
    type: "Studio Inteligente",
    title: "16m² a 22m² Privativos",
    image: "Plantas/clean_studio.webp",
    features: [
      "Ambiente integrado sob medida",
      "Cozinha linear com bancada",
      "Banheiro com acabamento nobre",
      "Alta demanda para locação"
    ],
    startingPrice: "A partir de R$ 247.352"
  },
  oneBed: {
    type: "1 Dormitório",
    title: "24m² a 31m² Privativos",
    image: "Plantas/clean_1dorm.webp",
    features: [
      "Dormitório independente com armário",
      "Living com espaço para home office",
      "Cozinha com área de serviço",
      "Ideal para morar ou investir"
    ],
    startingPrice: "A partir de R$ 330.263"
  },
  twoBed: {
    type: "2 Dormitórios",
    title: "40m² a 77m² Privativos",
    image: "Plantas/clean_2dorms.webp",
    features: [
      "2 dormitórios com luz natural",
      "Living amplo para 2 ambientes",
      "Cozinha com ventilação direta",
      "Conforto para toda a família"
    ],
    startingPrice: "A partir de R$ 498.360"
  }
};

let currentPlanKey = 'studio';

function initPlansNavigator() {
  const tabButtons = document.querySelectorAll('.plan-fluid-tab');
  const planImg = document.getElementById('plan-display-img');
  const planType = document.getElementById('plan-spec-type');
  const planTitle = document.getElementById('plan-spec-title');
  const planFeatures = document.getElementById('plan-features-list');
  const planPrice = document.getElementById('plan-starting-price');
  const zoomTrigger = document.getElementById('plan-zoom-trigger');
  const lightbox = document.getElementById('showroom-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');

  if (!tabButtons.length || !planImg) return;

  function updatePlanDisplay() {
    const data = plansData[currentPlanKey];
    if (!data) return;

    planImg.style.opacity = '0.25';
    setTimeout(() => {
      planImg.src = data.image;
      planImg.alt = `Planta ${data.type} - Cosmopolitan`;
      
      planType.textContent = data.type;
      planTitle.textContent = data.title;
      planPrice.textContent = data.startingPrice;

      if (planFeatures) {
        planFeatures.innerHTML = data.features.map(f => `<div class="plan-chip-item">${f}</div>`).join('');
      }

      // Atualiza link de WhatsApp da planta selecionada
      const planWaBtn = document.getElementById('plan-whatsapp-btn');
      if (planWaBtn) {
        const planShortMsg = `Olá! Vim pelo site do Cosmopolitan e quero detalhes da planta ${data.type}.`;
        planWaBtn.href = `https://api.whatsapp.com/send?phone=5511987689734&text=${encodeURIComponent(planShortMsg)}`;
      }

      // Se o botão flutuante estiver na seção de plantas, atualiza também
      if (typeof updateFloatWhatsAppUrl === 'function') {
        updateFloatWhatsAppUrl();
      }

      planImg.style.opacity = '1';
    }, 150);
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      currentPlanKey = button.getAttribute('data-plan') || 'studio';
      updatePlanDisplay();
    });
  });

  // Zoom no Lightbox ao clicar na planta
  if (zoomTrigger && lightbox && lightboxImg) {
    zoomTrigger.addEventListener('click', () => {
      const data = plansData[currentPlanKey];
      if (!data) return;

      lightboxImg.src = data.image;
      lightboxImg.alt = `Planta ${data.type} - Cosmopolitan`;
      if (lightboxTitle) lightboxTitle.textContent = `Planta Humanizada — ${data.type}`;
      if (lightboxDesc) lightboxDesc.textContent = `${data.title} • ${data.startingPrice}`;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
}

/* ==========================================================================
   5. FILTRAGEM & SHOWROOM LIGHTBOX DE LAZER
   ========================================================================== */
function initAmenitiesFilter() {
  const filterBtns = document.querySelectorAll('.btn-amenity-filter');
  const amenityCards = document.querySelectorAll('.amenity-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      amenityCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initShowroomLightbox() {
  const amenityCards = document.querySelectorAll('.amenity-card');
  const lightbox = document.getElementById('showroom-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (!lightbox) return;

  amenityCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');

      if (imgSrc && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = title || '';
        if (lightboxTitle) lightboxTitle.textContent = title || '';
        if (lightboxDesc) lightboxDesc.textContent = desc || '';

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   6. FORMULÁRIO DE PRÉ-CADASTRO & INTEGRAÇÃO WEBHOOK / WHATSAPP
   ========================================================================== */
function initLeadForm() {
  const form = document.getElementById('pre-reservation-form');
  const modal = document.getElementById('confirmation-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const whatsappRedirectBtn = document.getElementById('modal-whatsapp-redirect');
  const feedbackBanner = document.getElementById('form-feedback-msg');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (!form) return;

  const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxoK_sE8UKeGC_Lvm14dskg_ReL6kJ33q7eQtEUWIOxCnD284cp1EdhshYq87Hn7cu_RQ/exec";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('lead-name');
    const phoneInput = document.getElementById('lead-phone');
    const emailInput = document.getElementById('lead-email');
    const messageInput = document.getElementById('lead-message');
    const typologyInput = document.getElementById('lead-typology');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const customMessage = messageInput ? messageInput.value.trim() : '';
    const typology = typologyInput ? typologyInput.value : 'Studio (16 a 22m²)';
    const profile = document.querySelector('input[name="lead_profile"]:checked')?.value || 'Moradia';

    if (!name || !phone) {
      if (feedbackBanner) {
        feedbackBanner.className = 'form-feedback-banner error';
        feedbackBanner.style.display = 'block';
        feedbackBanner.textContent = 'Por favor, preencha pelo menos o seu nome e telefone/WhatsApp com DDD.';
      } else {
        alert('Por favor, preencha nome e telefone para receber as condições de pré-lançamento.');
      }
      return;
    }

    // Se o usuário não digitou mensagem específica, registra o perfil e a tipologia
    const finalMessage = customMessage || `Interesse em ${typology} (${profile})`;

    // JSON no formato exato solicitado
    const payload = {
      nome: name,
      telefone: phone,
      email: email,
      mensagem: finalMessage,
      origem: "Site - Cosmopolitan",
      aba: "Cosmopolitan"
    };

    // Feedback de carregamento
    const originalBtnText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    }
    if (feedbackBanner) {
      feedbackBanner.style.display = 'none';
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      // Prepara o link curto do WhatsApp para o modal pós-envio
      const waShortMessage = encodeURIComponent(
        `Olá! Vim pelo site do Cosmopolitan e me cadastrei para a Tabela Zero: ${name}, interesse em ${typology}.`
      );
      const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_MAIN_NUMBER}&text=${waShortMessage}`;

      if (whatsappRedirectBtn) {
        whatsappRedirectBtn.href = waUrl;
      }

      // Feedback amigável de sucesso
      if (feedbackBanner) {
        feedbackBanner.className = 'form-feedback-banner success';
        feedbackBanner.style.display = 'block';
        feedbackBanner.innerHTML = '✓ <strong>Cadastro realizado com sucesso!</strong> Seus dados foram salvos.';
      }

      if (modal) {
        modal.classList.add('active');
      }

      form.reset();

    } catch (err) {
      console.error('Erro na requisição ao Webhook:', err);

      const waShortMessage = encodeURIComponent(
        `Olá! Vim pelo site do Cosmopolitan e gostaria de saber sobre a Tabela Zero: ${name}, interesse em ${typology}.`
      );
      const waFallbackUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_MAIN_NUMBER}&text=${waShortMessage}`;

      if (feedbackBanner) {
        feedbackBanner.className = 'form-feedback-banner error';
        feedbackBanner.style.display = 'block';
        feedbackBanner.innerHTML = `
          Instabilidade na conexão ao salvar seus dados.<br>
          <strong>Fale direto pelo WhatsApp:</strong> 
          <a href="${waFallbackUrl}" target="_blank" rel="noopener" style="text-decoration: underline; font-weight: 700; color: inherit;">Clique aqui para abrir</a>.
        `;
      } else {
        alert('Houve uma instabilidade na rede. Se preferir, fale conosco pelo WhatsApp.');
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
}

/* ==========================================================================
   7. NAVEGAÇÃO SUAVE
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = window.innerWidth <= 768 ? 60 : 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   8. INTEGRAÇÃO DINÂMICA DE WHATSAPP POR SEÇÃO
   ========================================================================== */
const WHATSAPP_MAIN_NUMBER = "5511987689734";

const SECTION_SHORT_MESSAGES = {
  hero: "Olá! Vim pelo site do Cosmopolitan e quero saber mais sobre o lançamento.",
  reserva: "Olá! Vim pelo site do Cosmopolitan e quero receber a Tabela Zero.",
  localizacao: "Olá! Vim pelo site do Cosmopolitan e quero saber mais sobre a localização no Jardim São Paulo.",
  lazer: "Olá! Vim pelo site do Cosmopolitan e gostaria de conhecer o lazer resort.",
  plantas: "Olá! Vim pelo site do Cosmopolitan e quero detalhes das plantas.",
  investimento: "Olá! Vim pelo site do Cosmopolitan e quero entender o fluxo para investidor."
};

let currentVisibleSectionId = 'hero';

function getContextualWhatsAppUrl(sectionId) {
  let msg = SECTION_SHORT_MESSAGES[sectionId] || SECTION_SHORT_MESSAGES.hero;

  // Se a seção for plantas, contextualiza com a tipologia ativa
  if (sectionId === 'plantas' && typeof plansData !== 'undefined' && plansData[currentPlanKey]) {
    msg = `Olá! Vim pelo site do Cosmopolitan e quero detalhes da planta ${plansData[currentPlanKey].type}.`;
  }

  return `https://api.whatsapp.com/send?phone=${WHATSAPP_MAIN_NUMBER}&text=${encodeURIComponent(msg)}`;
}

function updateFloatWhatsAppUrl() {
  const floatBtn = document.getElementById('whatsapp-float-btn');
  if (floatBtn) {
    floatBtn.href = getContextualWhatsAppUrl(currentVisibleSectionId);
  }
}

function initDynamicWhatsApp() {
  const floatBtn = document.getElementById('whatsapp-float-btn');
  if (!floatBtn) return;

  const sectionsToTrack = [
    { id: 'hero', el: document.getElementById('hero') },
    { id: 'reserva', el: document.getElementById('reserva') },
    { id: 'localizacao', el: document.getElementById('localizacao') },
    { id: 'lazer', el: document.getElementById('lazer') },
    { id: 'plantas', el: document.getElementById('plantas') },
    { id: 'investimento', el: document.getElementById('investimento') }
  ];

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const matched = sectionsToTrack.find(s => s.el === entry.target);
          if (matched) {
            currentVisibleSectionId = matched.id;
            updateFloatWhatsAppUrl();
          }
        }
      });
    }, {
      rootMargin: '-20% 0px -30% 0px',
      threshold: 0.1
    });

    sectionsToTrack.forEach(s => {
      if (s.el) observer.observe(s.el);
    });
  } else {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 350;
      for (let i = sectionsToTrack.length - 1; i >= 0; i--) {
        const item = sectionsToTrack[i];
        if (item.el && item.el.offsetTop <= scrollPos) {
          currentVisibleSectionId = item.id;
          updateFloatWhatsAppUrl();
          break;
        }
      }
    }, { passive: true });
  }

  updateFloatWhatsAppUrl();
}
