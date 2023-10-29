import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    NgClass,
    NgFor,
    NgIf,
    NgTemplateOutlet,
} from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import { DevisServiceService } from './devis-service.service';
import { DevisDialogComponent } from '../devis-dialog/devis-dialog.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-devis',
    templateUrl: './devis.component.html',
    styleUrls: ['./devis.component.scss'],
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
export class DevisComponent implements OnInit {
    devis: any;
    searchInputControl: UntypedFormControl = new UntypedFormControl();

    constructor(
        private devisService: DevisServiceService,
        private _dialog: MatDialog,
        private cdRef: ChangeDetectorRef
    ) {}
    getDevis() {
        this.devisService.listDevis().subscribe(
            (res) => {
                this.devis = res;
                console.log(this.devis);
                this.cdRef.detectChanges();
            },
            (error) => {
                console.log(error);
            }
        );
    }
    openAddDialog() {
        console.log('opendialog');
        const dialogRef = this._dialog.open(DevisDialogComponent, {
            data: { isAdding: true },
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                }
            },
        });
    }
    openEditDialog(devis: any) {
        console.log('opendialog');
        const dialogRef = this._dialog.open(DevisDialogComponent, {
            data: { isEditing: true, devis },
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                }
            },
        });
    }
    ngOnInit() {
        this.getDevis();
    }
    deleteDevis(id: number) {
        if (id != undefined && id != null) {
            Swal.fire({
                title: 'Êtes-vous sûr?',
                text: 'Vous ne pourrez pas récupérer cet devis!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui, supprimez-le!',
                cancelButtonText: 'Non, gardez-le',
            }).then((result: any) => {
                if (result.value) {
                    this.devisService.deleteDevis(id).subscribe(
                        (res) => {
                            // Suppression réussie
                            this.getDevis();
                            Swal.fire(
                                'Supprimé!',
                                'Votre devis a été supprimé.',
                                'success'
                            );
                        },
                        (error) => {
                            // Gestion de l'erreur
                            console.error(
                                'Erreur lors de la suppression du devis:',
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
}
