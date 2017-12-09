import { IHash } from '../../../interfaces';
export declare function handleAlias(original: any): any;
export declare function handleAssetId(original: any): any;
export declare function handleRecipient(original: any): any;
export declare function createRemapper(rules: any): (data: IHash<any>) => IHash<any>;
