import React, { useEffect, useState } from "react";
import { imagesData } from "../data/ImgData";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import GameStart from "./GameStart";
import ImageGame from "./ImageGame";
import Result from "./Result";

// style
import { Title, Wrapper } from "../styles/MainStyle";

const MainPage = () => {
  const { transcript, resetTranscript } = useSpeechRecognition({
    continuous: true,
    language: "ko-KR",
  });

  const [randomImages, setRandomImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStart, setIsStart] = useState(false);

  const [showAnswer, setShowAnswer] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const [imgCount, setImgCount] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const [counter, setCounter] = useState(3);

  const [isCorrect, setIsCorrect] = useState(null);
  const [countCorrect, setCountCorrect] = useState(0);

  const [timer, setTimer] = useState(null);

  const initialState = () => {
    setShowAnswer(false);
    setShowBtn(false);
    setCounter(3);
    setIsCorrect(null);
    startCountdown();
    resetTranscript();
    SpeechRecognition.startListening();
  };

  const getRandomImages = (num) => {
    const mixedImages = [...imagesData].sort(() => 0.5 - Math.random());
    return mixedImages.slice(0, num);
  };

  const startCountdown = () => {
    setCounter(3);
    const countdownTimer = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          clearInterval(countdownTimer);
          handleCheckAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      SpeechRecognition.stopListening();
      setShowBtn(true);
    }, 3000);

    setTimer(countdownTimer);
  };

  const handleStartGame = () => {
    setIsStart(true);
    const images = getRandomImages(5);
    setRandomImages(images);
    setCurrentIndex(0);

    initialState();
  };

  useEffect(() => {
    if (transcript) {
      handleCheckAnswer();
    }
  }, [transcript]);

  const handleCheckAnswer = () => {
    const currentImage = randomImages[currentIndex];
    const cleanedTranscript = transcript.trim();
    const correctName = currentImage?.name.trim();

    if (transcript) {
      if (cleanedTranscript === correctName) {
        setIsCorrect(true);
        clearInterval(timer);
        SpeechRecognition.stopListening();
      } else {
        setIsCorrect(false);
        clearInterval(timer);
        SpeechRecognition.stopListening();
      }
    } else if (!transcript) {
      setIsCorrect(false);
    }

    setShowAnswer(true);
  };

  const handleNextImage = () => {
    setIsCorrect(null);
    initialState();

    if (currentIndex < randomImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setImgCount(imgCount + 1);
    }
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  const handleGameRestart = () => {
    setCurrentIndex(0);
    setCountCorrect(0);
    setImgCount(1);
    setGameOver(false);
    handleStartGame();
  };

  return (
    <Wrapper>
      <Title>인물맞히기 게임</Title>
      {gameOver ? (
        <Result
          countCorrect={countCorrect}
          handleGameRestart={handleGameRestart}
        />
      ) : isStart ? (
        <ImageGame
          counter={counter}
          randomImages={randomImages}
          currentIndex={currentIndex}
          transcript={transcript}
          showAnswer={showAnswer}
          showBtn={showBtn}
          handleNextImage={handleNextImage}
          imgCount={imgCount}
          handleGameOver={handleGameOver}
          isCorrect={isCorrect}
          setCountCorrect={setCountCorrect}
        />
      ) : (
        <GameStart handleStartGame={handleStartGame} />
      )}
    </Wrapper>
  );
};

export default MainPage;
