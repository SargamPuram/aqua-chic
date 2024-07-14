# Aqua Chic

Aqua Chic is an AI-driven fashion challenge application that allows users to generate weekly fashion themes, upload and display photos, and interact with the community by liking photos. The project includes both frontend and backend components, leveraging technologies such as React, Express.js, Firebase, AWS S3, and DynamoDB.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Directory Structure](#directory-structure)
- [Contributing](#contributing)
- [License](#license)

## Demo

You can visit the live site at [Aqua Chic on Netlify](https://your-netlify-link).

## Features

- **AI-Generated Fashion Themes:** Generate and display weekly fashion themes using Google Generative AI.
- **Photo Upload and Display:** Users can upload photos, which are stored in an S3 bucket and displayed in the photo gallery.
- **Likes Feature:** Users can like photos, with the likes data stored in a DynamoDB table.
- **Responsive Design:** The application is designed to be responsive and user-friendly.

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Firebase account
- AWS account

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/SargamPuram/aqua-chic.git
    cd aqua-chic/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up your environment variables in a `.env` file:
    ```env
    PORT=3001
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    S3_BUCKET_NAME=aqua-chic
    DYNAMODB_TABLE_NAME=Likes
    FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    FIREBASE_PROJECT_ID=your_firebase_project_id
    FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    FIREBASE_APP_ID=your_firebase_app_id
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up your environment variables in a `.env` file:
    ```env
    REACT_APP_API_URL=http://localhost:3001
    ```

4. Start the frontend development server:
    ```sh
    npm start
    ```

## Usage

1. Visit the homepage at `http://localhost:3000` to explore the app.
2. Generate weekly fashion themes from the "Theme" page.
3. Upload photos from the "Upload Photo" page.
4. View and like photos in the "Photo Gallery" section.

## Technologies Used

- **Frontend:** React, React Router, Firebase Authentication
- **Backend:** Express.js, Multer for file uploads, AWS SDK for S3 and DynamoDB
- **Database:** DynamoDB for storing likes data
- **Storage:** AWS S3 for storing uploaded photos
- **Styling:** CSS, styled-components

## Directory Structure

aqua-chic/
├── backend/
│ ├── routes/
│ ├── models/
│ ├── controllers/
│ ├── middleware/
│ ├── utils/
│ ├── .env
│ ├── package.json
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── styles/
│ │ ├── App.jsx
│ │ ├── index.js
│ │ └── ThemeGenerator.jsx
│ ├── public/
│ ├── .env
│ ├── package.json
│ └── README.md
└── README.md


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue.


