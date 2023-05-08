import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
function HomeCarousel({up}) {

  return (
    <div data-aos="zoom-in" className={'container mt-5'}>
      <Carousel 
      autoPlay={true} 
      infinite={true} 
      responsive={responsive}>
        <div
        className="carousel-css"
          style={{
            background: "blue",
            backgroundImage: `url("https://images.tokopedia.net/img/cache/730/kjjBfF/2022/2/11/4ccd283c-c4f6-4f47-886b-ad8ae8471568.jpg")`,
                      }}
        ></div>

        <div
         className="carousel-css"
          style={{
            background: "red",
            backgroundImage: `url("https://id-test-11.slatic.net/p/bef9e225fa775015347e32127ea9c070.jpg")`,
          }}
        ></div>

        <div
         className="carousel-css"
          style={{
            background: "green",
            backgroundImage: `url("https://i.pinimg.com/originals/cc/1f/a5/cc1fa59a9b1a17eb4f5774b3908c911b.jpg")`,
          }}
        ></div>
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
