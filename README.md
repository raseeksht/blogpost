# BlogPost
[https://meroblogpost.netlify.app](https://meroblogpost.netlify.app)

## Tech Stack : MERN Stack


## Features

1. User Register and Login
2. Create,Read,Update,delete blog
3. Comments on blog
4. Anyone can read comments and blog
5. Only register user can add Blog or comment on others Blogs
6. Post can be edited or deleted if you are the author of the blog


## installation
```
git clone https://github.com/raseeksht/blogpost.git
cd blogpost
mv backend/.env.sample backend/.env
```

*Note : mongodb should be installed. if not, use mongo atlas. create `MONGO_URI` environment variable in `.env` file or your pc environment variable

if you are using running backend locally uncomment line apiurl = "http://localhost:8000" and comment other one (vice versa if backend is hosted online with correct url)

### start backend

```
cd backend
npm install
npm start
```

### start frontend 

```
cd blogpost/frontend
npm install
npm run dev
```


