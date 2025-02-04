import Link from "next/link";

export default async function Home() {
   return (
      <div>
         <h1>
            LOGIN PAGE <Link href={"/ "}>GO MAIN</Link>
         </h1>
      </div>
   );
}
