import cl from "clsx";
import { FC, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

import cls from "./Input.module.scss";

type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
   error?: FieldError;
   label?: string;
};

export const Input: FC<TInputProps> = ({ id, className, error, label, ...otherProps }) => {
   return (
      <div className={className}>
         {label && (
            <label htmlFor={id} className={cls.label}>
               {label}
            </label>
         )}
         <input id={id} className={cl(cls.input, className)} {...otherProps} />
         {error?.message && <p className={cls.error}>{error.message}</p>}
      </div>
   );
};
