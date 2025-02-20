import { HomePage } from "@views/main";
import { Nav } from "@widgets/nav";

export default async function Home() {
   return (
      <div>
         <Nav />
         <HomePage />
      </div>
   );
}
