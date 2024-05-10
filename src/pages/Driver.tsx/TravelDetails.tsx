import { useEffect, useState } from 'react';
import { Message, getMessage } from '../data/messages';
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router';
import axiosInstance from '../../axios/axiosInstance';

function TravelDetails() {
    const id = useParams<{ id: string }>();

    useEffect(() => {
        axiosInstance.get('get-booking')
    },[])
    return (
        <IonPage id="view-message-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Inbox" defaultHref="/home"></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <h1>Travel details </h1>
            </IonContent>
        </IonPage>
    );
}

export default TravelDetails;
