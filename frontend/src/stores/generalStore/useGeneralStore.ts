import {create} from "zustand";

import { GeneralStoreType, StepProgress, UserType, ResponseType } from "./types";

const useGeneralStore = create<GeneralStoreType>((set) => ({
    user: {
        id: "",
        name: "",
        email: "",
        userType: "user"
    },
    modal: false,
    personalizationEngineModal: false,
    buyProgress: {
        id: "",
        name: "",
        description: "",
    },
    loadingDeleteResponse: false,
    response: {
        message: "",
        status: 0
    },
    refetchFunction: ()=>{},
    nameToDelete: "",
    modalDelete: false,
    action: ()=>{},
    stepsProgress: [
        {
            id: "pending",
            name: "Esperando Pago",
            description: "Estamos esperando a que nuestro sistema refleje el pago",
        },
        {
            id: "received",
            name: "Orden Recibida",
            description: "Estamos preparando todo para comenzar a  preparar tu pedido",
        },
        {
            id: "baking",
            name: "En el horno",
            description: "La(s) pizza(s) que pediste ya se encuentra(n) en el horno",
        },
        {
            id: "lastDetails",
            name: "Detalles Finales",
            description: "Estamos ajustando los últimos detalles para proporcionarte la mejor experiencia",
        },
        {
            id: "onItsWay",
            name: "En Camino",
            description: "Tu pedido ya se encuentra en la ruta de entrega. En breve el repartidor estará tocando a tu puerta",
        },
    ] as StepProgress[],
    setModal: (value: boolean)=>set(()=> ({modal: value})),
    setUser: (userCredentials: UserType)=>set(()=> ({user: userCredentials})),
    setNameToDelete: (name: string)=>set(()=> ({nameToDelete: name})),
    setAction: (newAction: ()=>void)=>set(() => ({action: newAction})),
    setRefetchFunction: (newFunction: ()=>void)=>set(() => ({refetchFunction: newFunction})),
    setResponse: (newResponse: ResponseType)=>set(()=>({response: newResponse})),
    setLoadingDeleteResponse: (newValue: boolean)=>set(()=>({loadingDeleteResponse: newValue})),
    switchModal: ()=>set((state) => ({modal: !state.modal})),
    switchModalDelete: ()=>set((state) => ({modalDelete: !state.modalDelete})),
    switchPersonalizationEngineModal: ()=>set((state) => ({personalizationEngineModal: !state.personalizationEngineModal})),
    setBuyProgress: (newProgress: StepProgress)=> set(()=>({buyProgress: newProgress})),
    setStepsProgress: (newSteps: StepProgress[])=> set(()=>({stepsProgress: newSteps})),
}))

export default useGeneralStore