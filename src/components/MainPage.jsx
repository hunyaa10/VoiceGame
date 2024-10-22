import React, { useState } from "react";
import { imagesData } from "../data/ImgData";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import GameStart from "./GameStart";
import ImageGame from "./ImageGame";
import Result from "./Result";

// style
import { Title, Wrapper } from "../styles/MainStyle";

const MainPage = () => {
  const [randomImages, setRandomImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [imgCount, setImgCount] = useState(1);
  const [resultText, setResultText] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const { transcript, resetTranscript } = useSpeechRecognition();

  // 랜덤이미지 추출
  const getRandomImages = (num) => {
    const mixedImages = [...imagesData].sort(() => 0.5 - Math.random());
    return mixedImages.slice(0, num);
  };

  // 게임시작 버튼클릭
  const handleStartGame = () => {
    setIsStart(true);
    const images = getRandomImages(5);
    setRandomImages(images);
    setShowAnswer(false);
    setShowBtn(false);
    setResultText("");
  };

  // 다음게임 버튼클릭
  const handleNextImage = () => {
    if (currentIndex < randomImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setShowBtn(false);
      setResultText("");
      setImgCount(imgCount + 1);
      resetTranscript("");
    }
  };

  // 정답말하기 버튼클릭
  const handleVoiceStart = () => {
    resetTranscript();
    SpeechRecognition.startListening();
  };

  // 정답확인
  const handleCheckAnswer = () => {
    const currentImage = randomImages[currentIndex];
    SpeechRecognition.stopListening();
    if (transcript.toLowerCase().trim() === currentImage.name.toLowerCase().trim()) {
      setShowAnswer(true);
      setShowBtn(true);
      setResultText("정답입니다!");
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setShowAnswer(true);
      setShowBtn(true);
      setResultText("틀렸습니다!");
    }
  };

  // 최종결과확인
  const handleGameOver = () => {
    setGameOver(true);
  };

  // 게임재시작
  const handleGameRestart = () => {
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setImgCount(1);
    setGameOver(false);
    resetTranscript();
    handleStartGame();
  };

  return (
    <Wrapper>
      <Title>이동수단 맞히기 게임</Title>
      {gameOver ? (
        <Result correctAnswers={correctAnswers} handleGameRestart={handleGameRestart} />
      ) : isStart ? (
        <ImageGame
          randomImages={randomImages}
          currentIndex={currentIndex}
          transcript={transcript}
          resultText={resultText}
          showAnswer={showAnswer}
          showBtn={showBtn}
          handleNextImage={handleNextImage}
          imgCount={imgCount}
          handleVoiceStart={handleVoiceStart}
          handleCheckAnswer={handleCheckAnswer}
          handleGameOver={handleGameOver}
        />
      ) : (
        <GameStart handleStartGame={handleStartGame} />
      )}
    </Wrapper>
  );
};

export default MainPage;
