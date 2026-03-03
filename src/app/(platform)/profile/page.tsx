import AccountPage from "@/features/profile/components/AccountPage";
import { getLoggedUserProfile } from "@/features/auth/Server/AuthServer";

export default async function ProfilePage() {
  const profile = await getLoggedUserProfile();
  return <AccountPage profile={profile} />;
}
