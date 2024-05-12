import { IonInput } from "@ionic/react";

function Address({ form, setForm, currentStep, setCurrentStep }) {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <>
            <h1>Address</h1>
            <IonInput
                onIonInput={handleChange}
                name="barangay"
                value={form.barangay}
                placeholder="Barangay"
            />
            <IonInput
                onIonInput={handleChange}
                name="city"
                value={form.city}
                placeholder="City"
            />
            <IonInput
                onIonInput={handleChange}
                name="province"
                value={form.province}
                placeholder="Province"
            />
            <IonInput
                onIonInput={handleChange}
                name="zip"
                value={form.zip}
                placeholder="Zip"
            />
            <button onClick={() => { setCurrentStep(currentStep + 1) }}>Next</button>
        </>
    )
}


export default Address