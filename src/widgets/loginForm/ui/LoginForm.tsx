"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useLoginMutation } from "@shared/configs/store/api/auth/apiAuth";
import { yupEmailFiled, yupPasswordFiled } from "@shared/constants/yupCustomFields";
import { logger } from "@shared/libs/logging";

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
         .then((data) => {
            if (data.success === true) {
               logger.success("Login выполнен успешно")();
            } else {
               if (data.errorCode === 101) {
                  logger.error("Не корректные данные", data.data)();
               }
               if (data.errorCode === 103) {
                  logger.error("Не верный пароль", data.data)();
               }
            }
         })
         .catch((e) => {
            logger.error("Что то пошло не так при входе", e)();
         });
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div>
            <input type="text" placeholder="Emaiel" {...register("email")} autoComplete="off" />
            {errors.email && <p>{errors.email.message}</p>}
         </div>
         <div>
            <input placeholder="Пароль" {...register("password")} autoComplete="off" />
            {errors.password && <p>{errors.password.message}</p>}
         </div>
         <button type="submit">Войти</button>
      </form>
   );
};
