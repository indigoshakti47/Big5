import Login from '../pages/Login';
import Servqual from '../pages/Servqual'
import RegisterProduct from '../pages/RegisterProduct';
import BFI from '../pages/BFI';
import resultBfi from '../pages/resultBfi/resultBfi';
import resultServqual from '../pages/resutlServqual/resultServqual';
import PersonalForm from '../pages/PersonalForm';

const ROUTES = [
  {
    path: ['/', '/login', '/sign-up'],  
    key: 'LOGIN',
    exact: true,
    component: Login,
    auth: false,
  },
  {
    path: ['/form'], 
    key: 'FORM',
    exact: true,
    component: PersonalForm,
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
    path: '/resultbfi',
    key: 'RESULTBFI',
    exact: true,
    component: resultBfi,
    auth: false,
  },
  {
    path: '/resultservqual',
    key: 'RESULTSERVQUAL',
    exact: true,
    component: resultServqual,
    auth: false,
  }
];

export default ROUTES;