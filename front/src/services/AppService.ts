
import {ApiService} from "./ApiService";
import {ISearchRegistryItem, IGetContentItem} from "../store/Interfaces";


export const AppService = {
    TAG: "AppService",

    //------------------------------------------------------------------------------------------------------------------

    async searchRegistryItem(query: any): Promise<ISearchRegistryItem> {
        let result = await ApiService.searchRegistryItem(query);
        return result;
    },

    async getContent(query: any): Promise<IGetContentItem> {
        let result = await ApiService.searchRegistryItem(query);
        return result;
    },
}