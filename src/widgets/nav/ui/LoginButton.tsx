"use client";

import { useRouter } from "next/navigation";

import { useLogoutMutation } from "@api/auth/apiAuth";
import { useGetProfileQuery } from "@shared/configs/store/api/user/apiUser";
import { useAppSelector } from "@shared/hooks/useReduxStore";
import { Button } from "@shared/ui";

import cls from "./Nav.module.scss";

export const LoginButton = () => {
   const { isAuth } = useAppSelector((state) => state.auth);
   const { data: profile, isSuccess } = useGetProfileQuery(undefined, {
      skip: !isAuth
   });
   const [logOut] = useLogoutMutation();
   const router = useRouter();

   return (
      <div>
         {isAuth && (
            <>
               {isSuccess && (
                  <Button className={cls.button} onClick={() => router.push("/profile")}>
                     Профиль {profile?.userName}
                  </Button>
               )}{" "}
               <Button className={cls.button} onClick={() => logOut()}>
                  Выйти
               </Button>
            </>
         )}
      </div>
   );
};
