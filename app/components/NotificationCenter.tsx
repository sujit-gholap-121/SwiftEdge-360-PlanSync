const notifications = [
  {
    id: 1,
    title: 'Deadline Approaching',
    message: 'Project Alpha milestone due in 2 days',
    type: 'warning',
    time: '2 hours ago',
  },
  {
    id: 2,
    title: 'New Task Assigned',
    message: 'You have been assigned to review the UI components',
    type: 'info',
    time: '4 hours ago',
  },
  {
    id: 3,
    title: 'Dependency Update',
    message: 'Backend API endpoints have been updated',
    type: 'alert',
    time: '1 day ago',
  },
];

export default function NotificationCenter() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg ${
              notification.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-400' :
              notification.type === 'info' ? 'bg-blue-50 border-l-4 border-blue-400' :
              'bg-red-50 border-l-4 border-red-400'
            }`}
          >
            <div className="flex justify-between">
              <h3 className="font-medium">{notification.title}</h3>
              <span className="text-sm text-gray-500">{notification.time}</span>
            </div>
            <p className="text-sm mt-1">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}