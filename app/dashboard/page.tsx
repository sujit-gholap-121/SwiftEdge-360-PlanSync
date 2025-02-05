import KanbanBoard from "../components/KanbanBoard";
import Sidebar from "../components/Sidebar";
import CreateProjectButton from "../components/CreateProjectButton";
import Button from "../components/CreateProjectButton";
import { useState } from "react";
import Modal from "../components/popup";
import TeamRoles from "../components/TeamRoles";
import ProjectCard from "../components/card";


const projects = [
  {
    title: "Concierge POD",
    subtitle: "Company-managed software",
    openIssues: 5,
    doneIssues: 10,
    boards: 2,
  },
  {
    title: "Sales Dashboard",
    subtitle: "Internal analytics tool",
    openIssues: 2,
    doneIssues: 8,
    boards: 1,
  },
  {
    title: "HR Management System",
    subtitle: "Cloud-based HR software",
    openIssues: 7,
    doneIssues: 15,
    boards: 3,
  },
  {
    title: "Marketing Campaign Tracker",
    subtitle: "Campaign monitoring software",
    openIssues: 4,
    doneIssues: 6,
    boards: 1,
  },
  {
    title: "Customer Support Portal",
    subtitle: "Ticketing and support system",
    openIssues: 3,
    doneIssues: 9,
    boards: 2,
  },
];



export default function Dashboard() {

const [openpopup, setopenpopup] = useState(false);
const handlepopup = () =>
{
  setopenpopup(!openpopup);
}
  return (
    <>
      <Sidebar />

      <div className=" grid grid-rows-[70px_1fr]">
        <div className=" flex flex-row justify-between p-2">
          <div> <h2>Dashboard</h2></div>
          <Button label={"New Project"} onClick={ handlepopup} />
          <Modal isOpen={openpopup} onClose={handlepopup}>
              <form></form>
          </Modal>

          {/* <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Team Members</h2>
              <TeamRoles />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Email Integration</h2>
              <EmailIntegration />
            </div>
          </div> */}

          {/* <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Notifications & Alerts
            </h2>
            <NotificationCenter />
          </div> */}
        </div>
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            subtitle={project.subtitle}
            openIssues={project.openIssues}
            doneIssues={project.doneIssues}
            boards={project.boards}
          />
        ))}
      </div>
    </div>
      </div>
    </>
  );
}
