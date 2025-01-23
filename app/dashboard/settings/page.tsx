export default function SettingsPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Profile Settings</h3>
            {/* Profile settings form will go here */}
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">
              Notification Preferences
            </h3>
            {/* Notification settings will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
