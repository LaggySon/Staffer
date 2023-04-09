# Staffer

Staffer is a simple web application that helps you manage your employees and their tasks. It provides an easy-to-use interface for adding, editing, and deleting employees, as well as assigning tasks to them. Staffer is built using Node.js, Express, and MongoDB, making it a full-stack application with a backend server and a frontend user interface.

## Features

- Employee management: Staffer allows you to create, view, update, and delete employees. You can add their basic information such as name, email, and phone number.

- Task assignment: You can assign tasks to employees, specifying the task name, due date, and priority level. Tasks can be marked as completed or uncompleted.

- User authentication: Staffer includes user authentication using Passport.js, allowing users to sign up, log in, and log out securely. Only authenticated users can access the employee and task management features.

- Responsive design: The user interface of Staffer is responsive and works well on various devices, including desktops, tablets, and mobile phones, ensuring a seamless experience for users across different devices.

- Data persistence: Staffer uses MongoDB to store employee and task data, ensuring that the data is persistent even when the server is restarted.

## Getting Started

To get started with Staffer, follow these steps:

1. Clone the repository: `git clone https://github.com/laggyson/staffer.git`
2. Navigate to the project directory: `cd staffer`
3. Install dependencies: `npm install`
4. Create a `.env` file in the project directory and configure the following environment variables:
   - `MONGODB_URI`: MongoDB connection URI
   - `SESSION_SECRET`: Secret key for session management
   - `PORT`: Port number for the server to run (optional, default is 3000)
5. Start the application: `npm start`
6. Open a web browser and go to `http://localhost:3000` (or the specified port) to access the Staffer application.

## Technologies Used

- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express: A fast and minimalist web framework for Node.js.
- MongoDB: A popular NoSQL database for storing and retrieving data.
- Passport.js: An authentication middleware for Node.js that provides various authentication strategies, such as local authentication, OAuth, and more.
- EJS: A simple templating engine for rendering dynamic HTML views.
- Bootstrap: A popular CSS framework for building responsive and mobile-first web pages.
- Font Awesome: A comprehensive icon library for adding icons to web applications.

## Contributing

Contributions to Staffer are welcome! If you would like to contribute, please follow the [contribution guidelines](CONTRIBUTING.md) in the repository.

## License

Staffer is released under the [MIT License](LICENSE).

## Contact

If you have any questions, issues, or suggestions, please feel free to open an issue on the [GitHub repository](https://github.com/laggyson/staffer) or contact the author via email.
