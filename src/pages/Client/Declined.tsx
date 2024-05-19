import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import PickupDetails from "./Booking/PickupDetails";
import PickupLocationDetails from "./Booking/PickupLocationDetails";
import DropoffLocationDetails from "./Booking/DropoffLocationDetails";
import BookingDetails from "./Booking/BookingDetails";
import RouteDetails from "./Booking/RouteDetails";
import GoodsPhoto from "./Booking/GoodsPhoto";
import { arrowBackCircleOutline, arrowForwardCircleOutline } from "ionicons/icons"
import { timeNow, dateNow } from "../Utilities/utils";
import axiosInstance from "../../axios/axiosInstance";
import { useParams } from "react-router";
function Declined() {
    const id = useParams<{ id: string }>();

    const [form, setForm] = useState([])

    useEffect(() => {
        axiosInstance.get(`get-declined-booking-details/${id.id}`)
            .then(response => {
                console.log(response.data)
                setForm(response.data)
            })
    }, [])

    const [invalidFields, setInvalidFields] = useState([""]);

    const [selectedFile, setSelectedFile] = useState(null);

    const [mapStyle, setMapStyle] = useState('mapbox://styles/1barry123/clvi2k5vd00an01ob3n2e2qmu');

    const [currentStep, setCurrentStep] = useState(0);

    const [selectedPrice, setSelectedPrice] = useState('');

    const previous = () => {
        setCurrentStep(currentStep - 1)
    }

    const next = () => {
        const invalidFields = [];

        if (currentStep === 0) {
            if (!form.pickup_type) invalidFields.push('pickup_type');
            if (!form.vehicle_type_id) invalidFields.push('vehicle_type_id');
        } else if (currentStep === 1) {
            if (!form.pickup_location_address) invalidFields.push('pickup_location_address');
            if (!form.sender_name) invalidFields.push('sender_name');
            if (!form.sender_contact_number) invalidFields.push('sender_contact_number');
            if (!form.pickup_location_details) invalidFields.push('pickup_location_details');
        } else if (currentStep === 2) {
            if (!form.dropoff_location_address) invalidFields.push('dropoff_location_address');
            if (!form.recipient_name) invalidFields.push('recipient_name');
            if (!form.recipient_contact_number) invalidFields.push('recipient_contact_number');
            if (!form.dropoff_location_details) invalidFields.push('dropoff_location_details');
        } else if (currentStep === 4) {
            if (!form.goods_photo) invalidFields.push('goods_photo');
        }

        setInvalidFields(invalidFields);

        if (invalidFields.length > 0) {
            return;
        }

        setCurrentStep(currentStep + 1)
    }

    const steps = [
        <div style={{ display: 'flex', alignItems: 'center'}}>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Message</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>{form.message}</IonCardContent>
            </IonCard>
        </div>,
        <PickupDetails form={form} setForm={setForm} setSelectedPrice={setSelectedPrice} invalidFields={invalidFields} step={currentStep + 1} />,
        <PickupLocationDetails form={form} setForm={setForm} invalidFields={invalidFields} step={currentStep + 1} />,
        <DropoffLocationDetails form={form} setForm={setForm} invalidFields={invalidFields} step={currentStep + 1} />,
        <RouteDetails form={form} setForm={setForm} mapStyle={mapStyle} setMapStyle={setMapStyle} selectedPrice={selectedPrice} invalidFields={invalidFields} step={currentStep + 1} />,
        <BookingDetails form={form} setForm={setForm} step={currentStep + 1} id={ id.id }/>,
    ];

    return (
        <IonPage id="add-booking">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Bookings" defaultHref="/bookings"></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div style={{ width: '100%', height: '90%' }}>
                    {steps[currentStep]}
                </div>

                <div style={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'center', gap: '5%', alignItems: 'center', position: 'fixed' }}>
                    <IonFabButton disabled={currentStep === 0} onClick={previous} color={"secondary"}>
                        <IonIcon icon={arrowBackCircleOutline} />
                    </IonFabButton>

                    <IonFabButton disabled={currentStep === steps.length - 1} onClick={next} color={"secondary"}>
                        <IonIcon icon={arrowForwardCircleOutline} />
                    </IonFabButton>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Declined;