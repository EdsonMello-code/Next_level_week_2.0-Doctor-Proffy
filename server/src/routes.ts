import express from 'express'
import ClassController from './controllers/ClassesController';
import ConnectionsController from './controllers/connectionsController';

const routes = express.Router();

const classesControllers = new ClassController();
const connectionsControllers = new ConnectionsController();

routes.post('/classes', classesControllers.create);
routes.get('/classes', classesControllers.index);

routes.post('/connections', connectionsControllers.create);
routes.get('/connections', connectionsControllers.index);

export default routes;
