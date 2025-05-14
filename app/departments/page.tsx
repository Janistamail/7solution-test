export default async function Home() {
  const response = await fetch(`http://localhost:3000/api/departments`);

  if (!response.ok) {
    throw new Error(`Failed to fetch department data: ${response.status}`);
  }

  const departmentData = await response.json();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Department Data</h1>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[80vh]">
        {JSON.stringify(departmentData, null, 2)}
      </pre>
    </main>
  );
}
