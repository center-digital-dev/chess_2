import Link from "next/link";

import HomePage from "@views/main/Home";

export default async function Home() {
   return (
      <div>
         <h1>
            LOGIN PAGE <Link href={"/ "}>GO MAIN</Link>
         </h1>
         <HomePage />
      </div>
   );
}
