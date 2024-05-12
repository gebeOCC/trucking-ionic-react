import { IonCard, IonContent, IonLabel, IonPage } from "@ionic/react";
import axiosInstance from "../../../axios/axiosInstance";
import { IonSelect, IonSelectOption, IonDatetime } from "@ionic/react";
import { useEffect, useState } from "react";
import { timeNow, dateNow } from "../../Utilities/utils";

const PickupDetails = ({ form, setForm, setSelectedPrice, invalidFields, step }) => {
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

    const dateInSevenDays = new Date(dateNow());
    dateInSevenDays.setDate(dateInSevenDays.getDate() + 13);
    const isoDateInSevenDays = dateInSevenDays.toISOString().split('T')[0];

    const minDate = dateNow();
    const maxDate = isoDateInSevenDays;

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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', alignItems: 'center', padding: '10%' }}>
                <IonCard>
                    <h1 style={{ margin: '0'}}>Pickup details</h1>
                </IonCard>
                <IonSelect
                    label="Pickup Type"
                    name="pickup_type"
                    value={form.pickup_type}
                    onIonChange={handleChange}
                    style={{ border: invalidFields.includes('pickup_type') ? '1px solid red' : '1px solid black' } }
                >
                    <IonSelectOption value="quick">Quick</IonSelectOption>
                    <IonSelectOption value="schedule">Schedule</IonSelectOption>
                </IonSelect>

                {form.pickup_type === 'schedule' &&
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
                }

                {form.pickup_type === 'quick' &&
                    <h1>Within 1 hour</h1>
                }

                <IonSelect
                    label="Vehicle Type"
                    name="vehicle_type_id"
                    value={form.vehicle_type_id}
                    onIonChange={handleChange}
                    style={{ border: invalidFields.includes('vehicle_type_id') ? '1px solid red' : '1px solid black' }}
                >
                    {vehicletypesData}
                </IonSelect>
            </div>
            <h1
                style={{
                    position: 'fixed',
                    top: '7%',
                    right: '2%',
                    fontFamily: 'monospace',
                    margin: '0',
                }}>
                {step}/6
            </h1>
        </>
    );
}

export default PickupDetails;