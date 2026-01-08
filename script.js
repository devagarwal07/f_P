// let list = document.querySelectorAll(".list");
// let items = document.querySelectorAll(".p-card");
// let count = document.getElementById("count");
// console.log(items.length);
// console.log(list.length);
// for (let i = 0; i < list.length; i++) {
//   list[i].addEventListener("click", function () {
//     let x = 0;
//     for (let j = 0; j < list.length; j++) {
//       list[j].classList.remove("active");
//     }
//     this.classList.add("active");
//     let dataFilter = this.getAttribute("data-filter");
//     for (let k = 0; k < items.length; k++) {
//       items[k].classList.add("hide");
//       items[k].classList.remove("active");

//       if (
//         items[k].getAttribute("data-item") == dataFilter ||
//         dataFilter == "all"
//       ) {
//         items[k].classList.add("p-card");
//         items[k].classList.remove("hide");
//         x++;
//       }
//     }
//     // count.innerText = `${x} Items Found`;
//     // if (dataFilter == "all") {
//     //   count.innerText = ``;
//     // }
//   });
// }
let list = document.querySelectorAll(".list");
let items = document.querySelectorAll(".p-card");
let count = document.getElementById("count");

for (let i = 0; i < list.length; i++) {
  list[i].addEventListener("click", function () {
    let x = 0;
    for (let j = 0; j < list.length; j++) {
      list[j].classList.remove("active");
    }
    this.classList.add("active");

    let dataFilter = this.getAttribute("data-filter");

    items.forEach((item) => {
      let categories = JSON.parse(item.getAttribute("data-item"));
      item.classList.add("hide");
      item.classList.remove("active");

      if (dataFilter === "all" || categories.includes(dataFilter)) {
        item.classList.remove("hide");
        item.classList.add("p-card");
        x++;
      }
    });

    // Optional: show count
    // count.innerText = dataFilter === "all" ? "" : `${x} Items Found`;
  });
}

// Add this to your existing script.js file

let navlist = document.querySelectorAll(".nav-bar li");
let Imgs = document.querySelectorAll(".icon-img");
let Imgsrc = document.getElementById("icon-i").src;
let ImgDark = [];
let ImgLight = [];
for (let i = 0; i < Imgs.length; i++) {
  const element = Imgs[i].src;
  ImgLight[i] = Imgs[i].src;

  // Handle both PNG and SVG files
  if (element.includes(".png")) {
    ImgDark[i] = element.split(".png")[0] + "-active.png";
  } else if (element.includes(".svg")) {
    ImgDark[i] = element.split(".svg")[0] + "-active.svg";
  }
}

// Handle certificate icons
let certIcons = document.querySelectorAll(".cert-icon img");
let certIconsLight = [];
let certIconsDark = [];
for (let i = 0; i < certIcons.length; i++) {
  const element = certIcons[i].src;
  certIconsLight[i] = certIcons[i].src;
  certIconsDark[i] = element.split(".svg")[0] + "-active.svg";
}

