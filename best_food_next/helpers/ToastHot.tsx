import toast from "react-hot-toast";

export const toastSuccess = (msg: string) => {
  toast.success(msg, {
    duration: 3000,
    icon: "👏",
    position: "top-center",
    className: "border font-bold",
  });
};
export const toastError = (msg: string) => {
  toast.error(msg, {
    duration: 4000,
    position: "top-center",
    className: "border font-bold",
  });
};
