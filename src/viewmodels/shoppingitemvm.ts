import { ProductVm } from "./productvm";

export class ShoppingItemVm {

    constructor(data: any | null) {
        if (data) {
            this.Key = data.key;
            this.Name = data.name;
            this.Description = data.description;
            this.Important = data.important;
            this.Favorite = data.favorite;
        }
    }
    static fromProductItem(data: ProductVm): ShoppingItemVm {
        let item = new this({ name: data.Name, description: "", important: false, favorite: false });
        item.Price = data.Price;
        item.Quantity = data.Quantity;
        item.Url = data.Url;
        return item;
    }
    Key: string;
    Name: string;
    Description: string;
    Price: string;
    Quantity: string;
    Url: string;
    Important: boolean;
    Favorite: boolean;
}