import { useEffect, useState } from "react";
import { Progress } from "reactstrap";

interface IFastSlowProgressProps {
  dataLoaded: boolean;
}

const FastSlowProgress = (props: IFastSlowProgressProps) => {
  const [progress, setProgress] = useState(0);

  const setProgressTimeout = (ms: number) =>
    setTimeout(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 1, 100));
    }, ms);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (props.dataLoaded) {
      timeout = setProgressTimeout(20);
    } else if (progress < 50) {
      timeout = setProgressTimeout(20);
    } else if (progress < 50) {
      timeout = setProgressTimeout(50);
    } else if (progress < 70) {
      timeout = setProgressTimeout(100);
    } else if (progress < 99) {
      timeout = setProgressTimeout(150);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [progress, props.dataLoaded]);

  return (
    <Progress
      color="primary"
      value={progress}
      max={100}
      style={{ width: "100%" }}
    />
  );
};

export default FastSlowProgress;
