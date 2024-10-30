import React, { useEffect, useState } from "react";
import {
  Answer,
  BtnBox,
  Counter,
  EndBtn,
  GameBox,
  Image,
  ImgCount,
  Input,
  InputBox,
  NextBtn,
  ResultText,
} from "../styles/MainStyle";
import Result from "./Result";

const ImageGame = ({
  counter,
  randomImages,
  currentIndex,
  transcript,
  showAnswer,
  showBtn,
  handleNextImage,
  imgCount,
  handleGameOver,
  isCorrect,
}) => {
  // input value state 추가
  const [inputValue, setInputValue] = useState(transcript);
  const [resultText, setResultText] = useState("");
  // 정답갯수 start 추가
  const [countCorrect, setCountCorrect] = useState(0);

  // 정답판별
  const handleResultText = () => {
    if (isCorrect === true) {
      setResultText("😍정답입니다.");
      setCountCorrect((prev) => prev + 1);
    } else if (isCorrect === false || inputValue === "") {
      setResultText("😰오답입니다.");
    }
  };

  useEffect(() => {
    // inputValue를 음성 인식 값으로 업데이트
    setInputValue(transcript.trim());
  }, [transcript]);
  //
  useEffect(() => {
    handleResultText();
  }, [inputValue]);
  // 이전결과가 오답 > 다음결과가 정답 > 타이머 스톱 > '정답'
  // 이전결과가 정답 > 다음결과 오답 > 타이머 계속 > '정답'
  // 타이머문제?
  return (
    <GameBox>
      <Image src={randomImages[currentIndex].img} />
      <InputBox>
        <Input type="text" value={inputValue} readOnly />
      </InputBox>
      <Counter>{counter}</Counter>
      {showAnswer && (
        <>
          <Answer>정답 : {randomImages[currentIndex].name}</Answer>
          {/*  */}
          {isCorrect !== null && <ResultText>{resultText}</ResultText>}
        </>
      )}

      <BtnBox>
        {showBtn &&
          (currentIndex < randomImages.length - 1 ? (
            <NextBtn onClick={handleNextImage}>다음문제</NextBtn>
          ) : (
            <EndBtn onClick={handleGameOver}>결과확인하기</EndBtn>
          ))}
        <ImgCount>{`${imgCount} / 5`}</ImgCount>
      </BtnBox>
    </GameBox>
  );
};

export default ImageGame;
