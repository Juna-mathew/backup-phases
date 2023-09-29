///////////////////////////////Header///////////////////////////

// define all UI variable
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.site-navbar ul');
const navLinks = document.querySelectorAll('.site-navbar a');

// load all event listners
allEventListners();

// functions of all event listners
function allEventListners() {
  // toggler icon click event
  navToggler.addEventListener('click', togglerClick);
  // nav links click event
  navLinks.forEach(elem => elem.addEventListener('click', navLinkClick));
}

// togglerClick function
function togglerClick() {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('open');
}

// navLinkClick function
function navLinkClick() {
  if (navMenu.classList.contains('open')) {
    navToggler.click();
  }
}

//magnific popup 

$('.popup-youtube').magnificPopup({
  disableOn: 700,
  type: 'iframe',
  mainClass: 'mfp-fade',
  removalDelay: 160,
  preloader: false,
  fixedContentPos: false
});

/////////////////////////////////////Testimonial slider////////////////////////
var testimonial = new Swiper(".testimonial-wrap .swiper", {
  
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});

/////////////////////////////////////Gallery slider////////////////////////
var testimonial = new Swiper(".gallery-wrap .swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


// $('.gallery-popup').magnificPopup({
//   type: 'image',
//   mainClass: 'mfp-with-zoom',
//   gallery: {
//     enabled: true
//   },

//   zoom: {
//     enabled: true,
//     duration: 300, 


//     opener: function (openerElement) {

//       return openerElement.is('img') ? openerElement : openerElement.find('img');
//     }
//   }

// });



function openTab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();
//////////////////////////////// Scroll to top////////////////////////////
$(document).ready(function () {

  var toTop = $('.scroll-to-top');
  toTop.on('click', function () {
    $('html, body').animate({
      scrollTop: $('html, body').offset().top,
    });
  });

});

$(window).scroll(function() {
  if ($(window).scrollTop() > 500) {
    $('.scroll-to-top').addClass('show');
  } else {
    $('.scroll-to-top').removeClass('show');
  }
});











$(".list-heading").click(function () {
  $(".active").not(this).removeClass("active").next().slideUp(300);
  $(this).toggleClass("active").next().slideToggle(300);
});



$(document).ready(function () {
  $('ul').removeClass('list-with-green-tick');
  $('ul li ').has('span.green-tick').parent('ul').addClass('list-with-green-tick'); 
});
