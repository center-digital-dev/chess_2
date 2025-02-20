import cl from "clsx";
import { ButtonHTMLAttributes, FC } from "react";

import cls from "./Button.module.scss";

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<TButtonProps> = ({ className, children, ...otherProps }) => {
   return (
      <button className={cl(cls.button, className)} {...otherProps}>
         {children}
      </button>
   );
};
