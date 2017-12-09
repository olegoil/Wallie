import { createFetchWrapper, PRODUCTS, VERSIONS, processJSON } from '../../../utils/request';


const fetch = createFetchWrapper(PRODUCTS.NODE, VERSIONS.V1, processJSON);


export default {

    balance(address: string, confirmations?: number) {
        if (!confirmations) {
            return fetch(`/addresses/balance/${address}`);
        } else {
            return fetch(`/addresses/balance/${address}/${confirmations}`);
        }
    },

    balanceDetails(address: string) {
        return fetch(`/addresses/balance/details/${address}`);
    }

};
