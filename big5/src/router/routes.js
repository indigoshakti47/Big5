import Login from '../pages/Login';
import Servqual from '../pages/Servqual'
import BFI from '../pages/BFI';
import ResultBfi from '../pages/ResultBfi/resultBfi';
import ResultServqual from '../pages/ResutlServqual/resultServqual';
import PersonalForm from '../pages/PersonalForm';
import Users from '../pages/Users'
import Aspects from '../pages/Aspects'

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
    path: '/bfi',
    key: 'BFI',
    exact: true,
    component: BFI,
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
    path: ['/aspects'], 
    key: 'ASPECTS',
    exact: true,
    component: Aspects,
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