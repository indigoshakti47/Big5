import Login from '../pages/Login';


// Este es un arreglo donde irán todas las rutas de nuestra App ;) - :D
const ROUTES = [
  {
    path: ['/', '/login', '/sign-up'], // could be an array or a string
    key: 'LOGIN',
    exact: true,
    component: Login,
    auth: false,
  },
];

export default ROUTES;