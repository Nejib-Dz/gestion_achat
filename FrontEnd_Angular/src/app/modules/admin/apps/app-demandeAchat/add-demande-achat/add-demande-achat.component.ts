import { NgIf, NgFor, NgTemplateOutlet, NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {  MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { DemandeAchat } from '../demandeAchatComponent/demande-achat';
import { InventoryService } from '../../ecommerce/inventory/inventory.service';
import { DemandeAchatService } from '../demandeAchatComponent/demande-achat.service';
import { Article } from 'app/modules/Models/Article';
import { Role, User } from 'app/core/user/user.types';
import { AuthService } from 'app/core/auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-add-demande-achat',
    templateUrl: './add-demande-achat.component.html',
    styleUrls: ['./add-demande-achat.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        MatCardModule,
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
        MatMenuModule,
        
    ],
})
export class AddDemandeAchatComponent {
    AddForm: UntypedFormGroup;
    demandes: DemandeAchat[] = [];
    articles: Article[] = [];
    isAdding: Boolean;
    isEditing: Boolean;
    roles: Role[];
    articlescontrols = new FormControl('');
    user!: User;
    demande_achat: DemandeAchat;
    backgroundColor = 'rgba(0, 0, 255, 0.5)';
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private inventoryservice: InventoryService,
        private demandeAchatService: DemandeAchatService,
        private authservice: AuthService,
        private dialog: MatDialog,
        //Added
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        //Added
        this.isAdding = data.isAdding;
        this.isEditing = data.isEditing;
        this.demande_achat = data.achat;
        console.log(this.demande_achat);
    }

    //Added
    getAllArticles() {
        this.inventoryservice.ListOfArticles().subscribe(
            (res) => {
                this.articles = res;
                console.log('articles', this.articles);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    ngOnInit() {
        let email = localStorage.getItem('email');
        this.authservice.FindUserByEmail(email).subscribe(
            (res) => {
                this.user = res;
                this.roles = this.user.roles;
                console.log(this.user);
            },
            (error) => {
                console.log(error);
            }
        );
        this.getAllArticles();
        this.getAllDemands();
        this.AddForm = this._formBuilder.group({
            dateDemande: ['', Validators.required],
            dateApprobation: ['', Validators.required],
            qteDemandee: ['', Validators.required],
            qteApprouvee: ['', Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required],
            delais: ['', Validators.required],
            etat: ['', Validators.required],
            userDemandeur: ['', Validators.required],
            motifRejet: ['', Validators.required],
            articles: [[], Validators.required],
        });
        //Added
        if (this.isEditing) {
            this.AddForm.patchValue({
                dateDemande: this.demande_achat.dateDemande,
                dateApprobation: this.demande_achat.dateApprobation,
                qteDemandee: this.demande_achat.qteDemandee,
                qteApprouvee: this.demande_achat.qteApprouvee,
                name: this.demande_achat.name,
                description: this.demande_achat.description,
                delais: this.demande_achat.delais,
                etat: this.demande_achat.etat,
                motifRejet: this.demande_achat.delais,
                articles: this.demande_achat.articles,
            });

        }
    }
    //Added
    getAllDemands() {
        this.demandeAchatService.listDemandeAchat().subscribe(
            (res) => {
                this.demandes = res;
                console.log('demandes', this.demandes);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    //Added
    onFormSubmit() {
        console.log(this.AddForm.value);
        this.AddForm.patchValue({ userDemandeur: this.user });
        console.log(this.AddForm.value);
        if (this.isAdding) {
            this.demandeAchatService
                .ajouterDemandeAchat(this.AddForm.value)
                .subscribe(
                    (res) => {
                        console.log(res);
                        this.getAllDemands();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } else if (this.isEditing) {
            const demand: DemandeAchat = this.AddForm.value;
            demand.id = this.demande_achat.id;
            this.demandeAchatService.updateDemandeAchat(demand).subscribe(
                (res) => {
                    console.log(res);
                    this.getAllDemands();

                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
}
