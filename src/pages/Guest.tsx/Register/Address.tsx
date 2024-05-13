import { IonButton, IonInput, IonLabel } from "@ionic/react";

function Address({ form, setForm, next, invalidFields }) {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5%' }}>
            <h1>Enter your address</h1>
            <div>
                <IonLabel>Barangay</IonLabel>
                <IonInput
                    fill="outline"
                    onIonInput={handleChange}
                    name="barangay"
                    value={form.barangay}
                    style={{ marginBottom: '20px', border: invalidFields.includes('barangay') ? '1px solid red' : '' }} />

                <IonLabel>City</IonLabel>
                <IonInput
                    fill="outline"
                    onIonInput={handleChange}
                    name="city"
                    value={form.city}
                    style={{ marginBottom: '20px', border: invalidFields.includes('city') ? '1px solid red' : '' }} />

                <IonLabel>Province</IonLabel>
                <IonInput
                    fill="outline"
                    onIonInput={handleChange}
                    name="province"
                    value={form.province}
                    style={{ marginBottom: '20px', border: invalidFields.includes('province') ? '1px solid red' : '' }} />

                <IonLabel>Zip</IonLabel>
                <IonInput
                    fill="outline"
                    onIonInput={handleChange}
                    name="zip"
                    value={form.zip}
                    style={{ marginBottom: '20px', border: invalidFields.includes('zip') ? '1px solid red' : '' }} />

                <IonButton
                    onClick={next}
                    expand="block"
                    style={{ width: '90vw', marginTop: '5%' }}>
                    Next
                </IonButton>
            </div>
        </div>
    )
}

export default Address