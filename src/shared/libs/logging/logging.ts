function formatDate(date: Date) {
   const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false // 24-часовой формат
   } as const;

   return date.toLocaleString("ru-RU", options).replace(",", " |");
}

/** Приводит лог в читаемый вид */
function generateTextLogging(message: string, type: "success" | "info" | "error" = "info") {
   const timestamp = formatDate(new Date());
   let icon;

   switch (type.toLowerCase()) {
      case "success":
         icon = "✅ ";
         break;
      case "info":
         icon = "";
         break;
      case "error":
         icon = "❌ ";
         break;

      default:
   }

   // const typeUpperCase = type.toUpperCase();
   const formattedMessage = `${icon}${message} `;

   return `${timestamp} ${formattedMessage}`;
}

/**
 * Объект для логирования.
 *
 * Пришлось сделать вариацию через bind, что бы понимать в каком месте был вызван лог
 */
export const logger = {
   info: (message: string, ...props: unknown[]) =>
      console.log.bind(console, generateTextLogging(message, "info"), ...props),
   success: (message: string, ...props: unknown[]) =>
      console.log.bind(console, generateTextLogging(message, "success"), ...props),
   error: (message: string, ...props: unknown[]) =>
      console.log.bind(console, generateTextLogging(message, "error"), ...props)
};
