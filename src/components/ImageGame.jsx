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
  VoiceBtn,
} from "../styles/MainStyle";

const ImageGame = ({
  randomImages,
  currentIndex,
  transcript,
  resultText,
  showAnswer,
  showBtn,
  handleNextImage,
  imgCount,
  handleVoiceStart,
  handleCheckAnswer,
  handleGameOver,
}) => {
  return (
    <GameBox>
      <Image src={randomImages[currentIndex].img} />
      <InputBox>
        <Input type="text" value={transcript.trim()} readOnly />
        <VoiceBtn onClick={handleVoiceStart}>정답말하기</VoiceBtn>
        <VoiceBtn onClick={handleCheckAnswer}>정답제출하기</VoiceBtn>
      </InputBox>
      {showAnswer && <Answer>정답 : {randomImages[currentIndex].name}</Answer>}
      <ResultText>{resultText}</ResultText>

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
