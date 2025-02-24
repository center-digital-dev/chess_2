import { LoginForm } from "@widgets/loginForm";
import { RegistrationForm } from "@widgets/registrationForm";
export const LoginPage = () => {
   return (
      <div style={{ marginTop: 20 }} className="container">
         <br />
         <LoginForm />
         <br />
         <hr />
         <br />
         <RegistrationForm />
      </div>
   );
};
