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
  const [randomImages, setRandomImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStart, setIsStart] = useState(false);

  const [showAnswer, setShowAnswer] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const [imgCount, setImgCount] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const [counter, setCounter] = useState(3);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  // 타이머상태값 추가
  const [timer, setTimer] = useState(null);

  const { transcript, resetTranscript } = useSpeechRecognition();

  // 상태값 초기화
  const initialState = () => {
    setShowAnswer(false);
    setShowBtn(false);
    setCounter(3);
    setIsCorrect(false);
    startCountdown();
    resetTranscript();
    SpeechRecognition.startListening({ language: "ko-KR" });
  };

  // 랜덤이미지 추출
  const getRandomImages = (num) => {
    const mixedImages = [...imagesData].sort(() => 0.5 - Math.random());
    return mixedImages.slice(0, num);
  };

  // 카운트다운
  const startCountdown = () => {
    setCounter(3);
    const countdownTimer = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    // 음성 인식 중지
    setTimeout(() => {
      SpeechRecognition.stopListening();
      handleCheckAnswer();
    }, 3000);

    setTimer(countdownTimer);
  };

  // 게임시작 버튼클릭
  const handleStartGame = () => {
    setIsStart(true);
    const images = getRandomImages(5);
    setRandomImages(images);
    setCurrentIndex(0);

    initialState();

    setCorrectAnswers(0);
  };

  // 음성인식
  useEffect(() => {
    if (transcript) {
      handleCheckAnswer();
    }
  }, [transcript]);

  // 정답확인
  const handleCheckAnswer = () => {
    const currentImage = randomImages[currentIndex];
    setShowAnswer(true);
    setShowBtn(true);

    if (transcript) {
      if (transcript.trim() === currentImage.name.trim()) {
        setIsCorrect(true);
        setCorrectAnswers((prev) => prev + 1);
        // ❓정답을 맞췄는데도 타이머가종료되면 false처리가 되어
        // 타이머종료로직 & 음성인식종료로직 추가
        clearInterval(timer);
        SpeechRecognition.stopListening();
        // ❓콘솔출력이 한글자마다 계속됨
        console.log(isCorrect);
      } else {
        setIsCorrect(false);
        console.log(isCorrect);
      }
    }
  };

  // 다음게임 버튼클릭
  const handleNextImage = () => {
    setIsCorrect(false);
    // ❓isCorrect오류확인 >> 다음버튼을 누르면 이전결과가 그대로 전달됨
    console.log(isCorrect);
    initialState();
    if (currentIndex < randomImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setImgCount(imgCount + 1);
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
    handleStartGame();
  };

  return (
    <Wrapper>
      <Title>인물맞히기 게임</Title>
      {gameOver ? (
        <Result
          correctAnswers={correctAnswers}
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
        />
      ) : (
        <GameStart handleStartGame={handleStartGame} />
      )}
    </Wrapper>
  );
};

export default MainPage;
