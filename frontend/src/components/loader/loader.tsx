import {
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Spinner } from "reactstrap";
import "../../styles/loader.css";
import FastSlowProgress from "../fastSlowProgress";
import { useDispatch } from "react-redux";
import { startTimer } from "../../store/slices/userIrritationTimeSlice";
import DinoGame from "./dino/dinoGame";
import LoaderType from "../../models/loader";
import { LoaderTypeDataContext } from "../../App";
import MemeCarousel from "./memeCarousel";

interface ILoaderProps {
  loading: boolean;
  basic?: boolean;
  type?: LoaderType;
  width?: number;
  loop?: boolean;
}

// const loadersWithProcessText = [LoaderType.PROGRESS_BAR, LoaderType.SPINNER];

const Loader = (props: PropsWithChildren<ILoaderProps>) => {
  const [text, setText] = useState("pobieranie danych");
  const [dots, setDots] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const type = useContext(LoaderTypeDataContext);
  const dispatch = useDispatch();

  useEffect(() => {
    props.loading && dispatch(startTimer());
  }, [dispatch, props.loading]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let dotsTimer: NodeJS.Timeout;

    if (props.loading) {
      setText("pobieranie danych");
      timer = setTimeout(() => {
        setAnimationClass("-fade-out");
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
      setAnimationClass("-fade-out");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (animationClass === "-fade-out") {
      timeout = setTimeout(() => {
        setAnimationClass("-fade-in");
        if (text === "pobieranie danych") {
          setText("przetwarzanie danych");
        } else if (text === "przetwarzanie danych") {
          setText("przygotowywanie widoku");
        }
        setDots(0);
      }, 500);
    } else if (animationClass === "-fade-in") {
      timeout = setTimeout(() => {
        setAnimationClass("");
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [animationClass, text]);

  const loader = useMemo(() => {
    let loader: ReactNode;
    switch (props.type ?? type) {
      case LoaderType.SPINNER:
        loader = <Spinner color="primary" />;
        break;
      case LoaderType.PROGRESS_BAR:
        loader = (
          <FastSlowProgress dataLoaded={!props.loading} loop={props.loop} />
        );
        break;
      case LoaderType.GAME:
        loader = <DinoGame />;
        break;
      case LoaderType.MEMES:
        loader = <MemeCarousel />;
    }
    return loader;
  }, [type, props.loading, props.type, props.loop]);

  return props.loading ? (
    <div
      className={`d-flex align-items-center justify-content-center h-100 w-100`}
    >
      <div
        className={`d-flex flex-column align-items-center justify-content-start w-${
          props.width ?? 100
        }`}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "x-large" }}>
            ładowanie strony
            <span>
              <span>{".".repeat(dots)}</span>
              <span style={{ visibility: "hidden" }}>
                {".".repeat(3 - dots)}
              </span>
            </span>
          </div>
        </div>

        {loader}
        {/* {!props.basic ? (
          <div className={`loader-text${animationClass}`}>
            <span>{text}</span>
            <span>
              <span>{".".repeat(dots)}</span>
              <span style={{ visibility: "hidden" }}>
                {".".repeat(3 - dots)}
              </span>
            </span>
          </div>
        ) : null} */}
      </div>
    </div>
  ) : (
    <>{props.children}</>
  );
};

export default Loader;
