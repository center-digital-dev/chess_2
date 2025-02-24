import cl from "clsx";
import { ButtonHTMLAttributes, FC } from "react";

import cls from "./Button.module.scss";

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   isDisabled?: boolean;
};

export const Button: FC<TButtonProps> = ({ className, children, isDisabled, ...otherProps }) => {
   return (
      <button className={cl(cls.button, isDisabled && cls.disabled, className)} {...otherProps}>
         {children}
      </button>
   );
};
