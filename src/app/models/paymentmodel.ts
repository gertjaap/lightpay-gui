export class PaymentModel {
    id : string;
    amountUSD? : number;
    amountCryptos? : PaymentModelCryptoAmount[];
}

export class PaymentModelCryptoAmount {
    symbol: string;
    amount: number;
}
