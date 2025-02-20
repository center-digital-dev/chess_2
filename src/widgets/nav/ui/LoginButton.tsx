"use client";

import { useRouter } from "next/navigation";

import { useLogoutMutation } from "@api/auth/apiAuth";
import { useAppSelector } from "@shared/hooks/useReduxStore";
import { Button } from "@shared/ui";

import cls from "./Nav.module.scss";

export const LoginButton = () => {
   const { isAuth } = useAppSelector((state) => state.auth);
   const [logOut] = useLogoutMutation();
   const router = useRouter();

   return (
      <div>
         {isAuth && (
            <>
               <Button className={cls.button} onClick={() => router.push("/profile")}>
                  Профиль
               </Button>{" "}
               <Button className={cls.button} onClick={() => logOut()}>
                  Выйти
               </Button>
            </>
         )}
      </div>
   );
};
