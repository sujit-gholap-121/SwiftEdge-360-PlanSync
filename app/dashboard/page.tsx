import KanbanBoard from "../components/KanbanBoard";
import TeamRoles from "../components/TeamRoles";
import NotificationCenter from "../components/NotificationCenter";
import EmailIntegration from "../components/EmailIntegration";
import { NavBar } from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className=" h-[calc(100vh - 88px)] overflow-y-auto">
        <div className="p-6 flex-grow ">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Project Status</h2>
            <KanbanBoard />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Team Members</h2>
              <TeamRoles />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Email Integration</h2>
              <EmailIntegration />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Notifications & Alerts
            </h2>
            <NotificationCenter />
          </div>
        </div>
      </div>
    </>
  );
}
