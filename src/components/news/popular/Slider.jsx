import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Slide } from './Slide';
import Heading from '../../common/Heading';

import 'swiper/css';
import 'swiper/css/navigation';

export const Slider = ({items}) => {
    return (
        <>
            <Heading text1="Most" text2="Popular" />
            <div className="h-[440px] w-full">
                <Swiper 
                navigation={true} 
                autoplay={true} 
                modules={[Navigation, Autoplay]} 
                className="mySwiper">
                    {items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Slide item={item} />
                        </SwiperSlide>    
                    ))}
                </Swiper>
            </div>
        </>
    )
}
