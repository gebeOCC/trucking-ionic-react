import { IonInput } from "@ionic/react"

function Name({ form, setForm, currentStep, setCurrentStep }) {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h1>Unsay ngalan nimo mego?</h1>
            <IonInput
                onIonInput={handleChange}
                name="first_name"
                value={form.first_name}
                placeholder="First name"
            />

            <IonInput
                onIonInput={handleChange}
                name="last_name"
                value={form.last_name}
                placeholder="Last name"
            />
            <button onClick={() => { setCurrentStep(currentStep + 1)}}>Next</button>
        </>
    )
}

export default Name