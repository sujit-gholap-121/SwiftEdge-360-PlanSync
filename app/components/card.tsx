export default function ProjectCard({ title, subtitle, openIssues, doneIssues, boards }) {
    return (
      <div className="bg-white shadow-md rounded-lg border border-gray-300 w-full max-w-sm">
        {/* Header Section */}
        <div className="p-4 grid grid-cols-[auto_1fr] gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
  
        {/* Quick Links Section */}
        <div className="px-4 py-2 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Quick Links</p>
          <div className="grid grid-rows-2 gap-4 text-sm text-gray-600">
            <div className="grid grid-cols-2 gap-1">
              <span>My open issues</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium w-fit">{openIssues}</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <span>Done issues</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  