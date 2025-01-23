export const teamMembers = [
  {
    name: "Alice Johnson",
    role: "Project Manager",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    tasks: 12,
    completedTasks: 8,
  },
  {
    name: "Bob Smith",
    role: "Lead Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    tasks: 15,
    completedTasks: 10,
  },
  {
    name: "Charlie Brown",
    role: "UI/UX Designer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    tasks: 8,
    completedTasks: 5,
  },
  {
    name: "David Wilson",
    role: "Backend Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    tasks: 10,
    completedTasks: 7,
  },
];

export default function TeamRoles() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {teamMembers.map((member) => (
        <div key={member.name} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <img
              src={member.image}
              alt={member.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Tasks Progress</span>
              <span>
                {Math.round((member.completedTasks / member.tasks) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{
                  width: `${(member.completedTasks / member.tasks) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
