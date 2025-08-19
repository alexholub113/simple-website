import { makeAutoObservable, runInAction } from 'mobx';

export interface User {
    id: string;
    email: string;
    name: string;
    roles?: string[];
}

export class AuthStore {
    user: User | null = null;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isAuthenticated(): boolean {
        return !!this.user;
    }

    setLoading(loading: boolean) {
        this.isLoading = loading;
    }

    setUser(user: User | null) {
        this.user = user;
    }

    async login(email: string, _password: string): Promise<void> {
        this.setLoading(true);
        
        try {
            // TODO: Replace with actual authentication API call
            // This would typically make a request to your backend authentication endpoint

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For testing purposes, simulate successful login
            const mockUser: User = {
                id: '123',
                email: email,
                name: email.split('@')[0],
                roles: ['user']
            };

            runInAction(() => {
                this.setUser(mockUser);
            });

            // In real implementation, this would be handled by your backend
            localStorage.setItem('auth_token', 'mock_token_' + Date.now());

        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Login failed. Please check your credentials.');
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    }

    async loginWithExternalProvider(): Promise<void> {
        this.setLoading(true);
        
        try {
            // TODO: Replace with actual external provider authentication
            // This would typically redirect to external provider (OAuth2/OpenID Connect)
            // or open a popup window for external authentication

            // Simulate external provider redirect/popup
            await new Promise(resolve => setTimeout(resolve, 1500));

            // For testing purposes, simulate successful external login
            const mockUser: User = {
                id: 'ext_456',
                email: 'external.user@provider.com',
                name: 'External User',
                roles: ['user', 'external']
            };

            runInAction(() => {
                this.setUser(mockUser);
            });

            // In real implementation, this would be handled by the external provider
            localStorage.setItem('auth_token', 'external_token_' + Date.now());

        } catch (error) {
            console.error('External login failed:', error);
            throw new Error('External authentication failed. Please try again.');
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    }

    async logout(): Promise<void> {
        this.setLoading(true);
        
        try {
            // TODO: Replace with actual logout call
            // This would typically make a request to your backend logout endpoint

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));

            runInAction(() => {
                this.setUser(null);
            });
            
            localStorage.removeItem('auth_token');

        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    }

    async checkAuth(): Promise<void> {
        this.setLoading(true);
        
        try {
            // TODO: Replace with actual auth check call
            // This would typically make a request to your backend endpoint
            // to validate the current session

            const token = localStorage.getItem('auth_token');
            if (token) {
                // Simulate token validation
                await new Promise(resolve => setTimeout(resolve, 500));

                // For testing purposes, restore user from token
                const mockUser: User = {
                    id: '123',
                    email: 'test@example.com',
                    name: 'test',
                    roles: ['user']
                };
                
                runInAction(() => {
                    this.setUser(mockUser);
                });
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('auth_token');
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    }
}
