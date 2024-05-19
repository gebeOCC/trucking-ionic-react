import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonImg, IonLabel, IonPage, IonRow, IonText } from "@ionic/react";
import axiosInstance from "../../../axios/axiosInstance";
import { timeNow, dateNow, formatDate, convertToAMPM } from "../../Utilities/utils";
import { useHistory } from "react-router-dom";

const BookingDetails = ({ form, step, id }) => {
    const history = useHistory();
    const submit = async () => {
        const formData = new FormData();
        formData.append('pickup_type', form.pickup_type);

        if (form.pickup_type === 'quick') {
            formData.append('pickup_date', dateNow());
            formData.append('pickup_time', timeNow());
        } else {
            formData.append('pickup_date', form.pickup_date);
            formData.append('pickup_time', form.pickup_time);
        }

        formData.append('vehicle_type_id', form.vehicle_type_id);
        formData.append('goods_photo', form.goods_photo);

        formData.append('pickup_location_lat', form.pickup_location_lat);
        formData.append('pickup_location_lng', form.pickup_location_lng);
        formData.append('pickup_location_address', form.pickup_location_address);
        formData.append('sender_name', form.sender_name);
        formData.append('sender_contact_number', form.sender_contact_number);
        formData.append('pickup_location_details', form.pickup_location_details);

        formData.append('dropoff_location_lat', form.dropoff_location_lat);
        formData.append('dropoff_location_lng', form.dropoff_location_lng);
        formData.append('dropoff_location_address', form.dropoff_location_address);
        formData.append('recipient_name', form.sender_name);
        formData.append('recipient_contact_number', form.sender_contact_number);
        formData.append('dropoff_location_details', form.dropoff_location_details);

        formData.append('distance', form.distance);
        formData.append('duration', form.duration);
        formData.append('price', form.price);

        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }

        if (id) {
            await axiosInstance.post(`update-booking/${id}`, formData)
                .then(response => {
                    console.log(response.data)
                    if (response.data.message === 'success') {
                        history.push('/bookings');
                    }
                })
        } else {
            await axiosInstance.post('add-booking', formData)
                .then(response => {
                    console.log(response.data)
                    if (response.data.message === 'success') {
                        history.push('/bookings');
                    }
                })
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <>
                <IonCardContent>
                    <IonCard style={{ textAlign: 'center' }}>
                        <IonText style={{ display: 'inline-block' }}>
                            <h1 >Booking details</h1>
                        </IonText>
                    </IonCard>
                    <IonCard>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6">
                                    <h3>{formatDate(form.pickup_date)}</h3>
                                    <h3>{form.pickup_time}</h3>
                                    <h3>₱{form.price}</h3>
                                </IonCol>
                                <IonCol size="6">
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCard>

                    <IonCard>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <h2>Pickup</h2>
                                    <p>{form.pickup_location_address}</p>
                                    <p>{form.sender_name}</p>
                                    <p>{form.sender_contact_number}</p>
                                    <p>{form.pickup_location_details}</p>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCard>

                    <IonCard>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <h2>Dropoff</h2>
                                    <p>{form.dropoff_location_address}</p>
                                    <p>{form.recipient_name}</p>
                                    <p>{form.recipient_contact_number}</p>
                                    <p>{form.dropoff_location_details}</p>
                                </IonCol>

                            </IonRow>
                        </IonGrid>
                    </IonCard>
                    <IonCard
                        button={true}
                        color="primary"
                        onClick={submit}
                        style={{ display: 'flex', textAlign: 'center', height: '5vh' }}>
                        Submit
                    </IonCard>
                </IonCardContent>


                <h1
                    style={{
                        position: 'fixed',
                        top: '7%',
                        right: '2%',
                        fontFamily: 'monospace',
                        margin: '0',
                    }}>
                    {step}/6
                </h1>
            </>
        </div>
    );
}

export default BookingDetails;