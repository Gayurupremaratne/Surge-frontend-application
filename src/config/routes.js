import React from "react";
import Main from "../containers/Main";
import Home from "../containers/Home";
import Loadable from "react-loadable";
import { Spinner } from "reactstrap";


function Loading() {
  return (
    <div>
      <Spinner animation="border" />
    </div>
  );
}

const SignUp = Loadable({
  loader: () => import("../containers/SignUp"),
  loading: Loading
});
const Users = Loadable({
  loader: () => import("../containers/views/Users"),
  loading: Loading
});
const Notes = Loadable({
  loader: () => import("../containers/views/Mynotes"),
  loading: Loading
});
const routes = [
  {path: '/', name: '', component: Home, exact: true },
  {path: '/main', name:'main', component: Main },
  {path: '/sign-up', name:'signup', component: SignUp },
  {path: '/users', name:'users', component: Users },
  {path: '/notes', name:'notes', component: Notes }

  
];

export default routes;
