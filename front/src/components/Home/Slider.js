import { useRef, useState, useEffect } from 'react';
import img1 from '../../assets/img-slider1.png';
import img2 from '../../assets/img-slider2.png';

function Slideshow() {
  const delay = 2500;
  const imgArray = [img1, img2]
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === imgArray.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {imgArray.map((img, index) => (
          <img
            className="slide"
            key={index}
            src={img}
            alt=""
          />
        ))}
      </div>

      <div className="slideshowDots">
        {imgArray.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;

