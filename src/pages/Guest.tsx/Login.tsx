import { IonInput, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem } from "@ionic/react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { lockClosed, eye } from "ionicons/icons";
import config from "../../config";

function Login() {
    const [invalidFields, setInvalidFields] = useState([""]);
    const [loading, setLoading] = useState(false);
    const [invalidPass, setInvalidPass] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = async () => {

        setLoading(true);

        const invalidFields = [];
        if (!form.email) invalidFields.push('email');
        if (!form.password) invalidFields.push('password');
        setInvalidFields(invalidFields);

        if (invalidFields.length > 1) {
            setLoading(false)
            return;
        }

        if (!loading) {
            await axios.post(`${config.hostname}/api/login`, form, {
                withCredentials: true
            }
            )
                .then(response => {
                    console.log(response.data.message)
                    if (response.data.message === 'Email does not exist' || response.data.message === 'Email not verified') {
                        setInvalidEmail(true)
                    } else if (response.data.message === 'Password is incorrect') {
                        setInvalidEmail(false)
                        setInvalidPass(true);
                        setForm({
                            ...form,
                            password: ''
                        });
                    }
                    if (response.data.message === 'success') {
                        window.location.reload();
                    }
                })
                .catch(error => {
                    console.log(error.message)
                });
        }
        setLoading(false)
    };

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <div style={{ height: '95vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                    <div>
                        <IonInput
                            label="Email"
                            labelPlacement="floating"
                            color={invalidFields.includes('email') ? 'danger' : ''}
                            type="email"
                            fill="outline"
                            value={form.email}
                            onIonInput={handleChange}
                            name="email"
                            style={{ width: '80vw', border: invalidFields.includes('email') ? '1px solid red' : '' }}
                            clearInput={true}
                        />

                        {invalidEmail && (
                            <p style={{ margin: '0', color: 'red' }}>Email doesn't exist</p>
                        )}
                    </div>
                    <div>
                        <IonInput
                            label="password"
                            labelPlacement="floating"
                            color={invalidFields.includes('email') ? 'danger' : ''}
                            fill="outline"
                            type="password"
                            value={form.password}
                            onIonInput={handleChange}
                            name="password"
                            style={{ width: '80vw', border: invalidFields.includes('password') ? '1px solid red' : '' }}>
                        </IonInput>
                        {invalidPass && (
                            <p style={{ margin: '0', color: 'red' }}>Password is incorrect</p>
                        )}
                    </div>
                    <IonButton
                        onClick={submit}
                        disabled={loading}
                        style={{ width: '80vw' }}>
                        Login
                    </IonButton>
                    <Link to={"/register"}>Register</Link>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Login;