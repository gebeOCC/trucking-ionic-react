import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Booking from '../pages/Client/Booking';
import '@ionic/react/css/core.css';
import Menu from '../pages/Menu';
import Bookings from '../pages/Client/Bookings';
import BookingDetails from '../pages/Client/BookingDetails';
import { IonIcon } from '@ionic/react';
import { menu, menuOutline, readerOutline, reader } from 'ionicons/icons';
import { useState } from 'react';

function clientRoutes() {
    const [bookingIcon, setBookingIcon] = useState(location.pathname.startsWith('/travels'));
    const [menuIcon, setMenuIcon] = useState(location.pathname.startsWith('/menu'));

    const handleBookingClick = () => {
        setBookingIcon(true);
        setMenuIcon(false);
    };

    const handleMenuClick = () => {
        setBookingIcon(false);
        setMenuIcon(true);
    };
    return (
        <IonReactRouter>
            <Route>
                <Redirect to="/bookings" />
            </Route>
            <IonTabs>
                <IonRouterOutlet>

                    <Route path="/bookings" render={() => <Bookings />} exact={true} />

                    <Route path="/bookings/:id">
                        <BookingDetails />
                    </Route>


                    <Route path="/bookings/add-booking">
                        <Booking />
                    </Route>

                    <Route path="/menu" render={() => <Menu />} exact={true} />

                </IonRouterOutlet>

                <IonTabBar slot="bottom">

                    <IonTabButton tab="bookings/*" href="/bookings" onClick={handleBookingClick}>
                        <IonIcon icon={bookingIcon ? reader : readerOutline} />
                        <IonLabel style={{ margin: '0' }}>Bookings</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="menu/*" href="/menu" onClick={handleMenuClick}>
                        <IonIcon icon={menuIcon ? menu : menuOutline} />
                        <IonLabel style={{ margin: '0' }}>Menu</IonLabel>
                    </IonTabButton>

                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    )
};

export default clientRoutes;