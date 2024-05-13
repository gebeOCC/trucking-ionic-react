import { IonPage, IonHeader, IonToolbar, IonContent, IonModal } from "@ionic/react";
import { useRef, useState } from "react";
import Name from "./Register/Name";
import Birthday from "./Register/Birthday";
import PhoneNumber from "./Register/PhonNumber";
import Gender from "./Register/Gender";
import Address from "./Register/Address";
import Credentials from "./Register/Credentials";
import { IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { dateNow } from "../Utilities/utils";

function Register() {
    const history = useHistory();

    const [invalidFields, setInvalidFields] = useState([""]);
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
        date_of_birth: dateNow(),
        gender: "",
        barangay: "",
        city: "",
        province: "",
        zip: "",
    });



    const previous = () => {
        if (currentStep !== 0) {
            setCurrentStep(currentStep - 1)
        } else {
            console.log('back')
            openModal()
        }
    }

    const next = () => {
        const invalidFields = [];

        if (currentStep === 0) {
            if (!form.first_name) invalidFields.push('first_name');
            if (!form.last_name) invalidFields.push('last_name');
        } else if (currentStep === 1) {
            if (!form.date_of_birth) invalidFields.push('date_of_birth');
        } else if (currentStep === 2) {
            if (!form.phone_number) invalidFields.push('phone_number');
        } else if (currentStep === 3) {
            if (!form.gender) invalidFields.push('gender');
        } else if (currentStep === 4) {
            if (!form.barangay) invalidFields.push('barangay');
            if (!form.city) invalidFields.push('city');
            if (!form.province) invalidFields.push('province');
            if (!form.zip) invalidFields.push('zip');
        }

        setInvalidFields(invalidFields);

        if (invalidFields.length > 0) {
            return;
        }

        setCurrentStep(currentStep + 1)
    }

    const steps = [
        <Name form={form} setForm={setForm} next={next} invalidFields={invalidFields}/>,
        <Birthday form={form} setForm={setForm} next={next} invalidFields={invalidFields}/>,
        <PhoneNumber form={form} setForm={setForm} next={next} invalidFields={invalidFields}/>,
        <Gender form={form} setForm={setForm} next={next} invalidFields={invalidFields}/>,
        <Address form={form} setForm={setForm} next={next} invalidFields={invalidFields}/>,
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