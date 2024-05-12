import { IonCard, IonContent, IonInput, IonLabel, IonPage, IonTextarea } from "@ionic/react";
import axiosInstance from "../../../axios/axiosInstance";

const DropoffLocationDetails = ({ form, setForm, invalidFields, step }) => {

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', alignItems: 'center', padding: '10%' }}>

                <IonCard>
                    <h1 style={{ margin: '0' }}>Dropoff Location</h1>
                </IonCard>
                <div style={{ width: '100%' }}>
                    <IonLabel>Dropoff location address:</IonLabel>
                    <IonInput
                        name="dropoff_location_address"
                        value={form.dropoff_location_address}
                        onIonInput={handleChange}
                        style={{ border: invalidFields.includes('dropoff_location_address') ? '1px solid red' : '1px solid black' }}>
                    </IonInput>
                </div>
                <div style={{ width: '100%' }}>
                    <IonLabel>Recipient name:</IonLabel>
                    <IonInput
                        name="recipient_name"
                        value={form.recipient_name}
                        onIonInput={handleChange}
                        style={{ border: invalidFields.includes('recipient_name') ? '1px solid red' : '1px solid black' }}>
                    </IonInput>
                </div>
                <div style={{ width: '100%' }}>
                    <IonLabel>Recipient contact number:</IonLabel>
                    <IonInput
                        name="recipient_contact_number"
                        value={form.recipient_contact_number}
                        onIonInput={handleChange}
                        style={{ border: invalidFields.includes('recipient_contact_number') ? '1px solid red' : '1px solid black' }}>
                    </IonInput>
                </div>
                <div style={{ width: '100%' }}>
                    <IonLabel>Dropoff location details:</IonLabel>
                    <IonTextarea
                        name="dropoff_location_details"
                        value={form.dropoff_location_details}
                        onIonInput={handleChange}
                        style={{ border: invalidFields.includes('dropoff_location_details') ? '1px solid red' : '1px solid black' }}>
                    </IonTextarea>
                </div>
            </div>
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
    );
}

export default DropoffLocationDetails;