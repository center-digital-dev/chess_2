"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { type InferType } from "yup";

import { useChangePasswordMutation } from "@api/user/apiUser";
import { schemaChangePassword } from "@shared/constants/yupCustomFields";
import { Button, Input } from "@shared/ui";

import cls from "./EditPasswrodForm.module.scss";

export const EditPasswordForm = () => {
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isDirty },
      reset
   } = useForm({
      resolver: yupResolver(schemaChangePassword)
   });
   const [changePassword] = useChangePasswordMutation();

   const onSubmit = (data: InferType<typeof schemaChangePassword>) => {
      changePassword(data)
         .unwrap()
         .then(() => {
            reset({
               oldPassword: "",
               newPassword: ""
            });
            alert("Пароль успешно изменен");
         })
         .catch((err) => {
            if (typeof err === "object" && err !== null && "errorCode" in err) {
               if (err.errorCode === 103) {
                  setError("oldPassword", { message: "Неверный старый пароль" });
               }
            }
         });
   };

   return (
      <div className={cls.container}>
         <Input
            {...register("oldPassword")}
            label="Старый пароль"
            type="password"
            placeholder="••••••••••"
            error={errors.oldPassword}
         />
         <Input
            {...register("newPassword")}
            label="Новый пароль"
            type="password"
            placeholder="••••••••••"
            error={errors.newPassword}
         />

         <Button onClick={handleSubmit(onSubmit)} isDisabled={!isDirty}>
            Сменить пароль
         </Button>
      </div>
   );
};
