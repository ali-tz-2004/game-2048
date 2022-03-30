import { Button } from "./StyledComponents";

export type PopupType = "IsGameOver" | "IsNewGame" | "IsWinGame";

interface NewGamePopupProps {
  onYes: () => void;
  onNo: () => void;
  IsGameOver: () => void;
  type?: PopupType;
}

export const NewGamePopup = ({
  onYes,
  onNo,
  IsGameOver,
  type,
}: NewGamePopupProps) => {
  function getTitle() {
    switch (type) {
      case "IsNewGame":
        return "Are You Sure?";
      case "IsGameOver":
        return "Game Over";
      default:
        return "Your Win, do you want continue?";
    }
  }

  return type ? (
    <div className="popup">
      <div className="info-popup">
        <h2>{getTitle()}</h2>
        {type === "IsNewGame" || type === "IsWinGame" ? (
          <>
            <Button onClick={onYes}>Yes</Button>
            <Button onClick={onNo}>No</Button>
          </>
        ) : (
          <Button onClick={IsGameOver}>Play Again</Button>
        )}
      </div>
    </div>
  ) : null;
};
