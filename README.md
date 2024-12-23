# E-Commerce Store

An e-commerce web application built with **ReactJS** and **Redux** for a seamless and efficient user experience. The application features a modern user interface, support for both dark and light themes, an intuitive checkout process, and optimized data sorting. The backend is powered by **PHP**, ensuring robust data management and processing.

## Features

- **User Interface**: A friendly and responsive UI with light and dark mode support.
- **Optimized Performance**: Efficient data sorting for faster and smoother interactions.
- **Easy Checkout**: A simple and intuitive checkout process for users.
- **Component Documentation**: All components are documented using **Storybook**.
- **Backend Integration**: A powerful PHP backend to handle data and server-side operations.


## Demo

https://github.com/user-attachments/assets/09361dd3-df73-437b-8a4f-c74dd5022755


## Tech Stack

### Frontend
- **ReactJS**: For building the user interface.
- **Redux**: For state management.
- **Storybook**: For documenting and showcasing UI components.

### Backend
- **PHP**: For handling server-side operations and APIs.

### Styling
- **CSS**: For responsive and dynamic styling.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- PHP (v7.4 or higher)
- A MySQL database

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ecommerce-store.git
   cd ecommerce-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the backend**
   - Navigate to the `backend` directory.
   - Configure the database settings in `config.php`.
   - Import the SQL dump (`database.sql`) into your MySQL database.

4. **Run the frontend**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

5. **Run the backend**
   - Start the PHP server:
     ```bash
     php -S localhost:8000 -t backend
     ```
   - The backend will be accessible at `http://localhost:8000`.

## Usage

- Visit the homepage to browse products.
- Use the theme toggle to switch between dark and light modes.
- Add products to the cart and proceed to the checkout for a seamless experience.

## Development

### Storybook
Run Storybook to view and test components:
```bash
npm run storybook
```

### Build
To create a production build:
```bash
npm run build
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature/my-feature`).
3. Commit your changes.
4. Push to your fork and submit a pull request.
