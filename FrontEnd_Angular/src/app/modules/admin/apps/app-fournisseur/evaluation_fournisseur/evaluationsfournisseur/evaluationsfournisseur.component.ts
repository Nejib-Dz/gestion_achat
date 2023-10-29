

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Evaluation } from 'app/modules/Models/Evaluation';
import { EvaluationFourinsseurService } from './evaluation-fourinsseur.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { ServiceFournisseur } from '../../Fournisseur/fournisseur.service';
import { Fournisseur } from 'app/modules/Models/Fournisseur';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-evaluationsfournisseur',
    templateUrl: './evaluationsfournisseur.component.html',
    styleUrls: ['./evaluationsfournisseur.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
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
        MatDatepickerModule,
        MatMenuModule,
    ],
})
export class EvaluationsfournisseurComponent {
    evaluationForm: FormGroup;
    evaluation: Evaluation[] = [];
    evaluationByIdFournisseur : Evaluation[] = [];
    listEvaluations: any;
    idFournisseur:number;
    fournisseur:Fournisseur;
    //idFournisseur: number = 1;
  @Output() button = new EventEmitter<void>();

    constructor(
        public dialogRef: MatDialogRef<EvaluationsfournisseurComponent>,
        private fb: FormBuilder,
        private change : ChangeDetectorRef,
        private evaluationservice: EvaluationFourinsseurService,
        private fournisseurservice : ServiceFournisseur,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    getColorClass(fiabilite: string, performance: string): string {
        // Vous pouvez ajuster la logique de la fonction en fonction de vos besoins
        if (fiabilite === 'haute' && performance === 'élevée') {
          return 'color-high-and-high'; // Classe pour les deux évaluations élevées
        } else if (fiabilite === 'moyenne' && performance === 'moyenne') {
          return 'color-medium-and-medium'; // Classe pour les deux évaluations moyennes
        } else if (fiabilite === 'basse' || performance === 'faible') {
          return 'color-low-or-low'; // Classe pour l'une des évaluations basse/faible
        } else {
          return 'color-low'; // Par défaut, pas de classe
        }
      }




    ngOnInit(){
        this.evaluationForm = this.fb.group({
            description: ['', Validators.required],
            performance: ['', Validators.required],
            fiabilite: ['', Validators.required],
            fournisseur: [''],

    })



        this.idFournisseur= this.evaluationservice.getFormData();
      this.getListEvaluationByIdFour();


        this.fournisseurservice.getByIdFournisseur(this.idFournisseur)
        .subscribe(res=>{
            this.fournisseur =res
            console.log(res);
            this.evaluationForm.patchValue({
                fournisseur: this.fournisseur
            })

        })

    }
    getListEvaluationByIdFour(){
        this.evaluationservice.listEvaluationByIdFour(this.idFournisseur).subscribe(
            (res) => {

                this.evaluationByIdFournisseur = res;

                this.change.detectChanges();
                console.log('evaluationByIdFournisseur', this.evaluationByIdFournisseur);
            },
            (error) => {
                console.log(error);

            }
        );
    }


    //delete evaluation fournisseur

    DeleteNote(id: number) {
        if (id != undefined && id != null) {
            Swal.fire({
                title: 'Êtes-vous sûr?',
                text: 'Vous ne pourrez pas récupérer cet fournisseur!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui, supprimez-le!',
                cancelButtonText: 'Non, gardez-le',
            }).then((result: any) => {
                if (result.value) {
                    this.evaluationservice.deletEvaluation(id).subscribe(
                        (res) => {
                            // Suppression réussie
                            this.getListEvaluationByIdFour();
                            Swal.fire(
                                'Supprimé!',
                                'Votre fournisseur a été supprimé.',
                                'success'
                            );
                        },
                        (error) => {
                            // Gestion de l'erreur
                            console.error(
                                "Erreur lors de la suppression de l'fournisseur:",
                                error
                            );
                            let errorMessage =
                                "Une erreur est survenue lors de la suppression de l'fournisseur.";

                            // Vérifiez s'il y a des détails spécifiques dans l'objet d'erreur
                            if (error && error.error && error.error.message) {
                                errorMessage = error.error.message;
                            }

                            Swal.fire('Erreur!', errorMessage, 'error');
                        }
                    );
                }
            });
        }
    }


    submitForm() {
       console.log("hello fournisseur");

          if (this.evaluationForm.valid) {

            console.log(this.evaluationForm.value);
              this.evaluationservice.ajouterEvaluation(this.evaluationForm.value,
                 ).subscribe(res =>{
                  console.log(res);

                  this.getListEvaluationByIdFour();
                 },error=>console.error(error)
                 )


            // this.dialogRef.close(this.evaluationForm.value);
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    getAllEvaluationFour() {
        this.evaluationservice.listEvaluation().subscribe(
            (res) => {

                this.evaluation = res;
                /* this.evaluation= this.evaluation.filter(res=>{
                    res.fournisseur.id == this.idFournisseur
                }) */
                this.change.detectChanges();
                console.log('evaluation', this.evaluation);

            },
            (error) => {
                console.log(error);

            }
        );
    }

}
