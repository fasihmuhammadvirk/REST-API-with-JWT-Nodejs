# Introduction
1. This Repository include CRUD APIs with JWT Authentication.
2. It has two module User and Employee.
3. The User can Add, Update, Delete, Get the data of the Employee from the database in this case it is mongodb.
4. But to do all the Operation the user should be Login First and a Token is assigned to the user whicg will be Valid till 1hr.
5. The Emplyees Data contain Email, Password, First & Last Name and Profile Photo.
6. The Photos is Store in the cloud in this case we are using cloudinary and the image url is saved in the database.

## Getting Started
###### To Get Start with this Project first Install npm and Nodejs in your Device.
    npm install nodejs
    npm install npm
###### After that Open the Project Folder and Install Node Modules for this Project
    npm i express mongoose body-parser express-fileupload bcryptjs cloudinary

## Running APIs
###### Now to run the Apis first you need in to run the Node App 
###### Open Your Project Folder in cmd / If using Vs Code Open terminal
###### Run the Below Command to Activate the Server
    npm run dev

###### After this the app will be accessable on : <a href = "http://127.0.0.1:8000">http://127.0.0.1:8000</a>