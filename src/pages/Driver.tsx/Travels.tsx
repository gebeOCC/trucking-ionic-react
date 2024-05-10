import { IonPage, IonHeader, IonToolbar, IonContent, IonList, IonItem, IonLabel, IonIcon, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton } from "@ionic/react";
import { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { formatDate, convertToAMPM } from "../Utilities/utils";
import { calendarOutline, timeOutline, locationOutline } from 'ionicons/icons';

function Travels() {
    const [travels, setTravels] = useState([]);
    const [segmentValue, setSegmentValue] = useState('travels'); // Default segment value

    const getBookings = () => {
        axiosInstance.get('get-driver-bookings')
            .then(response => {
                setTravels(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
            });
    };

    useEffect(() => {
        getBookings();
    }, []);

    const refresh = (e) => {
        setTimeout(() => {
            e.detail.complete();
            getBookings();
        }, 3000);
    };

    const handleSegmentChange = (e) => {
        const value = e.detail.value;
        setSegmentValue(value);
    };

    const filteredTravels = travels.filter(travel => travel.travel_status !== 'delivered');
    const noBookingsAssigned = filteredTravels.length === 0;

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonSegment value={segmentValue} onIonChange={handleSegmentChange}>
                        <IonSegmentButton value="travels">
                            <IonLabel>Travels</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="history">
                            <IonLabel>History</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList>
                    {segmentValue === 'travels' ? (
                        <>
                            {travels.map((travel) => (
                                <>
                                    {travel.travel_status !== 'delivered' &&
                                    <IonItem key={travel.id} routerLink={`/travels/${travel.id}`}>
                                            <IonLabel className="ion-text-wrap">
                                                <h2>{travel.pickup_type}</h2>
                                                <p>
                                                    <IonIcon icon={calendarOutline} slot="start" />
                                                    {formatDate(travel.pickup_date)}
                                                </p>
                                                <p>
                                                    <IonIcon icon={timeOutline} slot="start" />
                                                    {convertToAMPM(travel.pickup_time)}
                                                </p>
                                                <p>
                                                    <IonIcon icon={locationOutline} slot="start" />
                                                    {travel.pickup_location_address}
                                                </p>
                                                <p>
                                                    <IonIcon icon={locationOutline} slot="start" />
                                                    {travel.dropoff_location_address}
                                                </p>
                                            </IonLabel>
                                        </IonItem>
                                    }
                                </>
                            ))}
                            {noBookingsAssigned && (
                                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                    <h1>No bookings assigned</h1>
                                </div>
                            )}
                        </>
                    ) : (
                            <>
                                {travels.map((travel) => (
                                    <>
                                        {travel.travel_status === 'delivered' &&
                                            <IonItem key={travel.id} routerLink={`/travels/${travel.id}`}>
                                                <IonLabel className="ion-text-wrap">
                                                    <h2>{travel.pickup_type}</h2>
                                                    <p>
                                                        <IonIcon icon={calendarOutline} slot="start" />
                                                        {formatDate(travel.pickup_date)}
                                                    </p>
                                                    <p>
                                                        <IonIcon icon={timeOutline} slot="start" />
                                                        {convertToAMPM(travel.pickup_time)}
                                                    </p>
                                                    <p>
                                                        <IonIcon icon={locationOutline} slot="start" />
                                                        {travel.pickup_location_address}
                                                    </p>
                                                    <p>
                                                        <IonIcon icon={locationOutline} slot="start" />
                                                        {travel.dropoff_location_address}
                                                    </p>
                                                </IonLabel>
                                            </IonItem>
                                        }
                                    </>
                                ))}
                            </>
                    )}
                </IonList>

                
            </IonContent>
        </IonPage>
    );
}

export default Travels;
