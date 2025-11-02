# Master V - Real Estate Intelligence Platform

A modern, feature-rich real estate intelligence platform built with React and Chakra UI. Master V provides comprehensive tools for real estate data management, analytics, and sales operations with real-time updates via WebSocket integration.

## 🌐 Live Demo

**Production:** [https://masterv.net](https://masterv.net)

## ✨ Features

- **Real-time Data Synchronization** - WebSocket integration for live updates
- **Role-based Access Control** - Different views and permissions for Company and Gold tier users
- **Responsive Design** - Fully responsive UI built with Chakra UI
- **Offline Support** - Graceful handling of offline states with user notifications
- **Multi-language Support** - Internationalization ready
- **Authentication System** - Secure login and password reset functionality
- **Dashboard Analytics** - Comprehensive dashboard for company users
- **Sales Management** - Advanced sales tracking for Gold tier users
- **Data Management** - Centralized data viewing and management
- **Settings Panel** - Customizable user preferences
- **Build Version Checking** - Automatic version validation
- **Progressive Web App** - PWA support with manifest and service worker

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 5.4.14** - Build tool and dev server
- **React Router DOM 6.26.2** - Client-side routing
- **Chakra UI 2.10.3** - Component library
- **Framer Motion 11.11.1** - Animation library
- **Emotion** - CSS-in-JS styling

### State Management
- **Redux Toolkit 2.3.0** - State management
- **React Redux 9.1.2** - React bindings for Redux

### Real-time Communication
- **Socket.IO Client 4.8.0** - WebSocket client

### Additional Libraries
- **React Icons 5.3.0** - Icon library
- **React Phone Number Input 3.4.8** - International phone number input

### Development Tools
- **ESLint 9.11.1** - Code linting
- **Prettier** - Code formatting
- **Vite Plugin React** - Fast refresh and JSX support

## 📁 Project Structure

```
Master-Front-End/
├── public/                 # Static assets
│   ├── Img/               # Images and icons
│   ├── manifest.json      # PWA manifest
│   ├── sitemap.xml        # SEO sitemap
│   └── Config.js          # Configuration file
├── src/
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   ├── index.css          # Global styles
│   ├── Common/            # Shared components (Loader, OfflineMessage, etc.)
│   ├── Components/        # Feature-specific components
│   ├── Hooks/             # Custom React hooks
│   ├── Lang/              # Internationalization files
│   ├── Layout/            # Layout components
│   ├── Pages/             # Page components
│   │   ├── Auth/          # Authentication pages
│   │   ├── Dashboard/     # Dashboard page
│   │   ├── Data/          # Data management page
│   │   ├── Detail/        # Detail view page
│   │   ├── Sales/         # Sales management page
│   │   ├── Settings/      # Settings page
│   │   └── Error404/      # 404 error page
│   ├── Redux/             # Redux store and slices
│   └── Utility/           # Utility functions and helpers
├── .gitignore
├── .prettierrc.json       # Prettier configuration
├── eslint.config.js       # ESLint configuration
├── jsconfig.json          # JavaScript configuration
├── vite.config.js         # Vite configuration
├── package.json
└── README.md
```

## 🚀 Installation & Usage

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/HodaNabeil/Master-Front-End.git
cd Master-Front-End
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment**
   - Update `/public/Config.js` with your API endpoints and configuration

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## 📸 Screenshots

_Add screenshots of your application here to showcase key features_

## 🔐 Environment Variables

Create a `/public/Config.js` file with the following configuration:

```javascript
window.Config = {
  API_URL: 'your-api-url',
  SOCKET_URL: 'your-socket-url',
  // Add other configuration variables
};
```

## 🔌 API Endpoints

The application connects to backend services through the configured API endpoints. Key integrations include:

- **Authentication** - User login, registration, and password reset
- **Data Management** - CRUD operations for real estate data
- **Dashboard Analytics** - Analytics and reporting endpoints
- **Sales Operations** - Sales tracking and management
- **WebSocket Events** - Real-time data synchronization

_Refer to your backend API documentation for detailed endpoint specifications_

## 🗺️ Roadmap

- [ ] Enhanced analytics and reporting features
- [ ] Mobile application development
- [ ] Advanced search and filtering capabilities
- [ ] Integration with third-party real estate platforms
- [ ] AI-powered property recommendations
- [ ] Multi-tenant support
- [ ] Enhanced notification system
- [ ] Document management system
- [ ] Advanced user roles and permissions
- [ ] Performance optimizations

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow the existing code style
- Run ESLint before committing
- Write meaningful commit messages
- Update documentation as needed

## 📄 License

This project is private and proprietary. All rights reserved.

## 📧 Contact

**Author:** Master V

**Website:** [https://masterv.net](https://masterv.net)

**Project Repository:** [https://github.com/HodaNabeil/Master-Front-End](https://github.com/HodaNabeil/Master-Front-End)

---


Made with ❤️ by Master V Team
