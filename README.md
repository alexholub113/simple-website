# Simple Website Sample

A simple single-page React application built for testing authentication flows and frontend functionality. This website provides a clean interface for testing various authentication methods including traditional login/logout and external authentication providers.

## Features

- **Multiple Authentication Methods**: Traditional login modal and external provider authentication
- **Authentication Status**: Visual indicator showing current authentication state
- **Protected Content**: Button to fetch and display data that requires authentication
- **User Information**: Display of user details when authenticated
- **Responsive Design**: Built with Tailwind CSS for modern, responsive styling

## Authentication Methods

- **Traditional Login**: Username/password authentication via modal dialog
- **External Provider**: Third-party authentication (OAuth2, OpenID Connect, SAML, etc.)

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd simple-website-sample
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LoginModal.tsx   # Authentication modal
│   └── ProtectedData.tsx # Protected content component
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state management
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Key Components

### AuthContext
Manages authentication state throughout the application. Currently implements mock authentication for testing purposes.

### LoginModal
A modal component that provides login functionality with email/password fields. Designed to be easily integrated with real authentication systems.

### ProtectedData
A component that demonstrates fetching and displaying data that requires authentication. Shows different states based on user authentication status.

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
- Modifying Tailwind classes in components
- Updating the `tailwind.config.js` file for theme customization
- Adding custom CSS in `src/index.css`

### Authentication Logic
The authentication logic is currently mocked for testing purposes. To integrate with real authentication systems:

#### Traditional Authentication
1. Update the `login` method in `AuthContext.tsx` with real API calls
2. Configure your backend authentication endpoints
3. Implement proper password validation and security

#### External Provider Authentication
1. Update the `loginWithExternalProvider` method in `AuthContext.tsx`
2. Configure OAuth2/OpenID Connect parameters (client ID, endpoints, scopes)
3. Implement proper redirect flows or popup authentication
4. Handle state parameters and PKCE for security

## Development Notes

- The application includes TypeScript for type safety
- ESLint is configured for code quality
- The design is responsive and works on various screen sizes
- Authentication state persists across page refreshes (using localStorage for testing)

## Browser Support

This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
