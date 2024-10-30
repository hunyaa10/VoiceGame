import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  padding: 2rem;
  background-color: #b4c5ef;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  @media (max-width: 991px) {
    gap: 1rem;
  }
  @media (max-width: 575px) {
    padding: 1rem;
  }
`;
export const Title = styled.h1`
  @media (max-width: 991px) {
    font-size: 1.5rem;
  }
  @media (max-width: 575px) {
    font-size: 1.2rem;
  }
`;
export const StartBox = styled.div`
  width: 60vw;
  height: 75vh;
  padding: 2rem;
  background-color: #fff;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.8;
  @media (max-width: 1200px) {
    width: 80vw;
  }
  @media (max-width: 991px) {
    width: 90vw;
    font-size: 1.2rem;
  }
  @media (max-width: 575px) {
    font-size: 1rem;
    padding: 1rem;
  }
  @media (max-width: 430px) {
    height: 85vh;
  }
`;
export const Notice = styled.div`
  color: tomato;
  margin-bottom: 1rem;
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
  width: 60vw;
  height: 75vh;
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media (max-width: 1200px) {
    width: 80vw;
  }
  @media (max-width: 991px) {
    width: 90vw;
  }
  @media (max-width: 575px) {
    padding: 1rem;
  }
  @media (max-width: 430px) {
    height: 85vh;
    padding-top: 2rem;
  }
`;
export const Image = styled.img`
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
  @media (max-width: 430px) {
    font-size: 1rem;
  }
`;
export const ResultText = styled.h3`
  color: darkblue;
  @media (max-width: 430px) {
    font-size: 1rem;
  }
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
  @media (max-width: 430px) {
    position: static;
    margin-top: 2rem;
  }
`;
export const ImgCount = styled.p``;
export const NextBtn = styled.button``;
export const EndBtn = styled.button``;

export const ResultBox = styled(StartBox)``;
export const ResultCheck = styled.p``;
export const RestartBtn = styled.button`
  margin-top: 1rem;
`;
