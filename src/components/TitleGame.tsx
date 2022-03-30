/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Header } from "./StyledComponents";

interface TitleGameProps {
  score: number;
  onNewGame: () => void;
}

export const TitleGame = ({ score = 0, onNewGame }: TitleGameProps) => {
  const [best, setBest] = useState<number>(0);

  useEffect(() => {
    if (best < score) {
      setBest(score);
    }
  }, [score]);

  useEffect(() => {
    const bestTemp = localStorage.getItem("best");
    if (bestTemp) {
      setBest(+bestTemp);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("best", best.toString());
  }, [best]);

  return (
    <Header>
      <h1>2048</h1>
      <div className="title-game">
        <div className="score">
          <p>SCORE</p>
          <h3>{score}</h3>
        </div>
        <div className="best">
          <p>BEST</p>
          <h3>{best > score ? best : score}</h3>
        </div>
        <Button onClick={onNewGame} width={120}>
          New Game
        </Button>
      </div>
    </Header>
  );
};
