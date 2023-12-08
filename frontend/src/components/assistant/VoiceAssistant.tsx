import { useState } from "react";
import {AudioRecorder, useAudioRecorder} from "react-audio-voice-recorder";

import { Tooltip } from "@mui/material";
import {ClockLoader} from "react-spinners";
import { Icon } from '@iconify/react';
import { toast } from "react-toastify";

import useAssistantStore from "../../stores/assistant/useAssistantStore";
import sendAudio from "../../stores/assistant/sendAudio";
import useCartStore from "../../stores/cart/cart-store";
import ChefsitoInfo from "../ChefsitoInfo";
const VoiceAssistant = () => {
    const {setAddress, setCart, addToCart, setAssistantResult} = useCartStore()
    const loadingAssistantResponse = useAssistantStore(store => store.loadingAssistantResponse)
    const [hover, setHover] = useState<boolean>(false)
    const {switchLoadingAsssistantResponse, setLoadingAssistant} = useAssistantStore()
    // const audio = useAssistantStore(store=>store.audio)

    const recorderControls = useAudioRecorder(
        {
          noiseSuppression: true,
          echoCancellation: true,
        },
        (err) => console.table(err)
    );

    const handleMouseOver = ()=>{
        setHover(true)
    }
    const handleMouseOut = ()=>{
        setHover(false)
    }

    const sendRequest = async (audio: Blob)=>{
        setLoadingAssistant(true)
        try {   
            const resultado = await sendAudio(audio)
            console.log(resultado)
            if(resultado?.street){
                setAddress(resultado)
                toast.success("Registramos tu dirección correctamente, puedes verla en el reporte del carrito")
            }else{
                setAssistantResult(resultado)
            }
            return
            // if(resultado?.pizzas){
            //     const pizzasToAdd = resultado.pizzas
            //     console.log(pizzasToAdd)
            // }
            // if(resultado?.complements){
            //     const complementsToAdd = resultado.complements
            //     console.log(complementsToAdd)
            // }
            // if(resultado?.dips){
            //     const dipsToAdd = resultado.dips
            //     console.log(dipsToAdd)
            // }
        } catch (error) {
            console.log(error)
        }finally {
            setLoadingAssistant(false)
        }
    }
    return (
    <div className="flex flex-col items-center">
        { loadingAssistantResponse ? (
            <>
                <div>
                    <p>Estamos analizando tu solicitud</p>
                </div>
                <ClockLoader 
                    loading={loadingAssistantResponse}
                    color="#E4A400" 
                />
            </>
        ): (
            <div className="relative flex justify-end gap-1 w-72">
                {hover && (
                    <div className="absolute -top-[350px] right-0 w-full ">
                        <ChefsitoInfo />
                    </div>
                )}
                <Icon 
                    className="text-6xl bg-yellow-main rounded-full" 
                    icon="solar:chef-hat-linear" 
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    
                />
                <AudioRecorder
                    onRecordingComplete={(blob)=>sendRequest(blob)}
                    recorderControls={recorderControls}
                    classes={{
                        AudioRecorderClass: "bg-yellow-main",
                    }}
                    
                />
            </div>
        )}
    </div>
  )
}

export default VoiceAssistant