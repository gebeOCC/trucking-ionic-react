import { IonButton, IonInput, IonLabel } from "@ionic/react"

function Name({ form, setForm, next, invalidFields }) {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5%' }}>
            <h1>What's your name?</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
                <div>
                    <IonLabel>First name</IonLabel>
                    <IonInput
                        fill="outline"
                        onIonInput={handleChange}
                        name="first_name"
                        value={form.first_name}
                        style={{ border: invalidFields.includes('first_name') ? '1px solid red' : '' }}>
                    </IonInput>
                </div>

                <div>
                    <IonLabel>Last name</IonLabel>
                    <IonInput
                        fill="outline"
                        onIonInput={handleChange}
                        name="last_name"
                        value={form.last_name}
                        style={{ border: invalidFields.includes('last_name') ? '1px solid red' : '' }}>
                    </IonInput>
                </div>
            </div>
            <IonButton
                onClick={ next }
                expand="block"
                style={{ width: '90vw', marginTop: '5%' }}>
                Next
            </IonButton>
        </div>
    )
}

export default Name