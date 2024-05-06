import { IonContent, IonPage } from "@ionic/react";
import axiosInstance from "../../../axios/axiosInstance";

const BookingDetails = ({ form, setForm, consoleLog }) => {
    
    const submit = async () => {
        const formData = new FormData();
        formData.append('pickup_type', form.pickup_type);
        formData.append('pickup_date', form.pickup_date);
        formData.append('pickup_time', form.pickup_time);

        formData.append('vehicle_type_id', form.vehicle_type_id);
        formData.append('goods_photo', form.goods_photo);

        formData.append('pickup_location_lat', form.pickup_location_lat);
        formData.append('pickup_location_lng', form.pickup_location_lng);
        formData.append('pickup_location_address', form.pickup_location_address);
        formData.append('sender_name', form.sender_name);
        formData.append('sender_contact_number', form.sender_contact_number);
        formData.append('pickup_location_details', form.pickup_location_details);

        formData.append('dropoff_location_lat', form.dropoff_location_lat);
        formData.append('dropoff_location_lng', form.dropoff_location_lng);
        formData.append('dropoff_location_address', form.dropoff_location_address);
        formData.append('recipient_name', form.sender_name);
        formData.append('recipient_contact_number', form.sender_contact_number);
        formData.append('dropoff_location_details', form.dropoff_location_details);

        formData.append('distance', form.distance);
        formData.append('duration', form.duration);
        formData.append('price', form.price);

        console.log(formData)
        await axiosInstance.post('add-booking', formData)
        .then(response => {
            console.log(response.data)
        })
    }


    return (
        <>
            <h1>Booking details</h1>
            <button onClick={consoleLog}>Click</button>
            <button 
            onClick={submit}>Submit</button>
        </>
    );
}

export default BookingDetails;