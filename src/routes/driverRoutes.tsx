import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from '../pages/Driver/Home';
import '@ionic/react/css/core.css';
import Travels from '../pages/Driver/Travels';
import TravelDetails from '../pages/Driver/TravelDetails';
import History from '../pages/Driver/History';
const DriverRoutes = () => {
    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Redirect exact path="/" to="/travels" />
                    
                    <Route path="/travels" render={() => <Travels />} exact={true} />

                    <Route>
                        <Redirect to="/travels" />
                    </Route>

                    <Route path="/travels/:id">
                        <TravelDetails />
                    </Route>

                    <Route path="/history" render={() => <History />} exact={true} />

                </IonRouterOutlet>

                <IonTabBar slot="bottom">

                    <IonTabButton tab="travels/*" href="/travels">
                        <IonLabel>Travels</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="history/*" href="/history">
                        <IonLabel>History</IonLabel>
                    </IonTabButton>

                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    );
};

export default DriverRoutes;