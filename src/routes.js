import lunch from './api/lunch';

const routes = (app) => {
  app.use('/api/lunch', lunch);
};

export default routes;
