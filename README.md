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
│  └─ userSchema.js           - define user's schema
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
