import { useState, useEffect, useCallback, useRef } from "react";
import "../../styles/dino.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import Ground from "./ground";
import Dino from "./dino";
import _ from "lodash";
import Cactus from "./cactus";
import React from "react";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;
const CACTUS_INTERVAL_MIN = 400;
const CACTUS_INTERVAL_MAX = 2000;

const enum GameState {
  INITIAL,
  RUNNING,
  LOST,
}

const DinoGame = () => {
  const [width, setWidth] = useState("100px");
  const [height, setHeight] = useState("30px");

  const [lastTime, setLastTime] = useState(0);
  const [delta, setDelta] = useState(0);
  const [speedScale, setSpeedScale] = useState(1);
  const score = useRef(0);
  const highScore = useRef(0);

  const [isJumping, setIsJumping] = useState(false);
  const [gameState, setGameState] = useState<GameState>(GameState.INITIAL);
  const dinoRef = useRef<HTMLImageElement>(null);

  const [nextCactusTime, setNextCactusTime] = useState(CACTUS_INTERVAL_MIN);
  const cactusRefs = useRef<Map<number, React.Ref<HTMLImageElement>>>(
    new Map()
  );
  const cactusIdCounter = useRef<number>(0);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        if (gameState === GameState.RUNNING && !isJumping) {
          setIsJumping(true);
        } else if (gameState !== GameState.RUNNING) {
          restart();
        }
      }
    },
    [gameState]
  );

  useEffect(() => {
    scaleDinoWorld();
    window.addEventListener("resize", scaleDinoWorld);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("resize", scaleDinoWorld);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  const update = (time: number) => {
    if (lastTime === 0) {
      setLastTime(time);
    } else if (gameState === GameState.RUNNING) {
      if (checkIfLost()) {
        handleLost();
        return;
      }

      if (time - lastTime < 10) {
        window.requestAnimationFrame(update);
        return;
      }
      setDelta(time - lastTime);
      setLastTime(time !== lastTime ? time : time + 0.001);
      score.current += delta * 0.01;
      setSpeedScale((prev) => prev + delta * SPEED_SCALE_INCREASE);

      let newNextCactusTime = nextCactusTime - delta;

      if (nextCactusTime <= 0) {
        const newCactusRef = React.createRef<HTMLImageElement>();
        cactusRefs.current.set(cactusIdCounter.current++, newCactusRef);
        newNextCactusTime =
          _.random(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale;
      }

      setNextCactusTime(newNextCactusTime);
    }
  };

  useEffect(() => {
    gameState === GameState.RUNNING && window.requestAnimationFrame(update);
    gameState === GameState.LOST && setLastTime(0);
  }, [lastTime, gameState, update]);

  const handleLost = () => {
    setGameState(GameState.LOST);
    highScore.current = Math.max(highScore.current, score.current);
  };

  const restart = () => {
    setSpeedScale(1);
    setDelta(0);
    setNextCactusTime(0);
    setIsJumping(false);
    cactusRefs.current = new Map();
    score.current = 0;
    setGameState(GameState.RUNNING);
  };

  const checkIfLost = () => {
    const dinoRect = dinoRef.current?.getBoundingClientRect();
    const cactuses = [...cactusRefs.current?.values()];

    return (
      dinoRect &&
      cactuses.some((c) => {
        if (c && "current" in c && c.current) {
          return isCollision(c.current.getBoundingClientRect(), dinoRect);
        }
        return false;
      })
    );
  };

  const isCollision = (fst: DOMRect, snd: DOMRect) =>
    fst.left < snd.right &&
    fst.top < snd.bottom &&
    fst.right > snd.left &&
    fst.bottom > snd.top;

  const scaleDinoWorld = () => {
    let worldToPixelScale;
    if (
      ((window.innerWidth / 12) * 8) / window.innerHeight <
      WORLD_WIDTH / WORLD_HEIGHT
    ) {
      worldToPixelScale = ((window.innerWidth / 12) * 8) / WORLD_WIDTH;
    } else {
      worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }

    setWidth(`${WORLD_WIDTH * worldToPixelScale}px`);
    setHeight(`${WORLD_HEIGHT * worldToPixelScale}px`);
  };

  return (
    <div className="world" style={{ border: "1px solid black", width, height }}>
      <div className="score">
        {highScore.current ? (
          <span className="me-2">hi: {Math.floor(highScore.current)}</span>
        ) : null}
        <span>score: {Math.floor(score.current) ?? 0}</span>
      </div>
      {gameState === GameState.LOST ? (
        <div className="start-screen">
          <div style={{ fontWeight: "bold" }}>GAME OVER</div>
          <FontAwesomeIcon icon={faSquareCaretRight} onClick={restart} />
        </div>
      ) : null}
      {gameState === GameState.INITIAL ? (
        <span className="start-screen">
          press {<FontAwesomeIcon icon={faArrowUp} />} to start (and jump)
        </span>
      ) : null}
      <Ground left={0} delta={delta} speedScale={speedScale} />
      <Ground left={300} delta={delta} speedScale={speedScale} />
      {[...cactusRefs.current.entries()].map((c) => (
        <Cactus
          ref={c[1]}
          key={c[0]}
          delta={delta}
          speedScale={speedScale}
          removeCactus={() => cactusRefs.current.delete(c[0])}
        />
      ))}
      <Dino
        ref={dinoRef}
        isJumping={isJumping}
        finishJumping={() => setIsJumping(false)}
        delta={delta}
        speedScale={speedScale}
        isLost={gameState === GameState.LOST}
      />
    </div>
  );
};

export default DinoGame;
