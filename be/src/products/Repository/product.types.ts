export interface IProduct{
    name: string;
    amount: string;
    stock: number;
    image: string;
    // imagePath: string;
    brand:string;
    category:string;
    colors:string[];

}

export interface IOrder{
    name:string;
    image:string;
    noOfProducts:number;
    orderedId: number;
    totalAmount: number;
    color: string;
}

export interface IStatus{
    status: string;
}

