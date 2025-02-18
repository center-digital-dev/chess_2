import { Move, Square, type Chess } from "chess.js";

/** Функция для выполнения случайного хода компьютером */
export function makeRandomMove(game: Chess) {
   const possibleMoves = game.moves();

   // Выход, если игра окончена или ничья
   if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;

   const randomIndex = Math.floor(Math.random() * possibleMoves.length);
   return game.move(possibleMoves[randomIndex]);
}

/**
 *  Проверка валидности хода с fromSquare на toSquare
 *  Если туда нельзя ходить по правилам шахмат, то возвращается false
 *
 */
export const isMoveValid = (game: Chess, fromSquare: Square | null, toSquare: Square | null): Move | false => {
   if (!fromSquare) return false;
   const moves = game.moves({
      square: fromSquare,
      verbose: true
   });
   const foundMove = moves.find((m) => m.from === fromSquare && m.to === toSquare);

   return foundMove ?? false;
};

/** Проверяем, нужно ли вызвать модалку трансформации пешки */
export const checkForPromotion = (move: Move, targetSquare: Square): boolean => {
   return (
      (move.color === "w" && move.piece === "p" && targetSquare[1] === "8") ||
      (move.color === "b" && move.piece === "p" && targetSquare[1] === "1")
   );
};

type TAvailableMoves = Partial<Record<Square, { background: string; borderRadius?: string }>>;
/**
 * Функция, которая возвращает возможные ходы фигуры стоящей на клетке square.
 * Так же эта функция сразу же раскрашивает клетки возможных ходов в нужный нам цвет
 *
 */
export function getAvailableMoves(game: Chess, square: Square): TAvailableMoves {
   const moves = game.moves({
      square,
      verbose: true
   });
   if (moves.length === 0) return {};

   const newSquares: TAvailableMoves = {};
   moves.forEach((move) => {
      newSquares[move.to] = {
         background:
            game.get(move.to) && game.get(move.to)?.color !== game.get(square)?.color
               ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
               : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
         borderRadius: "50%"
      };
   });

   newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)"
   };

   return newSquares;
}

export const copyFEN = (text: string) => {
   navigator.clipboard
      .writeText(text)
      .then(() => {
         alert("FEN position copied to clipboard!");
      })
      .catch((err) => {
         console.error("Failed to copy FEN: ", err);
      });
};

export const pasteFEN = (func: (text: string) => void) => {
   navigator.clipboard
      .readText()
      .then((text) => {
         try {
            func(text);
         } catch (error) {
            alert("Invalid FEN position " + JSON.stringify(error));
         }
      })
      .catch((err) => {
         console.error("Failed to paste FEN: ", err);
      });
};

// Функция реализации подсветки последних ходов
export const highlightLastMoves = (lastMove: Move) => {
   return {
      [lastMove.from]: {
         backgroundColor: "rgb(162 209 154)"
      },
      [lastMove.to]: {
         backgroundColor: "rgb(106 184 93)"
      }
   };
};
