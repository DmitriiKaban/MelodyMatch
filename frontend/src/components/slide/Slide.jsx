import "./Slide.scss";
import Slider from "infinite-react-carousel";

const Slide = ({
  children,
  slidesToShow,
  arrowsScroll,
  autoplay,
  autoplaySpeed,
  pauseOnHover,
}) => {
  return (
    <div className="slide">
      <div className="container">
        <Slider
          slidesToShow={slidesToShow}
          arrowsScroll={arrowsScroll}
          autoplay={autoplay}
          autoplaySpeed={autoplaySpeed}
          pauseOnHover={pauseOnHover}
        >
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
