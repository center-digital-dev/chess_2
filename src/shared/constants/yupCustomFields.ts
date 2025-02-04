import * as yup from "yup";

const emailRegex =
   /^[A-Za-z0-9а-яА-Я._-]+@([A-Za-z0-9а-яА-Я]{1,2}|[A-Za-z0-9а-яА-Я]((?!(\.\.))[A-Za-z0-9а-яА-Я.-])+[A-Za-z0-9а-яА-Я])\.[A-Za-zа-яА-Я]{2,}$/;

export const yupEmailFiled = yup
   .string()
   .required("Введите адрес электронной почты")
   .test({
      name: "email",
      test: (value) => {
         const emailMatch = value.match(emailRegex);
         return Boolean(emailMatch?.length);
      },
      message: "Адрес должен содержать @ и домен почты"
   });

export const yupPasswordFiled = yup
   .string()
   .min(6, "Пароль должен быть не менее 6 символов")
   .required("Пароль обязателен");
