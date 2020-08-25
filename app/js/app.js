document.addEventListener("DOMContentLoaded", function() {

//Swiper

  const swiperSpec = new Swiper('.swiper-container', {
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

//menu

  const burger = document.querySelector('.burger-btn')
  const menu = document.querySelector('.menu')

  if(burger) {
    burger.addEventListener('click', event => {
      event.preventDefault()
      burger.classList.toggle('open')
      menu.classList.toggle('menu--open')
      if(menu.classList.value.includes('menu--open')) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    })
  }

//scroll by anchor

  const anchors = document.querySelectorAll('.menu__link')
  const btnDown = document.querySelector('.btn-scroll-down')
  let animationTime = 300;
  let framesCount = 20;
  let topOffset = 55;

  anchors.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      menu.classList.remove('menu--open')
      burger.classList.remove('open')
      document.body.style.overflow = ''
      scrollToAnchor(item);
    });
  });

  btnDown.addEventListener('click', e => {
    e.preventDefault();
    scrollToAnchor(btnDown)
  })

  function scrollToAnchor(item) {
   
    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset - topOffset;

    let scroller = setInterval(function() {
      let scrollBy = coordY / framesCount;

      if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        window.scrollBy(0, scrollBy);
      } else {
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    }, animationTime / framesCount);
  }

//active menu link

  window.addEventListener('scroll', () => {
    const topline = document.querySelector('.main-header')
    if (window.pageYOffset >= 100) {
      topline.classList.add('fixed')
    } else {
      topline.classList.remove('fixed')
    }
    activeLinkOnScroll()
  })

  function activeLinkOnScroll() {
    for (let i = 0; i < anchors.length; i++) {
      const link = anchors[i];
      const item = document.querySelector(link.getAttribute('href'));
      const itemHeight = document.querySelector(link.getAttribute('href')).getBoundingClientRect().height;
      const itemOffset = offset(item).top;

      let itemPoint = window.innerHeight * 0.3;

      if ((pageYOffset > itemOffset - itemPoint) && pageYOffset < (itemOffset + itemHeight - itemPoint)) {
        link.classList.add('active')
      } else {
        link.classList.remove('active')
      }
    }
  }

//animation on scroll

  const animateItems = document.querySelectorAll('._amimate-items')

  if (animateItems.length > 0) {
    window.addEventListener('scroll', animateOnScroll);
    function animateOnScroll() {
      for (let i = 0; i < animateItems.length; i++) {
        const animateItem = animateItems[i];
        const animateItemHeight = animateItem.offsetHeight;
        const animateItemOffset = offset(animateItem).top;
        const animateStart = 4;

        let animateItemPoint = window.innerHeight - animateItemHeight / animateStart;
        if (animateItemHeight > window.innerHeight) {
          animateItemPoint = window.innerHeight - window.innerHeight / animateStart;
        }

        if ((pageYOffset > animateItemOffset - animateItemPoint) && pageYOffset < (animateItemOffset + animateItemHeight)) {
          animateItem.classList.add('_active')
        } else {
          // animateItem.classList.remove('_active')
        }
      }
    }
  }

//Element offset


  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  animateOnScroll();
  activeLinkOnScroll();


});
