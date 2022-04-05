import styled from "styled-components";
import { colors } from "../utils/colors";
import { colorOp } from "../utils/utils";

interface IButton {
  width?: number;
}

export const Button = styled.button<IButton>`
  background-color: ${colors.secondary};
  color: ${colors.white};
  cursor: pointer;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  outline: none;
  border: none;
  font-weight: bold;
  height: 52px;
  width: ${({ width }) => `${width}px`};
`;

//Page Main
export const StyledPageMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//title game
export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  .title-game {
    display: flex;
    flex: 1;
    justify-content: space-between;
    margin-inline-start: 1rem;
    .score,
    .best {
      background-color: ${colors.secondary};
      border-radius: 10px;
      min-width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 8px;
      height: 52px;
      h3,
      p {
        width: 100%;
        text-align: center;
      }
      p {
        font-size: 0.75rem;
        opacity: 0.75;
      }
    }
  }
`;

// body game
export const StyledBodyGame = styled.div`
  display: flex;
  margin: 50px 0;
  background-color: ${colors.secondary};
  width: 30rem;
  height: 30rem;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  row-gap: 15px;
  column-gap: 15px;
  border-radius: 5px;
  position: relative;
  .cell-container {
    display: grid;
    place-items: center;
    border-radius: 5px;
    color: ${colors.white};
  }
  .cell-full {
    background-color: black;
    animation: show 100ms ease-in-out;
    transition: 50ms ease-in-out;
    @keyframes show {
      0% {
        opacity: 0.5;
        transform: scale(0);
      }
    }
  }
  .cell-null {
    background-color: ${colors.primary};
  }
  .popup {
    border-radius: 5px;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${colorOp(colors.primaryLight, "75%")};
    display: flex;
    justify-content: center;
    align-items: center;
    .info-popup {
      button {
        margin: 10px;
      }
    }
  }
`;
