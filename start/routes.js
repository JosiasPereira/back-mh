'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/user', 'UserController.store' );
Route.get('/user', 'UserController.index' );
Route.get('user/:id', 'UserController.show');//.middleware('auth')
Route.post('user/:id', 'UserController.update');//.middleware('auth')

Route.post('/login', 'UserController.login');
Route.post('/signout', 'UserController.signout');
Route.get('/login', 'UserController.validToken').middleware('auth');

/*
Route.post('/receipt', 'ReceiptController.store');//.middleware('auth');
Route.get('/receipt/:id', 'ReceiptController.index2');//.middleware('auth');
Route.get('/receipt/:id/file', 'ReceiptFileController.show');//.middleware('auth');
//Route.post('/receipt/:id/file', 'ReceiptFileController.store').middleware('auth');
*/

// Cria novo comprovante
Route.post('/receipt', 'ReceiptController.store').middleware('auth'); 

// Lista todos os comprovantes emitidos para o usuário
Route.get('/receipt', 'ReceiptController.index').middleware('auth');

// Carrega um  comprovante pelo id
Route.get('/receipt/:id', 'ReceiptController.show');//.middleware('auth');

// Carrega a imagem de um comprovante pelo id
Route.get('/receipt/:id/file', 'ReceiptFileController.show');//.middleware('auth');