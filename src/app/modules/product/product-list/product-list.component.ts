import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product.module';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  showProduct: IProduct[] = [];
  fileOption = 'show';
  page: number = 0;
  productDisplay: IProduct[];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProduct();
  }
  // onHandleCard(event) {}
  loadProduct() {
    this.productService.getProducts().subscribe(
      (product: any) => {
        this.showProduct = product.data;
        console.log(this.showProduct);
      },
      (error) => {
        this.productService.handleError(error);
      }
    );
  }

  // handlePageChange(page: number) {
  //   this.page = page;
  //   this.productDisplay = this.showProduct.slice(
  //     this.page * 8,
  //     8 * (this.page + 1)
  //   );
  // }
}
