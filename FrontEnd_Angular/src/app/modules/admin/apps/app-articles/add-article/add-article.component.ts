import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Article } from 'app/modules/Models/Article';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import { InventoryBrand, InventoryCategory, InventoryPagination, InventoryProduct, InventoryTag, InventoryVendor } from 'app/modules/admin/apps/ecommerce/inventory/inventory.types';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { NgIf, NgFor, NgTemplateOutlet, NgClass } from '@angular/common';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
    styleUrls: ['./add-article.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations,
    standalone     : true,
    imports        : [NgIf,MatCardModule, MatProgressBarModule,MatDialogModule,MatRadioModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSortModule, NgFor, NgTemplateOutlet, MatPaginatorModule, NgClass, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatRippleModule],
})
export class AddArticleComponent {
    AddForm: UntypedFormGroup;
    isEditing: boolean;
    isAdding: boolean;
    articles: Article[] = [];
    article: Article;
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private inventoryservice: InventoryService,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any

    ) {
        this.isAdding = data.isAdding;
       // this.isEditing = data.isEditing;
        this.article = data.article;
     }

    ngOnInit() {
        console.log("Adding:",this.isAdding)
        console.log("article:",this.article)
        this.getAllArticles();
        this.AddForm = this._formBuilder.group({
            name             : ['', Validators.required],
            description      : ['',Validators.required],
            brand            : ['',Validators.required],
            quantity            : ['',Validators.required],
            stock            : ['',Validators.required],
            reserved         : ['',Validators.required],
            cost             : ['',Validators.required],
            dateAdded           : ['',Validators.required],
            taxPercent       : ['',Validators.required],
            price            : ['',Validators.required],
            active           : [false,Validators.required],
        });
        if (!this.isAdding) {
            this.AddForm.patchValue({
              name: this.article.name,
              description: this.article.description,
              brand: this.article.brand,
              quantity: this.article.quantity,
              stock: this.article.stock,
              reserved: this.article.reserved,
              cost: this.article.cost,
              dateAdded: this.article.dateAdded,
              taxPercent: this.article.taxPercent,
              price: this.article.price,
              active: this.article.active,

            });
          }
    }
    getAllArticles() {
        this.inventoryservice.ListOfArticles().subscribe((res) => {
            this.articles = res
            console.log('articles', this.articles)

        }, (error) => {
       console.log(error)
    })
    }
    onFormSubmit() {
        if (this.isAdding) {
            this.inventoryservice.AddArticle(this.AddForm.value).subscribe((res) => {

                console.log(res)
                this.dialog.closeAll();
               // this.getAllArticles();
               // window.location.reload();
         },(error)=> {
            console.log(error)
         } )
        } else if (!this.isAdding) {
            console.log('enetr edit article cnd');
            const article: Article = this.AddForm.value
            article.id = this.article.id

        this.inventoryservice.EditArticle(this.AddForm.value).subscribe((res) => {

            console.log(res)
            this.dialog.closeAll();
           // this.getAllArticles();
           // window.location.reload();
     },(error)=> {
        console.log(error)
     } )
        }

    }
}
