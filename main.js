/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Show menu */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Hide menu */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}


/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME SWIPER ===============*/
const swiperHome = new Swiper('.home__swiper', {
  loop: true,
  grabCursor: true,
  speed: 900,
  centeredSlides: true,

  effect: 'creative',
  creativeEffect: {
    prev: {
      translate: ['-100%', 0, -300],
      rotate: [0, 0, -15],
      opacity: 0.5,
      scale: 0.8,
	  z: -300,
    },
    next: {
      translate: ['100%', 0, -300],
      rotate: [0, 0, 15],
      opacity: 0.5,
      scale: 0.8,
	  z: -300,
    },
  },

  autoplay: {
    delay: 2800,
    disableOnInteraction: false,
  },
})

/*=============== CHANGE HEADER STYLES ===============*/
const scrollHeader = () =>{
   const header = document.getElementById('header')
   // Add the .scroll-header class if the bottom scroll of the viewport is greater than 50
   this.scrollY >= 50 ? header.classList.add('scroll-header') 
                      : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== PRODUCTS SWIPER ===============*/
const swiperTabs = new Swiper('.product__tabs', {
    slidesPerView: 'auto',
	spaceBetween: 8,
  freeMode: true,
  watchSlidesProgress: true,
})

const swiperProduct = new Swiper('.product__content', {
	loop: true,
	spaceBetween: 32,
	thumbs: {
		swiper: swiperTabs,
	}
})

/*=============== NEW SWIPER ===============*/
const swiperNew = new Swiper('.new__swiper', {
    loop: true,
    grabCursor: true,
    centeredSlides: 'auto',
    slidesPerView: 'auto',
    speed: 600,
	effect: 'creative' ,
	creativeEffect: {
		limitProgress: 2,
		prev: {
			translate: ['-32%', 0, 0],
			scale: .58,
		},
		next: {
			translate: ['32%', 0, 0],
			scale: .58,
		},
	},
    navigation: {
        nextEl: '.new .swiper-button-next',
        prevEl: '.new .swiper-button-prev',
    },
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
})
/*=============== SHOW SCROLL UP ===============*/ 


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


/*=============== SCROLL REVEAL ANIMATION ===============*/
