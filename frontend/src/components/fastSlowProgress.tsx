import { useEffect, useRef, useState } from "react";
import { Progress } from "reactstrap";

interface IFastSlowProgressProps {
  dataLoaded: boolean;
  loop?: boolean;
}

const FastSlowProgress = (props: IFastSlowProgressProps) => {
  const [progress, setProgress] = useState(0);
  const keyNum = useRef(0);

  const setProgressTimeout = (ms: number) =>
    setTimeout(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 1, 100));
    }, ms);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (props.dataLoaded) {
      timeout = setProgressTimeout(20);
    } else if (progress < 50) {
      timeout = setProgressTimeout(50);
    } else if (progress < 70) {
      timeout = setProgressTimeout(120);
    } else if (progress < 90) {
      timeout = setProgressTimeout(200);
    } else if (progress < 99) {
      timeout = setProgressTimeout(400);
    } else if (props.loop && progress === 99) {
      setProgress(0);
      keyNum.current = keyNum.current + 1;
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [progress, props.dataLoaded, props.loop]);

  return (
    <Progress
      key={keyNum.current}
      color="primary"
      value={progress}
      max={100}
      style={{ width: "100%" }}
    />
  );
};

export default FastSlowProgress;
