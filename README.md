# Unthinkable Website

This repository contains the Unthinkable website application with both frontend and backend components.

## Project Structure

- `Automation-Front-End/` - React-based frontend application
- `Automation-Back-End/` - Node.js backend API
- `public/` - Static assets and standalone HTML pages

## Static Pages

### Standalone Login Page

A static HTML+CSS login page is available at `/public/login.html` for testing, documentation, and fallback purposes.

**Location**: `/public/login.html`

**Purpose**: This page provides a pure HTML/CSS implementation of a login interface with username and password fields. It is intentionally static and does not include JavaScript or form submission logic.

**Features**:
- Semantic HTML5 structure
- Responsive design for mobile and desktop
- Accessibility-compliant (WCAG 2.1 AA)
- Username and password input fields with proper labels
- Native password masking
- Keyboard navigation support
- Cross-browser compatible

**Usage**: 
- Development: Access at `http://localhost:5173/login.html`
- Production: Access at `https://yourdomain.com/login.html`

**Note**: For functional authentication, use the React-based AuthPage component in the main application, which integrates with the `/api/auth/login` backend endpoint and handles JWT token management.

## Development

### Frontend

```bash
cd Automation-Front-End
npm install
npm run dev
```

### Backend

```bash
cd Automation-Back-End
npm install
npm run dev
```

## Testing

### Frontend Tests
```bash
cd Automation-Front-End
npm test
```

### Backend Tests
```bash
cd Automation-Back-End
npm test
```

## Build

### Frontend Production Build
```bash
cd Automation-Front-End
npm run build
```

The build process will include all files from the `/public` directory in the output `dist/` folder.

### Backend Production Build
```bash
cd Automation-Back-End
npm run build
```

## Deployment

The application is deployed using AWS ECS with Docker containers. See deployment documentation for detailed instructions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

All pages, including the standalone login page, are designed to meet WCAG 2.1 AA accessibility standards.

## License

Proprietary - All rights reserved