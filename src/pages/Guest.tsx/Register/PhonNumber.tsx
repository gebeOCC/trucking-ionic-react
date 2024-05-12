import { IonInput } from "@ionic/react"

function PhoneNumber({ form, setForm, currentStep, setCurrentStep }) {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h1>Phone number</h1>
            <IonInput
                type="number"
                onIonInput={handleChange}
                name="phone_number"
                value={form.phone_number}
                placeholder="Phone number"
            />
            <button onClick={() => { setCurrentStep(currentStep + 1) }}>Next</button>
        </>
    )
}

export default PhoneNumber