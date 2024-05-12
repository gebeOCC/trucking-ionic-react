import { IonInput, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from "@ionic/react";
import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

function Register() {
    const [invalidFields, setInvalidFields] = useState([""]);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
        role: "client"
    });

    const submitRegister = async () => {

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
            await axios.post('http://localhost:8000/api/register', form
            )
                .then(response => {
                    console.log(response.data);
                    setRedirect(true);
                })
                .catch(error => {
                    console.log(error.response.data.message)

                });
        }
        setLoading(false)
    };

    const handleChange = (e: any) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (redirect) {
        return <Redirect to="/login" />;
    }

    const handleGoBack = () => {
        history.back();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {/* <Link to="#" onClick={handleGoBack} style={{ display: 'flex' }}>
                        <div style={{ width: '50px', pointerEvents: 'none' }}>
                            <svg
                                style={{ height: '6vw', alignSelf: 'center', marginLeft: '5px', position: 'relative' }}
                                image-rendering="optimizeQuality"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                viewBox="0 0 267 512.43">
                                <path
                                    fill-rule="nonzero"
                                    d="M263.78 18.9c4.28-4.3 4.3-11.31.04-15.64a10.865 10.865 0 0 0-15.48-.04L3.22 248.38c-4.28 4.3-4.3 11.31-.04 15.64l245.16 245.2c4.28 4.3 11.22 4.28 15.48-.05s4.24-11.33-.04-15.63L26.5 256.22 263.78 18.9z" />
                            </svg>
                        </div>
                    </Link> */}
                    <IonTitle style={{ textAlign: 'center' }}>Register</IonTitle>
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
                    </div>
                    <div>
                        <IonInput
                            type="password"
                            onIonInput={handleChange}
                            value={form.password}
                            name="password"
                            style={{ border: 'solid 1px black', width: '80vw' }}
                            placeholder="Password">
                        </IonInput>
                    </div>
                    <IonButton
                        onClick={submitRegister}
                        disabled={loading}
                        style={{ width: '80vw' }}>
                        Register
                    </IonButton>
                    <Link to={"/login"}>Back</Link>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Register;