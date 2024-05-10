import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from '../pages/Driver.tsx/Home';
import '@ionic/react/css/core.css';
import Travels from '../pages/Driver.tsx/Travels';
import TravelDetails from '../pages/Driver.tsx/TravelDetails';
const DriverRoutes = () => {
    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Redirect exact path="/" to="/travels" />
                    <Route path="/travels" render={() => <Home />} exact={true} />
                    <Route>
                        <Redirect to="/travels" />
                    </Route>
                    <Route path="/travel/:id">
                        <TravelDetails />
                    </Route>
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                    <IonTabButton tab="travels" href="/travels">
                        <IonLabel>Travels</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
  );
};

export default DriverRoutes;