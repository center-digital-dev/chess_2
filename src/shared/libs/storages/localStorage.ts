import { ETokenActionType, TK_ACTION_STORAGE_NAME } from "@shared/constants/storageNames";

/** Функция для обновления localStorage в целях синхронизации между другими вкладками, что бы другие вкладки знали, что пользователь вошел или вышел */
export const updateStorageForOtherTabs = (type: ETokenActionType) => {
   localStorage.removeItem(TK_ACTION_STORAGE_NAME);
   localStorage.setItem(TK_ACTION_STORAGE_NAME, type);
};
