import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/product/product';
import { ApiService } from 'src/app/services/api.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  isLoading = false;
  categoryList = ['Fruits', 'Vegetables', 'Electronics'];
  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];
  productInitialValues: Product = {
    productName: '',
    category: this.categoryList[0],
    freshness: this.freshnessList[0],
    price: 0,
    description: '',
    date: '',
  };

  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private alertDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: [this.productInitialValues.productName, Validators.required],
      category: [this.productInitialValues.category, Validators.required],
      date: [this.productInitialValues.date, Validators.required],
      freshness: [this.productInitialValues.freshness, Validators.required],
      price: ['', Validators.required],
      description: [this.productInitialValues.description, Validators.required],
    });
  }

  addProduct() {
    console.log(this.productForm.value);
    this.isLoading = true;

    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value).subscribe({
        next: () => {
          // alert('Product added successfully');
          // this.productForm.reset(); // unnecessary bc the dialog will close
          this.dialogRef.close('save');
          // open success alert
          this.alertDialog.open(AlertComponent, {
            width: '30%',
            data: {
              title: 'Success!',
              message: 'Product added successfully',
              closeButton: false,
            },
          });
        },
        error: () => {
          this.alertDialog.open(AlertComponent, {
            width: '30%',
            data: {
              title: 'Error!',
              message: 'Error while adding the product',
              closeButton: false,
            },
          });
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
