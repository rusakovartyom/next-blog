# Simple Trello

A full-stack blogging web app powered by React.js, Next.js and Firebase. Deployed via Vercel.

# Features

A user can: 
- Log in via Google or anonymously
- Choose a custom username
- Write a post using Markdown 
- Add an image to it (supports JPEG, PNG, GIF) 
- Publish it on the app or keep it as a draft
- Delete afterwards if they don't want to keep it
- Interact with posts of other users by giving them likes or just reading them

# What I used

This project was built with:

- [React.js](https://reactjs.org), to make this app modular, scalable and simple for adding future features
- [Next.js](https://nextjs.org/), for dynamic routing, server-side rendering and data fetching
- [Firebase](https://firebase.google.com/), for backend user authentication, database and files storage

I used additional packages:

- [lodash.debounce](https://www.npmjs.com/package/lodash.debounce): for preventing excessive amount of validation checks during user input
- [react-hot-toast](https://react-hot-toast.com): react component for custom toast notifications
- [lodash.kebabcase](https://www.npmjs.com/package/lodash.kebabcase): for converting titles to kebabcase and using them as ids for each post made by users
- [react-firebase-hooks](https://www.npmjs.com/package/react-firebase-hooks): a set of reusable React Hooks for Firebase 
- [react-hook-form](https://react-hook-form.com/): for easy-to-use forms validation
- [react-markdown](https://remarkjs.github.io/react-markdown/): a markdown component for React for writing posts 

Also:

- [Node.js](https://nodejs.org/en) 18.12.0
- [npm](https://www.npmjs.com) 9.1.2

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
