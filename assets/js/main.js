/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}
// Close nav menu if clicked outside
document.addEventListener('click', function (event) {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnToggle = navToggle.contains(event.target);

    // If menu is open and clicked outside of menu and toggle button
    if (navMenu.classList.contains('show-menu') && !isClickInsideMenu && !isClickOnToggle) {
        navMenu.classList.remove('show-menu');
    }
});


/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 100) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SWIPER DISCOVER ====================*/
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".discover__card");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // Add Animation Class
                observer.unobserve(entry.target); // Stop Observing After Animation
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the card is visible

    cards.forEach(card => observer.observe(card));
});

document.addEventListener("DOMContentLoaded", function () {
    function scrollToVideo() {
        let videoSection = document.getElementById('video-container');
        if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error("Element #video-container not found!");
        }
    }

    // Attach click event to all discover cards
    document.querySelectorAll(".discover__card").forEach(card => {
        card.addEventListener("click", scrollToVideo);
    });
});

// Load YouTube Iframe API
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubeVideo', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    player.setVolume(100);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                player.playVideo(); // Play when visible
                setTimeout(() => player.unMute(), 2000);
            } else {
                player.pauseVideo(); // Pause when out of view
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById('video-container'));
}

// Load YouTube API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);


/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        const menuLink = document.querySelector(`.nav__menu a[href*='${sectionId}']`);
        
        if (menuLink) { // Check if the element exists before modifying classList
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                menuLink.classList.add('active-link');
            } else {
                menuLink.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);


/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    // reset: true,
})


sr.reveal(`.home__data, .home__social-link, .home__info,
           .discover__container,
           .experience__data, .experience__overlay,
           .place__card,
           .sponsor__content,
           .footer__data, .footer__rights`,{
    origin: 'top',
    interval: 100,
})

sr.reveal(`.about__data, 
           .video__description,
           .subscribe__description`,{
    origin: 'left',
})

sr.reveal(`.about__img-overlay, 
           .video__content,
           .subscribe__form`,{
    origin: 'right',
    interval: 100,
})

const themeButton = document.getElementById('theme-button')
const themeName = document.getElementById('themeName')

const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'  

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}
themeButton.addEventListener('click', toggleTheme)
themeName.addEventListener('click', toggleTheme)



function toggleTheme() {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
}
let swiper = new Swiper(".discover__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
})

function validateForm(){
        let isValid = true;
        let inputs = document.querySelectorAll(".required"); 
    
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                isValid = false;
                input.classList.add("shake");
                input.style.border = "2px solid red";
    
                setTimeout(() => {
                    input.classList.remove("shake");
                }, 300);
            } else {
                input.style.border = "";
            }
        });
    
        if (isValid) {
            alert("ფორმა წარმატებით გაიგზავნა!"); // Show success alert
            document.getElementById("contactForm").reset(); // Reset form after successful validation
        }
    
    
}

