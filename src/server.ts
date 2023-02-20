import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const server = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

server.listen();

module.exports = server.app;
