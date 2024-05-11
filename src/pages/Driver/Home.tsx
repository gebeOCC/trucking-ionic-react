import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from "@ionic/react"
import axios from "axios";
import { useEffect, useState } from "react"
import axiosInstance from "../../axios/axiosInstance";

function Home() {

    const logout = () => {
        axiosInstance
            .post('logout', {}, { withCredentials: true })
            .then((response) => {
                console.log(response.data.message);
                if (response.data.message === 'success') {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
                // Handle logout error
            });
    }

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <h1>Home Driver</h1>
                <IonButton onClick={logout}>Logout</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Home