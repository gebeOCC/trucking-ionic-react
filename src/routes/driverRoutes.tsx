import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@ionic/react/css/core.css';
import Travels from '../pages/Driver/Travels';
import TravelDetails from '../pages/Driver/TravelDetails';
import Menu from '../pages/Menu';
import { IonIcon } from '@ionic/react';
import { menu, menuOutline, carSport, carSportOutline } from 'ionicons/icons';
import { useState } from 'react';

const DriverRoutes = () => {
    const [travelIcon, setTravelIcon] = useState(location.pathname.startsWith('/travels'));
    const [menuIcon, setMenuIcon] = useState(location.pathname.startsWith('/menu'));

    const handleTravelClick = () => {
        setTravelIcon(true);
        setMenuIcon(false);
    };

    const handleMenuClick = () => {
        setTravelIcon(false);
        setMenuIcon(true);
    };

    return (
        <IonReactRouter>
            <Route>
                <Redirect to="/travels" />
            </Route>
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/travels" render={() => <Travels />} exact={true} />
                    <Route path="/travels/:id">
                        <TravelDetails />
                    </Route>
                    <Route path="/menu" render={() => <Menu />} exact={true} />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="travels/*" href="/travels" onClick={handleTravelClick}>
                        <IonIcon icon={travelIcon ? carSport : carSportOutline} />
                        <IonLabel style={{ margin: '0' }}>Travels</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="menu/*" href="/menu" onClick={handleMenuClick}>
                        <IonIcon icon={menuIcon ? menu : menuOutline} />
                        <IonLabel style={{ margin: '0' }}>Menu</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    );
};

export default DriverRoutes;