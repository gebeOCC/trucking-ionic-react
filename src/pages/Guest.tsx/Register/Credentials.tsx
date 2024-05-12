import { IonButton, IonInput } from "@ionic/react";
import axiosInstance from "../../../axios/axiosInstance";

function Credentials({ form, setForm, }) {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const register = () => {
        console.log(form);
        axiosInstance.post('register', form)
        .then(response => {
            console.log(response.data.message);
        })
    }
    
    return (
        <>
            <h1>Credentials</h1>
            <IonInput
                type="email"
                value={form.email}
                onIonInput={handleChange}
                name="email"
                placeholder="Email">
            </IonInput>
            <IonInput
                type="password"
                onIonInput={handleChange}
                name="password"
                placeholder="Password">
            </IonInput>
            <IonButton onClick={register}>
                Register
            </IonButton>
        </>
    )
}

export default Credentials