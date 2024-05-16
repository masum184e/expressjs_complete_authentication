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
│  └─ databaseConnection.js
│
├─ cotroller
│  ├─ adminController.js
│  └─ userController.js
│
├─ middleware
│  ├─ adminAuthentication.js
│  ├─ uploadFile.js
│  └─ userAuthentication.js
│
├─ models
│  └─ userSchema.js
│
├─ public
│  └─ profilePicture
│
├─ routes
│  ├─ adminRoute.js
│  ├─ route.js
│  └─ userRoute.js
│
├─ .env                       - store all environment variable
├─ .gitignore                 - store details about ingnored file by git
├─ index.js                   
├─ package-lock.json          - configuration for server
├─ package.json               - configuration for server
├─ README.md                  - serve a details documentation
└─ vercel.json                - configuration for vercel
```