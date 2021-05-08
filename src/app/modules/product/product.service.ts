import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product.module';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private productURL = 'http://localhost:8000/api/products';

  public byProduct$ = new BehaviorSubject<number>(0);
  public totalProduct = 0;
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productURL).pipe();
  }

  getProduct(id: string): Observable<IProduct> {
    const url = `${this.productURL}/${id}`;
    return this.http.get<IProduct>(url).pipe();
  }
  getProductImg() {
    return this.http.get(this.productURL);
  }
  handleError(err: any) {
    if (err.error instanceof Error) {
      console.log(err.error.message);
    } else {
      console.log(err.status);
    }
  }
  setTotalProduct(total: number) {
    this.totalProduct = total;
    this.byProduct$.next(total);
    // console.log('total ='+total);
  }

  getTotalProduct() {
    return this.byProduct$;
  }

 
}