// Handle achievement icons
let achievementIcons = document.querySelectorAll(".achievement-icon img");
let achievementIconsLight = [];
let achievementIconsDark = [];
for (let i = 0; i < achievementIcons.length; i++) {
  const element = achievementIcons[i].src;
  achievementIconsLight[i] = achievementIcons[i].src;
  achievementIconsDark[i] = element.split(".svg")[0] + "-active.svg";
}
for (let i = 0; i < navlist.length; i++) {
  const element = navlist[i];
  element.addEventListener("click", () => {
    // Reset all navigation icons
    for (let j = 0; j < navlist.length; j++) {
      Imgs[j].src = ImgLight[j];
      navlist[j].classList.remove("active-li");
    }

    // Set active navigation icon
    Imgs[i].src = ImgDark[i];
    navlist[i].classList.add("active-li");

    // Handle certificate icons based on active section
    if (navlist[i].querySelector('a')?.getAttribute('href') === '#certifications-page') {
      // Activate certificate icons
      for (let j = 0; j < certIcons.length; j++) {
        certIcons[j].src = certIconsDark[j];
      }
    } else {
      // Reset certificate icons
      for (let j = 0; j < certIcons.length; j++) {
        certIcons[j].src = certIconsLight[j];
      }
    }

    // Handle achievement icons based on active section
    if (navlist[i].querySelector('a')?.getAttribute('href') === '#achievements-page') {
      // Activate achievement icons
      for (let j = 0; j < achievementIcons.length; j++) {
        achievementIcons[j].src = achievementIconsDark[j];
      }
    } else {
      // Reset achievement icons
      for (let j = 0; j < achievementIcons.length; j++) {
        achievementIcons[j].src = achievementIconsLight[j];
      }
    }
  });
}
let menuButton = document.getElementById("nav-m");
menuButton.addEventListener("click", () => {
  for (let i = 0; i < navlist.length; i++) {
    navlist[i].style.display = "flex";
  }
  menuButton.style.display = "none";
  setTimeout(() => {
    for (let i = 0; i < navlist.length; i++) {
      navlist[i].style.display = "none";
    }
    menuButton.style.display = "flex";
  }, 3000);
});
let sections = document.querySelectorAll(".section");
let ids = [];
for (let i = 0; i < sections.length; i++) {
  const element = sections[i];
  ids[i] = element.getAttribute("id");
}

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    top+=300;
    if (top >= offset && top < offset + height) {
      // Reset all navigation icons
      for (let j = 0; j < navlist.length; j++) {
        Imgs[j].src = ImgLight[j];
        navlist[j].classList.remove("active-li");
      }

      let index = ids.indexOf(id);
      index++;
      Imgs[index].src = ImgDark[index];
      navlist[index].classList.add("active-li");

      // Handle certificate icons based on active section
      if (id === 'certifications-page') {
        // Activate certificate icons
        for (let j = 0; j < certIcons.length; j++) {
          certIcons[j].src = certIconsDark[j];
        }
      } else {
        // Reset certificate icons
        for (let j = 0; j < certIcons.length; j++) {
          certIcons[j].src = certIconsLight[j];
        }
      }

      // Handle achievement icons based on active section
      if (id === 'achievements-page') {
        // Activate achievement icons
        for (let j = 0; j < achievementIcons.length; j++) {
          achievementIcons[j].src = achievementIconsDark[j];
        }
      } else {
        // Reset achievement icons
        for (let j = 0; j < achievementIcons.length; j++) {
          achievementIcons[j].src = achievementIconsLight[j];
        }
      }
    }
  });
};
//animations

