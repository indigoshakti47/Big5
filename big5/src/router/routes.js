import Login from '../pages/Login';
import Big5 from '../pages/Big5'
import RegisterProduct from '../pages/RegisterProduct';

const ROUTES = [
  {
    path: ['/', '/login', '/sign-up'], 
    key: 'LOGIN',
    exact: true,
    component: Login,
    auth: false,
  },
  {
    path: ['/big5'], 
    key: 'BIG5',
    exact: true,
    component: Big5,
    auth: false,
  },
  {
    path: '/register-product',
    key: 'REGISTER_PRODUCT',
    exact: true,
    component: RegisterProduct,
    auth: true,
  },
];

export default ROUTES;