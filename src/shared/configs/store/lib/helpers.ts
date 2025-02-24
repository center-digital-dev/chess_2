// С бекенеда нам можем прийти вот такой вот тип. Даже, если запрос не упал с ошибкой это не гарантирует, что он выполнился успешно. Нам может прийти success false
type TResponseApi =
   | {
        data: unknown;
        errorCode: 102;
        success: true;
     }
   | {
        data: unknown;
        errorCode: number;
        success: false;
     };

/** Проверяем, что нам пришел объект с такими типом */
export const isCheckResponseApi = (response: unknown): response is TResponseApi => {
   if (typeof response !== "object" || response === null) return false;

   const obj = response as TResponseApi;

   return "data" in obj && "errorCode" in obj && "success" in obj;
};
