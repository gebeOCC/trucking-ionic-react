import { IonInput, IonLabel, IonTextarea } from "@ionic/react";
import axiosInstance from "../../../axios/axiosInstance";

const PickupLocationDetails = ({ form, setForm }) => {

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    return (
        <>
            <h1>Pickup Location details</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', alignItems: 'center', padding: '10%' }}>
                <div style={{ width: '100%' }}>
                    <IonLabel>Pickup location address:</IonLabel>
                    <IonInput
                        name="pickup_location_address"
                        value={form.pickup_location_address}
                        onIonChange={handleChange}
                        style={{ border: '1px solid black' }}>
                    </IonInput>
                </div>
                <div style={{ width: '100%' }}>
                    <IonLabel>Sender name:</IonLabel>
                    <IonInput
                        name="sender_name"
                        value={form.sender_name}
                        onIonChange={handleChange}
                        style={{ border: '1px solid black' }}>
                    </IonInput>
                </div>
                <div style={{ width: '100%' }}>
                    <IonLabel>Sender contact number:</IonLabel>
                    <IonInput
                        name="sender_contact_number"
                        value={form.sender_contact_number}
                        onIonChange={handleChange}
                        style={{ border: '1px solid black' }}>
                    </IonInput>
                </div>
                <div style={{ width: '100%' }}>
                    <IonLabel>Pickup location details:</IonLabel>
                    <IonTextarea
                        name="pickup_location_details"
                        value={form.pickup_location_details}
                        onIonChange={handleChange}
                        style={{ border: '1px solid black' }}>
                    </IonTextarea>
                </div>
            </div>
        </>
    );
}

export default PickupLocationDetails;