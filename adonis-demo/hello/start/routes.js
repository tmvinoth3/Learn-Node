'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('index')
Route.get('/', 'JobController.home');

Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');

Route.on('/login').render('auth.login');
Route.post('/login', 'UserController.login').validator('LoginUser');

Route.get('/logout', async({auth, response}) => {
  await auth.logout();
  return response.redirect('/');  
})

Route.get('/post-job', 'JobController.userJobs');
Route.post('/post-job', 'JobController.postjob').validator('PostJob');
Route.get('/post-job/delete/:id', 'JobController.delete');
Route.get('/post-job/edit/:id', 'JobController.editJob');
Route.post('/post-job/update/:id', 'JobController.updateJob').validator('PostJob');
