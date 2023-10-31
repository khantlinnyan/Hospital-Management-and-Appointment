import toast from "react-hot-toast";

export const useToast = () => {
  const toastSuccess = (message) => {
    toast.success(message);
  };

  const toastError = (message) => {
    toast.error(message);
  };

  return { toastSuccess, toastError };
};
