# SIMS
School Incident Management System

# Note 
.env and node_modules are excluded 
# 
DATABASE_URL="mysql://username:yourpassword@localhost:3306/sirs"

Technologies, libraries and frameworks used for the application 
1. JavaScript, CSS and HTML 
2. Nodejs
3. Prisma ORM
4. MySQL Database 
5. MySQL Workbench for interacting with the data 
6. Git/Github 
Others
    prisma/client       : "^3.14.0",
    bcryptjs            : "^2.4.3",
    body-parser         : "^1.20.0",
    cookie-parser       : "^1.4.6",
    crypto              : "^1.0.1",
    dotenv              : "^16.0.1",
    express             : "^4.18.1",
    express-async-handler : "^1.2.0",
    express-handlebars  : "^6.0.6",
    jsonwebtoken        : "^8.5.1",
    mysql2              : "^2.3.3",
    uuid                :  ^8.3.2",


Database Models/Tables  
model userrole          -   for roles such as admin, student or staff   
model status            -   Pending or resolved post
model feedback          -   a collection of comments after resolving a complaint, a 
                            student can go ahead to state his/her satisfaction/disatisfaction 
model assignincident    -   a collection of staffs assigned to an incident to be 
                            resolved under the watch of the staff
model incidentcategory  -   categories in the school e.g. security, maintenance, 
                            electricy, etc. 
model incidentpost      -   a collection where student reports are stored 
model staff             -   users from the management added by the admin 
model studentreg        -   students who register to report a complaint 

# HOW TO RUN THE APPLICATION 
* make sure that nodejs, mysql,mysql workbench, visual studio code, node package manager (npm), optional: git are installed on your PC. 
1. clone or download a .zip file from the github repository provided. 
2. unzip the folder if download as zip if cloned, skip this method
3. open with any text editor. Note: vs code editor has terminal to run the app but other editors you have to download their terminals or optionally, use the terminal on your pc.
4. on the root dirctory of the application e.g. ~/Documents/Programming/Project/SIRS
5. connect to the internet 
6. run: "npm install"
7. after the application installed all the dependencies successfully, 
8. also, run: "npm install nodemon -g" - this will help to refresh your server when ever you make a change to the database or your code. 
# Configuring your database

* download and install mysql and work bench from https://dev.mysql.com/downloads/installer/ 

* use the window installer and install directly from the internet which will help you select all the options of mysql, sql connectors and work bench to install. It will also configure everything for you which you will now set your password and username to include in the .env file which contains only the url below. 


# for .env file 
1. There is a file called '.env' on the root of the project. 
*   create the file .env and in the file copy the below script and paste it 
    DATABASE_URL="mysql://username:yourpassword@localhost:3306/sirs"

    HOST = localhost 
    USER = root 
    PASSWORD = password 
    DATABASE = sirs
    JWT_SECRET=SIRS2022
    PORT= 5000

Provide the credentials on the database URL i.e where username, your-username and password as well. 

# 2 Database 
Create a database with the name 'sirs' as provided above or the name of your choice. but note that the name of your database must match with the name provided on the database_url string in the .env file.
# 3 Prisma Migration
run: npx prisma migrate dev - this will migrate your model from your application to the database you have created

wait for the migration to complete. 

# To see your changes, you can run: npx prisma studio which will open with a localhost port 5555 on your browser. from there you can assess your database.

# 4 Userrole, incidentcategory and status
userrole, status and incident category are added in the database with the workbench 
Therefore, 
userrole :  1 = student, 2 = admin

Status:     1 = pending and 2 = resolved 

incidentCategory: 1 = maintenance, 2 = security, 3 = electrical, 4 = business

the database must have these data in this arrangement for the application to work properly. 

# You can set it with prisma studio. run: npx prisma studio

8. after evrything is done: run "nodemon server" or npm server

# Cheers!
you can now register and work with the application 




