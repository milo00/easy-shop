import {
  PropsWithChildren,
  ReactNode,
  useContext,
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
import LoaderType from "../models/loader";
import { LoaderTypeDataContext } from "../App";

interface ILoaderProps {
  loading: boolean;
  basic?: boolean;
}

const Loader = (props: PropsWithChildren<ILoaderProps>) => {
  const [text, setText] = useState("fetching data");
  const [dots, setDots] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const type = useContext(LoaderTypeDataContext);
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
    switch (type) {
      case LoaderType.SPINNER:
        loader = <Spinner color="primary" />;
        break;
      case LoaderType.PROGRESS_BAR:
        loader = <FastSlowProgress dataLoaded={!props.loading} />;
        break;
      case LoaderType.GAME:
        loader = <DinoGame />;
    }
    return loader;
  }, [type, props.loading]);

  return props.loading ? (
    <>
      {/* {props.type === "dino" ? (
        <div style={{ textAlign: "start" }}>
          <div>while You wait, we have a small surpirise for you...</div>
          <div>enjoy the game :)</div>
        </div>
      ) : null} */}
      {loader}
      {props.basic || type === LoaderType.GAME ? null : (
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
