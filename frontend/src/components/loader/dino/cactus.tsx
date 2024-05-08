import React, { forwardRef, useEffect, useState } from "react";

const SPEED = 0.1;

interface ICactusProps {
  delta: number;
  speedScale: number;
  removeCactus: VoidFunction;
}

const Cactus = forwardRef<HTMLImageElement, ICactusProps>(function Cactus(
  props,
  ref
) {
  const [left, setLeft] = useState(100);

  useEffect(() => {
    setLeft((prev) => prev + props.delta * props.speedScale * SPEED * -1);
    if (left <= -100) {
      props.removeCactus();
    }
  }, [props]); // eslint-disable-line

  return (
    <img
      ref={ref}
      alt="cactus"
      src={`${process.env.PUBLIC_URL}/assets/dino/cactus.png`}
      className="cactus"
      style={
        {
          "--left": left,
        } as React.CSSProperties
      }
    />
  );
});

export default Cactus;
