import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedDataProps {
    className?: string;
}

const ProtectedData: React.FC<ProtectedDataProps> = ({ className = '' }) => {
    const { isAuthenticated, user } = useAuth();
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchProtectedData = async () => {
        if (!isAuthenticated) {
            setError('You must be logged in to access this data');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // TODO: Replace with actual protected endpoint call
            // This would typically make a request to your BFF endpoint
            // which would validate the user's session and return protected data

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock protected data response
            const mockData = {
                userId: user?.id,
                timestamp: new Date().toISOString(),
                secureData: 'This is sensitive information only available to authenticated users',
                userPermissions: user?.roles || [],
                sessionInfo: {
                    loginTime: new Date(Date.now() - Math.random() * 3600000).toISOString(),
                    expiresAt: new Date(Date.now() + 3600000).toISOString()
                }
            };

            setData(mockData);
        } catch (err) {
            setError('Failed to fetch protected data. Please try again.');
            console.error('Protected data fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-yellow-800">Please log in to access protected data</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Protected Data</h3>
                <button
                    onClick={fetchProtectedData}
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Loading...' : 'Fetch Data'}
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800 text-sm">{error}</p>
                </div>
            )}

            {data && (
                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium text-gray-900 mb-2">User Information</h4>
                        <p className="text-sm text-gray-600">User ID: {data.userId}</p>
                        <p className="text-sm text-gray-600">Permissions: {data.userPermissions.join(', ')}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium text-gray-900 mb-2">Session Information</h4>
                        <p className="text-sm text-gray-600">Login Time: {new Date(data.sessionInfo.loginTime).toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Expires At: {new Date(data.sessionInfo.expiresAt).toLocaleString()}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-md border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">Secure Data</h4>
                        <p className="text-sm text-green-800">{data.secureData}</p>
                        <p className="text-xs text-green-600 mt-2">Retrieved at: {new Date(data.timestamp).toLocaleString()}</p>
                    </div>
                </div>
            )}

            {!data && !error && (
                <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p>Click "Fetch Data" to retrieve protected information</p>
                </div>
            )}
        </div>
    );
};

export default ProtectedData;
