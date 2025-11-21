# Asset Management System (AMS)

A modern, easy-to-use asset management software with barcode tracking capabilities.

## Features

- **Asset Tracking**: Create, update, and manage all your assets in one place
- **Barcode Integration**: Generate and scan barcodes for quick asset identification
- **Disposal Management**: Properly dispose of assets and maintain records
- **Reporting**: Generate detailed reports on asset status, value, and distribution
- **Export Functionality**: Export data in CSV and PDF formats
- **User Management**: Role-based access control for different user types
- **Dashboard**: Overview of key asset metrics and recent activities

## Technology Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JSON Web Tokens (JWT) for authentication
- QR Code generation for asset tracking

### Frontend
- HTML5, CSS3, and vanilla JavaScript
- Responsive design for all device sizes

## Installation

1. Clone the repository
2. Install Node.js and MongoDB on your system
3. Navigate to the project directory
4. Run `npm install` to install dependencies
5. Create a `.env` file based on the provided `.env.example`
6. Run `npm start` to start the server

## API Endpoints

### Assets
- `GET /api/assets` - Get all assets
- `GET /api/assets/:id` - Get a specific asset
- `POST /api/assets` - Create a new asset
- `PUT /api/assets/:id` - Update an asset
- `DELETE /api/assets/:id` - Delete an asset
- `PUT /api/assets/:id/dispose` - Dispose an asset
- `GET /api/assets/:id/qrcode` - Generate QR code for an asset

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user info

### Reports
- `GET /api/reports/stats` - Get asset statistics
- `GET /api/reports/export/csv` - Export assets to CSV
- `GET /api/reports/export/pdf` - Export assets to PDF

## Future Enhancements

- Implement full React frontend with modern UI components
- Add barcode scanning functionality using device camera
- Implement real-time notifications
- Add asset maintenance scheduling
- Include depreciation calculations
- Add multi-location support
- Implement audit trails

## License

MIT License