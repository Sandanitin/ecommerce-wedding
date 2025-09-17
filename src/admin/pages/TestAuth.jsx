import { useAuth } from '../context/AuthContext';

const TestAuth = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Not Authenticated</h2>
          <p className="mt-2 text-gray-600">Please log in to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Authentication Test</h1>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">User Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{user?.name || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{user?.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user?.role || 'N/A'}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Access Control</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">Is Authenticated:</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isAuthenticated ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">Is Admin:</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    isAdmin() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isAdmin() ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestAuth


