# Expressjs Complete Authentication

<p align="justify">A scalable web server application built with Node.js and Express.js, featuring comprehensive user and admin management, secure authentication, and efficient file upload handling. Integrates seamlessly with MongoDB. Ideal for projects requiring robust backend services.</p>

[Live Preview](https://expressjs-complete-authentication.vercel.app/) | [Postman Documentation](https://documenter.getpostman.com/view/27027258/2sA3JRZeuT)

## Requirements

[Install Node On Your Device](https://nodejs.org/)

## How to Run

```
git clone https://github.com/masum184e/expressjs_complete_authentication.git
cd expressjs_complete_authentication
npm install
npx nodemon index.js
```

## API Structure

```bash
├─ config
│  └─ databaseConnection.js   - build connection with mongodb database 
│
├─ cotroller
│  ├─ adminController.js      - define admin abilities
│  └─ userController.js       - define user abilities
│
├─ middleware
│  ├─ adminAuthentication.js  - authenticate admin
│  ├─ uploadFile.js           - handle file uploading
│  └─ userAuthentication.js   - authenticate user
│
├─ models
│  └─ userSchema.js           - define users schema
│
├─ public
│  └─ profilePicture          - store uploaded profile pictures
│
├─ routes
│  ├─ adminRoute.js           - handle admin route
│  ├─ route.js                - combine all route
│  └─ userRoute.js            - handle user routes
│
├─ .env                       - store all environment variable
├─ .gitignore                 - store details about ingnored file by git
├─ index.js                   - server setup
├─ package-lock.json          - configuration for server
├─ package.json               - configuration for server
├─ README.md                  - serve a details documentation
└─ vercel.json                - configuration for vercel
```

## Environment Variables

| Configuration Key         | Value                                                                                      |
| ------------------------- |--------------------------------------------------------------------------------------------|
| PORT                      | specifies the port on which the server will listen for incoming connections                |
| DATABASE_NAME             | specifies the name of the database                                                         |
| DATABASE_URL              | specifies the URL or connection string for the MongoDB database                            |
| BCRYPT_GEN_SALT_NUMBER    | specifies the number of rounds to use for generating a BCrypt salt                         |
| JWT_SECRET_KEY            | specifies the secret key used for signing and verifying JWTs                               |
| TOKEN_EXPIRES             | specifies the expiration time for JWT tokens                                               |
| PROFILE_PICTURE_PATH      | specifies the file path where profile pictures are saved                                   |
| PROFILE_PICTURE_MAX_SIZE  | specifies the maximum allowed size for profile pictures                                    |
| COOKIE_KEY                | specifies the cookie key for storing authentication jwt token                              |
| PROFILE_PIC_DIRECTORY     | specifies the file path where profile pictures are saved                                   |
| MESSAGEBIRD_API_KEY       | specifies the API key of messagebird for otp sending sms                                   |

## SMS
When a user forgets his password, he can reset it by providing his mobile number. An otp will be sent to his mobile number and api will response a verification token which will use in the url of the UI to reset the password. The API uses the `messagebird` package to send an HTML template as an email.

## Security
- __bcrypt__: password is hashed using `bcrypt`

## Routes

- `{{baseUrl}}/api/admins/login`         - `POST`   - provide interface to perform admin login functionalities
- `{{baseUrl}}/api/admins/`              - `GET`    - provide authrorized admin details
- `{{baseUrl}}/api/admins/users/all`     - `GET`    - provide user list only for authrized admin
- `{{baseUrl}}/api/admins/users/:userId` - `GET`    - provide specific user details only for authrized admin
- `{{baseUrl}}/api/admins/users/:userId` - `DELETE` - remove specific user details only for authrized admin
- `{{baseUrl}}/api/users/registration`                          - `POST` - provide interface to perform user registration
- `{{baseUrl}}/api/users/login`                                 - `POST` - provide interface to perform user login
- `{{baseUrl}}/api/users`                                       - `GET`  - provide authrorized user details
- `{{baseUrl}}/api/users/upload-profile-picture`                - `POST` - provide interface upload profile picture only for authorized user
- `{{baseUrl}}/api/users/reset-password-otp`                    - `GET`  - provide interface for sending otp to register user
- `{{baseUrl}}/api/users/reset-password/:token/:verificationId` - `PUT`  - provide interface to reset password by valid otp

## Dependencies

| Package Name          |  Description                                                                 |
| ----------------------|------------------------------------------------------------------------------|
| express               | provides a robust set of features for web and mobile applications            |
| mongoose              | MongoDB object modeling tool                                                 |
| jsonwebtoken          | securely authenticate users and share information                            |
| cors                  | secure cross-origin requests and data transfers between browsers and servers |
| argon2                | hash and manage password                                                     |
| dotenv                | load environment variables                                                   |
| cookie-parser         | handle cookie during http request                                            |
| express-validator     | validate input data                                                          |
| messagebird           | handle sms communication                                                     |
| multer                | handle multipart/form-data                                                   |
