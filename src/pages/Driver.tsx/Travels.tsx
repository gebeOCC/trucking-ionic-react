import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonRefresher, IonRefresherContent, IonList, IonItem, IonLabel, IonNote } from "@ionic/react"
import axios from "axios";
import { useEffect, useState } from "react"
import axiosInstance from "../../axios/axiosInstance";

function Travels() {
    const [travels, setTRavels] = useState([]);

    useEffect(() => {
        axiosInstance.get('get-driver-bookings')
        .then(response => {
            setTRavels(response.data)
        })
    }, [])
    
    const refresh = (e: CustomEvent) => {
        setTimeout(() => {
            e.detail.complete();
        }, 3000);
    };
    

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
    };

    function convertToAMPM(time) {
        // Create a new Date object from the input time string
        const date = new Date(`2000-01-01T${time}`);

        // Get the hours and minutes components
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Convert hours to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle 0 (midnight) as 12 AM

        // Format the time string
        const formattedTime = `${hours}:${minutes} ${ampm}`;

        return formattedTime;
    }

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Travels</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <IonList>
                    {travels.map((travel) => (
                        <IonItem key={travel.id} routerLink={`/travel/${travel.booking_id}`}>
                            <IonLabel>
                                <p>Pickup Date: {formatDate(travel.pickup_date)}</p>
                                <p>Pickup Time: {convertToAMPM(travel.pickup_time)}</p>
                                <p>Pickup Location Address: {travel.pickup_location_address}</p>
                            </IonLabel>
                            <IonNote slot="end">{travel.pickup_type}</IonNote>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Travels