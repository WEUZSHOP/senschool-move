/* script.js — slider, hamburger, whatsapp, testimonies, QA toggle */

document.addEventListener('DOMContentLoaded', ()=> {
  /* HERO SLIDER */
  const slider = document.getElementById('heroSlider');
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  let current = 0;
  const total = slides.length;
  const nextBtn = document.getElementById('nextSlide');
  const prevBtn = document.getElementById('prevSlide');

  function showSlide(idx){
    slider.style.transform = `translateX(-${idx * 100}%)`;
  }
  function next(){
    current = (current + 1) % total;
    showSlide(current);
  }
  function prev(){
    current = (current - 1 + total) % total;
    showSlide(current);
  }
  let heroInterval = setInterval(next, 5000);
  if(nextBtn) nextBtn.addEventListener('click', ()=>{ next(); resetInterval(); });
  if(prevBtn) prevBtn.addEventListener('click', ()=>{ prev(); resetInterval(); });

  function resetInterval(){
    clearInterval(heroInterval);
    heroInterval = setInterval(next, 5000);
  }

  /* SCROLL BUTTONS IN HERO */
  document.querySelectorAll('[data-scroll]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const sel = e.currentTarget.getAttribute('data-scroll');
      const el = document.querySelector(sel);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  /* HAMBURGER MENU */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navList  = document.getElementById('navList');

  // Évite les doublons et cible exactement votre <ul id="navList">
  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      navList.classList.toggle('open');
    });
  }
});



 // Numéro WhatsApp (format international sans +)
const whatsappNumber = '221XXXXXXXX'; // remplace par ton vrai numéro

// Fonction universelle pour ouvrir WhatsApp
function openWhatsAppWith(message) {
  const text = encodeURIComponent(message);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Mobile → ouvre l'application WhatsApp si installée, sinon WhatsApp Web
    window.location.href = `https://wa.me/${whatsappNumber}?text=${text}`;
  } else {
    // Desktop → tente l'application WhatsApp Desktop, sinon Web
    const appLink = `whatsapp://send?phone=${whatsappNumber}&text=${text}`;
    const webLink = `https://wa.me/${whatsappNumber}?text=${text}`;

    // On ouvre l'app, si l'utilisateur n'a pas l'app, après 500ms on ouvre WhatsApp Web
    window.location.href = appLink;
    setTimeout(() => {
      window.open(webLink, '_blank');
    }, 500);
  }
}

// Sélectionne tous les boutons WhatsApp ou "Commencer ma procédure" avec data-country
document.querySelectorAll('[data-country]').forEach(btn => {
  btn.addEventListener('click', () => {
    const country = btn.getAttribute('data-country');
    openWhatsAppWith(`Bonjour, je souhaite commencer ma procédure pour ${country}.`);
  });
});


  /* TESTIMONIALS — auto rotate */
  const testiSlides = Array.from(document.querySelectorAll('.testi-slide'));
  let testiIdx = 0;
  if(testiSlides.length){
    setInterval(()=>{
      testiSlides.forEach(s=> s.classList.remove('active'));
      testiSlides[testiIdx].classList.add('active');
      testiIdx = (testiIdx + 1) % testiSlides.length;
    }, 5000);
  }

  /* QA Toggle (Why section) */
  document.querySelectorAll('.qa-q').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const parent = e.currentTarget.parentElement;
      const answer = parent.querySelector('.qa-a');
      const opened = answer.style.display === 'block';
      // close all
      document.querySelectorAll('.qa-a').forEach(a=> a.style.display = 'none');
      if(!opened) answer.style.display = 'block';
    });
  });

  /* small: close mobile nav when clicking a link */
  document.querySelectorAll('.nav-list a').forEach(a=>{
    a.addEventListener('click', ()=> {
      document.querySelector('.nav-list').classList.remove('open');
    });
  });

});



