# Guifre Link

Guifre Link is a URL shortener web application built with Next.js 14 and MongoDB.

## Features

-   Shorten long URLs into compact, easy-to-share links
-   Redirect users from shortened URLs to their original destinations
-   Built with modern web technologies for optimal performance

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node.js (v20.14.0 or later)
-   MongoDB account and connection string
-   Git (for cloning the repository)

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/guifreribas/guifre_link.git
    cd guifre-link
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your MongoDB connection string:
    ```
    MONGODB_URI=your_mongodb_connection_string_here
    ```

## Usage

To run the development server:

```
npm run dev
```

To build and start the production server:

```
npm run build
npm start
```

The application will be available at `http://localhost:3000` by default.

## API Endpoints

-   `POST /shorten`: Create a shortened URL
-   `GET /:shortUrl`: Redirect to the original URL

For more detailed API documentation, please refer to the API section in the project.

## Deployment

You can deploy this application to any platform that supports Next.js applications. Some popular options include Vercel, Netlify, and Heroku. Refer to your chosen platform's documentation for specific deployment instructions.

## Contributing

We welcome contributions to Guifre Link! Here's how you can contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Create a pull request

Please ensure your code adheres to the project's coding conventions and includes appropriate tests.

### Reporting Issues

If you find a bug or have a suggestion for improvement, please open an issue on the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This software is provided "as is", without warranty of any kind. The author(s) of Guifre Link are not responsible for any damages or liabilities associated with the use of this software.
