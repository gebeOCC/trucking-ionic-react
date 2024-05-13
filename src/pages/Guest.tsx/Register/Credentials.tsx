import { IonButton, IonInput, IonLabel } from "@ionic/react";
import axiosInstance from "../../../axios/axiosInstance";
import { Redirect } from "react-router";
import { useEffect, useState } from "react";

function Credentials({ form, setForm, }) {
    const [invalidFields, setInvalidFields] = useState([""]);
    const [redirect, setRedirect] = useState(false);
    const [emailExist, setEmailExist] = useState(false);

    if (redirect) {
        return <Redirect to="/login" />;
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const register = async () => {
        console.log(form);

        const invalidFields = [];
        if (!form.email) invalidFields.push('email');
        if (!form.password) invalidFields.push('password');

        setInvalidFields(invalidFields);

        if (invalidFields.length > 0) {
            return;
        }

        await axiosInstance.post('register', form)
            .then(response => {
                console.log(response.data.message);
                if (response.data.message === 'success') {
                    setRedirect(true)
                } else if(response.data.message === 'Email exist'){
                    setEmailExist(true)
                }
            })
    }

    useEffect(() => {
        setForm({
            ...form,
            password: '',
        })
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5%' }}>
            <h1>Enter your address</h1>
            <div>
                <IonLabel>Email</IonLabel>
                <IonInput
                    fill="outline"
                    type="email"
                    value={form.email}
                    onIonInput={handleChange}
                    name="email"
                    style={{ border: invalidFields.includes('email') ? '1px solid red' : '' }} />
                {emailExist &&
                    <p style={{ color: 'red' }}>Email already exist</p>
                }

                <div style={{ marginTop: '20px' }}></div>
                <IonLabel>Password</IonLabel>
                <IonInput
                    fill="outline"
                    type="password"
                    onIonInput={handleChange}
                    name="password"
                    style={{ marginBottom: '20px', border: invalidFields.includes('password') ? '1px solid red' : '' }} />

                <IonButton
                    onClick={register}
                    expand="block"
                    style={{ width: '90vw', marginTop: '5%' }}>
                    Register
                </IonButton>
            </div>
        </div>
    )
}

export default Credentials