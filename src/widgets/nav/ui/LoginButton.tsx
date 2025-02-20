"use client";

import { useLogoutMutation } from "@shared/configs/store/api/auth/apiAuth";
import { useAppSelector } from "@shared/hooks/useReduxStore";

import cls from "./Nav.module.scss";

export const LoginButton = () => {
   const { isAuth } = useAppSelector((state) => state.auth);
   const [logOut] = useLogoutMutation();

   return (
      <div>
         {isAuth && (
            <button className={cls.button} onClick={() => logOut()}>
               Выйти
            </button>
         )}
      </div>
   );
};
