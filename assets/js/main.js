/**
* Template Name: iPortfolio - v3.7.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()
/* Form validation*/

// const name = document.getElementById('name')
// const email = document.getElementById('email')
// const mobile = document.getElementById('mobile')
// const subject = document.getElementById('subject')
// const form = document.getElementById('submit-form')
// const errorElement = document.getElementById('error')
// var z=0;

// function CheckForBlank() {

//   if(document.getElementById('name').value==="") {
//       alert("enter something valid");
//       return false;
//   }
// }

function validate(){
if(namevalidate()==true && lnamevalidate()==true && emailvalidate()==true && mobilevalidate()==true && subjectvalidate()==true && messagevalidate()==true){

  $.ajax({
      url:"https://script.google.com/macros/s/AKfycbyw2czpWcc4FxH_7TWT0JuVNrZFYzcr-J5HE6HF/exec",
      data:$("#submit-form").serialize(),
      method:"post",
      success:function (response){
          alert("Form submitted successfully")
          window.location.reload()
          //window.location.href="https://google.com"
      },
      error:function (err){
          alert("Something Error")

      }
  })



}
}

function namevalidate(){
  var name = $('#name').val();
  var letterpattern=/^[A-Za-z]+$/;
  
  if(name==""){
      $('#namefield').html("Enter the First Name");
          return false
      }else if(name.match(letterpattern)){
      $('#namefield').html("");
          return true
      }else{
      $('#namefield').html("Enter Correct Name");
          return false
      }
  }
  function lnamevalidate(){
    var lname = $('#lname').val();
    var letterpattern=/^[A-Za-z]+$/;
    
    if(lname==""){
        $('#lnamefield').html("Enter the Last Name");
            return false
        }else if(lname.match(letterpattern)){
        $('#lnamefield').html("");
            return true
        }else{
        $('#lnamefield').html("Enter Correct Name");
            return false
        }
    }
  
  function emailvalidate(){
  var email = $('#email').val();
  var pattern = /^[^]+@[^]+\.[a-z]{2,3}$/;
  
  if(email==""){
      $('#emailfield').html("Enter the Email");
          return false
      }else if(email.match(pattern)){
      $('#emailfield').html("");
          return true
      }else{
      $('#emailfield').html("Enter Correct Email");
          return false
      }
  }
  function mobilevalidate(){
    var mobile= $('#mobile').val();
    var mobilepattern= /^\d{10}$/;
  
    if(mobile==""){
    $('#mobilefield').html("Enter Phone number");
        return false
    }else if(mobile.match(mobilepattern)){
    $('#mobilefield').html("");
        return true
    }else{
    $('#mobilefield').html("Enter Correct Phone number");
        return false
    }
  }
  function subjectvalidate(){
    var subject= $('#subject').val();
  
    if(subject==""){
    $('#subjectfield').html("Enter the subject");
        return false
    }else{
        $('#subjectfield').html("");
        return true;
    }
  }
  function messagevalidate(){
    var message= $('#message').val();
  
    if(message==""){
    $('#messagefield').html("Enter the message");
        return false
    }else{
        $('#messagefield').html("");
        return true;
    }
  }
  


// form.addEventListener('submit', (e) =>{
//   let messages = []
//   if(name.value === ''|| name.value == null){
//     messages.push('Name is required')
    
//   }

//   if(mobile.value.length <10){
//     messages.push('mobile number must contain 10 numbers')
    
//   }

//   if (messages.length >0){
//     e.preventDefault()
//     errorElement.innerText = messages.join(', ')
//   }
//   else{
//     alert("hi")
//     z=5;
//   }
// })
/* Form submission*/





