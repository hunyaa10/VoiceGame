import React from "react";
import { Description, Notice, StartBox, StartBtn } from "../styles/MainStyle";

const GameStart = ({ handleStartGame }) => {
  return (
    <StartBox>
      <Notice>
        이 게임은 Chrome브라우저에서 가장 잘 작동됩니다.
        <br />
        Chrome브라우저에서 실행하길 권장드립니다.
      </Notice>
      <Description>
        3초 안에 음성으로 사진 속 인물을 맞히는 게임입니다.
        <br /> 총 5문제이며, 시작버튼을 누르면 바로 게임이 시작됩니다.
        <br /> 마이크가 준비되면 게임시작버튼을 눌러주세요!
        <br /> 게임을 시작하시겠습니까?
      </Description>
      <StartBtn onClick={handleStartGame}>게임시작</StartBtn>
    </StartBox>
  );
};

export default GameStart;
