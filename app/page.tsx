import Link from "next/link";

export default async function Home() {
   return (
      <div>
         <h1>
            BASE <Link href={"/login"}>LOGIN</Link>
         </h1>
      </div>
   );
}
