import { NgFor, DecimalPipe, NgIf, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TableModule } from 'primeng/table';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import {
    FormControl,
    ReactiveFormsModule,
    UntypedFormControl,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
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
export class UsersComponent {
    users: User[] = [];
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    constructor(
        private userService: UserService,
        private _dialog: MatDialog,
        private cdRef: ChangeDetectorRef
    ) {}
    getUsers() {
        this.userService.GetUsers().subscribe(
            (res) => {
                this.users = res;
                console.log(this.users);
                this.cdRef.detectChanges();
            },
            (error) => {
                console.log(error);
            }
        );
    }
    deleteUser(id: number) {
        if (id != undefined && id != null) {
            Swal.fire({
                title: 'Êtes-vous sûr?',
                text: 'Vous ne pourrez pas récupérer cet user!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui, supprimez-le!',
                cancelButtonText: 'Non, gardez-le',
            }).then((result: any) => {
                if (result.value) {
                    this.userService.deleteUser(id).subscribe(
                        (res) => {
                            // Suppression réussie
                            this.getUsers();
                            Swal.fire(
                                'Supprimé!',
                                'Votre user a été supprimé.',
                                'success'
                            );
                        },
                        (error) => {
                            // Gestion de l'erreur
                            console.error(
                                "Erreur lors de la suppression de l'user:",
                                error
                            );
                            let errorMessage =
                                "Une erreur est survenue lors de la suppression de l'user.";

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
        const dialogRef = this._dialog.open(AddUserComponent, {
            data: { isAdding: true },
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getUsers();
                }
            },
        });
    }
    openEditDialog(user: User) {
        console.log('opendialog');
        const dialogRef = this._dialog.open(AddUserComponent, {
            data: { isEditing: true, user },
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getUsers();
                }
            },
        });
    }
    ngOnInit() {
        this.getUsers();
    }
}
