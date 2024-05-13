import { IonLabel, IonInput, IonButton, IonPicker, IonPickerColumn, IonPickerColumnOption, IonModal } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../../Utilities/utils";

function Birthday({ form, setForm, next, invalidFields }) {

    const yearNow = new Date().getFullYear();

    const [birthday, setBirthday] = useState(() => {
        const dateOfBirth = form.date_of_birth ? new Date(form.date_of_birth) : null;
        return {
            month: dateOfBirth ? dateOfBirth.getMonth() + 1 : null,
            day: dateOfBirth ? dateOfBirth.getDate() : null,
            year: dateOfBirth ? dateOfBirth.getFullYear() : null,
        };
    });

    const handleChange = (e) => {
        setBirthday({
            ...birthday,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        const formattedDate = `${birthday.year}-${String(birthday.month).padStart(
            2,
            '0'
        )}-${String(birthday.day).padStart(2, '0')}`;
        setForm({
            ...form,
            date_of_birth: formattedDate
        });
    }, [birthday.month, birthday.day, birthday.year])

    const modal = useRef<HTMLIonModalElement>(null);

    function openModal() {
        modal.current?.present();
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5%' }}>
            <h1>What's your birthday?</h1>
            <div>
                <IonLabel>Birthday</IonLabel>
                <IonInput
                    onClick={openModal}
                    fill="outline"
                    value={formatDate(form.date_of_birth)}
                    style={{ border: invalidFields.includes('date_of_birth') ? '1px solid red' : '' }}>
                </IonInput>

                <IonButton
                    onClick={next}
                    expand="block"
                    style={{ width: '90vw', marginTop: '5%' }}>
                    Next
                </IonButton>
            </div>

            <IonModal style={{ width: '100vw', paddingTop: '70vh' }} id="open-custom-dialog" ref={modal}>
                <div style={{ height: '100%', alignContent: 'center' }}>
                    <IonPicker style={{ display: 'flex', gap: '2%' }}>
                        <IonPickerColumn
                            onIonChange={handleChange}
                            name="month"
                            value={birthday.month}>
                            {Array.from({ length: 12 }, (_, index) => (
                                <IonPickerColumnOption key={index + 1} value={index + 1}>{new Date(0, index).toLocaleString('default', { month: 'long' })}</IonPickerColumnOption>
                            ))}
                        </IonPickerColumn>

                        <IonPickerColumn
                            onIonChange={handleChange}
                            name="day"
                            value={birthday.day}>
                            {Array.from({ length: 31 }, (_, index) => (
                                <IonPickerColumnOption key={index + 1} value={index + 1}>{index + 1}</IonPickerColumnOption>
                            ))}
                        </IonPickerColumn>

                        <IonPickerColumn
                            onIonChange={handleChange}
                            name="year"
                            value={birthday.year}>
                            {Array.from({ length: yearNow - 1909 }, (_, index) => (
                                <IonPickerColumnOption key={1910 + index} value={1910 + index}>{1910 + index}</IonPickerColumnOption>
                            ))}
                        </IonPickerColumn>
                    </IonPicker>
                </div>  
            </IonModal>
        </div>
    )
}

export default Birthday