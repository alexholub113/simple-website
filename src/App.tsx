import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import LoginModal from './components/LoginModal';
import ProtectedData from './components/ProtectedData';
import { useAuthStore } from './stores';

const App = observer(() => {
    const authStore = useAuthStore();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        // Check if user is already authenticated on app load
        authStore.checkAuth();
    }, [authStore]);

    const handleLogin = () => {
        setIsLoginModalOpen(true);
    };

    const handleExternalLogin = async () => {
        try {
            await authStore.loginWithExternalProvider();
        } catch (error) {
            console.error('External login error:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await authStore.logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Authentication Test Website
                        </h1>                        <div className="flex items-center space-x-4">
                            {/* Authentication Status */}
                            <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${authStore.isAuthenticated ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                <span className="text-sm text-gray-600">
                                    {authStore.isAuthenticated ? `Logged in as ${authStore.user?.name || authStore.user?.email}` : 'Not authenticated'}
                                </span>
                            </div>

                            {/* Auth Buttons */}
                            {authStore.isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    disabled={authStore.isLoading}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {authStore.isLoading ? 'Logging out...' : 'Logout'}
                                </button>
                            ) : (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleLogin}
                                        disabled={authStore.isLoading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={handleExternalLogin}
                                        disabled={authStore.isLoading}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {authStore.isLoading ? 'Connecting...' : 'External Provider'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {/* Welcome Section */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Welcome to Authentication Test Website
                        </h2>
                        <p className="text-gray-600 mb-4">
                            This is a simple website for testing various authentication flows including traditional login/password
                            and external authentication providers (OAuth2, OpenID Connect, etc.). Perfect for testing authentication
                            integrations and frontend functionality.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-medium text-blue-900 mb-2">How to test:</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>1. Try the "Login" button for traditional username/password authentication</li>
                                <li>2. Try the "External Provider" button for third-party authentication</li>
                                <li>3. Once authenticated, access the protected data below</li>
                                <li>4. Use the "Logout" button to end your session</li>
                            </ul>
                        </div>
                    </div>

                    {/* User Information */}
                    {authStore.isAuthenticated && authStore.user && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">User ID</label>
                                    <p className="text-sm text-gray-900">{authStore.user.id}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <p className="text-sm text-gray-900">{authStore.user.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <p className="text-sm text-gray-900">{authStore.user.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Roles</label>
                                    <p className="text-sm text-gray-900">{authStore.user.roles?.join(', ') || 'None'}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Protected Data Section */}
                    <ProtectedData />

                    {/* Technical Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Notes</h3>
                        <div className="space-y-4 text-sm text-gray-600">
                            <div>
                                <h4 className="font-medium text-gray-900">Current Implementation:</h4>
                                <p>This is a mock implementation for testing purposes. Both traditional and external authentication methods are simulated.</p>
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-900">Authentication Methods:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><strong>Traditional Login:</strong> Username/password authentication via modal</li>
                                    <li><strong>External Provider:</strong> Third-party authentication (OAuth2, OpenID Connect, SAML, etc.)</li>
                                    <li>Both methods can be easily integrated with real authentication systems</li>
                                </ul>
                            </div>

                                <div>
                                    <h4 className="font-medium text-gray-900">To integrate with real authentication:</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Replace the mock authentication in <code className="bg-gray-100 px-1 rounded">AuthStore.ts</code></li>
                                        <li>Implement actual backend endpoints for login, logout, and session validation</li>
                                        <li>Configure external provider parameters (client ID, endpoints, scopes, etc.)</li>
                                        <li>Handle token refresh and session management</li>
                                        <li>Implement proper error handling and security measures</li>
                                    </ul>
                                </div>                            <div>
                                <h4 className="font-medium text-gray-900">Security Considerations:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Use HTTPS in production</li>
                                    <li>Implement CSRF protection</li>
                                    <li>Validate tokens server-side</li>
                                    <li>Use secure, httpOnly cookies for session management</li>
                                    <li>Implement proper logout with provider session termination</li>
                                    <li>Handle state parameters for external provider security</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={authStore.login.bind(authStore)}
                isLoading={authStore.isLoading}
            />
        </div>
    );
});

export default App;
