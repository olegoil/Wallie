import { IHash, IWavesConfig } from '../interfaces';
import { ITransactionClassConstructor } from './classes/Transactions';
import Seed from './classes/Seed';
import { INodeAPIv1 } from './api/node/index';
export interface IAPIVersions {
    Node: {
        v1: INodeAPIv1;
    };
}
export interface IWavesAPI {
    Currency: any;
    Seed: typeof Seed;
    Transactions: IHash<ITransactionClassConstructor>;
    constants: IHash<any>;
    crypto: IHash<any>;
    request: IHash<any>;
    tools: IHash<any>;
    API: IAPIVersions;
}
export declare function create(config: IWavesConfig): IWavesAPI;
export declare const MAINNET_CONFIG: IWavesConfig;
export declare const TESTNET_CONFIG: IWavesConfig;
