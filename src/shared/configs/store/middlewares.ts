import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";

import { logger } from "@shared/libs/logging";

/** Middleware для логирования ошибок */
export const loggerMiddleware: Middleware = () => (next) => (action) => {
   if (isRejectedWithValue(action)) {
      logger.error(
         `Запрос ${(action.meta?.arg as { endpointName: string })?.endpointName} упал с ошибкой`,
         action.payload
      )();
   }

   return next(action);
};
