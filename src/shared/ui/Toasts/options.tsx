import { Bounce, toast } from "react-toastify";
import React from "react";

export const notifyError = (
  header: string,
  message: string
): string | number => {
  return toast.error(<BasicToastContent header={header} message={message} />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const notifySuccess = (
  header: string,
  message: string
): string | number => {
  return toast.success(
    <BasicToastContent header={header} message={message} />,
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    }
  );
};

export const notifyLoading = (
  header: string,
  message: string
): string | number => {
  return toast.loading(
    <BasicToastContent header={header} message={message} />,
    {
      position: "top-right",
      hideProgressBar: true,
      closeOnClick: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    }
  );
};

export const deleteToast = (loadingToastId: string | number) =>
  toast.dismiss(loadingToastId);

interface BasicToastContentProps {
  header: string;
  message: string;
}
const BasicToastContent: React.FC<BasicToastContentProps> = ({
  header,
  message,
}: BasicToastContentProps) => {
  return (
    <div className="grid grid-cols-[1fr_1px_80px] w-full">
      <h3 className="text-zinc-800 text-sm font-semibold">{header}</h3>
      {message.length > 0 && <p className="text-sm">{message}</p>}
    </div>
  );
};
