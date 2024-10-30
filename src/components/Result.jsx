import React from "react";
import { RestartBtn, ResultCheck, StartBox } from "../styles/MainStyle";

const Result = ({ countCorrect, handleGameRestart }) => {
  return (
    <StartBox>
      <ResultCheck>총 맞힌 갯수는 {countCorrect}개 입니다!</ResultCheck>
      <RestartBtn onClick={handleGameRestart}>다시하기</RestartBtn>
    </StartBox>
  );
};

export default Result;
