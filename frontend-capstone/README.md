# supernova

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run in hot module reloading mode:

```sh
npm start
```

To create a production build (for deployment):

```sh
npm run build-prod
```

To create a development build:

```sh
npm run build-dev
```

## Running

Open the file `dist/index.html` in your browser

Tech Stack

- React
- react-router
- Recoil
- React Bootstrap
- Moment.js
- url-loader
- Webpack
- Babel
- Jest
- Enzyme
- Axios

## Git Workflow

Check Status Through

```sh
git status
```

1. Pull Down Changes From Master and Create New Local Feature Branch

```sh
git checkout master
git pull origin master
git checkout -b <branchname>
```

OR, Checkout Existing Feature Branch

```sh
git checkout <branchname>
```

2. Make and Commit Your File Changes

AND, If You Realize You’ve Accidentally Made Your Changes on Master

```sh
git stash
git checkout -b <branchname> OR, git checkout <branchname>
git stash pop
```

3. Pull Changes from Remote Master Branch to Local Feature Branch

```sh
git pull origin master
```

4. Create and Push Changes to Remote Feature Branch if Need Be

```sh
git push -u origin <branchname>
```

OR, Push Changes to Existing Remote Feature Branch

```sh
git push origin <branchname>
```

5. Create Pull Request on Github

6. Merge Code with Team

7. Pull Down Changes From Remote Master to Local Master
