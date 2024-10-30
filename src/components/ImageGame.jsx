import React from "react";
import {
  Answer,
  BtnBox,
  EndBtn,
  GameBox,
  Image,
  ImgCount,
  Input,
  InputBox,
  NextBtn,
  ResultText,
} from "../styles/MainStyle";

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
  return (
    <GameBox>
      <Image src={randomImages[currentIndex].img} />
      <InputBox>
        <Input type="text" value={transcript.trim()} readOnly />
      </InputBox>
      <div>{counter}</div>
      {showAnswer && (
        <>
          <Answer>정답 : {randomImages[currentIndex].name}</Answer>
          <ResultText $isCorrect={isCorrect}>
            {isCorrect ? "정답입니다!" : "틀렸습니다!"}
          </ResultText>
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
