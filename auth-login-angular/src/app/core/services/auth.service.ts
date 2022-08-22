import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public sign(payload: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.url}/sign`, payload).pipe(
      map((data) => {
        localStorage.removeItem("access_token")
        localStorage.setItem("access_token", data.token)
        return this.router.navigate(['admin'])
      }),
      catchError(err => {
        if (err.error.message) return throwError(() => err.error.message);
        return throwError(() => "Erro interno!");
      })
    )
  }

  public logOut() {
    localStorage.removeItem("access_token")
    return this.router.navigate([''])
  }
}
