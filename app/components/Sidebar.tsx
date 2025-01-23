import Link from "next/link";
import {
  HomeIcon,
  ViewColumnsIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Kanban Board", href: "/kanban", icon: ViewColumnsIcon },
  { name: "Team", href: "/team", icon: UserGroupIcon },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
  { name: "Notifications", href: "/notifications", icon: BellIcon },
];

export default function Sidebar() {
  const [collapseSidepanel, setCollapsePanel] = useState(false);

  const panelCss = collapseSidepanel ? "hidden" : " ";
  return (
    <>
      {/* <div className="m-auto ">
       
      </div> */}
      <div
        className={`flex flex-col  w-64 bg-gray-800 h-screen group/item ${
          collapseSidepanel ? "max-w-[2px] translate-x-3" : ""
        }`}
      >
        <button
          className={`${
            collapseSidepanel
              ? "bg-white self-center"
              : "invisible group-hover/item:visible"
          } self-end  border translate-y-5 rounded-full `}
          onClick={() => setCollapsePanel((prev) => !prev)}
        >
          Coll
        </button>
        <div className={`${panelCss}`}>
          <div className="flex items-center justify-center h-16 px-4">
            <h1 className="text-white text-xl font-bold">Project Hub</h1>
          </div>

          <nav className={`flex-1 px-2 py-4 space-y-2 `}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md group"
              >
                <item.icon className="mr-3 h-6 w-6" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