function page1() {
  var tl = gsap.timeline();
  tl.from(".social-icon", {
    x: -300,
    duration: 0.5,
    stagger: 0.1,
    opacity: 0,
    ease: "none",
  });
  tl.from(".heading.m", {
    opacity: 0,
    y: -200,
    duration: 0.3,
  });
  tl.from(".proffesion.m", {
    y: -80,
    opacity: 0,
    duration: 0.3,
  });
  tl.from(".about-me", {
    opacity: 0,
    x: -80,
    duration: 0.2,
  });
  tl.to(".btn111", {
    opacity: 1,
    duration: 0.8,
  });
  tl.from(
    ".profileImg",
    {
      opacity: 0,
      x: 100,
      duration: 2,
      ease: "elastic.out",
    },
    "-=1"
  );
  tl.from(".scroll-down", {
    opacity: 0,
    y: -30,
    duration: 0.2,
    ease: "elastic.out",
  });
}
// page1();
function page2() {
  var tl = gsap.timeline();
  tl.from("#about-me-page .page-heading", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".page-heading",
      scrub: 2,
      start: "top 50%",
      end: "top 20%",
    },
    x: -200,
    opacity: 0,
  });
  tl.from("#about-me-page .page-subheading", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".page-subheading",
      scrub: 2,
      start: "top 50%",
      end: "top 20%",
    },
    x: 300,
    opacity: 0,
  });

  tl.from(".ab-left img", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".ab-left img",
      scrub: 2,
      start: "top 80%",
      end: "top 30%",
    },
    opacity: 0,
    borderRadius: "80px",
    scale: 0.7,
  });
  tl.from(".ab-right", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".ab-right",
      scrub: 2,
      start: "top 70%",
      end: "top 30%",
    },
    opacity: 0,
  });
}
function page3() {
  gsap.from(".skills.page-heading", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".skills.page-heading",
      scrub: 2,
      start: "top 80%",
      end: "top 60%",
    },
    x: -200,
    opacity: 0,
  });
  gsap.from(".skills.page-subheading", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".skills.page-subheading",
      scrub: 2,
      start: "top 80%",
      end: "top 60%",
    },
    x: 300,
    opacity: 0,
  });
  gsap.from(".l .skill", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".l .skill",
      scrub: 2,
      start: "top 90%",
      end: "top 50%",
    },
    x: -300,
    opacity: 0,
    stagger: 0.3,
  });
  gsap.from(".r .skill", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".r .skill",
      scrub: 2,
      start: "top 90%",
      end: "top 50%",
    },
    x: 300,
    opacity: 0,
    stagger: 0.3,
  });
  // Tech scroll animations with GSAP
  const track1 = document.getElementById('track1');
  const track2 = document.getElementById('track2');
  const scrollText = document.getElementById('scrollText');

  // Default animation speeds
  let track1Speed = 50;
  let track2Speed = 50;
  let textSpeed = 80;
  let lastScrollTop = 0;
  let scrollDirection = 'down';

  // Initialize GSAP animations
  function initTechScrollAnimations() {
    // Clear any existing animations
    gsap.killTweensOf([track1, track2, scrollText]);

    // Set initial positions
    gsap.set(track1, { x: 0 });
    gsap.set(track2, { x: -(track2.offsetWidth / 3) });
    gsap.set(scrollText, { x: 0 });

    // Create infinite animations
    animateTrack1();
    animateTrack2();
    animateScrollText();
  }

  function animateTrack1() {
    gsap.to(track1, {
      x: -(track1.offsetWidth / 3),
      duration: track1Speed,
      ease: "none",
      repeat: -1,
      onRepeat: function() {
        // Reset position for seamless loop
        gsap.set(track1, { x: 0 });
      }
    });
  }

  function animateTrack2() {
    gsap.to(track2, {
      x: 0,
      duration: track2Speed,
      ease: "none",
      repeat: -1,
      onRepeat: function() {
        // Reset position for seamless loop
        gsap.set(track2, { x: -(track2.offsetWidth / 3) });
      }
    });
  }

  function animateScrollText() {
    gsap.to(scrollText, {
      x: -(scrollText.offsetWidth / 2),
      duration: textSpeed,
      ease: "none",
      repeat: -1
    });
  }

  // Initialize animations when the page loads
  window.addEventListener('load', initTechScrollAnimations);

  // Update animation based on scroll direction and speed
  window.addEventListener('scroll', function() {
    const st = window.scrollY || document.documentElement.scrollTop;

    // Determine scroll direction
    if (st > lastScrollTop) {
      // Scrolling down
      scrollDirection = 'down';

      // Speed up animations and change directions
      gsap.killTweensOf(track1);
      gsap.killTweensOf(track2);

      gsap.to(track1, {
        x: -(track1.offsetWidth / 3),
        duration: track1Speed * 0.6,
        ease: "none",
        repeat: -1
      });

      gsap.to(track2, {
        x: 0,
        duration: track2Speed * 0.6,
        ease: "none",
        repeat: -1
      });

    } else if (st < lastScrollTop) {
      // Scrolling up
      scrollDirection = 'up';

      // Speed up animations and reverse directions
      gsap.killTweensOf(track1);
      gsap.killTweensOf(track2);

      gsap.to(track1, {
        x: 0,
        duration: track1Speed * 0.6,
        ease: "none",
        repeat: -1
      });

      gsap.to(track2, {
        x: -(track2.offsetWidth / 3),
        duration: track2Speed * 0.6,
        ease: "none",
        repeat: -1
      });
    }

    // Store current scroll position
    lastScrollTop = st <= 0 ? 0 : st;

    // Reset animation speed after scrolling stops
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(function() {
      gsap.killTweensOf([track1, track2]);

      if (scrollDirection === 'down') {
        gsap.to(track1, {
          x: -(track1.offsetWidth / 3),
          duration: track1Speed,
          ease: "none",
          repeat: -1
        });

        gsap.to(track2, {
          x: 0,
          duration: track2Speed,
          ease: "none",
          repeat: -1
        });
      } else {
        gsap.to(track1, {
          x: 0,
          duration: track1Speed,
          ease: "none",
          repeat: -1
        });

        gsap.to(track2, {
          x: -(track2.offsetWidth / 3),
          duration: track2Speed,
          ease: "none",
          repeat: -1
        });
      }
    }, 200);
  });
}

