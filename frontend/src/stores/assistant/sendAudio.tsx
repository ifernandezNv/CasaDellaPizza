import axios from "axios";

const sendAudio  = async (audio: Blob)=>{
    console.log("mandando a llamar")
    const fd = new FormData();
    fd.append("audio", audio, "audio");
   try {
    const {data} = await axios.post(import.meta.env.VITE_VOICE_ASSISTANT_ENDPOINT, fd)
    return data.text
   } catch (error) {
    console.log("Ocurrió un error", error)
   } 
}

export default sendAudio