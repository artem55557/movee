
document.addEventListener("DOMContentLoaded", function() {

  const burger = document.querySelector('.burger-btn')
  const menu = document.querySelector('.menu')

  if(burger) {
    burger.addEventListener('click', event => {
      event.preventDefault()
      burger.classList.toggle('open')
      menu.classList.toggle('menu-open')

      if(menu.classList.value.includes('menu-open')) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    })
  }

//Swiper

  const swiperGas = new Swiper('#gazel', {
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  const swiperHeel = new Swiper('#heel', {
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  const swiperTruck = new Swiper ('#truck', {
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })

//tabs

  const tabLink = document.querySelectorAll('.tabs__item')

  if(tabLink.length) {
    document.querySelector(tabLink[0].getAttribute('href')).style.display = 'block'
    swiperGas.update()
    tabLink.forEach(i => {
      i.addEventListener('click', event => {
        event.preventDefault()
        tabLink.forEach( t => {
          t.classList.remove('active')
          document.querySelector(t.getAttribute('href')).style.display = 'none'
        })

        i.classList.add('active')
        const tabContent = document.querySelector(i.getAttribute('href'))
        tabContent.style.display = 'block'
        
        swiperGas.update()
        swiperHeel.update()
        swiperTruck.update()
      })
    })
  }

  //text crop/show

  const reviews = document.querySelector('.reviews')
  const textReview = reviews.querySelectorAll('._text-review')
  let textNotCrop = []
  const length = 256

  textReview.forEach( item => {
    const text = item.innerHTML
    textNotCrop.push(text)
    item.innerHTML = textCrop(text, length)
  })

  if(reviews) {
    reviews.addEventListener('click', event => {
    event.preventDefault()
    const elLink = event.target
    const elCurText = elLink.previousElementSibling
    const curText = elCurText.innerHTML

    if(elLink.dataset.more === 'read') {
      textShow(elCurText)
      elLink.innerHTML = 'Скрыть'
      elLink.dataset.more = 'hide'
    }else if(elLink.dataset.more === 'hide') {
      elCurText.innerHTML = textCrop(curText, length)
      elLink.innerHTML = 'Читать полностью'
      elLink.dataset.more = 'read'

    }
  })}


  function textCrop(text, length) {
    let result = text

    if(text.length > length) {
      result = text.substring(0, length-3) + '...'
    }
    return result
  }

  function textShow(elText) {
      const text = elText.innerHTML
      const index = textNotCrop.findIndex( t => t.includes(text.substring(0, text.length - 3)))
      elText.innerHTML = textNotCrop[index]
  }


  //scroll by anchor

  const anchors = document.querySelectorAll('.menu__link')
  let animationTime = 300;
  let framesCount = 20;
  let topOffset = 55;

  anchors.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      menu.classList.remove('menu-open')
      burger.classList.remove('open')
      document.body.style.overflow = ''
      scrollToAnchor(item);
    });
  });

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
    const header = document.querySelector('.firstscreen__header')
    if (window.pageYOffset >= 100) {
      header.style.height = '50px'
    } else {
      header.style = ''
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
        link.parentElement.classList.add('active')
      } else {
        link.parentElement.classList.remove('active')
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

});

