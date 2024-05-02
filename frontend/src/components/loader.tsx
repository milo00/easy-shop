import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Spinner } from "reactstrap";
import "../styles/loader.css";
import FastSlowProgress from "./fastSlowProgress";
import { useDispatch } from "react-redux";
import { startTimer } from "../store/slices/irritationTimeSlice";
import DinoGame from "./dino/dinoGame";

interface ILoaderProps {
  loading: boolean;
  type: "spinner" | "progressBar" | "dino";
  basic?: boolean;
}

const Loader = (props: PropsWithChildren<ILoaderProps>) => {
  const [text, setText] = useState("fetching data");
  const [dots, setDots] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startTimer());
  }, [dispatch]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let dotsTimer: NodeJS.Timeout;

    if (props.loading) {
      timer = setTimeout(() => {
        setAnimationClass("fade-out");
      }, 4000);

      dotsTimer = setInterval(() => {
        setDots((prev) => (prev === 3 ? 0 : prev + 1));
      }, 400);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(dotsTimer);
    };
  }, [props.loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass("fade-out");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (animationClass === "fade-out") {
      timeout = setTimeout(() => {
        setAnimationClass("fade-in");
        if (text === "fetching data") {
          setText("processing data");
        } else if (text === "processing data") {
          setText("preparing view");
        }
        setDots(0);
      }, 300);
    } else if (animationClass === "fade-in") {
      timeout = setTimeout(() => {
        setAnimationClass("");
      }, 300);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [animationClass, text]);

  const loader = useMemo(() => {
    let loader: ReactNode;
    switch (props.type) {
      case "spinner":
        loader = <Spinner color="primary" />;
        break;
      case "progressBar":
        loader = <FastSlowProgress dataLoaded={!props.loading} />;
        break;
      case "dino":
        loader = <DinoGame />;
    }
    return loader;
  }, [props.type, props.loading]);

  return props.loading ? (
    <>
      {/* {props.type === "dino" ? (
        <div style={{ textAlign: "start" }}>
          <div>while You wait, we have a small surpirise for you...</div>
          <div>enjoy the game :)</div>
        </div>
      ) : null} */}
      {loader}
      {props.basic || props.type === "dino" ? null : (
        <div className={`loader-text ${animationClass}`}>
          <span>{text}</span>
          <span>
            <span>{".".repeat(dots)}</span>
            <span style={{ visibility: "hidden" }}>{".".repeat(3 - dots)}</span>
          </span>
        </div>
      )}
    </>
  ) : (
    <>{props.children}</>
  );
};

export default Loader;
