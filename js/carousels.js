$('.componentes__items').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    arrows: false,
    adaptiveHeight: true,
    adaptiveWidth: true,
    autoplay: true,
    speed: 200,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });