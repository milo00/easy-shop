import { forwardRef, useEffect, useRef, useState } from "react";
import dinoStationaryImg from "../../assets/dino/dino-stationary.png";
import dinoRun1Img from "../../assets/dino/dino-run-1.png";
import dinoRun2Img from "../../assets/dino/dino-run-2.png";
import dinoLost from "../../assets/dino/dino-lose.png";

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
  const [dinoImg, setDinoImg] = useState(dinoStationaryImg);
  const [currentDinoImgTime, setCurrentDinoImgTime] = useState(0);
  const [jumpVelocity, setJumpVelocity] = useState(0);
  const [bottom, setBottom] = useState(0);

  useEffect(() => {
    props.isLost ? setDinoImg(dinoLost) : setBottom(0);
  }, [props.isLost]);

  useEffect(() => {
    handleImage();
    handleJump();
  }, [props.delta, props.speedScale]);

  useEffect(() => {
    props.isJumping && setJumpVelocity(JUMP_SPEED);
  }, [props.isJumping]);

  const handleImage = () => {
    if (props.isJumping) {
      setDinoImg(dinoStationaryImg);
      return;
    }

    let newDinoImgTime = currentDinoImgTime;
    if (currentDinoImgTime >= FRAME_TIME) {
      setDinoImg((prev) => (prev === dinoRun1Img ? dinoRun2Img : dinoRun1Img));
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
      alt="dino image"
      src={dinoImg}
      className="dino"
      style={{ "--bottom": bottom } as React.CSSProperties}
    />
  );
});

export default Dino;
