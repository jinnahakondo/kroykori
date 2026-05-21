

import { toast } from "sonner";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    className:
      "!bg-green-600 !text-white !border !border-green-700",
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    className:
      "!bg-red-600 !text-white !border !border-red-700",
  });
};

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    className:
      "!bg-yellow-500 !text-black !border !border-yellow-600",
  });
};