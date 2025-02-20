"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useRegisterMutation } from "@api/auth/apiAuth";
import { yupEmailFiled, yupPasswordFiled } from "@shared/constants/yupCustomFields";
import { logger } from "@shared/libs/logging";

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
         .then((data) => {
            if (data.success === true) {
               logger.success("Операция выполнена успешно", data.data)();
            } else {
               if (data.errorCode === 102) {
                  setError("email", { message: "Пользователь с такой почтой уже существует" });
               }
            }
         })
         .catch((e) => {
            logger.error("Что то пошло не так при регистрации", e)();
         });
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div>
            <input type="text" placeholder="Email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
         </div>
         <div>
            <input type="text" placeholder="Username" {...register("username")} />
            {errors.username && <p>{errors.username.message}</p>}
         </div>

         <div>
            <input placeholder="Пароль" {...register("password")} />
            {errors.password && <p>{errors.password.message}</p>}
         </div>
         <button type="submit">Регистрация</button>
      </form>
   );
};
