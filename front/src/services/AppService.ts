
import {ApiService} from "./ApiService";
import {ISOAPResponse} from "../store/Interfaces";


export const AppService = {
    TAG: "AppService",

    //------------------------------------------------------------------------------------------------------------------

    async getDocument(): Promise<ISOAPResponse> {
        let result = await ApiService.getDocument();
        return result;
    },
}