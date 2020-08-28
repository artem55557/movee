
document.addEventListener("DOMContentLoaded", function() {

//Swiper

  const swiperGas = new Swiper('#gazel', {
    loop: true,
    slidesPerView: 1

    // pagination: {
      // el: '.swiper-pagination',
    //   clickable: true,
    // },
  });

  const swiperHeel = new Swiper('#heel', {
    loop: true,
    slidesPerView: 1
  });

  const swiperTruck = new Swiper ('#truck', {
    loop: true,
    slidesPerView: 1
  })

  const tabLink = document.querySelectorAll('.tabs__item')

  if(tabLink.length) {
    tabLink.forEach(i => {
      i.addEventListener('click', event => {
        tabLink.forEach( t => t.classList.remove('active'))
        i.classList.add('active')
      })
    })
  }

  const textRew = document.querySelectorAll('._text-review')

  textRew.forEach( i => {
    const t = textCrop(i, 256);
    i.innerHTML = t
  })

  function textCrop(text, length) {
    return text.innerHTML.trim().slice(0, length).concat('...')
  }


});
