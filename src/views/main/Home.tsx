"use client";

import { increment, decrement } from "@shared/configs/store/slices/counter";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useReduxStore";

import styles from "./page.module.scss";

const HomePage = () => {
   const dispatch = useAppDispatch();
   const { value } = useAppSelector((state) => state.counter);

   return (
      <div className={styles.page}>
         <h1>Count {value}</h1>
         <button onClick={() => dispatch(increment())}>+</button>
         <br />
         <button onClick={() => dispatch(decrement())}>-</button>
         <br />
      </div>
   );
};

export default HomePage;
