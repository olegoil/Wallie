import { IHash, IKeyPair } from '../../interfaces';
import { ITransactionClassConstructor } from '../classes/Transactions';
export declare type TTransactionRequest = (data: IHash<any>, keyPair: IKeyPair) => Promise<any>;
export declare const enum PRODUCTS {
    NODE = 0,
    MATCHER = 1,
}
export declare const enum VERSIONS {
    V1 = 0,
}
export declare function normalizePath(path: any): string;
export declare function processJSON(jsonReadableStream: any): any;
export declare function createFetchWrapper(product: PRODUCTS, version: VERSIONS, pipe?: Function): Function;
export declare function wrapTransactionRequest(TransactionConstructor: ITransactionClassConstructor, remapFunction: (data: IHash<any>) => IHash<any>, callback: (postParams: IHash<any>) => Promise<any>): (data: IHash<any>, keyPair: IKeyPair) => Promise<any>;
