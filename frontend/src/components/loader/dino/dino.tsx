import { forwardRef, useEffect, useState } from "react";

const JUMP_SPEED = 0.4;
const GRAVITY = 0.0015;
const FRAME_TIME = 100;

interface IDinoProps {
  delta: number;
  speedScale: number;
  isJumping: boolean;
  isLost: boolean;
  finishJumping: VoidFunction;
}

const Dino = forwardRef<HTMLImageElement, IDinoProps>(function Dino(
  props,
  ref
) {
  const [dinoImg, setDinoImg] = useState("dino-stationary");
  const [currentDinoImgTime, setCurrentDinoImgTime] = useState(0);
  const [jumpVelocity, setJumpVelocity] = useState(0);
  const [bottom, setBottom] = useState(0);

  useEffect(() => {
    props.isLost ? setDinoImg("dino-lose") : setBottom(0);
  }, [props.isLost]);

  useEffect(() => {
    handleImage();
    handleJump();
  }, [props.delta, props.speedScale]); // eslint-disable-line

  useEffect(() => {
    props.isJumping && setJumpVelocity(JUMP_SPEED);
  }, [props.isJumping]);

  const handleImage = () => {
    if (props.isJumping) {
      setDinoImg("dino-stationary");
      return;
    }

    let newDinoImgTime = currentDinoImgTime;
    if (currentDinoImgTime >= FRAME_TIME) {
      setDinoImg((prev) =>
        prev === "dino-run-1" ? "dino-run-2" : "dino-run-1"
      );
      newDinoImgTime -= FRAME_TIME;
    }

    setCurrentDinoImgTime(newDinoImgTime + props.delta * props.speedScale);
  };

  const handleJump = () => {
    if (!props.isJumping) return;

    if (bottom < 0) {
      setBottom(0);
      props.finishJumping();
    } else {
      setBottom((prev) => prev + jumpVelocity * props.delta);
    }

    setJumpVelocity((prev) => prev - GRAVITY * props.delta);
  };

  return (
    <img
      ref={ref}
      alt="dino"
      src={`${process.env.PUBLIC_URL}/assets/dino/${dinoImg}.png`}
      className="dino"
      style={{ "--bottom": bottom } as React.CSSProperties}
    />
  );
});

export default Dino;
