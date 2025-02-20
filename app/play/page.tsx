import { ChessBoard } from "@widgets/chessBoard";
import { Nav } from "@widgets/nav";

export default async function Home() {
   return (
      <div>
         <Nav />
         <ChessBoard />
      </div>
   );
}
