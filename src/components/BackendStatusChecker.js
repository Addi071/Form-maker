import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import config from '../config/config';


export default function BackendStatusChecker() {
  const isSleeping = useRef(false);
  const toastId = useRef(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${config.BACKEND_URI}/health`);

        if (!res.ok) throw new Error();

        if (isSleeping.current) {
          isSleeping.current = false;

          if (toastId.current) {
            toast.dismiss(toastId.current);
            toastId.current = null;
          }

          toast.success("🟢 Backend is awake");
        }
      } catch {
        if (!isSleeping.current) {
          isSleeping.current = true;

          toastId.current = toast.loading(
            "😴 Backend is sleeping... Auto retrying..."
          );
        }
      }
    };

    checkBackend();

    const interval = setInterval(checkBackend, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
}