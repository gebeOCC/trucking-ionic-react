import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from "@ionic/react"
import axios from "axios";
import { useEffect, useState } from "react"
import axiosInstance from "../../axios/axiosInstance";
import { Link } from "react-router-dom";

function Home() {

    const logout = () => {
        axiosInstance
            .post('logout')
            .then((response) => {
                console.log(response.data.message);
                if (response.data.message === 'success') {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
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
                <h1>Home Client</h1>
                <IonButton onClick={logout}>Logout</IonButton>
            <a href='/booking'>Book Truck</a>
            </IonContent>
        </IonPage>
    )
}

export default Home 