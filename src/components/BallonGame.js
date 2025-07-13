import React, { useEffect, useState, useRef } from "react";

const BALLOON_TYPES = [
  { type: "red", color: "red", points: 1, speed: 6, movement: "straight" },
  { type: "gold", color: "gold", points: 3, speed: 5, movement: "zigzag" },
  { type: "platinum", color: "silver", points: 5, speed: 4, movement: "zigzag" },
  { type: "diamond", color: "dodgerblue", points: 10, speed: 3, movement: "random" },
];

let idCounter = 0;

const BalloonGame = () => {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsRunning(true);
    setBalloons([]);

    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
        }
        return t - 1;
      });

      // Add new balloon occasionally
      if (Math.random() < 0.7) {
        const balloon = getRandomBalloon();
        setBalloons((b) => [...b, balloon]);
      }
    }, 1000);
  };

  const getRandomBalloon = () => {
    const r = Math.random();
    let type;
    if (r < 0.6) type = BALLOON_TYPES[0]; // red
    else if (r < 0.8) type = BALLOON_TYPES[1]; // gold
    else if (r < 0.95) type = BALLOON_TYPES[2]; // platinum
    else type = BALLOON_TYPES[3]; // diamond

    const left = Math.random() * 90;
    const id = `balloon-${idCounter++}`;

    return {
      id,
      ...type,
      left,
    };
  };

  const popBalloon = (id, points) => {
    setScore((s) => s + points);
    setBalloons((b) => b.filter((bal) => bal.id !== id));
  };

  return (
    <div className="game-container">
      <h2>Balloon Burst Game</h2>
      {!isRunning ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <div className="game-info">
          <span>⏱ {timeLeft}s</span>
          <span>🎯 Score: {score}</span>
        </div>
      )}

      <div className="game-area">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className={`balloon ${balloon.movement}`}
            style={{
              left: `${balloon.left}%`,
              backgroundColor: balloon.color,
              animationDuration: `${balloon.speed}s`,
            }}
            onClick={() => popBalloon(balloon.id, balloon.points)}
          >
            +{balloon.points}
          </div>
        ))}
      </div>

      {!isRunning && score > 0 && (
        <div className="game-result">
          🎉 Game Over! Final Score: <strong>{score}</strong>
        </div>
      )}
    </div>
  );
};

export default BalloonGame;