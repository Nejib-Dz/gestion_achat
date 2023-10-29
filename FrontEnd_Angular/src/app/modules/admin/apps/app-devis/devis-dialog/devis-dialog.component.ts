import {
    NgIf,
    DatePipe,
    NgFor,
    NgTemplateOutlet,
    NgClass,
    AsyncPipe,
    CurrencyPipe,
} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { TableModule } from 'primeng/table';
import { DevisServiceService } from '../devis/devis-service.service';
import { CommandeServiceService } from '../../app-commande/commande/commande-service.service';

@Component({
    selector: 'app-devis-dialog',
    templateUrl: './devis-dialog.component.html',
    styleUrls: ['./devis-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        NgIf,
        DatePipe,
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
    ],
})
export class DevisDialogComponent {
    AddForm: UntypedFormGroup;
    isEditing: boolean;
    isAdding: boolean;
    devis: any;
    commandes:any;
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private devisService: DevisServiceService,
        private commandeService :CommandeServiceService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.isAdding = data.isAdding;
        this.isEditing = data.isEditing;
        this.devis = data.devis;
    }
    ngOnInit(): void {
        this.commandeService.listCommands().subscribe(res =>{
            this.commandes = res;
        },(error)=>{
            console.log(error);
        })
        this.AddForm = this._formBuilder.group({
            dateCreeDevis: ['', Validators.required],
            dateValidDevis: ['', Validators.required],
            montanTotal: ['', Validators.required],
            commandes: [[], Validators.required],

        });
        if (this.isEditing) {
            this.AddForm.patchValue({
                dateCreeDevis: this.devis.dateCreeDevis,
                dateValidDevis: this.devis.dateValidDevis,
                montanTotal: this.devis.montanTotal,
                commandes: this.devis.commandes,
            });
        }
    }

    onFormSubmit() {
        if (this.isAdding) {
            this.devisService.ajouterDevis(this.AddForm.value).subscribe(
                (res) => {
                    console.log(res);

                    // window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } else if (this.isEditing) {
            const devis: any = this.AddForm.value;
            devis.idDevis = this.devis.idDevis;

            this.devisService.updateDevis(devis).subscribe(
                (res) => {
                    console.log(res);

                    // window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
}
