import { useEffect, useState } from "react";
import { Progress } from "reactstrap";

interface IFastSlowProgressProps {
  dataLoaded: boolean;
  onFinish: VoidFunction;
}

const FastSlowProgress = (props: IFastSlowProgressProps) => {
  const [progress, setProgress] = useState(0);

  const setProgressTimeout = (ms: number, checkForFinish?: boolean) =>
    setTimeout(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 1, 100));
      checkForFinish && progress === 100 && props.onFinish();
    }, ms);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (props.dataLoaded) {
      timeout = setProgressTimeout(20, true);
    } else if (progress < 50) {
      timeout = setProgressTimeout(20);
    } else if (progress < 50) {
      timeout = setProgressTimeout(50);
    } else if (progress < 70) {
      timeout = setProgressTimeout(100);
    } else if (progress < 98) {
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
      style={{ width: "30%" }}
    />
  );
};

export default FastSlowProgress;
