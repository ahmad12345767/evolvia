// EVOLVIA Main JS - Scroll reveals, accordion, mobile menu, notifications

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 100;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger initial view check

  // 1b. Video Speed Controller & 3s Delayed Hero Pop & Character blurInUp Entrance
  const bgVideo = document.querySelector('.video-bg-video');
  const heroItems = document.querySelectorAll('.hero-animate-item');

  // Function to split text nodes into character spans for MagicUI blurInUp effect
  function splitTextToChars(element) {
    if (!element) return;
    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const span = document.createElement('span');
          span.className = 'char-span';
          span.textContent = char;
          fragment.appendChild(span);
        }
        node.parentNode.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SCRIPT') {
        Array.from(node.childNodes).forEach(processNode);
      }
    };
    Array.from(element.childNodes).forEach(processNode);

    // Index all char spans
    const chars = element.querySelectorAll('.char-span');
    chars.forEach((c, idx) => {
      c.style.setProperty('--char-index', idx);
    });
  }

  // Split hero titles/subtitles into character spans
  const animateCharTitles = document.querySelectorAll('.text-animate-chars');
  animateCharTitles.forEach((el) => splitTextToChars(el));

  if (bgVideo) {
    bgVideo.playbackRate = 1.0;
    
    // After 1s: speed up video to 2.0x for 2 seconds
    setTimeout(() => {
      bgVideo.playbackRate = 2.0;
      
      // After 2 seconds (at 3s total): return back to normal 1.0x speed
      setTimeout(() => {
        bgVideo.playbackRate = 1.0;
      }, 2000);
    }, 1000);
  }

  // After 3s: trigger character-by-character blurInUp fade-in
  setTimeout(() => {
    heroItems.forEach((item) => {
      item.classList.add('hero-animated');
    });

    const allCharSpans = document.querySelectorAll('.char-span');
    allCharSpans.forEach((span) => {
      span.classList.add('animate-char');
    });
  }, 3000);

  // 2. FAQ Accordion Toggle
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      accordionItems.forEach((other) => other.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
  }

  // 4. Form Submission Handling & Instant Delivery to Gmail
  const contactForms = document.querySelectorAll('.contact-form, .newsletter-form, form[action*="formsubmit"]');
  contactForms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Prepare form data for jamhmad51@gmail.com
      const targetUrl = 'https://formsubmit.co/ajax/jamhmad51@gmail.com';
      const formData = new FormData(form);
      const dataObj = {
        _subject: form.querySelector('input[name="_subject"]')?.value || 'EVOLVIA CONTACT',
        _captcha: 'false',
        _template: 'table'
      };

      formData.forEach((value, key) => {
        if (!key.startsWith('_')) {
          dataObj[key] = value;
        }
      });

      // Send form data asynchronously to Gmail
      fetch(targetUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dataObj)
      }).catch(() => {});

      form.reset();
    });
  });

  // 5. Task Manager Checkboxes Toggle
  const taskCheckboxes = document.querySelectorAll('.task-checkbox');
  taskCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      checkbox.classList.toggle('checked');
      const item = checkbox.closest('.task-item');
      if (item) {
        item.style.opacity = checkbox.classList.contains('checked') ? '0.6' : '1';
      }
    });
  });

  // 6. MagicUI TextReveal Scroll Animation
  initMagicTextReveal();

  // 7. Lenis & Framer Ultra-Smooth Weighted Inertia Scroll
  initSmoothScroll();

  // 8. Floating AI Agent Smooth Scroll Navigation & ElevenLabs Hover/Hold Logic
  const wrapper = document.getElementById('floating-ai-wrapper');
  const floatingAiBtn = document.getElementById('floating-ai-agent');

  if (floatingAiBtn) {
    floatingAiBtn.addEventListener('click', (e) => {
      const targetSec = document.getElementById('ai-assistant');
      if (targetSec) {
        e.preventDefault();
        targetSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetSec.classList.add('ai-section-highlight');
        setTimeout(() => targetSec.classList.remove('ai-section-highlight'), 2500);
      } else {
        window.location.href = 'index.html#ai-assistant';
      }
    });

    let hideTimer;
    let isHoveringBtn = false;
    let isHoveringWidget = false;

    const getConvai = () => document.querySelector('elevenlabs-convai');

    const updateVisibility = () => {
      const convai = getConvai();
      if (!convai) return;

      if (isHoveringBtn || isHoveringWidget) {
        clearTimeout(hideTimer);
        convai.classList.add('show-convai');
      } else {
        hideTimer = setTimeout(() => {
          if (!isHoveringBtn && !isHoveringWidget) {
            convai.classList.remove('show-convai');
          }
        }, 220);
      }
    };

    floatingAiBtn.addEventListener('mouseenter', () => {
      isHoveringBtn = true;
      updateVisibility();
    });

    floatingAiBtn.addEventListener('mouseleave', () => {
      isHoveringBtn = false;
      updateVisibility();
    });

    const bindWidgetHover = () => {
      const convai = getConvai();
      if (!convai) return;

      convai.addEventListener('mouseenter', () => {
        isHoveringWidget = true;
        updateVisibility();
      });

      convai.addEventListener('mouseleave', () => {
        isHoveringWidget = false;
        updateVisibility();
      });

      // Hide "Powered by ElevenAgents" / "Powered by ElevenLabs" inside shadow root
      if (convai.shadowRoot && !convai.shadowRoot.querySelector('#hide-branding-style')) {
        const style = document.createElement('style');
        style.id = 'hide-branding-style';
        style.textContent = `
          [class*="branding"],
          [class*="powered"],
          [class*="attribution"],
          [class*="footer"],
          a[href*="elevenlabs"],
          a[href*="eleven"],
          .branding,
          .powered-by {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            height: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            pointer-events: none !important;
          }
        `;
        convai.shadowRoot.appendChild(style);
      }
    };

    setInterval(bindWidgetHover, 500);
  }
});

