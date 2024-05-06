import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import PickupDetails from "./Booking/PickupDetails";
import PickupLocationDetails from "./Booking/PickupLocationDetails";
import DropoffLocationDetails from "./Booking/DropoffLocationDetails";
import BookingDetails from "./Booking/BookingDetails";
import RouteDetails from "./Booking/RouteDetails";
import GoodsPhoto from "./Booking/GoodsPhoto";

function Booking() {
    const [form, setForm] = useState({
        pickup_type: '',
        pickup_date: new Date().toISOString().split('T')[0], // Set default pickup_date to current date
        pickup_time: '',

        vehicle_type_id: '',
        goods_photo: null,

        pickup_location_lat: '8.596826464192702',
        pickup_location_lng: '124.45771485849178',
        pickup_location_address: '',
        sender_name: '',
        sender_contact_number: '',
        pickup_location_details: '',

        dropoff_location_lat: '8.521490348231794',
        dropoff_location_lng: '124.5723121079061',
        dropoff_location_address: '',
        recipient_name: '',
        recipient_contact_number: '',
        dropoff_location_details: '',

        distance: '',
        duration: '',
        price: 0,
    })


    const [selectedFile, setSelectedFile] = useState(null);

    useState(() => {
        setForm({
            ...form,
            pickup_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        })
    }, [])

    const [mapStyle, setMapStyle] = useState('mapbox://styles/1barry123/clvi2k5vd00an01ob3n2e2qmu');

    const consoleLog = () => {
        console.log(form)
    }
    
    const [currentStep, setCurrentStep] = useState(0);

    const [selectedPrice, setSelectedPrice] = useState('');

    const steps = [
        <PickupDetails form={form} setForm={setForm} selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice}/>,
        <PickupLocationDetails form={form} setForm={setForm} />,
        <DropoffLocationDetails form={form} setForm={setForm} />,
        <RouteDetails form={form} setForm={setForm} mapStyle={mapStyle} setMapStyle={setMapStyle} selectedPrice={selectedPrice} />,
        <GoodsPhoto form={form} setForm={setForm} selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>,
        <BookingDetails form={form} setForm={setForm} consoleLog={consoleLog }/>,
    ];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Booking</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div style={{ width: '100%', height: '90%' }}>
                    {steps[currentStep]}
                </div>

                <div style={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'center', gap: '5%', alignItems: 'center' }}>
                    <IonButton style={{ height: '5%' }} onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 0}>
                        Back
                    </IonButton>
                    <IonButton style={{ height: '5%' }} onClick={() => setCurrentStep(currentStep + 1)} disabled={currentStep === steps.length - 1}>
                        Next
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Booking;