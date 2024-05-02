import React, { useEffect, useState } from "react";
import groundImg from "../../assets/dino/ground.png";

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
  }, [props.delta, props.speedScale]);

  return (
    <img
      alt="ground image"
      src={groundImg}
      className="ground"
      style={{ "--left": left } as React.CSSProperties}
    />
  );
};

export default Ground;