function page4() {
  gsap.from(".portf .page-heading", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".portf .page-heading",
      scrub: 2,
      start: "top 80%",
      end: "top 60%",
    },
    x: -200,
    opacity: 0,
  });
  gsap.from(".portf .page-subheading", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".portf .page-subheading",
      scrub: 2,
      start: "top 80%",
      end: "top 60%",
    },
    x: 300,
    opacity: 0,
  });
  // gsap.from(".portfolio-btns", {
  //   scrollTrigger: {
  //     scroller: "body",
  //     trigger: ".portfolio-btns ul .list",
  //     scrub: 2,
  //     start: "top 80%",
  //     end: "top 40%",
  //     markers:true
  //   },
  //   y: -30,
  //   // x: -50,
  //   opacity: 0,
  //   stagger: 0.3,
  //   ease: "none",
  // });
  // gsap.from(".p-card", {
  //   scrollTrigger: {
  //     scroller: "body",
  //     trigger: ".portfolio-btns .list",
  //     scrub: 2,
  //     start: "top 80%",
  //     end: "top 40%",
  //     // markers:true
  //   },
  //   rotateY: "90deg",
  //   stagger: 1,
  //   duration: 2,
  // });
}
function page5() {
  gsap.from("#contact-me-page .page-heading", {
    scrollTrigger: {
      scroller: "body",
      trigger: "#contact-me-page .page-heading",
      scrub: 2,
      start: "top 80%",
      end: "top 60%",
    },
    x: -200,
    opacity: 0,
  });

  gsap.from("#contact-me-page .page-subheading", {
    scrollTrigger: {
      scroller: "body",
      trigger: "#contact-me-page .page-subheading",
      scrub: 2,
      start: "top 80%",
      end: "top 60%",
    },
    x: 300,
    opacity: 0,
  });

  // Animate contact sections
  gsap.from(".c-cards", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".c-cards",
      start: "top 90%",
      end: "top 70%",
      scrub: 1,
    },
    x: -50,
    opacity: 0,
  });

  // Animate contact cards with staggered effect
  gsap.from(".cm-card", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".cm-card",
      start: "top 90%",
      end: "top 70%",
      scrub: 1,
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
  });

  // Animate form
  gsap.from(".cform", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".cform",
      start: "top 90%",
      end: "top 70%",
      scrub: 1,
    },
    x: 50,
    opacity: 0,
  });

  // Animate map
  gsap.from(".map-container", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".map-container",
      start: "top 90%",
      end: "top 60%",
      scrub: 1,
    },
    y: 30,
    opacity: 0,
    scale: 0.95,
  });

  // Animate map heading
  gsap.from(".map-heading", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".map-container",
      start: "top 85%",
      end: "top 65%",
    },
    y: -20,
    opacity: 0,
    delay: 0.3,
    duration: 0.8,
    ease: "power2.out"
  });

  // Animate map iframe with a bounce effect
  gsap.from(".embed-map-frame", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".map-container",
      start: "top 85%",
      end: "top 65%",
    },
    scale: 0.8,
    opacity: 0.5,
    delay: 0.5,
    duration: 1,
    ease: "elastic.out(1, 0.5)"
  });
}

