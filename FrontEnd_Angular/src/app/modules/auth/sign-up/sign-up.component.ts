import { NgIf } from '@angular/common';
import {NgFor} from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,

} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { UserService } from 'app/core/user/user.service';
import { Role } from 'app/core/user/user.types';
@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        NgFor,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,

    ],
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    selectedSexe: String;
    userId: number;
    roles : Role[] = [];
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private userService: UserService,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
       this.userService.GetRoles().subscribe(res => {
           this.roles = res
           console.log(this.roles)
        })
        this.signUpForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            tele: ['', Validators.required],
            country: ['', Validators.required],
            sexe: ['', Validators.required],
            roles: ['', Validators.required],
            agreements: ['', Validators.requiredTrue],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        console.log('form ', this.signUpForm);
       // Do nothing if the form is invalid
       if (this.signUpForm.invalid) {

        return;
    }

    // Disable the form
    this.signUpForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign up
    this._authService.signUp(this.signUpForm.value).subscribe(
        (response) => {
            // send mail to user to confirm his account
            this._authService
                .sendConfirmationAccountLink(response.id)
                .subscribe(
                    (res) => {},
                    (error) => {},
                    () => {}
                );
            // Navigate to the confirmation required page
            this._router.navigateByUrl('/confirmation-required');

        },
        (response) => {
            // Re-enable the form
            this.signUpForm.enable();

            // Reset the form
            this.signUpNgForm.resetForm();

            // Set the alert
            this.alert = {
                type: 'error',
                message: 'Something went wrong, please try again.',
            };

            // Show the alert
            this.showAlert = true;
        }
    );
    }
}
