
import {ApiService} from "./ApiService";
import {ISOAPData} from "../store/Interfaces";


export const AppService = {
    TAG: "AppService",

    //------------------------------------------------------------------------------------------------------------------

    async getDocument(query: any): Promise<ISOAPData> {
        let result = await ApiService.getDocument(query);
        return result;
    },
}