import { useEffect, useState } from 'react';
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonImg,
    IonPage,
    IonProgressBar,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonText,
} from '@ionic/react';
import { useParams } from 'react-router';
import axiosInstance from '../../axios/axiosInstance';
import { formatDate, convertToAMPM } from "../Utilities/utils";
import SignatureCanva from './SignatureCanva';
import { timeNow, dataURItoBlob } from '../Utilities/utils';

function TravelDetails() {
    const id = useParams<{ id: string }>();
    const [travelDetails, setTravelDetails] = useState<any>([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [pickupImage, setPickupImage] = useState(null);
    const [dropoffImage, setDropoffImage] = useState(null);
    const [signature, setSignature] = useState(null);
    const [signatureCanvaOpen, setSignatureCanvaOpen] = useState(false);

    const fetchTravelDetails = () => {
        axiosInstance.get(`get-travel-details/${id.id}`)
            .then(response => {
                setTravelDetails(response.data)
                console.log(response.data)
                setFetchLoading(false);
            })
    }

    useEffect(() => {
        fetchTravelDetails();
    }, [id])

    const pickupFileSelect = (e) => {
        const file = e.target.files[0]; // Get the selected file
        setPickupImage(file); // Store the selected file in state
    };

    const dropoffFileSelect = (e) => {
        const file = e.target.files[0]; // Get the selected file
        setDropoffImage(file); // Store the selected file in state
    };

    const submitPickup = async () => {

        const formData = new FormData();
        formData.append('pickup_goods_photo', pickupImage);
        formData.append('pickup_time', timeNow());

        // Log the contents of formData
        console.log('FormData Contents:');
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        await axiosInstance.post(`submit-pickup/${id.id}`, formData)
            .then(response => {
                fetchTravelDetails();
                console.log(response.data.message)
                setPickupImage(null)
            })
    }

    const submitDropoff = async () => {
        const formData = new FormData();
        formData.append('dropoff_goods_photo', dropoffImage);
        formData.append('signature_image', dataURItoBlob(signature));
        formData.append('dropoff_time', timeNow());

        // Log the contents of formData
        console.log('FormData Contents:');
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        await axiosInstance.post(`submit-dropoff/${id.id}`, formData)
            .then(response => {
                fetchTravelDetails();
                console.log(response.data.message)
                setDropoffImage(null)
                setSignature(null)
            })
    }

    const signatureCanva = () => {
        setSignatureCanvaOpen(true);
    }



    return (
        <IonPage id="view-travel-details">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Travel details" defaultHref="/travels"></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {!fetchLoading ? (
                    <>
                        {!signatureCanvaOpen ? (
                            <IonCardContent>
                                <>
                                    <IonCard style={{ textAlign: 'center' }}>
                                        {travelDetails.travel_status === 'delivered' &&
                                            <IonText style={{ display: 'inline-block' }} color="success">
                                                <h1 >Delivered</h1>
                                            </IonText>
                                        }
                                    </IonCard>
                                    <IonCard>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol size="6">
                                                    <h3>{formatDate(travelDetails.pickup_date)}</h3>
                                                    <h3>{convertToAMPM(travelDetails.pickup_time)}</h3>
                                                    <h3>Amount to pay: {travelDetails.price}</h3>
                                                    <h3>Vehicle: {travelDetails.model}</h3>
                                                    <h3>Plat number: {travelDetails.plate_number}</h3>
                                                </IonCol>
                                                <IonCol size="6">
                                                    <IonImg src={`http://localhost:8000/goods-photo/${travelDetails.goods_photo}`} alt="Goods Photo" />
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCard>

                                    <IonCard>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol>
                                                    <h2>Pickup</h2>
                                                    <p>{travelDetails.pickup_location_address}</p>
                                                    <p>{travelDetails.sender_name}</p>
                                                    <p>{travelDetails.sender_contact_number}</p>
                                                    <p>{travelDetails.pickup_location_details}</p>
                                                    {travelDetails.travel_status === 'in progress' &&
                                                        <>
                                                            <input
                                                                type="file"
                                                                id="pickupFileInput"
                                                                style={{ display: 'none' }} // Hide the input visually
                                                                onChange={pickupFileSelect} // Call handleFileSelect on file selection
                                                            />

                                                            {/* Button that triggers file input when clicked */}
                                                            <IonButton size="small" color="medium" onClick={() => document.getElementById('pickupFileInput').click()}>
                                                                Upload Image
                                                            </IonButton>
                                                            {pickupImage &&
                                                                <>
                                                                    <IonButton
                                                                        onClick={submitPickup}
                                                                        size="small"
                                                                        color="primary">
                                                                        Submit
                                                                    </IonButton>
                                                                </>
                                                            }
                                                            {/* Label to display selected file name (optional) */}
                                                            {/* <IonLabel>{pickupImage ? pickupImage.name : 'No file selected'}</IonLabel> */}
                                                        </>
                                                    }
                                                </IonCol>
                                                {travelDetails.travel_status !== 'in progress' &&
                                                    <IonCol size="6">
                                                        <IonImg src={`http://localhost:8000/goods-photo/${travelDetails.pickup_goods_photo}`} alt="Goods Photo" />
                                                    </IonCol>
                                                }

                                                {pickupImage &&
                                                    <>
                                                        <IonCol size="6">
                                                            <IonImg src={pickupImage ? URL.createObjectURL(pickupImage) : ''} alt="Goods Photo" />
                                                        </IonCol>
                                                    </>
                                                }
                                            </IonRow>
                                        </IonGrid>
                                    </IonCard>

                                    <IonCard>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol>
                                                    <h2>Dropoff</h2>
                                                    <p>{travelDetails.dropoff_location_address}</p>
                                                    <p>{travelDetails.recipient_name}</p>
                                                    <p>{travelDetails.recipient_contact_number}</p>
                                                    <p>{travelDetails.dropoff_location_details}</p>
                                                    {travelDetails.travel_status === 'delivering' &&
                                                        <>
                                                            <input
                                                                type="file"
                                                                id="dropoffFileInput"
                                                                style={{ display: 'none' }} // Hide the input visually
                                                                onChange={dropoffFileSelect} // Call handleFileSelect on file selection
                                                            />

                                                            {/* Button that triggers file input when clicked */}
                                                            <IonButton size="small" color="medium" onClick={() => document.getElementById('dropoffFileInput').click()}>
                                                                Upload Image
                                                            </IonButton>
                                                        </>
                                                    }

                                                    {dropoffImage &&
                                                        <>
                                                            <IonButton size="small" color="medium" onClick={signatureCanva}>
                                                                Signature
                                                            </IonButton>
                                                        </>
                                                    }

                                                    {signature &&
                                                        <>
                                                            <IonButton
                                                                onClick={submitDropoff}
                                                                size="small"
                                                                color="primary">
                                                                Submit
                                                            </IonButton>
                                                        </>
                                                    }
                                                </IonCol>

                                                {travelDetails.travel_status === 'delivered' &&
                                                    <IonCol size="6">
                                                        <IonImg src={`http://localhost:8000/goods-photo/${travelDetails.dropoff_goods_photo}`} alt="Goods Photo" />
                                                    </IonCol>
                                                }

                                                {dropoffImage &&
                                                    <>
                                                        <IonCol size="6">
                                                            <IonImg src={dropoffImage ? URL.createObjectURL(dropoffImage) : ''} alt="Goods Photo" />
                                                        </IonCol>
                                                    </>
                                                }
                                            </IonRow>
                                        </IonGrid>
                                    </IonCard>
                                    <IonCard>
                                        {travelDetails.travel_status === 'delivered' &&
                                            <IonImg src={`http://localhost:8000/signature/${travelDetails.signature_image}`} alt="Goods Photo" />
                                        }
                                        {signature &&
                                            <IonImg src={signature} alt="Signature" />
                                        }
                                    </IonCard></>
                            </IonCardContent>

                        ) : (
                            <SignatureCanva signature={signature} setSignature={setSignature} setSignatureCanvaOpen={setSignatureCanvaOpen} />
                        )}
                    </>
                ) : (
                    <IonProgressBar type="indeterminate"></IonProgressBar>
                )}
            </IonContent>
        </IonPage>
    );
}

export default TravelDetails;
