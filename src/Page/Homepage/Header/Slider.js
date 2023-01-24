// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useState } from "react";
// import KeyboardTab from "@mui/icons-material/KeyboardTab";
// import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace';
// import Card from '@mui/material/Card';

// export default function Carousel() {
//   const [sliderRef, setSliderRef] = useState(null);

//   const sliderSettings = {
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     infinite: false,
//   };

//   const hotelCards = [
//     {
//       imageSrc:
//         "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//       title: "Royal Suite",
//       description: "Lorem ipsum dolor sit amet, consectur dolori Lorem ipsum dolor sit amet, consectur dolori Lorem ipsum dolor sit amet, consectur dolori",
//       pricingText: "USD 299/Day",
//       features: [
//         "Free ",
//         "Free breakfast",
//         "Discounted Meals",
//         "MacBook for work use (hotel's property)",
//       ],
//     },
//     {
//       imageSrc:
//         "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//       title: "Royal Suite",
//       description: "Lorem ipsum dolor sit amet, consectur dolori Lorem ipsum dolor sit amet, consectur dolori Lorem ipsum dolor sit amet, consectur dolori",
//       pricingText: "USD 299/Day",
//       features: [
//         "Free ",
//         "Free breakfast",
//         "Discounted Meals",
//         "MacBook for work use (hotel's property)",
//       ],
//     },
//     {
//       imageSrc:
//         "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//       title: "Royal Suite",
//       description: "Lorem ipsum dolor sit amet, consectur dolori Lorem ipsum dolor sit amet, consectur dolori Lorem ipsum dolor sit amet, consectur dolori",
//       pricingText: "USD 299/Day",
//       features: [
//         "Free ",
//         "Free breakfast",
//         "Discounted Meals",
//         "MacBook for work use (hotel's property)",
//       ],
//     },
//     {
//       imageSrc:
//         "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//       title: "Royal Suite",
//       description: "Lorem ipsum dolor sit amet, consectur dolori Lorem ipsum dolor sit amet, consectur dolori Lorem ipsum dolor sit amet, consectur dolori",
//       pricingText: "USD 299/Day",
//       features: [
//         "Free ",
//         "Free breakfast",
//         "Discounted Meals",
//         "MacBook for work use (hotel's property)",
//       ],
//     },
//     {
//       imageSrc:
//         "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//       title: "Royal Suite",
//       description: "Lorem ipsum dolor sit amet, consectur dolori Lorem ipsum dolor sit amet, consectur dolori Lorem ipsum dolor sit amet, consectur dolori",
//       pricingText: "USD 299/Day",
//       features: [
//         "Free amkul",
//         "Free breakfast",
//         "Discounted Meals",
//         "MacBook for work use (hotel's property)",
//       ],
//     },
//     {
//       imageSrc:
//         "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//       title: "Royal Suite",
//       description: "Lorem ipsum dolor sit amet, consectur dolori Lorem ipsum dolor sit amet, consectur dolori Lorem ipsum dolor sit amet, consectur dolori",
//       pricingText: "USD 299/Day",
//       features: [
//         "Free ",
//         "Free breakfast",
//         "Discounted Meals",
//         "MacBook for work use (hotel's property)",
//       ],
//     },
//   ];

//   return (
//     <div className="content">
//       <Slider ref={setSliderRef} {...sliderSettings}>
//         {hotelCards.map((card, index) => (
//           <div key={index}>
//             <Card style={{ padding: '20px', borderRadius: '25px' }}>
//               <img className="profile" src="https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"></img>
//               <h2>{card.title}</h2>
//               <p>{card.description}</p>
//               <ul>
//                 {card.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </Card>
//           </div>
//         ))}
//       </Slider>
//       <div style={{ textAlign: 'center', marginTop: '50px' }}>
//         <button onClick={sliderRef?.slickPrev}>
//           <KeyboardBackspace />
//         </button>
//         <button onClick={sliderRef?.slickNext}>
//           <KeyboardTab />
//         </button>
//       </div>
//     </div>
//   );
// }


