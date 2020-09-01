
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

});
