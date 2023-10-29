import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    NgForm,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { ApexChart, NgApexchartsModule } from 'ng-apexcharts';
import { DemandeAchatService } from './demande-achat.service';
import {
    InventoryBrand,
    InventoryCategory,
    InventoryPagination,
    InventoryProduct,
    InventoryTag,
    InventoryVendor,
} from '../../ecommerce/inventory/inventory.types';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
    Observable,
    Subject,
    debounceTime,
    map,
    merge,
    switchMap,
    takeUntil,
} from 'rxjs';
import { DemandeAchat } from './demande-achat';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AddArticleComponent } from '../../app-articles/add-article/add-article.component';
import { InventoryService } from '../../ecommerce/inventory/inventory.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddDemandeAchatComponent } from '../add-demande-achat/add-demande-achat.component';
import { TableModule } from 'primeng/table';
import { AuthService } from 'app/core/auth/auth.service';
import { Role, User } from 'app/core/user/user.types';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-demandeachat',
    templateUrl: './demandeachat.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RouterOutlet,
        DatePipe,
        RouterLink,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatButtonToggleModule,
        NgApexchartsModule,
        MatTooltipModule,
        NgFor,
        DecimalPipe,
        FuseAlertComponent,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        MatPaginatorModule,
        NgClass,
        TableModule,
        MatMenuModule,
    ],
})
export class DemandeAchatComponent implements OnInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    roles: Role[];
    products$: Observable<InventoryProduct[]>;
    IsOpen = false;
    brands: InventoryBrand[];
    categories: InventoryCategory[];
    filteredTags: InventoryTag[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: InventoryPagination;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedProduct: InventoryProduct | null = null;
    selectedDemande: DemandeAchat;
    currentDemand : DemandeAchat;
    selectedProductForm: UntypedFormGroup;
    tags: InventoryTag[];
    tagsEditMode: boolean = false;
    vendors: InventoryVendor[];
    achats: DemandeAchat[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    currentUser!: User;
    currentEmail: string;
    IsUser: boolean;
    IsResponsable_Achat: boolean;
    configFormAccept: UntypedFormGroup;
    configFormRefuse: UntypedFormGroup;
   configFormdetails : UntypedFormGroup;
    IsRefuseDialogOpen: Boolean;
    IsAcceptDialogOpen: Boolean;
    result : boolean;
    motifRejet:string='';
    textDesciption : string ='';
    text : string ='';
    object : any;
    lastUpdate: Date;
    loading = true;
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: UntypedFormBuilder,
        private _inventoryService: InventoryService,
        private _dialog: MatDialog,
        private demandeAchatService: DemandeAchatService,
        private cdRef: ChangeDetectorRef,
        private authservice: AuthService,
        private dialog: MatDialog,
    ) {
        this.currentEmail = this.authservice.email;
        this.object = this.demandeAchatService.getObject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    getAllAchats() {
        this.demandeAchatService.listDemandeAchat().subscribe(
            (res) => {

                if (!this.IsUser){
                    this.achats = res;
                    console.log("AllDemandesAchat",this.achats)
                    this.cdRef.detectChanges();
                } else {
                    this.achats =res
                    this.achats = this.achats.filter(achat => achat.userDemandeur.id == this.currentUser.id)
                    console.log('DemandeachatsUser', this.achats);
                    this.cdRef.detectChanges();
                }


                this.cdRef.detectChanges();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    //formilaire details
    openDetailsDialog(achat:DemandeAchat){

        console.log(achat);
          let date :string;
          let quantity :string;
          let _text :string;
         this.result = achat.etat == 'Treatement' ? true:false
         if (achat.etat == 'Accepted'){
          this.text="Date d'approbation :";
          _text = 'Quantite approuvé :';
          date =String(achat.dateApprobation);
          quantity = String(achat.qteApprouvee);
         } else if (achat.etat == 'Refused')
         {this.text="";
         date= '';
         _text="";
         quantity ="";
        }

        if (achat.etat == 'Refused'){
         this.textDesciption = 'Motif Rejet';
        } else if (achat.etat == 'Accepted'){
            this.textDesciption = 'Message ';
        }
        this.configFormdetails = this._formBuilder.group({
            title: ' Demand details',
            message:
            ` <br><p><B>Date de demande: </B> ${String(achat.dateDemande).split("T")[0]}</p><br><p><B>Description :</B> ${achat.description}</p><br><p><B>Quantite demandé :</B> ${achat.qteDemandee}</p><br><p><B>Etat : </B>${achat.etat} </p><br><p><B>${this.result ?"":this.text}</B> ${String(this.result ?' ':date).split("T")[0]}</p><br> <p><B>${this.result ?' ':this.textDesciption+' :'}</B> ${this.result ? ' ':achat.motifRejet} </p><br> <p><B>${this.result ?' ':_text}</B> ${this.result ? ' ':quantity} </p> <br>`,
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:information-circle',
                color: 'primary',
            }),

            dismissible: true,
        });
        console.log(this.currentDemand);
        const dialogRef = this._fuseConfirmationService.openP(
            this.configFormdetails.value
        );
    }
//ouvrire formilaire et fermer
    RefuseConfirmationDialog(achat: DemandeAchat) {
        const dialogRef = this._fuseConfirmationService.open(
            this.configFormRefuse.value
        );

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);

            if(result != undefined && result != 'cancelled'){
                this.RefuseDemand(achat);
            }



        });
    }
    //
    AcceptConfirmationDialog(achat: DemandeAchat) {
        this.demandeAchatService.setQuantity(achat.qteDemandee);
        const dialogRef = this._fuseConfirmationService.open(
            this.configFormAccept.value
        );

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            this.motifRejet = result;
            if(result != undefined && result != 'cancelled'){
                this.AcceptDemand(achat);
            }


        });
    }
    AcceptDemand(demand: DemandeAchat) {
        console.log(demand);
        demand.userApprouvant = this.currentUser;
        demand.motifRejet = this.object.description;
        demand.qteApprouvee = this.object.qt_approuve;
        console.log(demand);
        this.demandeAchatService.validerDemande(demand).subscribe(
            (res) => {
                console.log(res);
                //this.dialog.closeAll();
               this.getAllAchats();
            },
            (error) => console.log(error)
        );
    }
    RefuseDemand(demand: DemandeAchat) {
        demand.userApprouvant = this.currentUser;
        /* The above code is assigning the value of `this.motifRejet` to the `demand.motifRejet`
        property. */
        demand.motifRejet = this.motifRejet;
        console.log(this.motifRejet)
        console.log('edit demand',demand)
        this.demandeAchatService.RefuserDemande(demand).subscribe(
            (res) => {
                console.log(res);
                // this.dialog.closeAll();
               // window.location.reload();
               this.getAllAchats();
            },
            (error) => console.log(error)
        );
    }
    ngDoCheck(){
           this.object = this.demandeAchatService.getObject();
           this.motifRejet = this.demandeAchatService.getMotif_Rejet();
    }

    ngOnInit(): void {



        this.configFormAccept = this._formBuilder.group({
            title: 'Accept Demand',
            message:
                'Are you sure you want to accept this demand?',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:check',
                color: 'primary',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Accept',
                    color: 'primary',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'Cancel',
                }),
                hello: this._formBuilder.group({
                    show: false,
                    label: 'Cancel',
                }),

                save: this._formBuilder.group({
                    show: false,
                    label: 'Confirm',
                    color: 'warn',
                }),
            }),
            dismissible: true,
        });



        this.configFormRefuse = this._formBuilder.group({
            title: 'Refuse demand',
            message:

                'Are you sure you want to refuse this demand ?'


            ,
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation-triangle',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Refuse',
                    color: 'warn',
                }),
                hello: this._formBuilder.group({
                    show: false,
                    label: 'hello',
                    color: 'warn',
                }),
                save: this._formBuilder.group({
                    show: false,
                    label: 'Confirm',
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'Cancel',
                }),
            }),
            dismissible: true,
        });


        this.authservice.FindUserByEmail(this.currentEmail).subscribe((res) => {
            this.currentUser = res;
            this.roles = this.currentUser.roles;
            for (let role of this.roles) {
                if (role.name == 'User') {
                    this.IsUser = true;
                    //   this.cdRef.detectChanges();
                console.log("user logged")

                }
                 else {
                    this.IsResponsable_Achat = true;
                    console.log("Responable_Achat logged")
                }   console.log("hello world");
            }
            console.log(this.currentUser);
        });
        this.getAllAchats();

    }
    //Added
    openformulaire() {
        const dialogRef = this._dialog.open(AddDemandeAchatComponent, {
            data: { isAdding: true },
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                this.dialog.closeAll();
                    this.getAllAchats();

            },
        });
    }
    //Added

    deleteDemand(id: number) {
        if (id != undefined && id != null) {
            Swal.fire({
                title: 'Êtes-vous sûr?',
                text: 'Vous ne pourrez pas récupérer cet dachat!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui, supprimez-le!',
                cancelButtonText: 'Non, gardez-le',
            }).then((result: any) => {
                if (result.value) {
                    this.demandeAchatService.deletDemandeAchat(id).subscribe(
                        (res) => {
                            // Suppression réussie
                            this.getAllAchats();
                            Swal.fire(
                                'Supprimé!',
                                'Votre dachat a été supprimé.',
                                'success'
                            );
                        },
                        (error) => {
                            // Gestion de l'erreur
                            console.error(
                                'Erreur lors de la suppression du dachat:',
                                error
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
    openEditDialog(achat: DemandeAchat) {
        const dialogRef = this._dialog.open(AddDemandeAchatComponent, {
            data: { isEditing: true, achat },
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                this.dialog.closeAll();
               console.log(val)
                    this.getAllAchats();

            },
        });
    }
  /*   LastUpdite : Promise<Date> = new Promise(
        (resolve, reject) => {
          const date = new Date();
          setTimeout(
            () => {
              resolve(date);
            }, 2000
          );
        }
      ); */


    /**
     * After view init
     */
    ngAfterViewInit(): void {}

    /**



    /**
     * Toggle product details
     *
     * @param productId
     */

    // Get the product by id

    /**
     * Close the details
     */

    /**
     * Cycle through images of selected product


    /**
     * Toggle the tags edit mode
     */

    /**
     * Filter tags
     *
     * @param event
     */

    /**
     * Filter tags input key down event
     *
     * @param event
     */

    /**
     * Add tag to the product
     *

    /**
     * Remove tag from the product
     *


    /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */

    /**
     * Create product
     */

    /**
     * Update the selected product using the form data


    /**
     * Delete the selected product using the form data
     */

    /**
     * Show flash message
     */
}
