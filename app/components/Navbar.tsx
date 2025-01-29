import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth2";
import { teamMembers } from "./TeamRoles";
import { auth } from "../lib/firebase";
import { UserProfileGroup } from "./userProfileIcon";

export const NavBar = () => {
  const { user, loading } = useAuth();
  // const router = useRouter();
  console.log(user);

  return (
    <div className="flex justify-between items-center p-6 pr-[45px]  ">
      <h1 className="text-2xl font-semibold">Project Dashboard</h1>
      <div className="flex justify-center items-center gap-4">
        <UserProfileGroup />
      </div>
    </div>
  );
};
