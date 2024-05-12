import { IonButton, IonCard } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';

function signatureCanva({ signature, setSignature, setSignatureCanvaOpen }) {

    const canvasRef = useRef(null);
    const [signaturePad, setSignaturePad] = useState(null);

    useEffect(() => {
        if (canvasRef.current) {
            const pad = new SignaturePad(canvasRef.current);
            setSignaturePad(pad);
        }
    }, [canvasRef]);

    const handleClose = () => {
        setSignatureCanvaOpen(false);
    }

    const clearCanvas = () => {
        if (signaturePad) {
            signaturePad.clear();
        }

            setSignature(null)
    }

    const confirm = () => {
        if (signaturePad) {
            const data = signaturePad.toDataURL('image/png');
            setSignature(data);
        }
        setSignatureCanvaOpen(false);
        console.log(signature);
    }

    return (
        <>
            <IonCard
                style={{ textAlign: 'center', height: '60vh'}}>
                <canvas
                    ref={canvasRef}
                    id="signatureCanvas"
                    width={380} height={450}
                    style={{ border: '1px solid black', display: 'inline-block' }}
                />
            </IonCard>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <IonButton onClick={handleClose} color="medium">
                    Cancel
                </IonButton>
                <IonButton onClick={clearCanvas} color="danger">
                    Clear
                </IonButton>
                <IonButton onClick={confirm} color="success">
                    Confirm
                </IonButton>
            </div>
        </>
    )
}

export default signatureCanva