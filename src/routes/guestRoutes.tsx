import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from '../pages/Guest.tsx/Login';
import Register from '../pages/Guest.tsx/Register';

import '@ionic/react/css/core.css';

function guestRoutes() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={Login} exact />
          <Route exact path="/Register">
            <Register />
          </Route>
          <Route>
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp >
  )
};

export default guestRoutes;