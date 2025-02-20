import { LoginForm } from "@widgets/loginForm";
import { RegistrationForm } from "@widgets/registrationForm";
export const HomePage = () => {
   return (
      <div style={{ marginTop: 20 }}>
         <br />
         <LoginForm />
         <br />
         <hr />
         <br />
         <RegistrationForm />
      </div>
   );
};
