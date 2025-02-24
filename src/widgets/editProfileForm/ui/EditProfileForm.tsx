import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useChangeProfileMutation } from "@shared/configs/store/api/user/apiUser";
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
      setError,
      formState: { errors },
      reset
   } = useForm({
      resolver: yupResolver(schema)
   });
   const [changeProfile] = useChangeProfileMutation();

   const onSubmit = (data: yup.InferType<typeof schema>) => {
      changeProfile({ newEmail: data.email })
         .unwrap()
         .then((data) => {
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
         <Input
            {...register("email")}
            label="Старый пароль"
            type="password"
            placeholder="••••••••••"
            error={errors.email}
         />

         <Button onClick={handleSubmit(onSubmit)}>Изменить данные</Button>
      </div>
   );
};
