export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Page not found</h2>
        <a href="/" className="mt-4 inline-block text-purple-600 hover:underline">
          Go home
        </a>
      </div>
    </div>
  );
}
