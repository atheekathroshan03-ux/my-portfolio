document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Menu toggle for small screens
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (nav.classList.contains('open')) nav.classList.remove('open');
    });
  });

  // Rotating words (simple)
  const rotWords = document.querySelectorAll('.rot-word');
  let rIndex = 0;
  if (rotWords.length) {
    rotWords.forEach((el, i) => {
      el.style.transition = 'transform .5s, opacity .5s';
      el.style.transform = 'translateY(100%)';
      el.style.opacity = '0';
    });
    function rotateWords() {
      rotWords.forEach((el, i) => {
        el.style.transform = 'translateY(100%)';
        el.style.opacity = '0';
      });
      rotWords[rIndex].style.transform = 'translateY(0%)';
      rotWords[rIndex].style.opacity = '1';
      rIndex = (rIndex + 1) % rotWords.length;
    }
    rotateWords();
    setInterval(rotateWords, 2500);
  }

  // Intersection Observer for reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  // Blobby SVG morph (simple path generator approximation)
  // Use a few predetermined path shapes for animation
  const blobPath = [
    "M423,294Q397,338,358,372Q319,406,272,416Q225,426,180,402Q135,378,113,335Q91,292,92,241Q93,190,117,147Q141,104,189,89Q237,74,286,81Q335,88,374,120Q413,152,426,201Q439,250,423,294Z",
    "M407,306Q394,362,344,390Q294,418,247,404Q200,390,162,363Q124,336,109,293Q94,250,107,204Q120,158,157,123Q194,88,243,83Q292,78,336,106Q380,134,398,192Q416,250,407,306Z",
    "M423,294Q397,338,358,372Q319,406,272,416Q225,426,180,402Q135,378,113,335Q91,292,92,241Q93,190,117,147Q141,104,189,89Q237,74,286,81Q335,88,374,120Q413,152,426,201Q439,250,423,294Z"
  ];
  const blobEl = document.querySelector('#blob');
  if (blobEl) {
    let bi = 0;
    function animateBlob() {
      blobEl.setAttribute('d', blobPath[bi % blobPath.length]);
      bi++;
      setTimeout(animateBlob, 3500);
    }
    animateBlob();
  }


  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // simple validation
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const msg = form.elements.message.value.trim();
      if (!name || !email || !msg) {
        alert('Please fill all fields before sending.');
        return;
      }
      
      alert('Thanks, ' + name + '! Your message has been recorded locally (no server configured).');
      form.reset();
    });
  }


  document.getElementById('downloadCv').addEventListener('click', (e) => {
    e.preventDefault();
   
    const cvHref = 'Thanuja_Dilhani_CV.pdf';
    const link = document.createElement('a');
    link.href = cvHref;
    link.download = 'Thanuja_Dilhani_CV.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

// Progress bar animation on scroll
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress');
  const triggerBottom = window.innerHeight * 0.9;

  progressBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      const percent = bar.dataset.percent || parseInt(getComputedStyle(bar, '::after'));
      bar.style.setProperty('--target', percent);
      bar.querySelectorAll && (bar.style.setProperty('--w', percent + '%'));
      bar.querySelector(':scope') 
      
      bar.style.setProperty('width', '100%'); 
      bar.style.setProperty('--fill', percent + '%');
   
      bar.style.setProperty('--animated-width', percent + '%');
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.progress').forEach(p => {
    if (!p.querySelector('.barfill')) {
      const fill = document.createElement('div');
      fill.className = 'barfill';
      fill.style.height = '100%';
      fill.style.width = '0%';
      fill.style.transition = 'width 1.6s ease';
      fill.style.background = 'linear-gradient(90deg,var(--accent),#00e0ff)';
      p.appendChild(fill);
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const prog = entry.target;
        const percent = prog.dataset.percent || prog.getAttribute('data-percent') || '0';
        const fill = prog.querySelector('.barfill');
        if (fill) fill.style.width = percent + '%';
        observer.unobserve(prog);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.progress').forEach(p => observer.observe(p));
});


function submitContact(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic UX feedback only; replace this with real backend integration or email service.
  if (!name || !email || !message) {
    alert('Please fill name, email and message.');
    return;
  }

  // For demo: open mail client
  const mailto = `mailto:thanujakumarasekara@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio contact from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + '\nEmail: ' + email)}`;
  window.location.href = mailto;
}
