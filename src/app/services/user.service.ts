import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginUser(password: string) {
    return this.http.put(environment.apiURL+ '/user/login-user/' + password, password )
  }

  registerUser(user: UserModel) {
    return this.http.post(environment.apiURL + '/user/register-user', user);
  }

}
