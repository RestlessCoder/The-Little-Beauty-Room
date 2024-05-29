AOS.init();

var WIDTH, HEIGHT, canvas, con, g;
var pxs = [];
var rint = 70;

document.addEventListener("DOMContentLoaded", function() {
    function windowSize() {
        var galaxyWrapper = document.querySelector('.galaxy-wrapper');
        WIDTH = galaxyWrapper.clientWidth;
        HEIGHT = galaxyWrapper.clientHeight;
        canvas = document.getElementById('galaxy');
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
    }
  
    windowSize();
  
    window.addEventListener('resize', function() {
        windowSize();
    });

    con = canvas.getContext('2d');
    for (var i = 0; i < 100; i++) {
        pxs[i] = new Circle();
        pxs[i].reset();
    }
    requestAnimationFrame(draw);
});

function draw() {
    con.clearRect(0, 0, WIDTH, HEIGHT);
    con.globalCompositeOperation = "lighter";
    for (var i = 0; i < pxs.length; i++) {
        pxs[i].fade();
        pxs[i].move();
        pxs[i].draw();
    }
    requestAnimationFrame(draw);
}

function Circle() {
    this.s = {
        ttl: 15000,
        xmax: 5,
        ymax: 2,
        rmax: 17,
        rt: 1,
        xdef: 960,
        ydef: 540,
        xdrift: 2,
        ydrift: 2,
        random: true,
        blink: true
    };
    this.reset = function() {
        this.x = (this.s.random ? WIDTH * Math.random() : this.s.xdef);
        this.y = (this.s.random ? HEIGHT * Math.random() : this.s.ydef);
        this.r = ((this.s.rmax - 1) * Math.random()) + 1;
        this.dx = (Math.random() * this.s.xmax) * (Math.random() < 0.5 ? -1 : 1);
        this.dy = (Math.random() * this.s.ymax) * (Math.random() < 0.5 ? -1 : 1);
        this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
        this.rt = Math.random() * this.hl;
        this.s.rt = Math.random() + 1;
        this.stop = Math.random() * 0.2 + 0.4;
        this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
        this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
    };
    this.fade = function() {
        this.rt += this.s.rt;
    };
    this.draw = function() {
        if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt * -1;
        else if (this.rt >= this.hl) this.reset();
        var newo = 1 - (this.rt / this.hl);
        con.beginPath();
        con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        con.closePath();
        var cr = this.r * newo;
        g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        g.addColorStop(0.0, 'rgba(193,254,254,' + newo + ')');
        g.addColorStop(this.stop, 'rgba(193,254,254,' + (newo * 0.2) + ')');
        g.addColorStop(1.0, 'rgba(193,254,254,0)');
        con.fillStyle = g;
        con.fill();
    };
    this.move = function() {
        this.x += (this.rt / this.hl) * this.dx;
        this.y += (this.rt / this.hl) * this.dy;
        if (this.x > WIDTH || this.x < 0) this.dx *= -1;
        if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
    };
    this.getX = function() {
        return this.x;
    };
    this.getY = function() {
        return this.y;
    };
}



/* Mobile Navigation */
const menuBarOpenButtonIcon = document.querySelector(".menu-bar__button-trigger");
const menuBarContent = document.querySelector('.mobile-navigation__content');
const menuBarCloseButtonIcon = document.querySelector('menu-bar__close-button');
const body = document.querySelector('body');
const header = document.querySelector('header');

/* Mobile Content Navigation */
menuBarOpenButtonIcon.addEventListener("click", function () {
    menuBarContent.classList.toggle("active");
    this.classList.toggle("active");
});

addClassHeader = () => {
    header.classList.add("fixed");
}

removeClassHeader = () => {
    header.classList.remove("fixed");
}

window.addEventListener('scroll', function () {
    let getScrollposition = window.scrollY;
    if (getScrollposition > 0) {
        addClassHeader();
    } else {
        removeClassHeader();
    }
});


var swiperTestimonial;

function initSwiper() {
    
    swiperTestimonial = new Swiper('.testimonial-carousel', {
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 0,
        loop: true,
        centeredSlidesBounds: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
            1200: {
                slidesPerView: 3
            },
            740: {
                slidesPerView: 2
            },
            480: {
                slidesPerView: 1
            }
        }
    });
}

 
initSwiper();

var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}

//== Equal Height elements

function setHeight(el, val) {
    if (typeof val === 'function') val = val()
    if (typeof val === 'string') el.style.height = val
    else el.style.height = val + 'px'
  }
  
  var equalheight = function (container) {
    var currentTallest = 0,
      currentRowStart = 0,
      rowDivs = new Array(),
      // $el,
      topPosition = 0
  
    Array.from(document.querySelectorAll(container)).forEach((el, i) => {
      el.style.height = 'auto'
      topPosition = el.offsetTop
      if (currentRowStart != topPosition) {
        for (let currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
          setHeight(rowDivs[currentDiv], currentTallest)
        }
        rowDivs.length = 0
        currentRowStart = topPosition
        currentTallest = parseFloat(getComputedStyle(el, null).height.replace('px', ''))
        rowDivs.push(el)
      } else {
        rowDivs.push(el)
        currentTallest =
          currentTallest < parseFloat(getComputedStyle(el, null).height.replace('px', ''))
            ? parseFloat(getComputedStyle(el, null).height.replace('px', ''))
            : currentTallest
      }
      for (let currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
        setHeight(rowDivs[currentDiv], currentTallest)
      }
    })
  }
  
  window.addEventListener('load', function () {
    equalheight('.eq')
  })
  
  window.addEventListener('resize', function () {
    setTimeout(function () {
      equalheight('.eq')
    })
  })
  
  