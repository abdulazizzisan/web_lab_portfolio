/* MENU SHOW Y HIDDEN */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* MENU SHOW */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* MENU HIDDEN */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* REMOVE MENU MOBILE */
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* ACCORDION SKILLS */
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/* PORTFOLIO SWIPER */
let swiper = new Swiper('.portfolio__container', {
    loop: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

/* SCROLL SECTIONS ACTIVE LINK */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* CHANGE BACKGROUND HEADER */
function scrollHeader(){
    const nav = document.getElementById('header')
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* SHOW SCROLL UP */
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* DARK LIGHT THEME */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

if(themeButton){
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
}

/* CONTACT FORM */
const contactForm = document.querySelector('.contact__form'),
      contactName = document.querySelector('#name'),
      contactEmail = document.querySelector('#email'),
      contactSubject = document.querySelector('#subject'),
      contactMessage = document.querySelector('#message')

if(contactForm){
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        // Basic form validation
        if(contactName.value === '' || contactEmail.value === '' || contactMessage.value === ''){
            alert('Please fill in all required fields')
            return
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(contactEmail.value)){
            alert('Please enter a valid email address')
            return
        }

        // Simulate form submission
        alert('Thank you for your message! I will get back to you soon.')
        contactForm.reset()
    })
}

/* TYPING ANIMATION */
const texts = ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'UI/UX Enthusiast']
let count = 0
let index = 0
let currentText = ''
let letter = ''

function type() {
    if (count === texts.length) {
        count = 0
    }
    currentText = texts[count]
    letter = currentText.slice(0, ++index)

    const heroSubtitle = document.querySelector('.hero__subtitle')
    if(heroSubtitle){
        heroSubtitle.textContent = letter
        heroSubtitle.style.textAlign = 'center' // Ensure centering via JS
    }
    
    if (letter.length === currentText.length) {
        count++
        index = 0
        setTimeout(type, 2000)
    } else {
        setTimeout(type, 100)
    }
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000)
})

/* SCROLL REVEAL ANIMATION */
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

// Hero animations
sr.reveal('.hero__data, .hero__img', {delay: 400})
sr.reveal('.hero__social', {delay: 600, origin: 'left'})

// About animations
sr.reveal('.about__img', {origin: 'left'})
sr.reveal('.about__data', {origin: 'right'})

// Skills animations
sr.reveal('.skills__content', {interval: 200})

// Portfolio animations
sr.reveal('.portfolio__img', {interval: 200, origin: 'left'})

// Contact animations
sr.reveal('.contact__data', {origin: 'left'})
sr.reveal('.contact__form', {origin: 'right'})

/* SMOOTH SCROLLING FOR OLDER BROWSERS */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});