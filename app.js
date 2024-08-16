AOS.init();

Fancybox.bind(document.getElementById("gallery"), "[data-fancybox]", {
    // Your custom options
    wheel: "slide"
});

Fancybox.bind(document.getElementById("gallery-slide"), "[data-fancybox]", {
    // Your custom options
    wheel: "slide",
});

var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}


let WIDTH, HEIGHT, canvas, con, g;
let pxs = [];
let rint = 70;

document.addEventListener("DOMContentLoaded", function() {
    function windowSize() {      
        if (document.querySelector('.galaxy-wrapper') != undefined){
            var galaxyWrapper = document.querySelector('.galaxy-wrapper');
            WIDTH = galaxyWrapper.clientWidth;
            HEIGHT = galaxyWrapper.clientHeight;
            canvas = document.getElementById('galaxy');
            canvas.width = WIDTH;
            canvas.height = HEIGHT;      
        }
    }
  
    windowSize();
  
    window.addEventListener('resize', function() {
        windowSize();
    });
    if (document.getElementById('galaxy') != undefined){
        con = canvas.getContext('2d');
        for (var i = 0; i < 100; i++) {
            pxs[i] = new Circle();
            pxs[i].reset();
        }
        requestAnimationFrame(draw);
    }
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

window.onload = function(){
	//canvas init
	var canvas = document.getElementById("snow");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//snowflake particles
	var mp = 50; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*4+1, //radius
			d: Math.random()*mp //density
		})
	}
	
	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);
		
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		update();
	}
	
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
	
	//animation loop
	setInterval(draw, 33);
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
var swiperGallery;

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

    swiperTestimonial = new Swiper('.gallery-carousel', {
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 20,
        loop: true,
        speed: 1800,
        centeredSlidesBounds: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            1800: {
                slidesPerView: 4
            },
            1200: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 0
            },
            550: {
                slidesPerView: 1,
                spaceBetween: 30
            }
        }
    });
}

 
initSwiper();

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

function scrollTo(element) {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop - 250
    });
}

if (document.querySelector(".smooth-scroll") != null) {
    document.querySelector(".smooth-scroll").addEventListener('click', (e) => {
        e.preventDefault();
        if (document.querySelector("#services") != null) {
            scrollTo(document.querySelector("#services"));
        }
    });
}

  
const activeClassList = ["max-h-[1600px]", "overflow-visible"]

document.addEventListener("click", e => {
    if (!e.target.matches(".accordion-button-trigger")) return

    const accordion = e.target.closest(".accordion");
    const accordionBody = accordion.querySelector(".accordion-body");

    e.target.classList.toggle("rotate-180");

    toggleClasses(accordionBody, activeClassList);
});

function toggleClasses(element, classArray) {
    classArray.map(itemClass => {
        element.classList.toggle(itemClass)
    });
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

document.addEventListener("click", (e) => {
    if(!e.target.matches(".open-modal-btn")) return

    const modalAttr = e.target.dataset.modal;

    document.querySelector(`#${modalAttr}`).classList.toggle("open")
    overlay.classList.toggle("open")
})

document.addEventListener("click", (e) => {
    if(!e.target.matches(".close-modal-btn")) return

    const modalElem = e.target.parentElement.closest(".modal");

    modalElem.classList.remove("open")
    overlay.classList.remove("open")
})

document.addEventListener("click", (e) => {
    if(!e.target.matches(".overlay")) return
    modal.classList.remove("open")
    overlay.classList.remove("open")
})
