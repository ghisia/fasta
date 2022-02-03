import Router from 'express';
import ExampleController from '../controllers/example.controller.js';

const routes = Router();

routes.get('/hello', ExampleController.helloWorld);

export default routes;
