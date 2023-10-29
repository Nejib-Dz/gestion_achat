import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role, User } from 'app/core/user/user.types';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
const URL_roles = "http://localhost:8080/api/v1/roles"
const URL_users = "http://localhost:8080/api/v1/auth"
@Injectable({providedIn: 'root'})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

/* Added */
   public GetRoles() {
     return this._httpClient.get<Role[]>(URL_roles+"/findAll")
    }
    public AddRole(role : Role) {
      return    this._httpClient.post(URL_roles+"/create-role",role)
    }
    public UpdateRole(role: Role) {
      return    this._httpClient.put(URL_roles+"/update-role",role)
    }
    public deleteRole(id: number) {
      return    this._httpClient.delete(URL_roles+"/remove/"+id)
    }

   public GetUsers() {
     return this._httpClient.get<User[]>(URL_users+"/findAllUser")
    }
    public AddUser(user : User) {
      return    this._httpClient.post(URL_users+"/createUser",user)
    }
    public UpdateUser(user: User) {
      return   this._httpClient.put(URL_users+"/updateuser",user)
    }
    public deleteUser(id : number) {
      return    this._httpClient.delete(URL_users+"/removeUser/"+id)
    }





    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User>
    {
        return this._httpClient.get<User>('api/common/user').pipe(
            tap((user) =>
            {
                this._user.next(user);
            }),
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) =>
            {
                this._user.next(response);
            }),
        );
    }
}
