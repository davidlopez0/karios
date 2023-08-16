import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { UserLogin } from '../interfaces/user-login.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserRegister } from '../interfaces/user-register.interface';

@Injectable({providedIn: 'root'})
export class AuthService {
    
    private baseUrl = environments.baseUrl;
    private user?: UserLogin | null;

    constructor(private http: HttpClient, private router: Router) { }
    
    get currentUser(): UserLogin | undefined {
        if(!this.user) return undefined;
        return structuredClone(this.user);
    }

    register(user: UserRegister){

        return this.http.post<UserRegister>(`${this.baseUrl}/users/create`, user);

    }

    login(username: string, password: string):Observable<HttpResponse<UserLogin>> {

        return this.http.post<UserLogin>(`${this.baseUrl}/auth/login`, { username, password }, { observe: 'response' })
            .pipe(
                tap(user => {
                    this.user = user.body;
                    localStorage.setItem("token", user.headers.get("Authorization") || "");
                    localStorage.setItem("user", JSON.stringify(this.user));
                })
            )
    }

    checkAuthentication(): Observable<boolean> {
        const url = `${this.baseUrl}/auth/check-token`;
        const token = localStorage.getItem("token");

        if(!token) return of(false);

        const headers = new HttpHeaders()
            .set("Authorization", `Bearer ${ token }`);

        return this.http.get<HttpResponse<void>>(url, { headers, observe: 'response' }).pipe(
            map(resp => {
                if(resp.body) return true;

                return false;
            })
        )
    } 

    logout(): void {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
    }

    

}