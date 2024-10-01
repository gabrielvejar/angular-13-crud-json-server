import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from './product';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  productSubscription: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'freshness',
    'price',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>([]);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.subscribeProducts();
    this.api.getProducts();
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  subscribeProducts() {
    this.productSubscription = this.api.products.subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource.data = res;
        // this.products$ = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleClickEdit(id: number) {
    console.log('edit', id);
  }
  handleClickDelete(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: () => {
        // this.api.getProducts();
        this.dataSource.data = this.dataSource.data.filter(
          (product) => product.id !== id
        );
      },
    });
  }
}
