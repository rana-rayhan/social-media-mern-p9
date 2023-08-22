# Express API Starter

This is a simple Express API starter template that provides basic configurations and middleware to get you started with building a web API using Node.js and Express. The template includes features like rate limiting, XSS protection, logging, error handling, and more.

## Prerequisites

Before running this application, make sure you have the following command:

1. npm init -y
2. npm install

## Acknowledgments

This starter template utilizes the following npm packages:

- [express]
- [dotenv]
- [cookie-Parser]
- [morgan]
- [http-errors]
- [xss-clean]
- [express-rate-limit]

## Usage

To start the Express API, run the following command:

- npm run dev

## API Endpoints

The API will be available at `http://localhost:5000`.
The API provides the following endpoint:

- `GET /api/users`: Fetches a list of users.

## Configuration

The application is pre-configured with several middleware modules and routing setup. You can modify and extend it to suit your specific needs. Here are some of the key configurations:

- **Rate Limiting**: The API has a rate limiter middleware set to allow a maximum of 10 requests per minute (1 minute window) from a single IP address. If exceeded, the client will receive a "Too many requests from this IP, please try again later" response.

- **XSS Protection**: The application uses the `xss-clean` middleware to sanitize user input from potentially dangerous HTML and JavaScript code, preventing cross-site scripting (XSS) attacks.

- **Logging**: The API logs request details in the console using the `morgan` middleware with the "dev" format.

- **Error Handling**: The application has custom error handling middleware that handles client errors and server errors separately.

## Error Handling

The application has custom error handling for client and server errors. Client errors, such as 404 (Not Found) when accessing an invalid route, are handled by the middleware that responds with a JSON error message.

Server errors are also handled by a middleware that sends an appropriate error response, including the status code and error message.

## Contributing

We welcome contributions to improve this starter template. If you find any issues or have suggestions for improvements, feel free to create a pull request or submit an issue.

## Contact

For any inquiries or questions, please contact Rana Rayhan
