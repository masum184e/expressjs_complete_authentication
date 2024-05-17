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