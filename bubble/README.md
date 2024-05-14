## SPARKLE SQUAD README NOTES
Back-end endpoints will be created under bubble/src/pages/api
Front-end reusable components will be created under bubble/src/pages/components
Front-end pages (as a whole) will be created under bubble/src/pages
    - index.tsx = landing page 
    - login.tsx = login page
    - register.tsx = register new user page
    - events.tsx = events page
    - [userid].tsx = friends page
    - home.tsx = application home page
    - [userid].tsx = profile page 

    As of now:
        - 'index.tsx' displays "Welcome to Bubble" message
        - 'login.tsx' is a working login page with NO credential validations (i.e., you can enter anything in the input fields, clicking the Log In button will redirect you to profile page, and clicking the Create New Account button will redirect you to register page)
        - 'register.tsx' is a working registration page with NO credential validations (i.e., you can populate any of the input fields, clicking Create Account button will redirect you to profile page, and clicking the Sign In link at the bottom will redirect you to login page)
        - ALL OTHER PAGES ARE BLANK, I JUST WANTED TO GET PROJECT STRUCTURE WORKING/FUNCTIONAL

## mongo DB Compass <-> our bubble database on Mongo Atlas 
Set up this connection when you want to monitor changes in the database during development, it's not necessary for database to function as intended. 
install mongo DB Compass on your computer as an application, if you don't have it already 
launch mongo DB, look for the textbox entry labeled "new connection - URI"
enter this string: mongodb+srv://<username>:<password>@bubble.b4u5ss8.mongodb.net/
replace <username> with your username, this can be found in your bubble/.env.local file
replace <password> with your password, this can be found in your bubble/.env.local file
click on connect. if the app is running on dev version, the changes will appear in "test" databse. 


## START OF NEXT.JS INSTRUCTIONS
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started - TO RUN APPLICATION IN GOOGLE CHROME DO THE FOLLOWING!!!!!

First, 'cd bubble' in terminal below, then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

