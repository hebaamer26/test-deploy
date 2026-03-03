import { useDispatch } from "react-redux";
import { SetAuthInfo } from "@/features/auth/store/authSlice";
import { RemoveToken } from "@/features/auth/Server/AuthServer";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    await RemoveToken();

    dispatch(SetAuthInfo ({ isAuthentication: false, userInfo: null }));

    router.push("/login");

    router.refresh();
  };

  return { logout };
}