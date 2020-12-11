import Login from '../pages/Login';
import Servqual from '../pages/Servqual'
import BFI from '../pages/BFI';
import ResultBfi from '../pages/resultBfi/ResultBfi';
import ResultServqual from '../pages/resutlServqual/ResultServqual';
import PersonalForm from '../pages/PersonalForm';
import Users from '../pages/Users'

const ROUTES = [
  {
    path: ['/', '/login', '/sign-up'],  
    key: 'LOGIN',
    exact: true,
    component: Login,
    auth: false,
  },
  {
    path: ['/users'],  
    key: 'USERS',
    exact: true,
    component: Users,
    auth: true,
  },
  {
    path: ['/form'], 
    key: 'FORM',
    exact: true,
    component: PersonalForm,
    auth: true,
  },
  {
    path: ['/servqual'], 
    key: 'SERVQUAL',
    exact: true,
    component: Servqual,
    auth: true,
  },
  {
    path: '/bfi',
    key: 'BFI',
    exact: true,
    component: BFI,
    auth: true,
  },
  {
    path: '/resultbfi',
    key: 'RESULTBFI',
    exact: true,
    component: ResultBfi,
    auth: true,
  },
  {
    path: '/resultservqual',
    key: 'RESULTSERVQUAL',
    exact: true,
    component: ResultServqual,
    auth: true,
  }
];

export default ROUTES;