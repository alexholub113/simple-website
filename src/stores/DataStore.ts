import { makeAutoObservable, runInAction } from 'mobx';

export interface ProtectedDataItem {
    userId: string;
    timestamp: string;
    secureData: string;
    userPermissions: string[];
    sessionInfo: {
        loginTime: string;
        expiresAt: string;
    };
}

export class DataStore {
    protectedData: ProtectedDataItem | null = null;
    isLoading = false;
    error = '';

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(loading: boolean) {
        this.isLoading = loading;
    }

    setError(error: string) {
        this.error = error;
    }

    setProtectedData(data: ProtectedDataItem | null) {
        this.protectedData = data;
    }

    async fetchProtectedData(userId: string, userRoles: string[] = []): Promise<void> {
        this.setLoading(true);
        this.setError('');
        
        try {
            // TODO: Replace with actual protected endpoint call
            // This would typically make a request to your backend endpoint
            // which would validate the user's session and return protected data
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock protected data response
            const mockData: ProtectedDataItem = {
                userId: userId,
                timestamp: new Date().toISOString(),
                secureData: 'This is sensitive information only available to authenticated users',
                userPermissions: userRoles,
                sessionInfo: {
                    loginTime: new Date(Date.now() - Math.random() * 3600000).toISOString(),
                    expiresAt: new Date(Date.now() + 3600000).toISOString()
                }
            };
            
            runInAction(() => {
                this.setProtectedData(mockData);
            });
        } catch (err) {
            runInAction(() => {
                this.setError('Failed to fetch protected data. Please try again.');
            });
            console.error('Protected data fetch error:', err);
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    }

    clearData() {
        this.protectedData = null;
        this.error = '';
    }
}
