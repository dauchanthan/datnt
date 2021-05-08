import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/product.module';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private producService: ProductService,
    private router: Router
  ) {}
  public productId: any = {};
  public productImage: IProduct[] = [];
  ngOnInit(): void {
    this.getproductDetail();
    this.getproductImg();
  }
  public getproductDetail() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params.id;
      this.productId = this.producService.getProduct(id).subscribe(
        (param: IProduct) => {
          this.productId = param;
          console.log(this.productId);
        },
        (error) => {
          this.producService.handleError(error);
        }
      );
    });
  }
  public getproductImg() {
    this.producService.getProductImg().subscribe((res: any) => {
      // this.productImage=res.data.slice(0, 3);
      this.productImage = Object.values(res.data.slice(0, 3));
      console.log(this.productImage);
    });
  }

  public byProduct(product) {
    console.log(product);

    localStorage.setItem('localCart', JSON.stringify(product));
    // this.router.navigate(['/product', '/product.id', 'by']);
  }
}
