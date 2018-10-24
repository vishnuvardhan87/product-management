import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string ='Product List';
  imageWidth: number =50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage ='';

  _listFilter: string;
  get listFilter(): string{
    return this._listFilter;
  }

  set listFilter(value: string){
    this._listFilter = value;
    this.filteredproducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredproducts: IProduct[];
  products: IProduct[];
  constructor(private productService: ProductService) { 
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products,
        this.filteredproducts = this.products;
      },
      error => this.errorMessage = <any>error
    )
  }

  toggleImage():void{
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product:IProduct) =>
          product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)
  }

  onRatingClicked(message: string): void{
    this.pageTitle = 'Product List ' + message;
  }

}
