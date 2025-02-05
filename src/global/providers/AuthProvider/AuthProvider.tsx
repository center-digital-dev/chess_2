"use client";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   // const [isLoading, setIsLoading] = useState(true);
   // const { accessToken, isAuth } = useAppSelector((state) => state.auth);
   // const dispatch = useAppDispatch();
   // const router = useRouter();
   // const pathname = usePathname();

   // const [checkValidToken] = useTestTokenMutation();

   // useEffect(() => {
   //    const checkAuth = async () => {
   //       if (!isAuth && !accessToken) {
   //          const tokenLocalStorage = localStorage.getItem(COOKIE_TOKEN_NAME);

   //          if (tokenLocalStorage) {
   //             dispatch(setAccessToken({ token: tokenLocalStorage }));
   //             try {
   //                await checkValidToken().unwrap();
   //                dispatch(logIn({ token: tokenLocalStorage }));
   //             } catch (error) {
   //                dispatch(logOut());
   //                if (!publicRoutes.includes(pathname)) {
   //                   router.push("/login");
   //                }
   //             }
   //          } else if (!publicRoutes.includes(pathname)) {
   //             router.push("/login");
   //          }
   //       }
   //       setIsLoading(false);
   //    };

   //    checkAuth();
   // }, [accessToken, isAuth, pathname, checkValidToken]); // Added checkValidToken to dependencies

   // logger.info("~ AuthProvider ~ accessToken:", accessToken)();

   // if (isLoading) {
   //    return <div>Loading...</div>;
   // }

   return <>{children}</>;
};
