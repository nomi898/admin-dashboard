// components/MySwiper.jsx
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    type: 'custom',
    content: (
      <div className="w-full sm:max-w-3xl text-white">
        <p className="text-sm">September 12-22</p>
        <h2 className="text-2xl sm:text-4xl font-bold mt-2 leading-snug">
          Enjoy free home <br /> delivery in this summer
        </h2>
        <p className="text-sm mt-2 opacity-90">
          Designer Dresses - Pick from trendy Designer Dress.
        </p>
        <button className="mt-5 bg-orange-400 px-6 py-3 rounded-lg font-semibold hover:bg-orange-500 transition">
          Get Started
        </button>
      </div>
    ),
    bgColor: '#4980ff',
  },
  { type: 'image', image: '/images/slide2.jpg' },
  { type: 'image', image: '/images/slide3.jpg' },
];

const Heroswiper = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0} // no spacing between slides
        slidesPerView={1} // always one slide at a time
        navigation
        pagination={{ clickable: true }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full relative">
            {slide.type === 'custom' ? (
              <div
                className="w-full h-80 md:h-96 lg:h-[500px] flex items-center justify-center"
                style={{ backgroundColor: slide.bgColor }}
              >
                {slide.content}
              </div>
            ) : (
              <div className="w-full h-80 md:h-96 lg:h-[500px] overflow-hidden">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Heroswiper;
