"use client";

import { useTestTokenMutation } from "@shared/configs/store/api/auth/apiAuth";
import { LoginForm } from "@widgets/loginForm";
import { RegistrationForm } from "@widgets/registrationForm";
export const HomePage = () => {
   const [testToken] = useTestTokenMutation();

   const handlerTestToken = () => {
      // Примеры использования

      testToken();
   };
   return (
      <div style={{ marginTop: 20 }}>
         <button onClick={() => handlerTestToken()}>Проверить токен</button>
         <br />
         <hr />
         <br />
         <LoginForm />
         <br />
         <hr />
         <br />
         <RegistrationForm />
      </div>
   );
};
