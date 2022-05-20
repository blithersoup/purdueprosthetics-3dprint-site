# purdueprosthetics.com Owner’s Guide

## Controls/dashboards to know

I have tried to make as much information and control available from the website as possible.  However, you may need to utilize these sites, which are used for production.

### Heroku- heroku.com
When you log in to heroku, you can get to the database dashboard by clicking Heroku Postgres in add-ons.  To get to environment variables, go to settings -> reveal config vars.

### Clerk- clerk.dev
Make sure to check up on the clerk dashboard regularly.
## How to-

### Change the codebase
First, clone the git repository to your machine.  Then, run [npm i] to install required packages.  To run in development mode, use npm run dev, and to test a production mode run npm run build, then npm run start.  To push changes to heroku, add heroku as a remote branch and push.  This can be found on the deploy page on heroku.

### Add an admin
I have included a python script to add admin to the database in this directory.  First, get the database url from the heroku env var page, and then run the script.  To get all admin, run the commented line below the first line.

## Things to remember-
### Keep below free/paid limits on our providers
The three limits we have are heroku dyno, heroku db, and clerk auth.  None of these limits should be an issue, but make sure to keep the number of users below 500.  To remove someone, go to the clerk dashboard and remove them.  Then, remove them from the database by going to the admin dashboard and deleting them.  This will also delete any 3d print requests they may have made.  Note that if someone signs up, they will get added to the database automatically.

## Potential issues and how to solve them
### 3d print requests not showing up
This is likely a database issue.  Due to the way the js postgres database library works, we need to connect using a configuration object instead of just a URI.  We are using a heroku database and deployment, but the database uri may change.  The change should be updated on the DATABASE_URL env var; I have attempted to fix this issue by splitting it up into parts. To illustrate,

DATABASE_URL- `postgres://[username]:[password]@[hostname]:[port]/[name]`

db config object (at least what I used from it)-
```
{
  user: 
  password: 
  host: 
  port: 
  database: 
}
```

I think my fix (which can be seen in /dbconfig/dbconfig.ts) should work, but if it does not check the heroku database page and heroku environment variables to make sure the values agree.

### Pages are all white
This likely means that the authentication provider is not connected properly.  Check that the environment variables from clerk match the ones in heroku, and that there are no errors on the clerk dashboard.  Also, check the console for errors if needed.
