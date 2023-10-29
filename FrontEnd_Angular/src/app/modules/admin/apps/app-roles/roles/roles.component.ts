import { NgFor, DecimalPipe, NgIf, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import { Role } from 'app/core/user/user.types';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TableModule } from 'primeng/table';
import { AddRoleComponent } from '../add-role/add-role.component';
import {
    UntypedFormControl,
    FormControl,
    ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RouterOutlet,
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
        ReactiveFormsModule,
    ],
})
export class RolesComponent {
    roles: Role[] = [];
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    constructor(
        private userService: UserService,
        private _dialog: MatDialog,
        private cdRef: ChangeDetectorRef
    ) {}
    getRoles() {
        this.userService.GetRoles().subscribe(
            (res) => {
                this.roles = res;
                console.log(this.roles);
                this.cdRef.detectChanges();
            },
            (error) => {
                console.log(error);
            }
        );
    }
    deleteRole(id: number) {
        if (id != undefined && id != null) {
            Swal.fire({
                title: 'Êtes-vous sûr?',
                text: 'Vous ne pourrez pas récupérer cet role!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui, supprimez-le!',
                cancelButtonText: 'Non, gardez-le',
            }).then((result: any) => {
                if (result.value) {
                    this.userService.deleteRole(id).subscribe(
                        (res) => {
                            // Suppression réussie
                            this.getRoles();
                            Swal.fire(
                                'Supprimé!',
                                'Votre role a été supprimé.',
                                'success'
                            );
                        },
                        (error) => {
                            // Gestion de l'erreur
                            console.error(
                                "Erreur lors de la suppression de l'role:",
                                error
                            );
                            let errorMessage =
                                "Une erreur est survenue lors de la suppression de l'role.";

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

    openAddDialog() {
        console.log('opendialog');
        const dialogRef = this._dialog.open(AddRoleComponent, {
            data: { isAdding: true },
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                }
            },
        });
    }
    openEditDialog(role: Role) {
        console.log('opendialog');
        const dialogRef = this._dialog.open(AddRoleComponent, {
            data: { isEditing: true, role },
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                }
            },
        });
    }

    ngOnInit() {
        this.getRoles();
    }
}
