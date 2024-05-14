import { useEffect, useState } from 'react';
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonImg,
    IonPage,
    IonProgressBar,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
} from '@ionic/react';
import { useParams } from 'react-router';
import axiosInstance from '../../axios/axiosInstance';
import { formatDate, convertToAMPM } from "../Utilities/utils";
import config from '../../config';

function BookingDetails() {
    const id = useParams<{ id: string }>();
    const [travelDetails, setTravelDetails] = useState<any>([]);
    const [fetchLoading, setFetchLoading] = useState(true);

    const fetchTravelDetails = () => {
        axiosInstance.get(`get-booking-details/${id.id}`)
            .then(response => {
                setTravelDetails(response.data)
                console.log(response.data)
                setFetchLoading(false);
            })
    }

    useEffect(() => {
        fetchTravelDetails();
    }, [])

    return (
        <IonPage id="view-travel-details">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Booking details" defaultHref="/bookings"></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {!fetchLoading ? (
                    <IonCardContent>
                        <IonCard style={{ textAlign: 'center' }}>
                            {travelDetails.travel_status === 'delivered' ?
                                (
                                    <IonText style={{ display: 'inline-block' }} color="success">
                                        <h1 >Delivered</h1>
                                    </IonText>
                                ) : (
                                    <IonText style={{ display: 'inline-block', color: 'blue' }} >
                                        <h1 >{travelDetails.travel_status}</h1>
                                    </IonText>
                                )
                            }
                        </IonCard>
                        <IonCard>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="6">
                                        <h3>{formatDate(travelDetails.pickup_date)}</h3>
                                        <h3>{convertToAMPM(travelDetails.pickup_time)}</h3>
                                        <h3>Amount to pay: {travelDetails.price}</h3>
                                        <h3>Vehicle: {travelDetails.model}</h3>
                                        <h3>Plate number: {travelDetails.plate_number}</h3>
                                        <h3>Driver: {travelDetails.full_name}</h3>
                                    </IonCol>
                                    <IonCol size="6">
                                        <IonImg src={`${config.hostname}${config.paths.goodsPhoto}/${travelDetails.goods_photo}`} alt="Goods Photo" />
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCard>

                        <IonCard>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <h2>Pickup</h2>
                                        <p>{travelDetails.pickup_location_address}</p>
                                        <p>{travelDetails.sender_name}</p>
                                        <p>{travelDetails.sender_contact_number}</p>
                                        <p>{travelDetails.pickup_location_details}</p>
                                        {travelDetails.travel_status !== 'in progress' &&
                                            <p>Pickup time: {convertToAMPM(travelDetails.travel_pickup_time)}</p>
                                        }
                                    </IonCol>
                                    {travelDetails.travel_status !== 'in progress' &&
                                        <IonCol size="6">
                                            <IonImg src={`${config.hostname}${config.paths.goodsPhoto}/${travelDetails.pickup_goods_photo}`} alt="Goods Photo" />
                                        </IonCol>
                                    }
                                </IonRow>
                            </IonGrid>
                        </IonCard>

                        <IonCard>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <h2>Dropoff</h2>
                                        <p>{travelDetails.dropoff_location_address}</p>
                                        <p>{travelDetails.recipient_name}</p>
                                        <p>{travelDetails.recipient_contact_number}</p>
                                        <p>{travelDetails.dropoff_location_details}</p>
                                        {travelDetails.travel_status === 'delivered' &&
                                            <p>Dropoff time: {convertToAMPM(travelDetails.dropoff_time)}</p>
                                        }
                                    </IonCol>

                                    {travelDetails.travel_status === 'delivered' &&
                                        <IonCol size="6">
                                            <IonImg src={`${config.hostname}${config.paths.goodsPhoto}/${travelDetails.dropoff_goods_photo}`} alt="Goods Photo" />
                                        </IonCol>
                                    }

                                </IonRow>
                            </IonGrid>
                        </IonCard>
                        <IonCard>
                            {travelDetails.travel_status === 'delivered' &&
                                <IonImg src={`${config.hostname}${config.paths.signature}/${travelDetails.signature_image}`} alt="Goods Photo" />
                            }
                        </IonCard>
                    </IonCardContent>
                ) : (
                    <IonProgressBar type="indeterminate"></IonProgressBar>
                )}
            </IonContent>
        </IonPage>
    );
}

export default BookingDetails;
