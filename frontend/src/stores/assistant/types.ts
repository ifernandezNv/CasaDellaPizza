
export type AssistantType = {
    audio: Blob;
    loadingAssistantResponse: boolean;
    apiResponse: string,
    handleRecording: (audioRequest: Blob)=>void;
    switchLoadingAsssistantResponse: ()=>void;
    updateResponse: (response: string)=>void;
    setLoadingAssistant: (value: boolean)=>void;
}