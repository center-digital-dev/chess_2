"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useChangeProfileMutation, useGetProfileQuery } from "@shared/configs/store/api/user/apiUser";
import { yupEmailFiled } from "@shared/constants/yupCustomFields";
import { Button, Input } from "@shared/ui";

import cls from "./EditProfileForm.module.scss";

const schema = yup.object().shape({
   email: yupEmailFiled
});

export const EditProfileForm = () => {
   const {
      register,
      handleSubmit,
      reset,

      formState: { errors, isDirty }
   } = useForm({
      resolver: yupResolver(schema)
   });
   const [changeProfile] = useChangeProfileMutation();
   const { data } = useGetProfileQuery();

   useEffect(() => {
      if (data) {
         reset({
            email: data.email
         });
      }
   }, [data]);

   const onSubmit = (data: yup.InferType<typeof schema>) => {
      changeProfile({ newEmail: data.email })
         .unwrap()
         .then(() => {
            // if (data.success === true) {
            //    reset({
            //       oldPassword: "",
            //       newPassword: ""
            //    });
            //    alert("Пароль успешно изменен");
            // } else {
            //    if (data.errorCode === 103) {
            //       setError("oldPassword", { message: "Неверный старый пароль" });
            //    }
            // }
         })
         .catch((e) => {
            console.log(e);
         });
   };

   return (
      <div className={cls.container}>
         <Input {...register("email")} label="Почта" error={errors.email} />

         <Button onClick={handleSubmit(onSubmit)} isDisabled={!isDirty}>
            Изменить данные
         </Button>
      </div>
   );
};
