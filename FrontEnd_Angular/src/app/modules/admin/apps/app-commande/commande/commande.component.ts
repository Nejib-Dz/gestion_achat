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
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormControl,
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

import { CommandeDialogComponent } from '../commande-dialog/commande-dialog.component';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { CommandeServiceService } from './commande-service.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-commande',
    templateUrl: './commande.component.html',
    styleUrls: ['./commande.component.scss'],
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
        MatMenuModule,
    ],
})
export class CommandeComponent implements OnInit {
    commands: any;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    constructor(
        private commandeService: CommandeServiceService,
        private _dialog: MatDialog,
        private cdRef: ChangeDetectorRef
    ) {}
    getCommands() {
        this.commandeService.listCommands().subscribe(
            (res) => {
                this.commands = res;
                console.log(this.commands);
                this.cdRef.detectChanges();
            },
            (error) => {
                console.log(error);
            }
        );
    }
    openAddDialog() {
        console.log('opendialog');
        const dialogRef = this._dialog.open(CommandeDialogComponent, {
            data: { isAdding: true },
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {

                   console.log(val)
                    this.getCommands();

            },
        });
    }
    openEditDialog(command: any) {
        console.log('opendialog');
        const dialogRef = this._dialog.open(CommandeDialogComponent, {
            data: { isEditing: true, command },
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
              
               console.log(val)
                    this.getCommands();

            },
        });
    }
    ngOnInit() {
        this.getCommands();
    }

    deleteCommande(id: number) {
        if (id != undefined && id != null) {
            Swal.fire({
                title: 'Êtes-vous sûr?',
                text: 'Vous ne pourrez pas récupérer cet commande!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui, supprimez-le!',
                cancelButtonText: 'Non, gardez-le',
            }).then((result: any) => {
                if (result.value) {
                    this.commandeService.deleteCommand(id).subscribe(
                        (res) => {
                            // Suppression réussie
                            this.getCommands();
                            Swal.fire(
                                'Supprimé!',
                                'Votre commande a été supprimé.',
                                'success'
                            );
                        },
                        (error) => {
                            // Gestion de l'erreur
                            console.error(
                                'Erreur lors de la suppression du commande:',
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
