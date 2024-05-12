import { IonButton, IonCard, IonGrid, IonIcon, IonImg, IonInput, IonRow } from "@ionic/react";
import { camera } from "ionicons/icons";
import { useState } from "react";

function GoodsPhoto({ form, setForm, selectedFile, setSelectedFile, invalidFields, step }) {

    // Function to handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);

            // Assuming you want to update the form state with the file
            setForm({
                ...form,
                goods_photo: file, // Update the form state with the selected file
            });
        }
    };

    function openFileDialog(event: MouseEvent<HTMLIonButtonElement, MouseEvent>): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', alignItems: 'center', padding: '10%' }}>
            <IonCard>
                <h1 style={{ margin: '0' }}>Goods Photo</h1>
            </IonCard>
            {/* File input for selecting image */}
            <input
                type="file"
                accept="image/*" // Accept only image files
                onChange={handleFileChange}
                id="file-upload"
                style={{ display: "none" }}
            />

            <IonCard
                button={true} style={{ display: 'flex', with: '100%' }}
                onClick={() => document.getElementById('file-upload').click()} >
                <IonGrid>
                    <IonRow>
                        <IonButton >
                            <IonIcon slot="icon-only" icon={camera}></IonIcon>
                        </IonButton>
                        <h1>Upload photo</h1>
                    </IonRow>
                </IonGrid>
            </IonCard>

            {invalidFields.includes('goods_photo') &&
                <>
                    {!form.goods_photo &&
                        <h1 style={{ color: 'red' }}>No image</h1>
                    }
                </>
            }

            {/* Display selected image if available */}
            {selectedFile && (

                    <IonImg
                        src={URL.createObjectURL(selectedFile)} // Create a temporary URL for the selected file
                        alt="Selected"
                        style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                    />
            )}
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
        </div>
    );
}

export default GoodsPhoto;
