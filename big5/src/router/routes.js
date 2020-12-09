import Login from '../pages/Login';

const ROUTES = [
  {
    path: ['/', '/login', '/sign-up'], 
    key: 'LOGIN',
    exact: true,
    component: Login,
    auth: false,
  },
];

export default ROUTES;