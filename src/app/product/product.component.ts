import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from './product';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

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

  constructor(private api: ApiService, public dialog: MatDialog) {}

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
    const product = this.dataSource.data.find((product) => product.id === id);
    console.log(product);
    this.dialog.open(DialogComponent, {
      panelClass: 'dialog-container',
      width: '30%',
      data: {
        isEdit: true,
        product: this.dataSource.data.find((product) => product.id === id),
      },
    });
  }

  handleClickDelete(id: number) {
    // TODO add confirm dialog
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
