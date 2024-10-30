import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  padding: 2rem;
  background-color: #b4c5ef;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Title = styled.h1`
  text-align: center;
`;
export const StartBox = styled.div`
  margin: auto;
  width: 60vw;
  height: 75vh;
  background-color: #fff;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.8;
`;
export const Description = styled.p``;
export const StartBtn = styled.button`
  margin: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid #ccc;
  font-weight: 500;
  &:hover {
    border: 2px solid darkblue;
  }
`;

export const GameBox = styled.div`
  margin: auto;
  width: 60vw;
  height: 75vh;
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
export const Image = styled.img`
  /* width: 30vw; */
  height: 45vh;
`;
export const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
export const Input = styled.input`
  width: 200px;
  margin: 1rem;
  padding: 0.25rem 0.5rem;
  text-align: center;
`;

export const Counter = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const Answer = styled.h3`
  margin-bottom: 1rem;
`;
export const ResultText = styled.h3`
  color: darkblue;
`;

export const BtnBox = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: absolute;
  right: 1rem;
  bottom: 1.5rem;
`;
export const ImgCount = styled.p``;
export const NextBtn = styled.button``;
export const EndBtn = styled.button``;

export const ResultBox = styled(StartBox)``;
export const ResultCheck = styled.p``;
export const RestartBtn = styled.button`
  margin-top: 1rem;
`;
