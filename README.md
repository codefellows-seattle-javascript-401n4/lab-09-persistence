![cf](https://i.imgur.com/7v5ASc8.png) Lab 08: Vanilla REST API
======

## Submission Instructions
  * fork this repository & create a new branch for your work
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

## Learning Objectives  
* students will learn how to save resource data to the file system for a layer of data persistence
* students will learn how to refactor commonly used coding constructs into custom helper modules

## Documentation
* Server starts on PORT 3000
* Data is stored in car/storage/car.dat
* in the command line type `echo '{"make":"toyota", "model":"prius"'} | http post http://localhost:3000/a
pi/cars` to post a new car
* in the command line type `http delete http://localhost:3000/api/cars?id=<uuid>`

#### Configuration
* `package.json`
* `.eslintrc`
* `.gitignore`
* `README.md`
  * your `README.md` should include detailed instructions on how to use your API
  * this should include documentation on how to access your API endpoints

#### Feature Tasks
* continue working on your vanilla REST API
* refactor your routes to be contained in a separate module (ex: `route/resource-route.js`)
* refactor your `res` messages & status codes to be contained in a separate module (ex: `response.js`)
* refactor the `storage.js` module to use file system persistence
  * use the `fs` module to create and read the associated data files
  * the name of the file should contain the related resource id
