import { IonInput, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonBackButton, IonButtons, IonModal } from "@ionic/react";
import { useRef, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Name from "./Register/Name";
import Birthday from "./Register/Birthday";
import PhoneNumber from "./Register/PhonNumber";
import Gender from "./Register/Gender";
import Address from "./Register/Address";
import Credentials from "./Register/Credentials";
import { IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";

function Register() {
    const history = useHistory();

    const [invalidFields, setInvalidFields] = useState([""]);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const modal = useRef<HTMLIonModalElement>(null);

    function dismiss() {
        modal.current?.dismiss();
    }


    function openModal() {
        modal.current?.present();

    }

    const [form, setForm] = useState({
        email: "",
        password: "",
        role: "client",
        phone_number: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        barangay: "",
        city: "",
        province: "",
        zip: "",
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

        console.log(form)

        if (!loading) {
            await axios.post('http://localhost:8000/api/register', form
            )
                .then(response => {
                    console.log(response.data.message);
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

    const previous = () => {
        if (currentStep !== 0) {
            setCurrentStep(currentStep - 1)
        } else {
            console.log('back')
            openModal()
        }
    }

    const next = () => {
        setCurrentStep(currentStep + 1)
    }

    const steps = [
        <Name form={form} setForm={setForm} currentStep={currentStep} setCurrentStep={setCurrentStep} />,
        <Birthday form={form} setForm={setForm} currentStep={currentStep} setCurrentStep={setCurrentStep} />,
        <PhoneNumber form={form} setForm={setForm} currentStep={currentStep} setCurrentStep={setCurrentStep} />,
        <Gender form={form} setForm={setForm} currentStep={currentStep} setCurrentStep={setCurrentStep} />,
        <Address form={form} setForm={setForm} currentStep={currentStep} setCurrentStep={setCurrentStep} />,
        <Credentials form={form} setForm={setForm} />,
    ];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar style={{ display: 'flex' }}>
                    <IonIcon onClick={previous} slot="start" icon={chevronBackOutline} style={{ fontSize: '190%', marginRight: '34vw' }} />
                    <h3 style={{ margin: '0', width: 'auto' }}>Register</h3>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {steps[currentStep]}
                <IonModal style={{ width: '100vw', height: '20vh', paddingTop: '80vh', paddingleft: '10vw', paddingRight: '10vw' }} id="open-custom-dialog" ref={modal}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10%', height: '100%', width: '100%', padding: '10%' }}>
                        <h3 style={{ margin: '0' }}>Do you want to stop creating your account?</h3>
                        <p style={{ color: 'grey' }} onClick={dismiss}>Continue Creating Account</p>
                        <p style={{ color: 'blue' }} onClick={() => { history.push('login') }}>Stop creating account</p>
                    </div>
                </IonModal>
            </IonContent>
        </IonPage>
    )
}

export default Register;