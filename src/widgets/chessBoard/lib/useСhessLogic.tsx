"use client";
import { Chess, Color, Move, PieceSymbol, Square } from "chess.js";
import { RefAttributes, useCallback, useMemo, useRef, useState } from "react";
import { ClearPremoves } from "react-chessboard";

import { checkForPromotion, copyFEN, getAvailableMoves, isMoveValid, makeRandomMove } from "../lib/chessUtils";

import type { ChessboardProps, Piece, PromotionPieceOption } from "react-chessboard/dist/chessboard/types";

interface IUseChessLogicProps {
   defaultBoardOrientation?: "white" | "black";

   mySide?: "b" | "w";
   fen?: string;
}

interface IUseChessLogicReturn {
   boardProps: ChessboardProps & RefAttributes<ClearPremoves>;
   isEditMode: boolean;
   onUndoMove: () => void;
   onClearBoard: () => void;
   onCopyFEN: () => void;
   onRotateBoard: () => void;
   onPasteFEN: (text: string) => void;
   onChangeEditMode: () => void;
}

/**
 * Хук для работы с логикой доски.
 *
 * Мы вынесли весь функционал в кух, что бы скрыть всю сложную логику в хуке и сделать возможность управление всем этим функционалом через пропсы в хуке.
 * На основе паттерна проектирования Facade. Скрываем всю логику и делаем упрощенное API, в нашем случае это пропсы
 */
export const useChessLogic = (props?: IUseChessLogicProps): IUseChessLogicReturn => {
   const { defaultBoardOrientation = "white", mySide = "w" } = props || {};

   const isEditModeRef = useRef(false);

   // Создаем экземпляр от класса Chess содержащий в себе логику игры в шахматы
   const game = useMemo(() => new Chess(), []);

   const [fenPosition, setFenPosition] = useState<string>(() => game.fen());

   // Состояния, которые используются, когда пользователь перемещает фигуры
   const [moveFrom, setMoveFrom] = useState<Square | null>(null);
   const [moveTo, setMoveTo] = useState<Square | null>(null);

   // Клетки возможных ходов
   const [optionSquares, setOptionSquares] = useState({});
   const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(defaultBoardOrientation);

   // Отображение окна трансформации пешки
   const [showPromotionDialog, setShowPromotionDialog] = useState(false);

   const gameMove = (props: { from: string; to: string; promotion?: string }): Move => {
      const move = game.move(props);
      setFenPosition(game.fen());
      // Ход компьютера
      setTimeout(() => {
         makeRandomMove(game);
         setFenPosition(game.fen());
      }, 300);
      return move;
   };

   // Очистка информации о текущем ходе
   const clearMoveData = () => {
      setMoveFrom(null);
      setMoveTo(null);
      setShowPromotionDialog(false);
      setOptionSquares({});
   };

   /** Получаем возможные ходы, раскрашиваем их в нужный цвет и возвращаем true если ходы есть */
   const getMoveOptions = (square: Square) => {
      const availableMoves = getAvailableMoves(game, square);
      setOptionSquares(availableMoves);
      return Object.keys(availableMoves).length > 0;
   };

   /** Метод, который отвечает за то, что будет с фигурой если перетащили за пределы доски */
   const handlePieceDropOffBoard = (sourceSquare: Square) => {
      if (isEditModeRef.current === false) return false;
      game.remove(sourceSquare);
      setFenPosition(game.fen());
   };

   /** Метод, который обрабатывает случаи перетаскивания запасных фигур на доску */
   const handleSparePieceDrop = (piece: Piece, targetSquare: Square) => {
      if (isEditModeRef.current === false) return false;

      const color = piece[0] as Color;
      const type = piece[1].toLowerCase() as PieceSymbol;

      const success = game.put({ type, color }, targetSquare);

      if (!success) {
         alert(`The board already contains ${color === "w" ? "WHITE" : "BLACK"} KING`);
      }

      return success;
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
         gameMove({ from: moveFrom, to: square, promotion: "q" });

         clearMoveData();
      }
   };

   // Обработчик начала перетаскивания фигуры
   const onDragStart = useCallback(
      (_: Piece, sourceSquare: Square) => {
         console.log("start", isEditModeRef.current);
         if (isEditModeRef.current) return;

         const hasMoveOptions = getMoveOptions(sourceSquare);

         if (hasMoveOptions) {
            setMoveFrom(sourceSquare);
            setMoveTo(null);
         }
      },
      [isEditModeRef.current]
   );

   // Обработчик конца перетаскивания фигуры
   const onDragEnd = (sourceSquare: Square, targetSquare: Square, piece: Piece): boolean => {
      // Если включен режим редактирования, то изменяем логику работы перетаскивания
      if (isEditModeRef.current) {
         const color = piece[0] as Color;
         const type = piece[1].toLowerCase() as PieceSymbol;

         game.remove(sourceSquare);
         game.remove(targetSquare);
         const success = game.put({ type, color }, targetSquare);

         if (success) setFenPosition(game.fen());

         return success;
      }

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
         gameMove({ from: moveFrom, to: targetSquare, promotion: "q" });

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
         gameMove({ from: moveFrom, to: moveTo, promotion: piece[1].toLowerCase() ?? "q" });
      }

      clearMoveData();
      return !!piece;
   };
   console.log(isEditModeRef.current);
   // console.log(game.pgn());
   return {
      boardProps: {
         boardOrientation,
         showPromotionDialog,
         areArrowsAllowed: isEditModeRef.current,
         promotionToSquare: moveTo,
         position: fenPosition,
         customSquareStyles: {
            ...(isEditModeRef.current ? {} : optionSquares)
         },

         // Функция обработки перетаскивания фигур за пределы доски
         onPieceDropOffBoard: handlePieceDropOffBoard,
         onSparePieceDrop: handleSparePieceDrop,

         // Функции обработки превращения пешки
         onPromotionCheck: isEditModeRef.current ? undefined : onDropPromotionCheck,
         onPromotionPieceSelect: isEditModeRef.current ? undefined : onPromotionPieceSelect,
         // Функции ходов живой игры. Обработка драг энд дроп, и кликов по клетке
         onSquareClick: isEditModeRef.current ? undefined : onSquareClick,
         onPieceDragBegin: onDragStart,
         onPieceDrop: onDragEnd
      },

      // Понятное Api для работы с доской
      onUndoMove: () => {
         game.undo();
         setFenPosition(game.fen());
         clearMoveData();
      },
      onClearBoard: () => {
         game.clear();
         setFenPosition(game.fen());
         clearMoveData();
      },
      onCopyFEN: () => copyFEN(game.fen()),
      onRotateBoard: () => setBoardOrientation(boardOrientation === "white" ? "black" : "white"),
      onPasteFEN: (text) => {
         game.load(text);
         setFenPosition(game.fen());
         clearMoveData();
      },
      onChangeEditMode: () => {
         isEditModeRef.current = !isEditModeRef.current;
         clearMoveData();

         setFenPosition(game.fen());
      },
      isEditMode: isEditModeRef.current
   };
};
