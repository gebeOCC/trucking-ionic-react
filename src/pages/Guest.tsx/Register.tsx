import { IonInput, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from "@ionic/react";
import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";

function Register() {
    const [invalidFields, setInvalidFields] = useState([""]);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "barry",
        role: "client"
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

    if(redirect){
        return <Redirect to="/login"/>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Register</IonTitle>
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
                            value={form.password}
                            onIonInput={handleChange}
                            name="password"
                            style={{ border: 'solid 1px black', width: '80vw' }}
                            placeholder="Password">
                        </IonInput>
                    </div>
                    <IonButton
                        onClick={submit}
                        disabled={loading}
                        style={{ width: '80vw' }}>
                        Register
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Register;