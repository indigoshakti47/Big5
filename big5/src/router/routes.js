import Login from '../pages/Login';
import Servqual from '../pages/Servqual'
import RegisterProduct from '../pages/RegisterProduct';
import BFI from '../pages/BFI';
import resultTest from '../pages/resultTest/resultTest';

const ROUTES = [
  {
    path: ['/', '/login', '/sign-up'],  
    key: 'LOGIN',
    exact: true,
    component: Login,
    auth: false,
  },
  {
    path: ['/servqual'], 
    key: 'SERVQUAL',
    exact: true,
    component: Servqual,
    auth: false,
  },
  {
    path: '/register-product',
    key: 'REGISTER_PRODUCT',
    exact: true,
    component: RegisterProduct,
    auth: false,
  },
  {
    path: '/bfi',
    key: 'BFI',
    exact: true,
    component: BFI,
    auth: false,
  },
  {
    path: '/result',
    key: 'RESULT',
    exact: true,
    component: resultTest,
    auth: false,
  }
];

export default ROUTES;