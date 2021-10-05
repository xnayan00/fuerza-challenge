import Swiper from 'swiper/bundle';

const swiper = new Swiper('#swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

export default swiper;
