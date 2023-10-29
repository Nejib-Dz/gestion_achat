import { NgIf, NgFor, NgTemplateOutlet, NgClass, CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormControl,
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
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { InventoryService } from '../../ecommerce/inventory/inventory.service';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import { ServiceFournisseur } from '../../app-fournisseur/Fournisseur/fournisseur.service';
import { Article } from 'app/modules/Models/Article';
import { Fournisseur } from 'app/modules/Models/Fournisseur';
import { CommandeServiceService } from '../commande/commande-service.service';
import { DemandeAchat } from '../../app-demandeAchat/demandeAchatComponent/demande-achat';
import { OverlayModule } from '@angular/cdk/overlay';
import { DemandeAchatService } from '../../app-demandeAchat/demandeAchatComponent/demande-achat.service';


@Component({
    selector: 'app-commande-dialog',
    templateUrl: './commande-dialog.component.html',
    styleUrls: ['./commande-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    standalone: true,
    imports: [

       MatCheckboxModule,
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
        MatTooltipModule,
        OverlayModule,
        CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatDialogModule,
    MatRadioModule,

    ],
})
export class CommandeDialogComponent implements OnInit {
    AddForm: UntypedFormGroup;
    isEditing: boolean;
    isAdding: boolean;
    command: any;
    demandeAchats: DemandeAchat[] = [];
    fournisseurs: Fournisseur[] = [];
    articlescontrols = new FormControl('');
    commands: any[];
    fournisseurcontrols = new FormControl('');
    listDemandeCommande :DemandeAchat[] = [];
   // tooltip = '<p>hello</p><B>Hello</B>'
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private commandeService: CommandeServiceService,
        private inventoryservice: InventoryService,
        private cdRef: ChangeDetectorRef,
        private _dialog: MatDialog,
        private inventoriservice: ServiceFournisseur,
        private demandeachatService: DemandeAchatService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.isAdding = data.isAdding;
        this.isEditing = data.isEditing;
        this.command = data.command;
    }
    getDdemandeAchat() {
        this.demandeachatService.listDemandeAchat().subscribe(
            (res) => {
                this.demandeAchats = res;
                console.log('demandeachats', this.demandeAchats);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    getAllFournisseur() {
        this.inventoriservice.listFournisseur().subscribe(
            (res) => {
                this.fournisseurs = res;
                console.log('fournisseurs', this.fournisseurs);
                this.cdRef.detectChanges();
            },
            (error) => {
                console.log(error);
            }
        );
    }
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
    ngOnInit(): void {
        this.getDdemandeAchat();
        this.getAllFournisseur();
        this.getCommands();
        this.AddForm = this._formBuilder.group({
            name: ['', Validators.required],
            dateCmd: ['', Validators.required],
            modePaiment: ['', Validators.required],
            statut: ['', Validators.required],
            montantToltal: [0, Validators.required],
            adresseLivraison: ['', Validators.required],
            demandeAchats: [[], Validators.required],
            fournisseurs: [[], Validators.required],
        });
        if (this.isEditing) {
            this.AddForm.patchValue({
                name: this.command.name,
                dateCmd: this.command.dateCmd,
                modePaiment: this.command.modePaiment,
                statut: this.command.statut,
                montantToltal: this.command.montantToltal,
                adresseLivraison: this.command.adresseLivraison,
                demandeAchats: this.command.demandeAchats,
                fournisseurs: this.command.fournisseurs,
            });
            console.log('form edit',this.AddForm.value)
        }
    }

    onFormSubmit() {
        if (this.isAdding) {
            console.log(this.AddForm.value)
            this.commandeService.ajouterCommande(this.AddForm.value).subscribe(
                (res) => {
                    console.log(res);

                    this.getCommands();
                },
                (error) => {
                    console.log(error);
                }
            );
        } else if (this.isEditing) {
            const command: any = this.AddForm.value;
            command.idCmd = this.command.idCmd;
            this.commandeService.updateCommand(command).subscribe(
                (res) => {
                    console.log(res);

                    this.getCommands();
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
}
