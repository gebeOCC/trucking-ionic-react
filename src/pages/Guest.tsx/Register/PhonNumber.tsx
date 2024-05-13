import { IonButton, IonInput, IonLabel } from "@ionic/react"

function PhoneNumber({ form, setForm, next, invalidFields }) {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5%' }}>
            <h1>Enter your phone number</h1>
            <div>
                <IonLabel>Phone number</IonLabel>
                <IonInput
                    fill="outline"
                    type="number"
                    onIonInput={handleChange}
                    name="phone_number"
                    value={form.phone_number}
                    style={{ border: invalidFields.includes('phone_number') ? '1px solid red' : '' }}>
                </IonInput>

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

export default PhoneNumber