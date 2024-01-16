export interface signUp {
  name: string;
  email: string;
  password: string;
}
export interface login {
  email: String;
  password: String;
}
export interface payment {
  cardHolder: any;
  name: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

export interface product{
offer: any;
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:number,
  quantity:undefined | number,
  productId:undefined|number,
  discount:number
}
export interface cart{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:number| undefined,
  quantity:undefined | number,
  productId: number,
  userId:number,
  discount:number
}

export interface priceSummary{
  price:number,
  discount:number,
  delivery:number,
  total:number
}

export interface order {

  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: string;
  userName:string;
  id:number|undefined;
  status: string;
  orderedProducts:Array<any>;
  orderOn:Date;

}
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface orderedProduct {
  id: number;
  name: string;
  color: string;
  category: string;
  image: string;
}


