import { clsx } from "clsx";
import Link from "next/link";

import { LoginButton } from "./LoginButton";
import styles from "./Nav.module.scss";

export function Nav() {
   return (
      <nav className={clsx(styles.nav)}>
         <div className={clsx(styles.container, "container")}>
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
