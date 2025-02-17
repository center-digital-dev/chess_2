"use client";
import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useMemo, useState } from "react";
import { Chessboard, ChessboardDnDProvider, SparePiece } from "react-chessboard";

import styles from "./ChessBoard.module.scss";
// import {
//    checkForPromotion,
//    copyFEN,
//    getAvailableMoves,
//    isMoveValid,
//    makeRandomMove,
//    pasteFEN
// } from "../lib/chessUtils";

import type { Piece } from "react-chessboard/dist/chessboard/types";

const pieces: Piece[] = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];
export const EditChessBoard = () => {
   const game = useMemo(() => new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"), []); // empty board
   const [_, setFenPosition] = useState(game.fen());

   /** Метод, который отвечает за то, что будет с фигурой если перетащили за пределы доски */
   const handlePieceDropOffBoard = (sourceSquare: Square) => {
      game.remove(sourceSquare);
      setFenPosition(game.fen());
   };

   /** Метод, который обрабатывает случаи перетаскивания запасных фигур на доску */

   const handleSparePieceDrop = (piece: Piece, targetSquare: Square) => {
      const color = piece[0] as Color;
      const type = piece[1].toLowerCase() as PieceSymbol;

      const success = game.put({ type, color }, targetSquare);

      if (!success) {
         alert(`The board already contains ${color === "w" ? "WHITE" : "BLACK"} KING`);
      }

      return success;
   };
   return (
      <div className={styles.wrapper}>
         <ChessboardDnDProvider>
            <div
               style={{
                  display: "flex"
               }}
            >
               {pieces.slice(6, 12).map((piece) => (
                  <SparePiece key={piece} piece={piece} width={56} dndId="BasicBoard" />
               ))}
            </div>
            <Chessboard
               id="BasicBoard"
               areArrowsAllowed
               position={game.fen()}
               onSparePieceDrop={handleSparePieceDrop}
               onPieceDropOffBoard={handlePieceDropOffBoard}
               dropOffBoardAction="trash"
               customBoardStyle={{
                  borderRadius: "4px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
               }}
            />
            <div
               style={{
                  display: "flex"
               }}
            >
               {pieces.slice(0, 6).map((piece) => (
                  <SparePiece key={piece} piece={piece} width={56} dndId="BasicBoard" />
               ))}
            </div>
         </ChessboardDnDProvider>
      </div>
   );
};
