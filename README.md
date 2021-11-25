# lantronix-poc
## Steps to Setup

1. Install dependencies

```bash
npm install
```
2. Run Server

```bash
npm start
```

## API details

1. POST /user/register
    
   {
    "username":"venkata",
    "email":"tulsiramsid@secureid.com",
    "password":"1233",
    "firstname":"test",
    "lastname":"test"
   } 
   
   here username, email,password are mandatory
   
2. POST /user/login
    
   {
    "username":"venkata",
    "password":"1233",
   
   } 

   here username,password are mandatory
   


You can browse the apis at <http://localhost:8000>
