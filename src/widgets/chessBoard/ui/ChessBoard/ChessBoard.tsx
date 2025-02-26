"use client";

import { useLayoutEffect, useState } from "react";
import { Chessboard, ChessboardDnDProvider, SparePiece } from "react-chessboard";

import styles from "./ChessBoard.module.scss";
import { pasteFEN } from "../../lib/chessUtils";
import { useChessLogic } from "../../lib/useСhessLogic";
import { HistoryChessMoves } from "../HistoryСhessMoves/HistoryСhessMoves";

import type { Piece } from "react-chessboard/dist/chessboard/types";

const pieces: Piece[] = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];

export const ChessBoard = () => {
   const [_, setRestartState] = useState("");
   const {
      boardProps,
      onClearBoard,
      restartGame,
      isGameOver,
      onCopyFEN,
      onRotateBoard,
      onPasteFEN,
      isEditMode,
      onChangeEditMode,
      history
   } = useChessLogic();

   // TODO Koshelev При первоночальном рендере драг энд дроп почему то не срабатывает. По этому явно заставляет компонент один раз отрендерится, что DnD сразу работал
   useLayoutEffect(() => {
      setRestartState("restart");
   }, []);

   return (
      <ChessboardDnDProvider>
         <div className={styles.wrapper}>
            <div className={styles.boardContainer} style={isGameOver ? { pointerEvents: "none" } : {}}>
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

                  <button onClick={history.undo}>undo</button>
                  <button onClick={history.redo}>redo</button>
                  <button onClick={onCopyFEN}>Скопировать FEN</button>
                  <hr />
                  <button onClick={onChangeEditMode}>
                     {isEditMode ? "Выключить" : "Включить"} режим редактирования
                  </button>
                  {isEditMode && (
                     <>
                        <button onClick={() => pasteFEN(onPasteFEN)}>Вставить FEN</button>
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
            <div style={isGameOver ? { pointerEvents: "none" } : {}}>
               {isGameOver && (
                  <div>
                     <h1>КОНЕЦ ИГРЫ</h1>
                     <button onClick={restartGame}>Начать заново</button>
                  </div>
               )}
               <HistoryChessMoves
                  history={history.moves}
                  currentMoveIndex={history.historyIndex}
                  switchToMove={history.switchToMove}
               />
            </div>
         </div>
      </ChessboardDnDProvider>
   );
};
