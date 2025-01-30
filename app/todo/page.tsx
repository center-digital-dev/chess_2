import Link from "next/link";

import { ToDoPage } from "@views/todo/DoPage";

export default function ToDo() {
   return (
      <div>
         <h1>TODO</h1>
         <Link href={"/"}>BACK</Link>
         <ToDoPage />
      </div>
   );
}
