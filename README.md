# FAST PROTOTYPING


This repo have both frontend and backend for fast prototyping of applications 
Everything is written in javascript



|part|technolgy used|
|----|-----|
|frontend|Next js|
|backend| express js|
|database | mongodb|
|deployment | vercel|
|email service | nodemailer (gmail)|
|file storage service | aws s3 |
|api documentation | swagger docs|


**Backend**

follow below steps to setup the codebase up and running
Node version i used is v20.11.0

1. Create .env file

    ```
    touch .env
    ```

2. Add the following variables to env file


    ```
    #mongodb url
    MONGO_URI =''

    #when running app locally . In production (vercel) It must not be present
    ENV_TYPE='local'

    #for signing the token ( for generating key type 'openssl rand -hex 32 ' in bash)
    SECRET_KEY = ''

    #Aws access key and secret key , bucket name for storing the binary data
    ACCESS_KEY=""
    AWSSECRET_KEY=""
    BUCKET_NAME =''
    REGION=''

    # google mail password ( these are present in google my account > security > 2 step verification)
    Google_Mail=""
    Google_Password=""
    ```

3. Install all the required packages at backend folder

    ```
    cd Backend && npm install 
    ```

4. install nodemon globally
    ```
    npm install -g
    ```

5. run the backend

    ```
    nodemon index.js
    ```
***Frontend***

follow the step to get started with frontend 


1. check env file in frontend . Make sure that it have NEXT_PUBLIC_API variable
2. Install all the required packages at frontend folder ( when you are at root folder)
    ```
    cd Frontend && npm install 
    ```
3. run it 
    ```
    npm run dev
    ```


----



# wannt to connect with me 

[Linkedin](https://www.linkedin.com/in/siva-ramireddy-baram-1269261aa/ "my profile")


