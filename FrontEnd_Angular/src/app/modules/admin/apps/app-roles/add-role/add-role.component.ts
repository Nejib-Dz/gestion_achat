import { NgIf, NgFor, NgTemplateOutlet, NgClass, AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
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
import { MatTableModule } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from 'app/core/user/user.service';
import { Role } from 'app/core/user/user.types';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
    styleUrls: ['./add-role.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations,
    standalone     : true,
    imports        : [NgIf,TableModule,MatCardModule,MatTableModule, MatProgressBarModule,MatDialogModule,MatRadioModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSortModule, NgFor, NgTemplateOutlet, MatPaginatorModule, NgClass, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatRippleModule, AsyncPipe, CurrencyPipe],
})
export class AddRoleComponent {
    RoleForm: UntypedFormGroup;
    isEditing: boolean;
    isAdding: boolean;
    role: Role;
    constructor(private userService : UserService,private _dialog: MatDialog,
        private cdRef: ChangeDetectorRef, private _formBuilder: UntypedFormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.RoleForm = this._formBuilder.group({
                name: ['', Validators.required],

            });
            this.isAdding = data.isAdding;
            this.isEditing = data.isEditing;
        this.role = data.role;
        if (this.isEditing) {
            this.RoleForm.patchValue({

              name: this.role.name,


            });
          }
    }
    AddRole() {
        if (this.isAdding) {
            this.userService.AddRole(this.RoleForm.value).subscribe(res => {
                console.log(res)
                window.location.reload();
            }, error => {
                console.log(error)
            })
        }
        else if (this.isEditing) {
            const role: Role = this.RoleForm.value
            role.id = this.role.id

        this.userService.UpdateRole(role).subscribe((res) => {

            console.log(res)
            window.location.reload();
     },(error)=> {
        console.log(error)
     } )
        }
    }
}
