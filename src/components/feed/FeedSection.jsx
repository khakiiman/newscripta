import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';

import { getFeedSection } from '../../utils/api';

import Heading from '../common/Heading';
import FeedCard from './FeedCard';

import 'swiper/css';
import 'swiper/css/pagination';

export default function FeedSection({section}) {
  const [articles, setArticles] = useState([]);

  useEffect(()=>{
    getFeedSection(section.id)
    .then(res => {
      setArticles(res.response.results)
      console.log(articles);
    })
    .catch(e => console.log(e))
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className='text-left feed-section'>
      <Heading text={section.title} />
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        modules={[Navigation]}
        navigation={true} 
        className="mySwiper"
      >
        {articles.map((article, index) => (
          <SwiperSlide
            key={index}
            className='w-[500px] h-[300px]'
          >
            <FeedCard item={article}/>
          </SwiperSlide>
        ))}
        <SwiperSlide className='w-[200px] bg-gray-600'>Slide 1</SwiperSlide>
        <SwiperSlide className='w-[200px] bg-gray-600'>Slide 2</SwiperSlide>
        <SwiperSlide className='w-[200px] bg-gray-600'>Slide 3</SwiperSlide>
        <SwiperSlide className='w-[200px] bg-gray-600'>Slide 4</SwiperSlide>
        <SwiperSlide className='w-[200px] bg-gray-600'>Slide 5</SwiperSlide>
        <SwiperSlide className='w-[200px] bg-gray-600'>Slide 6</SwiperSlide>
        <SwiperSlide className='w-[200px] bg-gray-600'>Slide 7</SwiperSlide>
        <SwiperSlide className='w-[200px] bg-gray-600'>Slide 8</SwiperSlide>
        <SwiperSlide className='w-[200px] bg-gray-600'>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
}
