export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Project Details</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Project ID: {params.id}</h3>
        {/* Project details will go here */}
      </div>
    </div>
  );
}
