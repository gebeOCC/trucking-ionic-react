import { IonRadio, IonRadioGroup } from "@ionic/react"

function Gender({ form, setForm, currentStep, setCurrentStep }) {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <>
            <h1>Gender</h1>
            <IonRadioGroup
                onIonChange={handleChange}
                name="gender"
                value={form.gender}>
                <IonRadio value="male">Male</IonRadio>
                <br />
                <IonRadio value="female">Female</IonRadio>
            </IonRadioGroup>
            <button onClick={() => { setCurrentStep(currentStep + 1) }}>Next</button>
        </>
    )
}

export default Gender