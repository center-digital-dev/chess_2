"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useRegisterMutation } from "@api/auth/apiAuth";
import { yupEmailFiled, yupPasswordFiled } from "@shared/constants/yupCustomFields";
import { Button, Input } from "@shared/ui";

const schema = yup.object().shape({
   email: yupEmailFiled,
   password: yupPasswordFiled,
   username: yup.string().required("Поле обязательно для заполнения")
});
export const RegistrationForm = () => {
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors }
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         email: "ada@mail.ru",
         password: "123456",
         username: "user"
      }
   });

   const [registerUser] = useRegisterMutation();

   const onSubmit = (data: yup.InferType<typeof schema>) => {
      registerUser({ email: data.email, password: data.password, userName: data.username })
         .unwrap()

         .catch((err) => {
            if (typeof err === "object" && err !== null && "errorCode" in err) {
               if (err.errorCode === 102) {
                  setError("email", { message: "Пользователь с такой почтой уже существует" });
               }
            }
         });
   };
   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 300 }}
      >
         <Input type="text" placeholder="Email" {...register("email")} label="Почта" error={errors.email} />

         <Input type="text" placeholder="Username" {...register("username")} error={errors.username} label="Username" />

         <Input placeholder="Пароль" {...register("password")} error={errors.password} label="Придумайте пароль" />

         <Button type="submit">Регистрация</Button>
      </form>
   );
};
