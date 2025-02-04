"use client";

import { useTestTokenMutation } from "@shared/configs/store/api/auth/apiAuth";
import { LoginForm } from "@widgets/loginForm";
import { RegistrationForm } from "@widgets/registrationForm";

const HomePage = () => {
   const [testToken] = useTestTokenMutation();
   return (
      <div style={{ marginTop: 20 }}>
         <button onClick={() => testToken()}>Проверить токен</button>
         <hr />
         <LoginForm />
         <hr />
         <RegistrationForm />
      </div>
   );
};

export default HomePage;
