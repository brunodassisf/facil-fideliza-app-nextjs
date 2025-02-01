"use client";

import Slider, { Settings } from "react-slick";

type CarrouselProps = {
  children: React.ReactNode[];
};

const Carrousel: React.FC<CarrouselProps> = ({ children }) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    //autoplay: true,
  };
  return (
    <div className="container m-auto">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default Carrousel;
