// Дженерик, который описывает ответ от сервера. Если сервер нам хочет сказать, что запрос не корректный, допустим "такая почта уже есть" он все равно нам пришел 200 ответ.
// Единственное, что будет отличаться это контент внутри ответа, если запрос был с ошибкой то success будет false
export type TResponseApi<SuccessData = null, ErrorData = unknown> =
   | {
        data: SuccessData;
        errorCode: 102;
        success: true;
     }
   | {
        data: ErrorData;
        errorCode: number;
        success: false;
     };
