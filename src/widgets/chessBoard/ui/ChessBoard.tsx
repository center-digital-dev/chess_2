"use client";

import { Chessboard, ChessboardDnDProvider, SparePiece } from "react-chessboard";

import styles from "./ChessBoard.module.scss";
import { pasteFEN } from "../lib/chessUtils";
import { useChessLogic } from "../lib/useСhessLogic";

import type { Piece } from "react-chessboard/dist/chessboard/types";

const pieces: Piece[] = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];

export const ChessBoard = () => {
   const { boardProps, onClearBoard, onUndoMove, onCopyFEN, onRotateBoard, onPasteFEN, isEditMode, onChangeEditMode } =
      useChessLogic({});

   return (
      <ChessboardDnDProvider>
         <div className={styles.wrapper}>
            {isEditMode && (
               <>
                  <div
                     style={{
                        display: "flex"
                     }}
                  >
                     {pieces.slice(6, 12).map((piece) => (
                        <SparePiece key={piece} piece={piece} width={56} dndId="BasicBoard" />
                     ))}
                  </div>
                  <hr />
               </>
            )}
            <div>
               <Chessboard id="BasicBoard" promotionDialogVariant={"default"} {...boardProps} />

               <button onClick={onUndoMove}>undo</button>
               <button onClick={() => {}}>redo</button>

               <button onClick={onCopyFEN}>Скопировать FEN</button>
               <button onClick={() => pasteFEN(onPasteFEN)}>Вставить FEN</button>
               <hr />
               <button onClick={onChangeEditMode}>{isEditMode ? "Выключить" : "Включить"} режим редактирования</button>
               {isEditMode && (
                  <>
                     <button onClick={onRotateBoard}>rotate</button>
                     <button onClick={onClearBoard}>clear</button>
                     <button onClick={() => onPasteFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")}>
                        Начальная позиция
                     </button>
                  </>
               )}
            </div>
            {isEditMode && (
               <>
                  <hr />
                  <div
                     style={{
                        display: "flex"
                     }}
                  >
                     {pieces.slice(0, 6).map((piece) => (
                        <SparePiece key={piece} piece={piece} width={56} dndId="BasicBoard" />
                     ))}
                  </div>
               </>
            )}
         </div>
      </ChessboardDnDProvider>
   );
};
