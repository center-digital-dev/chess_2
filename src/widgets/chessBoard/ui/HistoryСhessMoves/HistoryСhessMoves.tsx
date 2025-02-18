import { Move } from "chess.js";

import styles from "./HistoryChessMoves.module.scss";

interface IHistoryChessMovesProps {
   history: Move[];
   currentMoveIndex: number;
   switchToMove: (moveIndex: number) => void;
}

export const HistoryChessMoves = ({ history, currentMoveIndex, switchToMove }: IHistoryChessMovesProps) => {
   return (
      <div className={styles.moveHistory}>
         <h3 className={styles.title}>История ходов</h3>
         <div className={styles.historyContainer}>
            {history.map((move, index) => (
               <div
                  key={index}
                  className={`${styles.moveItem} ${index === currentMoveIndex ? styles.active : ""}`}
                  onClick={() => switchToMove(index)}
               >
                  <span className={styles.moveIndex}>{index % 2 === 0 ? Math.floor(index / 2) + 1 : ""}</span>
                  <span className="flex-grow">
                     {getPieceSymbol(move.piece)} {move.from} → {move.to}
                  </span>
                  {move.captured && (
                     <span
                        className={`${styles.capturedPiece} ${index === currentMoveIndex ? styles.redActive : styles.red}`}
                        title="Взятие фигуры"
                     >
                        x{getPieceSymbol(move.captured)}
                     </span>
                  )}
                  {move.promotion && (
                     <span
                        className={`${styles.promotionPiece} ${index === currentMoveIndex ? styles.greenActive : styles.green}`}
                        title="Превращение пешки"
                     >
                        ={getPieceSymbol(move.promotion)}
                     </span>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
};

function getPieceSymbol(piece?: string): string {
   switch (piece?.toLowerCase()) {
      case "p":
         return "♙";
      case "n":
         return "♘";
      case "b":
         return "♗";
      case "r":
         return "♖";
      case "q":
         return "♕";
      case "k":
         return "♔";
      default:
         return " ";
   }
}
