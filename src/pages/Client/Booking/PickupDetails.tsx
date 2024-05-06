import { IonContent, IonLabel, IonPage } from "@ionic/react";
import axiosInstance from "../../../axios/axiosInstance";
import { IonSelect, IonSelectOption, IonDatetime } from "@ionic/react";
import { useEffect, useState } from "react";

const PickupDetails = ({ form, setForm, selectedPrice, setSelectedPrice }) => {
    const [vehicletypes, setVehicleTypes] = useState([]);

    useEffect(() => {
        const selectedVehicleType = vehicletypes.find(
            (vehicletype) => vehicletype.id === form.vehicle_type_id
        );
        if (selectedVehicleType) {
            setSelectedPrice(selectedVehicleType.price);
        } else {
            setSelectedPrice('');
        }
        
    }, [vehicletypes, form.vehicle_type_id]);

    useEffect(() => {
        axiosInstance.get('get-vehicle-types')
            .then(response => {
                console.log(response.data)
                setVehicleTypes(response.data)
            })
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleChangeDateTime = (e) => {
        const { name, value } = e.target;
        const [dateValue, timeValue] = value.split('T');

        if (name === 'pickup_date_time') {
            setForm({
                ...form,
                pickup_date: dateValue,
                pickup_time: timeValue,
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const today = new Date();
    const minDate = today.toISOString();
    const maxDate = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString();

    const vehicletypesData = vehicletypes.map((vehicletype) => (
        <IonSelectOption key={vehicletype.id} value={vehicletype.id}>{vehicletype.vehicle_type_name} {vehicletype.weight_limit}kg(limit)</IonSelectOption>
    ));

    // Add the initial "Choose Vehicle type" option
    vehicletypesData.unshift(
        <option key="default" disabled value="">
            Choose Vehicle type
        </option>
    );

    return (
        <>
            <h1>Pickup details </h1>
            {/* <h3>Pickup type: {form.pickup_type}</h3> */}
            {/* <h3>Pickup Date time: {form.pickup_date}</h3> */}
            {/* <h3>Pickup Date time: {form.pickup_time}</h3> */}
            {/* <h3>Pickup Vehicle type: {form.vehicle_type_id}</h3> */}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', alignItems: 'center', padding: '10%' }}>
                <IonSelect
                    label="Pickup Type"
                    name="pickup_type"
                    value={form.pickup_type}
                    onIonChange={handleChange}
                    style={{ border: '1px solid black' }}
                >
                    <IonSelectOption value="quick">Quick</IonSelectOption>
                    <IonSelectOption value="schedule">Schedule</IonSelectOption>
                </IonSelect>

                <div style={{ border: '1px solid black' }}>
                    <h3 style={{ marginBottom: '1vh' }}>Pickup Date & Time</h3>
                    <IonDatetime
                        name="pickup_date_time"
                        value={`${form.pickup_date}T${form.pickup_time}`}
                        onIonChange={handleChangeDateTime}
                        min={minDate}
                        max={maxDate}
                    />
                </div>

                <IonSelect
                    label="Vehicle Type"
                    name="vehicle_type_id"
                    value={form.vehicle_type_id}
                    onIonChange={handleChange}
                    style={{ border: '1px solid black' }}
                >
                    {vehicletypesData}
                </IonSelect>
            </div>
            {/* <h1>Selected price: {selectedPrice}</h1> */}
        </>
    );
}

export default PickupDetails;