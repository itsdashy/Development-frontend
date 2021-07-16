/* components/DevelopmentImages/index.js */
import React, { useState } from 'react';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";

function DevelopmentOpeningHours(props) {
	const development = props.development;
	const [activeIndex, setActiveIndex] = useState(0);
	const [animating, setAnimating] = useState(false);
	
	let carouselItems = [];
	Object.keys(development.images).map(function(object, i){
		carouselItems.push(process.env.NEXT_PUBLIC_API_URL+development.images[object].url);
	});

	const next = () => {
		if (animating) return;
		const nextIndex = activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	}

	const previous = () => {
		if (animating) return;
		const nextIndex = activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	}

	const goToIndex = (newIndex) => {
		if (animating) return;
		setActiveIndex(newIndex);
	}

	const slides = carouselItems.map((item) => {
		return (
		  <CarouselItem
			onExiting={() => setAnimating(true)}
			onExited={() => setAnimating(false)}
			key={item}
		  >
			<img src={item} alt="" />
		  </CarouselItem>
		);
	});
		
    return (
      <>
		  <style>
			{`
				.carousel {
					margin-bottom: 1rem;
				}
				.carousel-item > img { 
					width: 100%;
				}
				.carousel-control-prev,.carousel-control-next {
					cursor:pointer;
				}
				.text-uppercase {
					text-transform: uppercase;
				}
			`}
		  </style>
			<Carousel
			  activeIndex={activeIndex}
			  next={next}
			  previous={previous}
			>
			  <CarouselIndicators items={carouselItems} activeIndex={activeIndex} onClickHandler={goToIndex} />
			  {slides}
			  <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
			  <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
			</Carousel>
      </>
    );
}
export default DevelopmentOpeningHours;