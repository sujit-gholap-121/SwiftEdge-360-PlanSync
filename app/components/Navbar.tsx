import { useRouter } from "next/router";
import { useAuth } from "./AuthProvider";
import { teamMembers } from "./TeamRoles";
import { auth } from "../lib/firebase";

export const NavBar = () => {
  const { user, loading } = useAuth();
  // const router = useRouter();
  console.log(user);

  return (
    <div className="flex justify-between items-center p-6 pr-[45px]">
      <h1 className="text-2xl font-semibold">Project Dashboard</h1>
      <div className="flex justify-center items-center gap-4">
        {user?.email && (
          <>
            <img className="border border-round" src={teamMembers[0].image} />
            <button
              onClick={() => {
                console.log("signing out", auth.signOut);
                auth.signOut();
              }}
              className={`${
                user ? "border border-round" : ""
              } text-sm text-gray-600 hover:text-gray-900`}
            >
              "Sign Out"
            </button>
          </>
        )}
      </div>
    </div>
  );
};
