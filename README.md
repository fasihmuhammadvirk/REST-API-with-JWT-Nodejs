## Introduction
1. This Repository include CRUD APIs with JWT Authentication.
2. It has two module User and Employee.
3. The User can Add, Update, Delete, Get the data of the Employee from the database in this case it is mongodb.
4. But to do all the Operation the user should be Login First and a Token is assigned to the user whicg will be Valid till 1hr.
5. The Emplyees Data contain Email, Password, First & Last Name and Profile Photo.
6. The Photos is Store in the cloud in this case we are using cloudinary and the image url is saved in the database.

## Getting Started
##### To Get Start with this Project first Install npm and Nodejs in your Device.
        npm install nodejs
        npm install npm
 ##### After that Open the Project Folder and Install Node Modules for this Project
        npm i express mongoose body-parser express-fileupload bcryptjs cloudinary

## Running APIs
##### Now to run the Apis first you need in to run the Node App 
##### Open Your Project Folder in cmd / If using Vs Code Open terminal
##### Run the Below Command to Activate the Server
    npm run dev
###### After this the app will be accessable on : <a href = "http://127.0.0.1:8000">http://127.0.0.1:8000</a>

## Open Postman or ThunderClient 
###### <a href="https://www.postman.com/product/tools/#:~:text=Postman%20can%20be%20used%20to,use%20to%20build%20tests%20quickly.">About Postman</a>

### 1. To Register User
#####  Make a New POST Request in Postman used this url "http://127.0.0.1:8000/unity/register".
##### Providr data body in the form of json as given below,
##### We can see Below that the User is Registered.
<img src="ReadMe Files/user_register.png">

###### This is an Dummy Data You Can Changes it Accordingly.

### 2. To Login User
#####  Make a New Get Request in Postman used this url "http://127.0.0.1:8000/unity/login" 
##### Providr data body in the form of json as given below.
##### You Can see We Get a JWT Token as a Response.

<img src="ReadMe Files/user_login.png">

###### This is an Dummy Data You Can Changes it Accordingly.
### 3. Crud on Employee
##### To do CRUD Operation on Employee the user has to give a token in the header.
#### 3.1 JWT TOKEN

<img src="ReadMe Files/token.png">

#### 3.2 Get Employee Data

<img src="ReadMe Files/get.png">

#### 3.3 Get One Specific Employee

<img src="ReadMe Files/getbyid.png">

#### 3.4 Create New Employee

<img src="ReadMe Files/Create.png">

#### 3.5 Update Employee

<img src="ReadMe Files/update.png">


#### 3.6 Delete Employee

<img src="ReadMe Files/delete.png">




