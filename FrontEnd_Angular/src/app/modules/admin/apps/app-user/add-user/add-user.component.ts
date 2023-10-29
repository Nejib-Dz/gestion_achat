import { NgIf, NgFor, NgTemplateOutlet, NgClass, AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
import { Role, User } from 'app/core/user/user.types';
import { TableModule } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { ContactsMockApi } from 'app/mock-api/apps/contacts/api';
import { contacts } from 'app/mock-api/apps/contacts/data';
import { countries } from 'app/mock-api/apps/contacts/data';
import { Country } from '../../contacts/contacts.types';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations,
    standalone     : true,
    imports        : [NgIf,TableModule,MatCardModule,MatTableModule, MatProgressBarModule,MatDialogModule,MatRadioModule, MatFormFieldModule, MatIconModule, MatInputModule,FormsModule, ReactiveFormsModule, MatButtonModule, MatSortModule, NgFor, NgTemplateOutlet, MatPaginatorModule, NgClass, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatRippleModule, AsyncPipe, CurrencyPipe],

})
export class AddUserComponent {
    UserForm: UntypedFormGroup;
    usercontrols = new FormControl('');
    roles: Role[] = [];
    isEditing: boolean;
    isAdding: boolean;


    user: User;
pays ="";
    contactForm: UntypedFormGroup;
    phonenumberList: any[];
    countriesList: any[];
    selectedCountry: Country;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private userService : UserService,private _dialog: MatDialog,private _changeDetectorRef: ChangeDetectorRef,
        private cdRef: ChangeDetectorRef, private _formBuilder: UntypedFormBuilder,
       private contactsMockApi : ContactsMockApi,

        @Inject(MAT_DIALOG_DATA) public data: any
        ) {
            this.UserForm = this._formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.required],
                tele: ['', Validators.required],
                sexe: ['', Validators.required],
                roles: ['', Validators.required],
                country: ['', Validators.required],
                agreements: ['', Validators.requiredTrue],
            });
            this.isAdding = data.isAdding;
            this.isEditing = data.isEditing;
        this.user = data.user;
        if (this.isEditing) {
            this.UserForm.patchValue({

              name: this.user.name,
              email: this.user.email,
              password: this.user.password,
              tele: this.user.tele,
              sexe: this.user.sexe,
              roles: this.user.roles,
              country: this.user.country,
              agreements: this.user.agreements,


            });
        }
        this.contactForm = this._formBuilder.group({
            id          : [''],
            avatar      : [null],
            name        : ['', [Validators.required]],
            emails      : this._formBuilder.array([]),
            phoneNumbers: this._formBuilder.array([]),
            title       : [''],
            company     : [''],
            birthday    : [null],
            address     : [null],
            notes       : [null],
            tags        : [[]],
        });


    }
    getCountryByIso(iso: string): Country
    {
        return this.countriesList.find(country => country.iso === iso);
    }
     /**
     * Add an empty phone number field
     */
     addPhoneNumberField(): void
     {
         // Create an empty phone number form group
         const phoneNumberFormGroup = this._formBuilder.group({
             country    : ['us'],
             phoneNumber: [''],
             label      : [''],
         });

         // Add the phone number form group to the phoneNumbers form array
         (this.contactForm.get('phoneNumbers') as UntypedFormArray).push(phoneNumberFormGroup);

         // Mark for check
         this._changeDetectorRef.markForCheck();
     }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
    getPhoneNumbersFromContacts() {
        this.phonenumberList = contacts.flatMap(contact => contact.phoneNumbers)

    }
    getCountries() {
    this.countriesList = countries
    }
    ngDoCheck() {
        console.log(this.selectedCountry)

    }

    ngOnInit() {

        this.selectedCountry = {
            id: 'ab25c5da-7698-4b96-af34-5d20523915d9', iso: 'tn', name: 'Tunisia', code: '+216',
            flagImagePos: '-1px -698px'
        };


        console.log(this.selectedCountry)

        this.getPhoneNumbersFromContacts();
        this.getCountries();
        this.getRoles();

        // Get the contacts

        // this._contactsListComponent.matDrawer.open();

        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id          : [''],
            avatar      : [null],
            name        : ['', [Validators.required]],
            emails      : this._formBuilder.array([]),
            phoneNumbers: this._formBuilder.array([]),
            title       : [''],
            company     : [''],
            birthday    : [null],
            address     : [null],
            notes       : [null],
            tags        : [[]],
        });





    }
    getRoles(){
        this.userService.GetRoles().subscribe(res => {
            this.roles = res
            console.log(this.roles)
            this.cdRef.detectChanges();
        }, error => {
            console.log(error)
   })
    }
    AddUser() {
        console.log(this.UserForm.value)
        if (this.isAdding) {
            this.userService.AddUser(this.UserForm.value).subscribe(res => {
                console.log(res)
                window.location.reload();
            }, error => {
                console.log(error)
            })
        }
        else if (this.isEditing) {
            const user: User = this.UserForm.value
            user.id = this.user.id

        this.userService.UpdateUser(user).subscribe((res) => {

            console.log(res)
            window.location.reload();
     },(error)=> {
        console.log(error)
     } )
        }
    }

}
