import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from '../pages/Client/Home';

import '@ionic/react/css/core.css';

function clientRoutes() {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/home" component={Home} exact />
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route>
                        <Redirect to="/home" />
                    </Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    )
};

export default clientRoutes;