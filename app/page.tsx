import Link from "next/link";

import HomePage from "@views/main/Home";

export default async function Home() {
   return (
      <div>
         <h1>
            BASE <Link href={"/todo"}>TODO</Link>
         </h1>

         <HomePage />
      </div>
   );
}
