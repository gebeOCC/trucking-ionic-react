import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonItem, IonLabel, IonList, IonImg, IonCard, IonFab, IonFabButton, IonText, IonRefresherContent, IonRefresher, IonButton } from "@ionic/react"
import { useEffect, useState } from "react"
import axiosInstance from "../../axios/axiosInstance"
import { formatDate, convertToAMPM } from "../Utilities/utils"
import { add, calendarOutline, locationOutline, timeOutline } from "ionicons/icons"
import { useHistory } from 'react-router-dom';
import config from "../../config"

function Bookings() {
    const [pendingBookings, setPendingBookings] = useState([])
    const [approvedBookings, setApprovedBookings] = useState([])
    const [deliveredBookings, setDeliveredBookings] = useState([])
    const [declinedBookings, setDeclinedBookings] = useState([])

    const fetchBookings = async () => {
        await axiosInstance.get('get-client-bookings')
            .then(response => {
                setDeclinedBookings(response.data.declined)
                setPendingBookings(response.data.pending)
                setApprovedBookings(response.data.approved)
                setDeliveredBookings(response.data.delivered)
                console.log(response.data)
            })
    }

    useEffect(() => {
        fetchBookings()
    }, [])

    const refresh = (e) => {
        setTimeout(() => {
            e.detail.complete();
            fetchBookings()
        }, 3000);
    };

    const history = useHistory();

    const addBooking = () => {
        history.push('bookings/add-booking')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>BOOKINGS</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList>
                    {declinedBookings.map((booking) => (
                        <IonCard key={booking.id}>
                            <IonItem routerLink={`/bookings/edit-booking/${booking.id}`}>
                                <IonLabel className="ion-text-wrap">
                                    <h2 style={{color: 'red'}}>{booking.booking_status}</h2>
                                    <p>
                                        <IonIcon icon={calendarOutline} slot="start" />
                                        {formatDate(booking.pickup_date)}
                                    </p>
                                    <p>
                                        <IonIcon icon={timeOutline} slot="start" />
                                        {convertToAMPM(booking.pickup_time)}
                                    </p>
                                    <p>
                                        <IonIcon icon={locationOutline} slot="start" />
                                        {booking.pickup_location_address}
                                    </p>
                                    <p>
                                        <IonIcon icon={locationOutline} slot="start" />
                                        {booking.dropoff_location_address}
                                    </p>
                                </IonLabel>
                                <IonImg
                                    className="square-image"
                                    src={`${config.hostname}${config.paths.goodsPhoto}/${booking.goods_photo}`}
                                />
                            </IonItem>
                        </IonCard>
                    ))}
                    {pendingBookings.map((booking) => (
                        <IonCard key={booking.id}>
                            <IonItem>
                                <IonLabel className="ion-text-wrap">
                                    <h2>{booking.booking_status}</h2>
                                    <p>
                                        <IonIcon icon={calendarOutline} slot="start" />
                                        {formatDate(booking.pickup_date)}
                                    </p>
                                    <p>
                                        <IonIcon icon={timeOutline} slot="start" />
                                        {convertToAMPM(booking.pickup_time)}
                                    </p>
                                    <p>
                                        <IonIcon icon={locationOutline} slot="start" />
                                        {booking.pickup_location_address}
                                    </p>
                                    <p>
                                        <IonIcon icon={locationOutline} slot="start" />
                                        {booking.dropoff_location_address}
                                    </p>

                                </IonLabel>
                                <IonImg
                                    className="square-image"
                                    src={`${config.hostname}${config.paths.goodsPhoto}/${booking.goods_photo}`}
                                />

                            </IonItem>
                        </IonCard>
                    ))}
                    {approvedBookings.map((booking) => (
                        <IonCard key={booking.id}>
                            <IonItem routerLink={`/bookings/${booking.id}`}>
                                <IonLabel className="ion-text-wrap">
                                    <h2>{booking.booking_status}</h2>
                                    <h3>{booking.travel_status}</h3>
                                    <p>
                                        <IonIcon icon={calendarOutline} slot="start" />
                                        {formatDate(booking.pickup_date)}
                                    </p>
                                    <p>
                                        <IonIcon icon={timeOutline} slot="start" />
                                        {convertToAMPM(booking.pickup_time)}
                                    </p>
                                    <p>
                                        <IonIcon icon={locationOutline} slot="start" />
                                        {booking.pickup_location_address}
                                    </p>
                                    <p>
                                        <IonIcon icon={locationOutline} slot="start" />
                                        {booking.dropoff_location_address}
                                    </p>
                                </IonLabel>
                                <IonImg
                                    className="square-image"
                                    src={`${config.hostname}${config.paths.goodsPhoto}/${booking.goods_photo}`}
                                />
                            </IonItem>
                        </IonCard>
                    ))}
                    {deliveredBookings.map((booking) => (
                        <IonCard key={booking.id}>
                            <IonItem routerLink={`/bookings/${booking.id}`}>
                                <IonLabel className="ion-text-wrap">
                                    <IonText style={{ display: 'inline-block' }} color="success">
                                        <h2>{booking.travel_status}</h2>
                                    </IonText>
                                    <p>
                                        <IonIcon icon={calendarOutline} slot="start" />
                                        {formatDate(booking.pickup_date)}
                                    </p>
                                    <p>
                                        <IonIcon icon={timeOutline} slot="start" />
                                        {convertToAMPM(booking.pickup_time)}
                                    </p>
                                    <p>
                                        <IonIcon icon={locationOutline} slot="start" />
                                        {booking.pickup_location_address}
                                    </p>
                                    <p>
                                        <IonIcon icon={locationOutline} slot="start" />
                                        {booking.dropoff_location_address}
                                    </p>

                                </IonLabel>
                                <IonImg
                                    className="square-image"
                                    src={`${config.hostname}${config.paths.goodsPhoto}/${booking.goods_photo}`}
                                />
                            </IonItem>
                        </IonCard>
                    ))}
                </IonList>

                <IonFab slot="fixed" vertical="bottom" horizontal="end" onClick={addBooking}>
                    <IonButton size="large">
                        <IonIcon
                            slot="start"
                            icon={add}>
                        </IonIcon>
                        BOOK
                    </IonButton>
                </IonFab>
            </IonContent>
        </IonPage>
    )
}

export default Bookings