import { useDispatch, useSelector, useStore } from "react-redux";

import { TAppStore } from "../configs/store";

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<TAppStore["getState"]>;
type AppDispatch = TAppStore["dispatch"];

// Все эти хуки работают только в клиентских компонентах, так как стор инициализируется только на клиенте в нашем случае
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<TAppStore>();
