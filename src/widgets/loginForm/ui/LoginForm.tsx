"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useLoginMutation } from "@api/auth/apiAuth";
import { yupEmailFiled, yupPasswordFiled } from "@shared/constants/yupCustomFields";
import { Button, Input } from "@shared/ui";

const schema = yup.object().shape({
   email: yupEmailFiled,
   password: yupPasswordFiled
});

export const LoginForm = () => {
   const [login] = useLoginMutation();

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         email: "ada@mail.ru",
         password: "123456"
      }
   });

   const onSubmit = (data: yup.InferType<typeof schema>) => {
      login({ email: data.email, password: data.password })
         .unwrap()
         .catch((err: unknown) => {
            if (typeof err === "object" && err !== null && "errorCode" in err) {
               if (err.errorCode === 101) {
                  alert("Не корректные данные");
               }
               if (err.errorCode === 103) {
                  alert("Не верный пароль");
               }
            }
         });
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 300 }}
      >
         <Input
            type="text"
            placeholder="Email"
            {...register("email")}
            autoComplete="off"
            error={errors.email}
            label="Почта"
         />

         <Input
            placeholder="Пароль"
            {...register("password")}
            autoComplete="off"
            error={errors.password}
            label="Пароль"
         />

         <Button type="submit">Войти</Button>
      </form>
   );
};
