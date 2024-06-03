import { useMemo, useRef, useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";

const MemeCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const memesInUse = useRef<number[]>([]);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const getRandomMemeIndex = () => {
    let memeIndex;
    do {
      memeIndex = Math.floor(Math.random() * 8) + 1; // Generates random index from 1 to 8
    } while (memesInUse.current.includes(memeIndex));
    return memeIndex;
  };

  const items = useMemo(
    () =>
      Array.from({ length: 3 }, () => {
        const memeIndex = getRandomMemeIndex();
        const src = `${process.env.PUBLIC_URL}/assets/meme/meme${memeIndex}.jpg`;
        memesInUse.current = [...memesInUse.current, memeIndex];
        return {
          src,
          altText: `meme ${memeIndex}`,
          key: memeIndex,
        };
      }),
    []
  );

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.key}
      >
        <div className="d-flex justify-content-center w-100">
          <img
            src={item.src}
            alt={item.altText}
            style={{
              width: window.innerWidth * 0.5,
              height: window.innerHeight * 0.75,
              objectFit: "fill",
            }}
          />
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel
      className="w-100"
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={3000}
      dark
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default MemeCarousel;
