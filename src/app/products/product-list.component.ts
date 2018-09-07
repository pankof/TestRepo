import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductService]
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;
    
    private _listFilter : string = 'cart';;
    public get listFilter() : string {
        return this._listFilter;
    }
    public set listFilter(value : string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    
    filteredProducts: IProduct[];
    products: IProduct[];

    
    constructor(private productService: ProductService){
        
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy: string) : IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        var result = this.products.filter((p: IProduct) => p.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
        return result;
    }

    ngOnInit(): void {
       this.productService.getProducts().subscribe(
           p => {
            this.products = p;
           this.filteredProducts = this.products;
           },
           e => this.errorMessage = <any>e
       );
    }

    OnRatingClicked(message: string) : void{
        alert(message);
    }
}