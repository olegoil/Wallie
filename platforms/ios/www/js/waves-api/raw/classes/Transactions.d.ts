export interface ITransactionClass {
    prepareForAPI(privateKey: string): Promise<any>;
    getSignature(privateKey: string): Promise<string>;
    getBytes(): Promise<Uint8Array>;
    getExactBytes(fieldName: string): Promise<Uint8Array>;
}
export interface ITransactionClassConstructor {
    new (hashMap: any): ITransactionClass;
}
declare const _default: {
    IssueTransaction: ITransactionClassConstructor;
    TransferTransaction: ITransactionClassConstructor;
    ReissueTransaction: ITransactionClassConstructor;
    BurnTransaction: ITransactionClassConstructor;
    LeaseTransaction: ITransactionClassConstructor;
    CancelLeasingTransaction: ITransactionClassConstructor;
    CreateAliasTransaction: ITransactionClassConstructor;
};
export default _default;
