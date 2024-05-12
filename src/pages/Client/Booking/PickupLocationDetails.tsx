import { IonCard, IonInput, IonLabel, IonTextarea } from "@ionic/react";
import axiosInstance from "../../../axios/axiosInstance";

const PickupLocationDetails = ({ form, setForm, invalidFields, step }) => {

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', alignItems: 'center', padding: '10%' }}>

                <IonCard>
                    <h1 style={{ margin: '0' }}>Pickup Location</h1>
                </IonCard>
                
                <div style={{ width: '100%' }}>
                    <IonLabel>Pickup location address:</IonLabel>
                    <IonInput
                        name="pickup_location_address"
                        value={form.pickup_location_address}
                        onIonInput={handleChange}
                        style={{ border: invalidFields.includes('pickup_location_address') ? '1px solid red' : '1px solid black' }}>
                    </IonInput>
                </div>
                <div style={{ width: '100%' }}>
                    <IonLabel>Sender name:</IonLabel>
                    <IonInput
                        name="sender_name"
                        value={form.sender_name}
                        onIonInput={handleChange}
                        style={{ border: invalidFields.includes('sender_name') ? '1px solid red' : '1px solid black' }}>
                    </IonInput>
                </div>
                <div style={{ width: '100%' }}>
                    <IonLabel>Sender contact number:</IonLabel>
                    <IonInput
                        name="sender_contact_number"
                        value={form.sender_contact_number}
                        onIonInput={handleChange}
                        style={{ border: invalidFields.includes('sender_contact_number') ? '1px solid red' : '1px solid black' }}>
                    </IonInput>
                </div>
                <div style={{ width: '100%' }}>
                    <IonLabel>Pickup location details:</IonLabel>
                    <IonTextarea
                        name="pickup_location_details"
                        value={form.pickup_location_details}
                        onIonInput={handleChange}
                        style={{ border: invalidFields.includes('pickup_location_details') ? '1px solid red' : '1px solid black' }}>
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

export default PickupLocationDetails;