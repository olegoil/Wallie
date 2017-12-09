import { TTransactionRequest } from '../../../utils/request';
declare const _default: {
    balances(address: string): any;
    balance(address: string, assetId: string): any;
    distribution(assetId: string): any;
    issue: TTransactionRequest;
    transfer: TTransactionRequest;
    reissue: TTransactionRequest;
    burn: TTransactionRequest;
};
export default _default;
