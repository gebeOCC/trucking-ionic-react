import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCardContent, IonCard, IonLabel, IonImg, IonCol, IonGrid, IonRow, IonAvatar } from "@ionic/react";
import axiosInstance from "../axios/axiosInstance";
import { useEffect, useState } from "react";
import config from "../config";

function Menu() {
    const [profile, setProfile] = useState<any>([]);
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

    useEffect(() => {
        axiosInstance.get('get-profile')
            .then(response => {
                setProfile(response.data)
            })
    }, [])

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <IonCard>
                    <IonGrid>
                        <IonRow
                            style={{ textAlign: 'center', alignItems: 'center' , display: 'flex', gap: '2%'}}>
                            <IonAvatar>
                                <IonImg
                                    src={`${config.hostname}${config.paths.profilePictures}/${profile.profile_picture}`}
                                    alt="Goods Photo" />
                            </IonAvatar>
                            <h1
                                style={{ margin: '0'}}>
                                    {profile.full_name}</h1>
                        </IonRow>
                    </IonGrid>
                </IonCard>

                <IonCard
                    button={true}
                    color="medium"
                    onClick={logout}
                    style={{ display: 'flex', textAlign: 'center', height: '5vh' }}>
                    Logout
                </IonCard>

            </IonContent>
        </IonPage>
    )
}

export default Menu