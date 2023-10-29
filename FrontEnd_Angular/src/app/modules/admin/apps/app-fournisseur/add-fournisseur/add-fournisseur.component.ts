import { Evaluation } from './../../../../Models/Evaluation';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatCheckboxChange,
    MatCheckboxModule,
} from '@angular/material/checkbox';
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
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogModule,
} from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { NgIf, NgFor, NgTemplateOutlet, NgClass, CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Fournisseur } from 'app/modules/Models/Fournisseur';
import { ServiceFournisseur } from '../Fournisseur/fournisseur.service';
import { MatMenuModule } from '@angular/material/menu';
import {intlTelInput} from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
import { EvaluationsfournisseurComponent } from '../evaluation_fournisseur/evaluationsfournisseur/evaluationsfournisseur.component';
import { EvaluationFourinsseurService } from '../evaluation_fournisseur/evaluationsfournisseur/evaluation-fourinsseur.service';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
    selector: 'app-add-fournisseur',
    templateUrl: './add-fournisseur.component.html',
    styleUrls: ['./add-fournisseur.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        CommonModule,
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
        MatDatepickerModule,
        MatMenuModule,
       EvaluationsfournisseurComponent,

    ]
})
export class AddFournisseurComponent {
    AddForniss: UntypedFormGroup;
    evaluationForm :  UntypedFormGroup;
    isEditing: boolean;
    isAdding: boolean;
    fournisseurs: Fournisseur[] = [];
    fournisseur: Fournisseur;
   isNoteOpen : Boolean=false;
   backgroundColor = '';
   mobileQuery: MediaQueryList;
   isMobile: boolean = false;
    constructor(
        private el: ElementRef,
        private mediaMatcher: MediaMatcher,
        private _formBuilder: UntypedFormBuilder,
        private inventoryservice: ServiceFournisseur,
        private evaluationservice : EvaluationFourinsseurService,

        @Inject(MAT_DIALOG_DATA) public data: any ) {
            this.mobileQuery = mediaMatcher.matchMedia('(max-width: 600px)');
        this.isAdding = data.isAdding;
        this.isEditing = data.isEditing;
        this.fournisseur = data.fournisseur;
    }

    addNewNote(){
        this.isNoteOpen=!this.isNoteOpen;
        this.evaluationservice.setFormData(this.fournisseur.id)
    }
    ngOnInit() {

        console.log('Adding:', this.isAdding);
        console.log('fournisseur:', this.fournisseurs);
        this.getAllFournisseur();
        this.AddForniss = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            tele: ['', Validators.required],
            country: ['', Validators.required],
        });
        if (this.isEditing) {
            this.AddForniss.patchValue({
                name: this.fournisseur.name,
                email: this.fournisseur.email,
                tele: this.fournisseur.tele,
                country: this.fournisseur.country,
            });
        }
    }
    ngDoCheck(){
      //  this.evaluationForm = this.evaluationservice.getFormData();
    }
    getAllFournisseur() {
        this.inventoryservice.listFournisseur().subscribe(
            (res) => {
                this.fournisseurs = res;
                console.log('fournisseurs', this.fournisseurs);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    onFormSubmit() {
        if (this.isAdding) {
            this.inventoryservice
                .ajouterFournisseur(this.AddForniss.value)
                .subscribe(
                    (res) => {
                        console.log(res);
                        this.getAllFournisseur();

                       // window.location.reload();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } else if (this.isEditing) {
            const fournisseur: Fournisseur = this.AddForniss.value;
            fournisseur.id = this.fournisseur.id;
            console.log('evaluationForm',fournisseur)
            this.inventoryservice
                .updateFournisseur(fournisseur)
                .subscribe(
                    (res) => {
                        console.log(res);
                        this.getAllFournisseur();

                    },
                    (error) => {
                        console.log(error);
                    }
                );

        }
    }
}
