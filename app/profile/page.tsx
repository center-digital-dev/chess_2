import { EditProfilePage } from "@views/profile";
import { Nav } from "@widgets/nav";

export default async function Home() {
   return (
      <div>
         <Nav />
         <EditProfilePage />
      </div>
   );
}
