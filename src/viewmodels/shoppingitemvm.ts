export class ShoppingItemVm {

    constructor(data: any){
        this.Name = data.name;
        this.Description = data.description;
        this.Important = data.important;
        this.Favorite = data.favorite;
    }
    Name: string;
    Description: string;
    Price: string;
    Quantity: string;
    Url: string;
    Important: boolean;
    Favorite: boolean;
}