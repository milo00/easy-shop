import React, { useEffect, useState } from "react";

interface IGroundProps {
  left: number;
  delta: number;
  speedScale: number;
}

const SPEED = 0.1;

const Ground = (props: IGroundProps) => {
  const [left, setleft] = useState(props.left);

  useEffect(() => {
    setleft(props.left);
  }, [props.left]);

  useEffect(() => {
    if (left === -300) {
      setleft(300);
    } else {
      setleft((prev) =>
        Math.max(prev + props.delta * props.speedScale * SPEED * -1, -300)
      );
    }
  }, [props.delta, props.speedScale]); // eslint-disable-line

  return (
    <img
      alt="ground"
      src={`${process.env.PUBLIC_URL}/assets/dino/ground.png`}
      className="ground"
      style={{ "--left": left } as React.CSSProperties}
    />
  );
};

export default Ground;
