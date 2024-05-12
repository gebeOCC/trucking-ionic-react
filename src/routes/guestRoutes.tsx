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
                <Route>
                    <Redirect to="/login" />
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

            </IonReactRouter>
        </IonApp >
    )
};

export default guestRoutes;