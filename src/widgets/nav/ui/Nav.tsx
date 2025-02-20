import Link from "next/link";

import { LoginButton } from "./LoginButton";
import styles from "./Nav.module.scss";

export function Nav() {
   return (
      <nav className={styles.nav}>
         <div className={styles.container}>
            <div className={styles.linkContainer}>
               <Link href="/" className={styles.link}>
                  Главная
               </Link>

               <Link href="/play" className={styles.link}>
                  Шахматы
               </Link>
            </div>
            <LoginButton />
         </div>
      </nav>
   );
}
