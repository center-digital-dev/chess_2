import Link from "next/link";

import HomePage from "@views/main/Home";

export default function Home() {
   return (
      <div>
         <h1>BASE</h1>
         <Link href={"/todo"}>go TODO</Link>
         <HomePage />
      </div>
   );
}
