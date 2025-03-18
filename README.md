# Grocery Delivery App

## Overview

Our Grocery Delivery App is built using the MERN stack, incorporating modern technologies like Tailwind CSS for styling, Socket.IO for real-time updates, and Razorpay API for secure payment processing. The client-side is developed with Vite React, while the server is built using Node.js.

## Architecture

### Client-Side (Vite React)

- **Frontend Framework**: Vite React is used for building the client-side application, providing a fast and efficient development environment.
- **Styling**: Tailwind CSS is utilized for styling, offering a customizable and responsive design.
- **Real-time Updates**: Socket.IO is integrated to enable real-time updates and notifications.

### Server-Side (Node.js)

- **Backend Framework**: Node.js is used as the server-side runtime environment.
- **API Framework**: Express.js is employed to create RESTful APIs for handling requests and responses.
- **Database**: MongoDB is used as the NoSQL database to store user information, orders, and product details.
- **Payment Gateway**: Razorpay API is integrated for secure payment processing.

### Third-Party APIs and Tools

- **Razorpay API**: Used for payment processing.
- **Socket.IO**: Enables real-time communication between the client and server.
- **Tailwind CSS**: Used for styling and layout.

## Features

- **User Registration and Login**: Users can register and log in to their accounts.
- **Product Browsing**: Users can browse through available grocery products.
- **Order Placement**: Users can add products to their cart and place orders.
- **Real-time Updates**: Users receive real-time updates on order status via Socket.IO.
- **Payment Processing**: Secure payment processing is handled through Razorpay API.
- **Admin Dashboard**: Admins can manage orders, products, and user accounts.

## Steps to Run the Project Locally

### Prerequisites

- Node.js installed on your system.
- MongoDB Atlas account for database setup.
- Razorpay account for payment gateway integration.

### Setup Instructions

1. **Clone the Repository**:
git clone https://github.com/your-repo-url/grocery-delivery-app.git


2. **Navigate to the Project Directory**:
cd grocery-delivery-app


3. **Install Dependencies**:
- For the client-side (Vite React):
  ```
  cd client
  npm install
  ```
- For the server-side (Node.js):
  ```
  cd server
  npm install
  ```

4. **Set Up MongoDB Atlas**:
- Create a new cluster on MongoDB Atlas.
- Get the connection string and add it to a `.env` file in the server directory:
  ```
  MONGODB_CONNECT_STRING="mongodb+srv://username:password@cluster-name.mongodb.net/"
  ```

5. **Set Up Razorpay API**:
- Create a Razorpay account and generate API keys.
- Add the keys to the `.env` file in the server directory:
  ```
  RAZORPAY_KEY_ID="your_key_id"
  RAZORPAY_KEY_SECRET="your_key_secret"
  ```

6. **Start the Development Servers**:
- Start the client-side server:
  ```
  cd client
  npm run dev
  ```
- Start the server-side server:
  ```
  cd server
  node index.js
  ```

7. **Access the Application**:
- Open a web browser and navigate to `http://localhost:5173` (default Vite port).

## Contributing

Contributions are welcome! Please submit a pull request with your changes and ensure they align with the project's architecture and coding standards.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
