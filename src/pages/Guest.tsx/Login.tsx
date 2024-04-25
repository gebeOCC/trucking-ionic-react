import { IonInput, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from "@ionic/react";
import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

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

        // console.log(form)

        if (invalidFields.length > 1) {
            setLoading(false)
            return;
        }

        if (!loading) {
            await axios.post('http://localhost:8000/api/login', form, {
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
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div style={{ height: '95vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                    <div>
                        <IonInput
                            type="email"
                            value={form.email}
                            onIonInput={handleChange}
                            name="email"
                            style={{ border: 'solid 1px black', width: '80vw' }}
                            placeholder="Email">
                        </IonInput>
                        {invalidEmail && (
                            <p style={{ margin: '0', color: 'red' }}>Email doesn't exist</p>
                        )}
                    </div>
                    <div>
                        <IonInput
                            type="password"
                            value={form.password}
                            onIonInput={handleChange}
                            name="password"
                            style={{ border: 'solid 1px black', width: '80vw' }}
                            placeholder="Password">
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