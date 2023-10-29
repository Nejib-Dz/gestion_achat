import {
    NgIf,
    NgFor,
    NgTemplateOutlet,
    NgClass,
    AsyncPipe,
    CurrencyPipe,
} from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
    Inject,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
    MatCheckboxChange,
    MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import {
    MatDialog,
    MatDialogModule,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Article } from 'app/modules/Models/Article';
import {
    Observable,
    Subject,
    takeUntil,
    debounceTime,
    switchMap,
    map,
    merge,
} from 'rxjs';
import { AddArticleComponent } from '../add-article/add-article.component';
import { InventoryService } from '../../ecommerce/inventory/inventory.service';
import {
    InventoryProduct,
    InventoryBrand,
    InventoryCategory,
    InventoryTag,
    InventoryPagination,
    InventoryVendor,
} from '../../ecommerce/inventory/inventory.types';
import { MatTableModule } from '@angular/material/table';
import { TableModule } from 'primeng/table';
import { User } from 'app/core/user/user.types';
import { AuthService } from 'app/core/auth/auth.service';
import Swal from 'sweetalert2';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        NgIf,
        TableModule,
        MatCardModule,
        MatTableModule,
        MatProgressBarModule,
        MatDialogModule,
        MatRadioModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSortModule,
        NgFor,
        NgTemplateOutlet,
        MatPaginatorModule,
        NgClass,
        MatSlideToggleModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        MatRippleModule,
        AsyncPipe,
        CurrencyPipe,
        MatMenuModule
    ],
})
export class ArticleComponent implements OnInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    // displayedColumns: string[] = [];
    products$: Observable<InventoryProduct[]>;
    IsOpen = false;
    currentUser!: User;
    currentEmail: string;
    brands: InventoryBrand[];
    categories: InventoryCategory[];
    filteredTags: InventoryTag[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: InventoryPagination;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedProduct: InventoryProduct | null = null;
    selectedArticle = new Article();
    // selectedProductForm: UntypedFormGroup;
    tags: InventoryTag[];
    tagsEditMode: boolean = false;
    vendors: InventoryVendor[];
    articles: Article[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    displayedColumns = ['name', 'description', 'active', 'price', 'stock'];

    // Create the selected product form
    selectedProductForm: UntypedFormGroup = this._formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        brand: ['', Validators.required],
        quantity: ['', Validators.required],
        vendor: ['', Validators.required],
        stock: ['', Validators.required],
        reserved: ['', Validators.required],
        cost: ['', Validators.required],
        dateAdded: ['', Validators.required],
        taxPercent: ['', Validators.required],
        price: ['', Validators.required],
        active: [false, Validators.required],
    });
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: UntypedFormBuilder,
        private _inventoryService: InventoryService,
        private _dialog: MatDialog,
        private cdRef: ChangeDetectorRef,
        private authservice: AuthService
    ) {
        this.currentEmail = this.authservice.email;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    //Added
    deleteArticle(id: number) {
        if (id != undefined && id != null) {
            Swal.fire({
                title: 'Êtes-vous sûr?',
                text: 'Vous ne pourrez pas récupérer cet article!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui, supprimez-le!',
                cancelButtonText: 'Non, gardez-le',
            }).then((result: any) => {
                if (result.value) {
                    this._inventoryService.DeleteArticle(id).subscribe(
                        (res) => {
                            // Suppression réussie
                            this.getAllArticles();
                            Swal.fire(
                                'Supprimé!',
                                'Votre article a été supprimé.',
                                'success'
                            );
                        },
                        (error) => {
                            // Gestion de l'erreur
                            console.error(
                                'Erreur lors de la suppression du article:'
                            );
                            Swal.fire(
                                'Erreur!',
                                'Une erreur est survenue lors de la suppression.',
                                'error'
                            );
                        }
                    );
                }
            });
        }
    }
    //Added
    openAddDialog() {
        console.log('opendialog');
        const dialogRef = this._dialog.open(AddArticleComponent, {
            data: { isAdding: true },
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                    this.getAllArticles();

            },
        });
    }
    //Added
    openEditDialog(article: Article) {
        console.log('opendialog');
        const dialogRef = this._dialog.open(AddArticleComponent, {
            data: { isEditing: false, article },
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                    this.getAllArticles();

            },
        });
    }
    //Added
    getAllArticles() {
        this._inventoryService.ListOfArticles().subscribe(
            (res) => {
                this.articles = res;
                console.log('articles', this.articles);
                this.cdRef.detectChanges();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    // cette mehtode s'ouvre lors de chargement du composant
    ngOnInit(): void {
        //Added
        this.getAllArticles();
        //Added
        this.authservice.FindUserByEmail(this.currentEmail).subscribe((res) => {
            this.currentUser = res;
            console.log(this.currentUser);
        });
    }


    /**
     * After view init
     */
    ngAfterViewInit(): void {

    }


    /**
     * Toggle product details
     *
     * @param productId
     */
    toggleDetails(articleId: number): void {
        // If the product is already selected...
        if (this.selectedArticle && this.selectedArticle.id === articleId) {
            // Close the details
            this.closeDetails();
            return;
        }

        // Get the product by id
        this._inventoryService
            .findArticleById(articleId)
            .subscribe((article) => {
                // Set the selected product
                this.selectedArticle = article;

                // Fill the form
                this.selectedProductForm.patchValue(article);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * Close the details
     */
    closeDetails(): void {
        this.selectedArticle = null;
    }

    /**
     * Cycle through images of selected product
     */
    cycleImages(forward: boolean = true): void {
        // Get the image count and current image index
        const count = this.selectedProductForm.get('images').value.length;
        const currentIndex =
            this.selectedProductForm.get('currentImageIndex').value;

        // Calculate the next and previous index
        const nextIndex = currentIndex + 1 === count ? 0 : currentIndex + 1;
        const prevIndex = currentIndex - 1 < 0 ? count - 1 : currentIndex - 1;

        // If cycling forward...
        if (forward) {
            this.selectedProductForm
                .get('currentImageIndex')
                .setValue(nextIndex);
        }
        // If cycling backwards...
        else {
            this.selectedProductForm
                .get('currentImageIndex')
                .setValue(prevIndex);
        }
    }

    /**
     * Toggle the tags edit mode
     */
    toggleTagsEditMode(): void {
        this.tagsEditMode = !this.tagsEditMode;
    }

    /**
     * Filter tags
     *
     * @param event
     */
    filterTags(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the tags
        this.filteredTags = this.tags.filter((tag) =>
            tag.title.toLowerCase().includes(value)
        );
    }

    /**
     * Filter tags input key down event
     *
     * @param event
     */
    filterTagsInputKeyDown(event): void {
        // Return if the pressed key is not 'Enter'
        if (event.key !== 'Enter') {
            return;
        }

        // If there is no tag available...
        if (this.filteredTags.length === 0) {
            // Create the tag
            this.createTag(event.target.value);

            // Clear the input
            event.target.value = '';

            // Return
            return;
        }

        // If there is a tag...
        const tag = this.filteredTags[0];
        const isTagApplied = this.selectedProduct.tags.find(
            (id) => id === tag.id
        );

        // If the found tag is already applied to the product...
        if (isTagApplied) {
            // Remove the tag from the product
            this.removeTagFromProduct(tag);
        } else {
            // Otherwise add the tag to the product
            this.addTagToProduct(tag);
        }
    }

    /**
     * Create a new tag
     *
     * @param title
     */
    createTag(title: string): void {
        const tag = {
            title,
        };

        // Create tag on the server
        this._inventoryService.createTag(tag).subscribe((response) => {
            // Add the tag to the product
            this.addTagToProduct(response);
        });
    }

    /**
     * Update the tag title
     *
     * @param tag
     * @param event
     */
    updateTagTitle(tag: InventoryTag, event): void {
        // Update the title on the tag
        tag.title = event.target.value;

        // Update the tag on the server
        this._inventoryService
            .updateTag(tag.id, tag)
            .pipe(debounceTime(300))
            .subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Delete the tag
     *
     * @param tag
     */
    deleteTag(tag: InventoryTag): void {
        // Delete the tag from the server
        this._inventoryService.deleteTag(tag.id).subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Add tag to the product
     *
     * @param tag
     */
    addTagToProduct(tag: InventoryTag): void {
        // Add the tag
        this.selectedProduct.tags.unshift(tag.id);

        // Update the selected product form
        this.selectedProductForm
            .get('tags')
            .patchValue(this.selectedProduct.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove tag from the product
     *
     * @param tag
     */
    removeTagFromProduct(tag: InventoryTag): void {
        // Remove the tag
        this.selectedProduct.tags.splice(
            this.selectedProduct.tags.findIndex((item) => item === tag.id),
            1
        );

        // Update the selected product form
        this.selectedProductForm
            .get('tags')
            .patchValue(this.selectedProduct.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle product tag
     *
     * @param tag
     * @param change
     */
    toggleProductTag(tag: InventoryTag, change: MatCheckboxChange): void {
        if (change.checked) {
            this.addTagToProduct(tag);
        } else {
            this.removeTagFromProduct(tag);
        }
    }

    /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */
    shouldShowCreateTagButton(inputValue: string): boolean {
        return !!!(
            inputValue === '' ||
            this.tags.findIndex(
                (tag) => tag.title.toLowerCase() === inputValue.toLowerCase()
            ) > -1
        );
    }

    /**
     * Create product
     */

    createProduct(): void {
        // Create the product
        this._inventoryService.createProduct().subscribe((newProduct) => {
            // Go to new product
            this.selectedProduct = newProduct;

            // Fill the form
            this.selectedProductForm.patchValue(newProduct);

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Update the selected product using the form data
     */
    updateSelectedProduct(): void {
        // Get the product object
        const product = this.selectedProductForm.getRawValue();

        // Remove the currentImageIndex field
        delete product.currentImageIndex;

        // Update the product on the server
        this._inventoryService
            .updateProduct(product.id, product)
            .subscribe(() => {
                // Show a success message
                this.showFlashMessage('success');
            });
    }

    /**
     * Delete the selected product using the form data
     */
    deleteSelectedProduct(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete product',
            message:
                'Are you sure you want to remove this product? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Get the product object
                const product = this.selectedProductForm.getRawValue();

                // Delete the product on the server
                this._inventoryService
                    .deleteProduct(product.id)
                    .subscribe(() => {
                        // Close the details
                        this.closeDetails();
                    });
            }
        });
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
