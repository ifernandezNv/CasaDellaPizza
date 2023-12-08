import { UserTypeEnum } from '../../__generated__/types';


export type UserType = {
    id: string;
    email: string;
    name: string;
    userType: UserTypeEnum;
}
export type StepProgress = {
    id: string,
    name: string,
    description: string,
}

export type ResponseType = {
    status: number,
    message: string
}

export type GeneralStoreType = {
    user: UserType;
    modal: boolean;
    modalDelete: boolean;
    nameToDelete: string;
    action: ()=>void;
    refetchFunction: ()=>void;
    loadingDeleteResponse: boolean;
    response: ResponseType;
    personalizationEngineModal: boolean;
    buyProgress: StepProgress;
    stepsProgress: StepProgress[]; 
    setModal: (value: boolean) =>void;
    setUser: (userCredentials: UserType)=>void;
    setNameToDelete: (name: string)=>void;
    setAction: (newAction: ()=>void)=>void;
    setRefetchFunction: (newAction: ()=>void)=>void;
    setResponse: (newResponse: ResponseType)=>void;
    setLoadingDeleteResponse: (newValue: boolean)=>void;
    switchModal: ()=>void;
    switchModalDelete: ()=>void;
    switchPersonalizationEngineModal: ()=>void;
    setBuyProgress: (newProgress:StepProgress)=>void;
    setStepsProgress: (newSteps: StepProgress[])=>void;
}