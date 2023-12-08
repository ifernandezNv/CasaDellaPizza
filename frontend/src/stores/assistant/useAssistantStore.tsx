import {create} from "zustand";
import {AssistantType} from './types'

const useAssistantStore = create<AssistantType>((set) => ({
        audio: {} as Blob,
        loadingAssistantResponse: false,
        apiResponse: "",
        handleRecording: (audioRequest: Blob)=> set(()=>({audio: audioRequest})),
        switchLoadingAsssistantResponse: ()=>set((store)=>({loadingAssistantResponse: store.loadingAssistantResponse})),
        setLoadingAssistant: (value: boolean)=>set(()=>({loadingAssistantResponse: value})),
        updateResponse: (response: string)=>set(()=>({apiResponse: response}))
    })
)

export default useAssistantStore