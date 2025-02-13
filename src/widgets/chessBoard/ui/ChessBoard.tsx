"use client";
import { Chess, Square } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";

import styles from "./ChessBoard.module.scss";
import {
   checkForPromotion,
   copyFEN,
   getAvailableMoves,
   isMoveValid,
   makeRandomMove,
   pasteFEN
} from "../lib/chessUtils";

import type { Piece, PromotionPieceOption } from "react-chessboard/dist/chessboard/types";

const mySide: "b" | "w" = "w"; //black |white
export const ChessBoard = () => {
   // Создаем экземпляр от класса Chess содержащий в себе логику игры в шахматы
   const [game] = useState(new Chess());

   // Состояния, которые используются, когда пользователь перемещает фигуры
   const [moveFrom, setMoveFrom] = useState<Square | null>(null);
   const [moveTo, setMoveTo] = useState<Square | null>(null);

   // Клетки возможных ходов
   const [optionSquares, setOptionSquares] = useState({});
   const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");

   // Отображение окна трансформации пешки
   const [showPromotionDialog, setShowPromotionDialog] = useState(false);

   // Очистка информации о текущем ходе
   const clearMoveData = () => {
      setMoveFrom(null);
      setShowPromotionDialog(false);
      setMoveTo(null);
      setOptionSquares({});
   };

   /** Получаем возможные ходы, раскрашиваем их в нужный цвет и возвращаем true если ходы есть */
   const getMoveOptions = (square: Square) => {
      const availableMoves = getAvailableMoves(game, square);
      setOptionSquares(availableMoves);
      return Object.keys(availableMoves).length > 0;
   };

   // Обработчик клика на клетку
   const onSquareClick = (square: Square) => {
      // Делаем проверку может ли пользователь ходить
      if (game.turn() !== mySide) return;
      // Если пользователь кликнул на одну и ту же фигуру второй раз. То мы убираем выделение хода у данной фигуры
      if (square === moveFrom) return clearMoveData();

      // Выбор клетки с которой будет произведен ход
      if (!moveFrom) {
         const squarePiece = game.get(square);

         // Если клетка не содержит фигуру, либо же если фигура не принадлежит стороне игрока
         if (!squarePiece || squarePiece.color !== mySide) return;

         const hasMoveOptions = getMoveOptions(square);
         if (hasMoveOptions) setMoveFrom(square);
         return;
      }

      // Выбор клетки на которую будет произведен ход
      if (!moveTo) {
         // Проверка на валидность перед открытие диалогового окна
         const foundMove = isMoveValid(game, moveFrom, square);

         // Ход не валиден, возможно пользователь кликнул на клетку с другой фигурой или туда, куда нельзя ходить
         if (!foundMove) {
            // Проверка клика пользователя на новую фигуру
            const hasMoveOptions = getMoveOptions(square);
            // Если клик на новую фигуру, устанавливается значение стартовой позиции хода клетки, иначе очищаем его
            return setMoveFrom(hasMoveOptions ? square : null);
         }

         // Устанавливаем значение валидного хода
         setMoveTo(square);

         // Проверка на превращение пешки
         if (checkForPromotion(foundMove, square)) return setShowPromotionDialog(true);

         // Выполнение обычного хода
         game.move({ from: moveFrom, to: square, promotion: "q" });
         // Ход компьютера
         setTimeout(() => makeRandomMove(game), 100);
         clearMoveData();
      }
   };

   // Обработчик начала перетаскивания фигуры
   const onDragStart = (_: Piece, sourceSquare: Square) => {
      const hasMoveOptions = getMoveOptions(sourceSquare);
      if (hasMoveOptions) {
         setMoveFrom(sourceSquare);
         setMoveTo(null);
      }
   };

   // Обработчик конца перетаскивания фигуры
   const onDragEnd = (_: Square, targetSquare: Square, _piece: Piece): boolean => {
      // Если сейчас не наша очередь ходить, и не установлено значение moveFrom то ничего не делаем
      if (game.turn() !== mySide || !moveFrom) return false;

      if (!moveTo) {
         // Проверяем на валидность хода
         const foundMove = isMoveValid(game, moveFrom, targetSquare);
         if (!foundMove) return false;

         setMoveTo(targetSquare);

         // Проверка на превращение пешки, если пешка должна превратиться в другую, то вызываем модальное окно
         if (checkForPromotion(foundMove, targetSquare)) {
            setShowPromotionDialog(true);
            return true;
         }

         // Выполнение обычного хода
         game.move({ from: moveFrom, to: targetSquare, promotion: "q" });
         setTimeout(() => makeRandomMove(game), 100);

         clearMoveData();
      }
      return true;
   };

   /**  Функция вызывается перед каждым ходом, чтобы проверить, является ли текущий ход тригером события превращением пешки. */
   const onDropPromotionCheck = (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
      if (!moveFrom) return false;

      // Проверка на возможность превращения пешки:
      // - Для белой пешки: движение с 7-го ряда на 8-й
      // - Для черной пешки: движение со 2-го ряда на 1-й
      const isPawnPromotion =
         (piece === "wP" && sourceSquare[1] === "7" && targetSquare[1] === "8") ||
         (piece === "bP" && sourceSquare[1] === "2" && targetSquare[1] === "1");
      const isValidMove = isMoveValid(game, moveFrom, targetSquare);
      // Проверка, что ход выполняется на соседнюю вертикаль, а не по горизонту допустим
      const isAdjacentFile = Math.abs(sourceSquare.charCodeAt(0) - targetSquare.charCodeAt(0)) <= 1;
      if (isPawnPromotion && isValidMove && isAdjacentFile) {
         setMoveTo(targetSquare);
         setShowPromotionDialog(true);
         return true;
      }
      return false;
   };

   /**
    * Функция которая вызывается при выборе фигуры в которую должна превратиться пешка. Возвращает флаг успешности хода.
    */
   const onPromotionPieceSelect = (piece: PromotionPieceOption | undefined) => {
      if (!moveFrom || !moveTo) return false;
      // Если ни одна фигура не была передана, значит пользователь пытается закрыть диалоговое окно
      if (piece) {
         game.move({
            from: moveFrom,
            to: moveTo,
            promotion: piece[1].toLowerCase() ?? "q"
         });
      }

      clearMoveData();
      setShowPromotionDialog(false);
      return !!piece;
   };

   return (
      <div className={styles.wrapper}>
         <Chessboard
            id="BasicBoard"
            boardOrientation={boardOrientation}
            areArrowsAllowed
            showPromotionDialog={showPromotionDialog}
            promotionDialogVariant={"default"}
            onPromotionPieceSelect={onPromotionPieceSelect}
            onPromotionCheck={onDropPromotionCheck}
            promotionToSquare={moveTo}
            position={game.fen()}
            onSquareClick={onSquareClick}
            onPieceDragBegin={onDragStart}
            onPieceDrop={onDragEnd}
            customSquareStyles={{
               ...optionSquares
            }}
         />

         <button
            onClick={() => {
               game.undo();
               clearMoveData();
            }}
         >
            undo
         </button>
         <button onClick={() => {}}>redo</button>
         <button
            onClick={() => {
               game.clear();
               clearMoveData();
            }}
         >
            clear
         </button>
         <button
            onClick={() => {
               setBoardOrientation(boardOrientation === "white" ? "black" : "white");
               clearMoveData();
            }}
         >
            rotate
         </button>
         <button onClick={() => copyFEN(game.fen())}>Скопировать FEN</button>
         <button
            onClick={() =>
               pasteFEN((text) => {
                  game.load(text);
                  clearMoveData();
               })
            }
         >
            Вставить FEN
         </button>
      </div>
   );
};
