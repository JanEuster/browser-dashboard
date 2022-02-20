import styled from "styled-components";

export const Button = styled.button<{ active: Boolean }>`
  box-sizing: content-box;
  min-height: 30px;
  max-width: 200px;
  height: 3vh;
  aspect-ratio: 1.75;
  border-radius: 10vw;
  border: 0.4vh solid ${({ active }) => (active ? "#1E1E1E" : "#C0C0C0")};
  background-color: ${({ active }) => (active ? "#252525" : "white")};

  transition: all 1s ease;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

export const Circle = styled.div<{ active: Boolean }>`
  position: absolute;
  min-height: 25px;
  height: 100%;
  aspect-ratio: 1;
  background-color: ${({ active }) => (active ? "#e5e5e5" : "#121212")};
  border-radius: 100%;
  top: 0%;
  ${({ active }) =>
    active
      ? "left: 100%; transform: translateX(-100%);"
      : "left: 1%; transform: translateX(0%);"}

  animation: 1s ease alternate ${({ active }) =>
    active ? "on-off" : "off-on"};

  @keyframes on-off {
    from {
      transform: translateX(0%);
      left: 1%;
    }
    to {
      left: 100%;
      transform: translate(-100%);
    }
  }

  @keyframes off-on {
    from {
      left: 100%;
      transform: translate(-100%);
    }
    to {
      transform: translateX(0%);
      left: 1%;
    }
  }
`;
