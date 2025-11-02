// script.js - CrystalWash (clean and error-free)
document.addEventListener('DOMContentLoaded', () => {
  const safe = (sel) => document.querySelector(sel) || null;
  const safeAll = (sel) => Array.from(document.querySelectorAll(sel));

  // Year
  const yearEl = safe('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Bubbles behind everything
  (function createBubbles() {
    const wrap = safe('#bubbles');
    if (!wrap) return;
    const count = 26;
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'cw-bubble';
      const size = 40 + Math.floor(Math.random() * 140);
      b.style.width = '${size}px';
      b.style.height = '${size}px';
      b.style.left = '${Math.random() * 100}%';
      b.style.bottom = '${-50 - Math.random() * 200}px';
      const dur = 22 + Math.random() * 26;
      const delay = Math.random() * 6;
      b.style.animation = 'cwRise ${dur}s linear ${delay}s infinite';
      b.style.opacity = (0.12 + Math.random() * 0.45).toString();
      wrap.appendChild(b);
    }
    if (!document.getElementById('cwRiseStyle')) {
      const style = document.createElement('style');
      style.id = 'cwRiseStyle';
      style.innerHTML = `
        @keyframes cwRise {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-55vh) rotate(12deg); }
          100% { transform: translateY(-110vh) rotate(24deg); }
        }
      `;
      document.head.appendChild(style);
    }
  })();

  // Smooth scroll for anchors
  safeAll('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    a.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // FAQ toggle
  safeAll('.faq .faq-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      if (!answer) return;
      const open = answer.style.display === 'block';
      safeAll('.faq .faq-a').forEach((a) => (a.style.display = 'none'));
      answer.style.display = open ? 'none' : 'block';
      if (!open) setTimeout(() => btn.scrollIntoView({ behavior: 'smooth', block: 'center' }), 220);
    });
  });

  // Simple status tracker (by phone) - demo
  const progressSteps = Array.from(document.querySelectorAll('.progress-steps .step'));
  const statusMessage = safe('#statusMessage');
  const checkBtn = safe('#checkStatus');
  const demoBtn = safe('#demoStatus');
  const phoneInput = safe('#phoneTrack');

  function resetProgress() {
    progressSteps.forEach((s) => s.classList.remove('active'));
    if (statusMessage) statusMessage.textContent = 'No status checked yet.';
  }

  function runProgressSequence(delay = 1200) {
    if (!progressSteps.length) return;
    resetProgress();
    let i = 0;
    progressSteps[i].classList.add('active');
    if (statusMessage) statusMessage.textContent = progressSteps[i].textContent;
    const iv = setInterval(() => {
      i++;
      if (i < progressSteps.length) {
        progressSteps[i].classList.add('active');
        if (statusMessage) statusMessage.textContent = progressSteps[i].textContent;
      } else {
        clearInterval(iv);
      }
    }, delay);
  }

  if (checkBtn) {
    checkBtn.addEventListener('click', () => {
      const phone = (phoneInput && phoneInput.value || '').trim();
      if (!phone) {
        alert('Please enter a phone number (e.g. +2547XXXXXXX).');
        return;
      }
      // demo behaviour: run the visual sequence
      runProgressSequence(1000);
    });
  }
  if (demoBtn) demoBtn.addEventListener('click', () => runProgressSequence(900));

  // Contact message builders
  const waNumber = '254791955920';
  function buildContactMessageParts() {
    const name = (safe('#contactName') && safe('#contactName').value.trim()) || '';
    const phone = (safe('#contactPhone') && safe('#contactPhone').value.trim()) || '';
    const note = (safe('#contactNote') && safe('#contactNote').value.trim()) || '';
    const parts = [];
    if (name) parts.push('Name: ${name}');
    if (phone) parts.push('Phone: ${phone}');
    if (note) parts.push('Details: ${note}');
    return parts;
  }

  // Send via WhatsApp (opens chat)
  const sendWa = safe('#sendWa');
  if (sendWa) {
    sendWa.addEventListener('click', () => {
      const parts = buildContactMessageParts();
      const text = parts.length ? parts.join('\n') : 'Hello CrystalWash, I want to book a pickup.';
      const url = 'https://wa.me/${waNumber}?text=${encodeURIComponent(text)}';
      window.open(url, '_blank');
    });
  }

  // Send via SMS (opens sms app on mobile)
  const sendSms = safe('#sendSms');
  if (sendSms) {
    sendSms.addEventListener('click', () => {
      const parts = buildContactMessageParts();
      const text = parts.length ? parts.join(' | ') : 'Hello CrystalWash, I want to book a pickup.';
      const smsUrl = 'sms:+${waNumber}?body=${encodeURIComponent(text)}';
      window.open(smsUrl, '_blank');
    });
  }

  // Hero Book Now -> WhatsApp quick chat
  const heroBook = safe('#heroBook');
  if (heroBook) {
    heroBook.addEventListener('click', (e) => {
      e.preventDefault();
      const pre = encodeURIComponent('Hello CrystalWash, I want to book a pickup.');
      window.open('https://wa.me/${waNumber}?text=${pre}', '_blank');
    });
  }

  // Sidebar quick WA (if present)
  const waBtn = safe('#waBtn');
  if (waBtn) {
    waBtn.addEventListener('click', (e) => {
      const href = waBtn.getAttribute('href') || 'https://wa.me/${waNumber}';
      window.open(href, '_blank');
      e.preventDefault();
    });
  }

  // guard anchors that are '#'
  safeAll('a[href="#"]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
});