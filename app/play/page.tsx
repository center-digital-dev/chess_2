import Link from "next/link";

import { ChessBoard } from "@widgets/chessBoard";

export default async function Home() {
   return (
      <div>
         <h1>
            CHESS page <Link href={"/ "}>go main</Link>
         </h1>
         <ChessBoard />
      </div>
   );
}
