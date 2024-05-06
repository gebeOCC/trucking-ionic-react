import { IonContent, IonInput, IonLabel, IonPage, IonTextarea } from "@ionic/react";
import axiosInstance from "../../../axios/axiosInstance";

const DropoffLocationDetails = ({ form, setForm }) => {

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    return (
        <>
            <h1>Dropoff Location details</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', alignItems: 'center', padding: '10%' }}>
                <div style={{ width: '100%' }}>
                    <IonLabel>Dropoff location address:</IonLabel>
                    <IonInput
                        name="dropoff_location_address"
                        value={form.dropoff_location_address}
                        onIonChange={handleChange}
                        style={{ border: '1px solid black' }}>
                    </IonInput>
                </div>
                <div style={{ width: '100%' }}>
                    <IonLabel>Recipient name:</IonLabel>
                    <IonInput
                        name="recipient_name"
                        value={form.recipient_name}
                        onIonChange={handleChange}
                        style={{ border: '1px solid black' }}>
                    </IonInput>
                </div>
                <div style={{ width: '100%' }}>
                    <IonLabel>Recipient contact number:</IonLabel>
                    <IonInput
                        name="recipient_contact_number"
                        value={form.recipient_contact_number}
                        onIonChange={handleChange}
                        style={{ border: '1px solid black' }}>
                    </IonInput>
                </div>
                <div style={{ width: '100%' }}>
                    <IonLabel>Dropoff location details:</IonLabel>
                    <IonTextarea
                        name="dropoff_location_details"
                        value={form.dropoff_location_details}
                        onIonInput={handleChange}
                        style={{ border: '1px solid black' }}>
                    </IonTextarea>
                </div>
            </div>
        </>
    );
}

export default DropoffLocationDetails;