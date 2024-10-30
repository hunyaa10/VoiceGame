import React from "react";
import { Description, StartBox, StartBtn } from "../styles/MainStyle";

const GameStart = ({ handleStartGame }) => {
  return (
    <StartBox>
      <Description>
        음성으로 이동수단을 맞히는 게임입니다.
        <br /> 총 5문제이며, 사진으로 보이는 이동수단의 명칭을 '정확히'
        맞혀야합니다.
        <br /> 마이크가 준비되면 게임시작버튼을 눌러주세요!
        <br /> 게임을 시작하시겠습니까?
      </Description>
      <StartBtn onClick={handleStartGame}>게임시작</StartBtn>
    </StartBox>
  );
};

export default GameStart;
