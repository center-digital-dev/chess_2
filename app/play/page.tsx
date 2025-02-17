import Link from "next/link";

import { ChessBoard } from "@widgets/chessBoard";
// import { EditChessBoard } from "@widgets/chessBoard/ui/EditChessBoard";

export default async function Home() {
   return (
      <div>
         <h1>
            EDIT CHESS page <Link href={"/ "}>go main</Link>
         </h1>
         <ChessBoard />
      </div>
   );
}
