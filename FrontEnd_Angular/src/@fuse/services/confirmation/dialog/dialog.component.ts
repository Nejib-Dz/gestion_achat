import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, Inject, NgModule, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { DemandeAchatService } from 'app/modules/admin/apps/app-demandeAchat/demandeAchatComponent/demande-achat.service';

@Component({
    selector     : 'fuse-confirmation-dialog',
    templateUrl  : './dialog.component.html',
    styles       : [
        `
            .fuse-confirmation-dialog-panel {

                @screen md {
                    @apply w-128;
                }

                .mat-mdc-dialog-container {

                    .mat-mdc-dialog-surface {
                        padding: 0 !important;
                    }
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [NgIf, MatButtonModule,FormsModule,MatInputModule,MatSelectModule,MatFormFieldModule, MatDialogModule, MatIconModule, NgClass,CommonModule],
})
export class FuseConfirmationDialogComponent
{
    motif_rejet : string;
    qt_demande:number;
    qt_approuve:number;
    description :string;
    IsConfirmed : boolean = false;
    /**
     * Constructor
     */
    constructor(@Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig,
    private demandeachatService:DemandeAchatService,
    public dialogRef : MatDialogRef<FuseConfirmationDialogComponent>
    )
    {
   this.qt_demande = this.demandeachatService.getQuantity();
    }
    sendData(){
        let object = {
        qt_approuve : this.qt_approuve,
        description : this.description

        }
       if (this.data.actions.confirm.label == 'Accept'){

           this.demandeachatService.setObject(object);
       } else {
        this.demandeachatService.setMotif_Rejet(this.motif_rejet);
       }

       console.log(object);


    }
    handleclick(){
     if (this.data.actions.hello.show=false){
      this.showElement();

      console.log("show textarea")
     } else if(this.data.actions.hello.show=true && this.motif_rejet != "" ){
      this.sendData();
      this.dialogRef.close(this.data)

      console.log("send data :"+this.motif_rejet)
     }

     this.IsConfirmed =true;

    }

    showElement(){
        this.data.actions.hello.show=true;
        this.data.actions.save.show=true;
    }

}
