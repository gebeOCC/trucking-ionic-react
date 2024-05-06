import { IonInput } from "@ionic/react";
import { useState } from "react";

function GoodsPhoto({ form, setForm, selectedFile, setSelectedFile }) {

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

    return (
        <>
            <h1>Goods Photo</h1>
            {/* File input for selecting image */}
            <input
                type="file"
                accept="image/*" // Accept only image files
                onChange={handleFileChange}
            />

            {/* Display selected image if available */}
            {selectedFile && (
                <div>
                    <h2>Preview:</h2>
                    <img
                        src={URL.createObjectURL(selectedFile)} // Create a temporary URL for the selected file
                        alt="Selected"
                        style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                    />
                </div>
            )}
        </>
    );
}

export default GoodsPhoto;
