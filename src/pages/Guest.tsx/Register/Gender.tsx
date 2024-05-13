import { IonButton, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup } from "@ionic/react"

function Gender({ form, setForm, next, invalidFields }) {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5%' }}>
            <h1>What's your gender?</h1>
            <div
                style={{ width: '90vw' }}>
                <IonList>
                    <IonRadioGroup
                        onIonChange={handleChange}
                        name="gender"
                        value={form.gender}>
                        <IonItem>
                            <IonRadio
                                style={{ display: 'flex', justifyContent: 'space-between' }}
                                value="male">
                                Male
                            </IonRadio>
                        </IonItem>
                        <IonItem>
                            <IonRadio
                                style={{ display: 'flex', justifyContent: 'space-between' }}
                                value="female">
                                Female
                            </IonRadio>
                        </IonItem>
                    </IonRadioGroup>
                </IonList>
            </div>

            {invalidFields.includes('gender') && 
                <IonLabel style={{color: 'red', margin: '0'}}>Choose gender</IonLabel>
            }
            <IonButton
                onClick={next}
                expand="block"
                style={{ width: '90vw', marginTop: '5%' }}>
                Next
            </IonButton>
        </div>
    )
}

export default Gender