function page6() {
  // Experience page animations
  gsap.from("#experience-page .page-heading", {
    scrollTrigger: {
      scroller: "body",
      trigger: "#experience-page .page-heading",
      scrub: 2,
      start: "top 80%",
      end: "top 60%",
    },
    x: -200,
    opacity: 0,
  });

  gsap.from("#experience-page .page-subheading", {
    scrollTrigger: {
      scroller: "body",
      trigger: "#experience-page .page-subheading",
      scrub: 2,
      start: "top 80%",
      end: "top 60%",
    },
    x: 300,
    opacity: 0,
  });

  // Animate timeline
  gsap.from(".timeline::before", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".timeline",
      start: "top 80%",
      end: "bottom 60%",
      scrub: 1,
    },
    height: 0,
    ease: "power1.inOut",
  });

  // Animate timeline items with staggered effect
  gsap.from(".timeline-item", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".timeline",
      start: "top 80%",
      end: "bottom 60%",
      scrub: 1,
    },
    opacity: 0,
    y: 50,
    stagger: 0.3,
  });

  // Animate timeline dots
  gsap.from(".timeline-dot", {
    scrollTrigger: {
      scroller: "body",
      trigger: ".timeline",
      start: "top 80%",
      end: "bottom 60%",
      scrub: 1,
    },
    scale: 0,
    opacity: 0,
    stagger: 0.3,
  });
}

function page7() {
  // Certifications page animations
  gsap.from("#certifications-page .page-heading", {
    scrollTrigger: {
      scroller: "body",
      trigger: "#certifications-page .page-heading",
      scrub: 2,
      start: "top 80%",
      end: "top 60%",
    },
    x: -200,
    opacity: 0,
  });

  gsap.from("#certifications-page .page-subheading", {
    scrollTrigger: {
      scroller: "body",
      trigger: "#certifications-page .page-subheading",
      scrub: 2,
      start: "top 80%",
      end: "top 60%",
    },
    x: 300,
    opacity: 0,
  });

  // Animate certification cards with staggered effect - using one-time animation instead of scrub
  let certCards = gsap.utils.toArray(".cert-card");
  certCards.forEach((card, index) => {
    gsap.set(card, { opacity: 0, y: 50 });

    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out"
        });
      },
      once: true
    });
  });
}

function page8() {
  // Achievements page animations
  gsap.from("#achievements-page .page-heading", {
    scrollTrigger: {
      scroller: "body",
      trigger: "#achievements-page .page-heading",
      scrub: 2,
      start: "top 80%",
      end: "top 60%",
    },
    x: -200,
    opacity: 0,
  });

  gsap.from("#achievements-page .page-subheading", {
    scrollTrigger: {
      scroller: "body",
      trigger: "#achievements-page .page-subheading",
      scrub: 2,
      start: "top 80%",
      end: "top 60%",
    },
    x: 300,
    opacity: 0,
  });

  // Animate achievement cards with staggered effect - using one-time animation
  let achievementCards = gsap.utils.toArray(".achievement-card");
  achievementCards.forEach((card, index) => {
    // Set initial state
    gsap.set(card, { opacity: 0, y: 30, scale: 0.9 });

    // Create one-time animation on scroll
    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        // Animate card
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out"
        });

        // Animate icon separately
        let icon = card.querySelector(".achievement-icon");
        gsap.fromTo(icon,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1 + 0.2,
            ease: "back.out(1.7)"
          }
        );
      },
      once: true
    });
  });
}

page1();
page2();
page3();
page4();
page5();
page6();
page7();
page8();
