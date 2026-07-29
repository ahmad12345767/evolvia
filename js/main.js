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

  // 4. Form Submission Handling & Instant Delivery with 2s Overlay Animation
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const card = form.closest('.glass-card') || form.parentElement;
      
      // Create or locate success overlay in the form card
      let overlay = card.querySelector('.form-success-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'form-success-overlay';
        overlay.innerHTML = '<div class="form-success-circle">✓</div>';
        card.appendChild(overlay);
      }

      // Show green checkmark overlay over the contact rectangular box
      overlay.classList.add('show');

      // Trigger bottom-left notification toast
      showToast('successfully sent', 'we will contact you very soon');

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

      // Send form data asynchronously
      fetch(targetUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dataObj)
      }).catch(() => {});

      // After 5 seconds (5000ms): hide overlay and return everything to normal
      setTimeout(() => {
        overlay.classList.remove('show');
        form.reset();
      }, 5000);
    });
  });

    // Task Manager Checkboxes Toggle
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

    // 5. MagicUI TextReveal Scroll Animation
    initMagicTextReveal();
  });

// Toast notification helper (Positioned down left)
function showToast(title = 'successfully sent', subtitle = 'we will contact you very soon') {
  let toast = document.getElementById('evolvia-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'evolvia-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 30px;
      background: rgba(18, 12, 28, 0.94);
      border: 1px solid rgba(223, 122, 254, 0.35);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      color: #ffffff;
      padding: 14px 22px;
      border-radius: 16px;
      box-shadow: 0 10px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(223, 122, 254, 0.2);
      z-index: 9999;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      transform: translateY(20px);
      font-family: var(--font-main);
      min-width: 240px;
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div style="font-weight: 700; font-size: 0.98rem; color: #ffffff; display: flex; align-items: center; gap: 8px;">
      <span style="color: #4ade80;">✓</span> ${title}
    </div>
    <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 3px;">
      ${subtitle}
    </div>
  `;

  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 5500);
}

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