import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import QoutesIcon from '../../images/ic_quotes.png';
import StarIcon from '@mui/icons-material/Star';

export default function App() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1
    }
  };
  return (
    <div className="App custom_testimonial_slider">
      <div style={{ position: 'relative' }}>
        {/* <Carousel responsive={responsive} autoPlay={true}  loop={true}> */}
        <Carousel responsive={responsive} >
          <div className="single_testimonial">
            <div className="inner_area">
              <img
                className="profile"
                src="https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              />
              <img className="qoutesIcon" src={QoutesIcon} />
              <p>
                Such a wonderful experience, had to renew my ATPL, just had to
                call them once - submitted my document and they took care of the
                rest. Go MAV!!
              </p>
              <div className="name_rating">
                <div className="name_degi">
                  <h5>Capt. Neeraj Laungani</h5>
                  <h6>Air Arabia</h6>
                </div>
                <ul>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="single_testimonial">
            <div className="inner_area">
              <img
                className="profile"
                src="https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              />
              <img className="qoutesIcon" src={QoutesIcon} />
              <p>
                Such a wonderful experience, had to renew my ATPL, just had to
                call them once - submitted my document and they took care of the
                rest. Go MAV!!
              </p>
              <div className="name_rating">
                <div className="name_degi">
                  <h5>Capt. Neeraj Laungani</h5>
                  <h6>Air Arabia</h6>
                </div>
                <ul>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="single_testimonial">
            <div className="inner_area">
              <img
                className="profile"
                src="https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              />
              <img className="qoutesIcon" src={QoutesIcon} />
              <p>
                Such a wonderful experience, had to renew my ATPL, just had to
                call them once - submitted my document and they took care of the
                rest. Go MAV!!
              </p>
              <div className="name_rating">
                <div className="name_degi">
                  <h5>Capt. Neeraj Laungani</h5>
                  <h6>Air Arabia</h6>
                </div>
                <ul>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="single_testimonial">
            <div className="inner_area">
              <img
                className="profile"
                src="https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              />
              <img className="qoutesIcon" src={QoutesIcon} />
              <p>
                Such a wonderful experience, had to renew my ATPL, just had to
                call them once - submitted my document and they took care of the
                rest. Go MAV!!
              </p>
              <div className="name_rating">
                <div className="name_degi">
                  <h5>Capt. Neeraj Laungani</h5>
                  <h6>Air Arabia</h6>
                </div>
                <ul>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="single_testimonial">
            <div className="inner_area">
              <img
                className="profile"
                src="https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              />
              <img className="qoutesIcon" src={QoutesIcon} />
              <p>
                Such a wonderful experience, had to renew my ATPL, just had to
                call them once - submitted my document and they took care of the
                rest. Go MAV!!
              </p>
              <div className="name_rating">
                <div className="name_degi">
                  <h5>Capt. Neeraj Laungani</h5>
                  <h6>Air Arabia</h6>
                </div>
                <ul>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="single_testimonial">
            <div className="inner_area">
              <img
                className="profile"
                src="https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              />
              <img className="qoutesIcon" src={QoutesIcon} />
              <p>
                Such a wonderful experience, had to renew my ATPL, just had to
                call them once - submitted my document and they took care of the
                rest. Go MAV!!
              </p>
              <div className="name_rating">
                <div className="name_degi">
                  <h5>Capt. Neeraj Laungani</h5>
                  <h6>Air Arabia</h6>
                </div>
                <ul>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="single_testimonial">
            <div className="inner_area">
              <img
                className="profile"
                src="https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              />
              <img className="qoutesIcon" src={QoutesIcon} />
              <p>
                Such a wonderful experience, had to renew my ATPL, just had to
                call them once - submitted my document and they took care of the
                rest. Go MAV!!
              </p>
              <div className="name_rating">
                <div className="name_degi">
                  <h5>Capt. Neeraj Laungani</h5>
                  <h6>Air Arabia</h6>
                </div>
                <ul>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                  <li>
                    <StarIcon />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
