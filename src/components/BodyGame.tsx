/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { NewGamePopup, PopupType } from "./NewGamePopup";
import { StyledBodyGame } from "./StyledComponents";
import { TitleGame } from "./TitleGame";

export const BodyGame = () => {
  const [cells, setCells] = useState<number[]>([]);
  const [popupType, setPopupType] = useState<PopupType>();

  //array comparison
  function isSameArray(
    array1: number[],
    array2: number[],
    index: number = 0
  ): boolean {
    if (array1.length !== array2.length) return false;
    if (array1[index] !== array2[index]) return false;
    if (array1.length - 1 === index) return true;
    return isSameArray(array1, array2, index + 1);
  }

  //get one random number(1,16)
  function getRandomInt(): number {
    const result = Math.floor(Math.random() * 16);
    return result;
  }

  //get start game
  function getStartIndexs(): { index1: number; index2: number } {
    let index1 = getRandomInt();
    let index2 = getRandomInt();
    if (index1 === index2) {
      return getStartIndexs();
    }
    return { index1, index2 };
  }

  //before handle set
  function initialize(array: number[]): number {
    let number1 = getRandomInt();
    if (array[number1]) {
      return initialize(array);
    }
    return number1;
  }

  //set cell
  function handleSetCell(array: number[]) {
    if (isSameArray(cells, array)) return array;

    const temp = [...array];
    const index = initialize(temp);
    temp[index] = 2;

    return temp;
  }

  // push to array for fill cells row by zero
  function fixArraySortingFormat(
    array: number[],
    side: "left" | "right"
  ): number[] {
    if (array.length === 4) return array;

    const temp = [...array];

    switch (side) {
      case "left":
        temp.push(0);
        break;
      case "right":
        temp.unshift(0);
        break;
    }

    return fixArraySortingFormat(temp, side);
  }

  //operation cell right to left
  function cellTo_Left_Up(
    array: number[],
    index: number,
    isSame = false
  ): number[] {
    if (index - 1 < 0)
      return fixArraySortingFormat(
        array.filter((x) => x !== 0),
        "left"
      );

    if (isSame) return cellTo_Left_Up(array, index - 1, false);

    const temp = [...array];

    if (
      array[index] === array[index - 1] &&
      array[index] === array[index - 2] &&
      array[index] !== array[index - 3]
    ) {
      index--;
    }

    if (array[index] === array[index - 1]) {
      temp[index - 1] = temp[index] + temp[index - 1];
      temp[index] = 0;
      return cellTo_Left_Up(temp, index - 1, true);
    }

    if (array[index - 1] === 0) {
      temp[index - 1] = temp[index];
      temp[index] = 0;
    }

    return cellTo_Left_Up(temp, index - 1);
  }

  //operation cell left to right
  function cellTo_Right_Down(
    array: number[],
    index: number,
    isSame = false
  ): number[] {
    if (index > 3)
      return fixArraySortingFormat(
        array.filter((x) => x !== 0),
        "right"
      );

    if (isSame) return cellTo_Right_Down(array, index + 1, false);

    const temp = [...array];

    if (
      array[index] === array[index + 1] &&
      array[index] === array[index + 2] &&
      array[index] !== array[index + 3]
    ) {
      index++;
    }

    if (array[index] === array[index + 1]) {
      temp[index + 1] = temp[index] + temp[index + 1];
      temp[index] = 0;
      return cellTo_Right_Down(temp, index + 1, true);
    }

    if (array[index + 1] === 0) {
      temp[index + 1] = temp[index];
      temp[index] = 0;
    }

    return cellTo_Right_Down(temp, index + 1);
  }

  function getCellColumn(
    array: number[],
    index: number,
    temp: number[] = []
  ): number[] {
    if (index > array.length - 1) return temp;

    temp.push(array[index]);

    return getCellColumn(array, index + 4, temp);
  }

  function setCellColumn(
    array: number[],
    baseIndex: number,
    values: number[],
    valueIndex = 0
  ): number[] {
    if (valueIndex > values.length - 1) return array;

    const temp = [...array];

    temp[baseIndex] = values[valueIndex];

    return setCellColumn(temp, baseIndex + 4, values, valueIndex + 1);
  }

  function calculatedCellTo_Left(array: number[]) {
    let temp: number[] = [];
    for (let i = 0; i <= 12; i += 4) {
      temp = [...temp, ...cellTo_Left_Up(array.slice(i, i + 4), 3)];
    }
    return temp;
  }

  function calculatedCellTo_Right(array: number[]) {
    let temp: number[] = [];
    for (let i = 0; i <= 12; i += 4) {
      temp = [...temp, ...cellTo_Right_Down(array.slice(i, i + 4), 0)];
    }
    return temp;
  }

  function calculatedCellTo_Up(array: number[]) {
    let temp: number[] = [];
    for (let i = 0; i < 4; i++) {
      if (temp.length === 0) temp = [...cells];
      const getColumnValues = getCellColumn(array, i);
      const setCellUp = cellTo_Left_Up(getColumnValues, 3);
      const serColumnValue = setCellColumn(temp, i, setCellUp);
      temp = serColumnValue;
    }
    return temp;
  }

  function calculatedCellTo_Down(array: number[]) {
    let temp: number[] = [];
    for (let i = 0; i < 4; i++) {
      if (temp.length === 0) temp = [...cells];
      const getColumnValues = getCellColumn(array, i);
      const setCellUp = cellTo_Right_Down(getColumnValues, 0);
      const serColumnValue = setCellColumn(temp, i, setCellUp);
      temp = serColumnValue;
    }
    return temp;
  }

  //cehck key down
  const handleKeyDown = (e: KeyboardEvent): void => {
    const tempCell = [...cells];
    let temp: number[] = [];

    if (popupType !== undefined) return;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        temp = calculatedCellTo_Left(tempCell);
        const final_temp_left = handleSetCell(temp);
        setCells(final_temp_left);
        break;
      case "ArrowRight":
        e.preventDefault();
        temp = calculatedCellTo_Right(tempCell);
        const final_temp_right = handleSetCell(temp);
        setCells(final_temp_right);
        break;
      case "ArrowUp":
        e.preventDefault();
        temp = calculatedCellTo_Up(tempCell);
        const final_temp_up = handleSetCell(temp);
        setCells(final_temp_up);
        break;
      case "ArrowDown":
        e.preventDefault();
        temp = calculatedCellTo_Down(tempCell);
        const final_temp_down = handleSetCell(temp);
        setCells(final_temp_down);
        break;
      default:
        break;
    }
  };

  //push 0 to array[]
  function fillInitialValues(): number[] {
    const temp = [];
    for (let i = 0; i < 16; i++) {
      temp.push(0);
    }

    return temp;
  }

  // set cells
  function setInitialRandomNumber() {
    const temp = fillInitialValues();
    const { index1: number1, index2: number2 } = getStartIndexs();
    temp[number1] = 2;
    temp[number2] = 2;
    setCells(temp);
  }

  function newGame(): void {
    setPopupType("IsNewGame");
  }

  function isGameOver(): void {
    setCells([]);
    setPopupType(undefined);
  }

  function handleYes() {
    if (popupType === "IsNewGame") {
      setCells([]);
      localStorage.setItem("IsWinGamePopupShow", "true");
    } else {
      localStorage.removeItem("IsWinGamePopupShow");
    }
    setPopupType(undefined);
  }

  function handleNo() {
    if (popupType === "IsWinGame") {
      setCells([]);
    } else {
      localStorage.removeItem("IsWinGamePopupShow");
    }
    setPopupType(undefined);
  }

  useEffect(() => {
    if (cells.length === 0) setInitialRandomNumber();
    if (cells.filter((x) => x !== 0).length === 16) {
      if (
        isSameArray(calculatedCellTo_Up(cells), cells) &&
        isSameArray(calculatedCellTo_Down(cells), cells) &&
        isSameArray(calculatedCellTo_Left(cells), cells) &&
        isSameArray(calculatedCellTo_Right(cells), cells)
      ) {
        setPopupType("IsGameOver");
      }
    }

    if (
      cells.find((x) => x === 2048) &&
      localStorage.getItem("IsWinGamePopupShow") === "true"
    ) {
      setPopupType("IsWinGame");
    }
  }, [cells]);

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [cells, popupType]);

  useEffect(() => {
    localStorage.setItem("IsWinGamePopupShow", "true");
    const cellsTemp = localStorage.getItem("cells");
    if (cellsTemp) {
      setCells(JSON.parse(cellsTemp));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cells", JSON.stringify(cells));
  }, [cells]);

  let temp = [];
  let j = 1;
  for (let i = 4; i <= 131072; i *= 2) {
    const element = cells.filter((x) => x === i);
    // eslint-disable-next-line no-loop-func
    temp.push(element.reduce((a, b) => a + b * j, 0));
    j++;
  }
  const score = temp.reduce((a, b) => a + b, 0);
  return (
    <>
      <TitleGame score={score} onNewGame={newGame} />
      <StyledBodyGame>
        {cells.map((x, index) => {
          const className = `cell-container cell-${
            x !== 0 ? "full" : "null"
          } color-${x} ${x > 100000 ? "smaller-font" : ""}`;
          return (
            <div key={index.toString()} className={className}>
              {x !== 0 ? <h1>{x}</h1> : null}
            </div>
          );
        })}
        <NewGamePopup
          onNo={handleNo}
          onYes={handleYes}
          IsGameOver={isGameOver}
          type={popupType}
        />
      </StyledBodyGame>
    </>
  );
};
