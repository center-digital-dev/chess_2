import { EditPasswordForm } from "@widgets/editPasswordForm";
import { EditProfileForm } from "@widgets/editProfileForm";

export const EditProfilePage = () => {
   return (
      <div className="container" style={{ marginTop: 20 }}>
         <EditProfileForm />
         <EditPasswordForm />
      </div>
   );
};
