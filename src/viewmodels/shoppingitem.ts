import { ProductVm } from "./productvm";

export class ShoppingItemVm {
    Key: string;
    Name: string;
    Description: string;
    Price: string;
    Quantity: string;
    Url: string;
    State: string;
    Important: boolean;
    Favorite: boolean;

    constructor(data: any | null) {
        if (data) {
            this.Key = data.Key;
            this.Name = data.Name;
            this.Description = data.Description;
            this.State = data.State;
            this.Important = data.Important;
            this.Favorite = data.Favorite;
        }
    }

    static fromProductItem(data: ProductVm, key: string): ShoppingItemVm {
        const item = new this({ Key: key, Name: data.Name, Description: '', State: 'pending', Important: false, Favorite: false });
        item.Price = data.Price;
        item.Quantity = data.Quantity;
        item.Url = data.Url;
        return item;
    }
}
