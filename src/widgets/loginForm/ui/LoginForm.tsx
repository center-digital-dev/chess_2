import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useLoginMutation } from "@shared/configs/store/api/auth/apiAuth";
import { yupEmailFiled, yupPasswordFiled } from "@shared/constants/yupCustomFields";

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
         .then((accessToken) => {
            console.log("LOGIN accessToken", accessToken);
         });
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div>
            <input type="text" placeholder="Email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
         </div>
         <div>
            <input type="password" placeholder="Пароль" {...register("password")} />
            {errors.password && <p>{errors.password.message}</p>}
         </div>
         <button type="submit">Войти</button>
      </form>
   );
};
