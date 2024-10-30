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
  // ❓초기값을 false -> null
  const [isCorrect, setIsCorrect] = useState(null);
  // const [correctAnswers, setCorrectAnswers] = useState(0);
  // 타이머상태값 추가
  const [timer, setTimer] = useState(null);
  // 정답갯수 state
  const [countCorrect, setCountCorrect] = useState(0);

  const { transcript, resetTranscript } = useSpeechRecognition();

  // 상태값 초기화
  const initialState = () => {
    setShowAnswer(false);
    setShowBtn(false);
    setCounter(3);
    setIsCorrect(null);
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
          handleCheckAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    // ❓3초후에도 음성인식이 계속되는 오류
    // ✅3초 후 음성인식 중지코드 추가
    setTimeout(() => {
      SpeechRecognition.stopListening();
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

    if (transcript) {
      // ❓정답을 맞췄는데도 타이머가종료되면 false처리가 됨
      // ✅타이머종료로직 & 음성인식종료로직 추가
      // 타이머종료로직 추가
      clearInterval(timer);
      SpeechRecognition.stopListening();
      // 음성인식이 되는경우엔 정답오답 잘판별함
      // 음성인식결과가 없으면 이전결과 그대로 나오는 오류 여전....
      if (transcript.trim() === currentImage.name.trim()) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
        clearInterval(timer);
        SpeechRecognition.stopListening();
        // console.log(isCorrect);
      }
    } else if (!transcript) {
      setIsCorrect(false);
    }

    setShowAnswer(true);
    setShowBtn(true);
  };

  // 다음게임 버튼클릭
  const handleNextImage = () => {
    initialState();

    // ❓다음버튼을 누르면 정답 혹은 오답의 결과가 이전결과대로 나옴
    // 콘솔확인 >> 다음버튼을 누르면 이전결과가 그대로 전달됨
    // console.log(isCorrect);
    /*
    isCorrect를 초기화했음에도 불구하고 콘솔창에 이전결과가 여전히 나타나는
    이유는 isCorrect의 상태업데이트가 비동기적으로 진행되기 때문
    ✅정답/오답관리를 ImageGame컴포넌트에서 새로운 state로 관리
    */

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