// MagicUI TextReveal Scroll Effect Implementation
function initMagicTextReveal() {
  const textRevealElements = document.querySelectorAll('.magic-text-reveal');

  textRevealElements.forEach((container) => {
    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const words = text.split(/(\s+)/);
        const fragment = document.createDocumentFragment();

        words.forEach((w) => {
          if (w.trim().length > 0) {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'magic-reveal-word';
            wordSpan.textContent = w;
            fragment.appendChild(wordSpan);
          } else if (w.length > 0) {
            fragment.appendChild(document.createTextNode(w));
          }
        });
        node.parentNode.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('magic-reveal-word')) {
        Array.from(node.childNodes).forEach(processNode);
      }
    };

    Array.from(container.childNodes).forEach(processNode);

    const wordSpans = Array.from(container.querySelectorAll('.magic-reveal-word'));
    if (wordSpans.length === 0) return;

    const totalWords = wordSpans.length;

    const updateReveal = () => {
      const parentSection = container.closest('.video-separator-section') || container;
      const rect = parentSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start reveal when top of section reaches 85% of viewport
      // Finish reveal when top reaches 30% of viewport
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.30;
      const totalDistance = start - end;
      const currentPos = start - rect.top;

      let progress = currentPos / totalDistance;
      progress = Math.max(0, Math.min(1, progress));

      wordSpans.forEach((span, index) => {
        const wordStart = index / totalWords;
        const wordEnd = (index + 1) / totalWords;

        if (progress >= wordEnd) {
          span.style.opacity = '1';
          span.style.filter = 'blur(0px)';
          span.style.transform = 'translateY(0px)';
        } else if (progress <= wordStart) {
          span.style.opacity = '0.15';
          span.style.filter = 'blur(4px)';
          span.style.transform = 'translateY(4px)';
        } else {
          const wordProgress = (progress - wordStart) / (1 / totalWords);
          span.style.opacity = (0.15 + 0.85 * wordProgress).toFixed(2);
          span.style.filter = `blur(${(4 * (1 - wordProgress)).toFixed(1)}px)`;
          span.style.transform = `translateY(${(4 * (1 - wordProgress)).toFixed(1)}px)`;
        }
      });
    };

    window.addEventListener('scroll', updateReveal, { passive: true });
    updateReveal();
  });
}

// Lenis & Framer Ultra-Smooth Heavy Weighted Inertia Scroll Implementation
function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.8,          // Heavy luxury damping (1.8s momentum decay)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.65,  // Takes deliberate effort / scrolls slower and heavier like Framer!
      touchMultiplier: 1.0,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } else {
    initCustomWeightedScroll();
  }
}

function initCustomWeightedScroll() {
  if ('ontouchstart' in window && window.innerWidth < 1024) return;

  let targetY = window.scrollY;
  let currentY = window.scrollY;
  const ease = 0.065;      // Heavy inertia damping (lower = smoother & heavier)
  const multiplier = 0.65; // Wheel scroll effort multiplier
  let isScrolling = false;

  window.addEventListener('wheel', (e) => {
    if (e.target.closest('.chat-messages, .widget-box, .comparison-table')) return;

    e.preventDefault();
    targetY += e.deltaY * multiplier;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    targetY = Math.max(0, Math.min(targetY, maxScroll));

    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(render);
    }
  }, { passive: false });

  function render() {
    const diff = targetY - currentY;
    currentY += diff * ease;

    if (Math.abs(diff) > 0.3) {
      window.scrollTo(0, currentY);
      requestAnimationFrame(render);
    } else {
      window.scrollTo(0, targetY);
      currentY = targetY;
      isScrolling = false;
    }
  }

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      targetY = window.scrollY;
      currentY = window.scrollY;
    }
  });
}


