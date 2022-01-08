import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PublicKeyModel } from '../models/publicKey';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PublicKeyService {

  constructor(private http: HttpClient) { }

  getPublicKey(password: string){
    return this.http.get<PublicKeyModel[]>(environment.apiURL+'/home/getPublicKey/'+ password)
  }

  getUser(password: string){
    return this.http.get<UserModel[]>(environment.apiURL+'/home/getUser/'+ password)
  }



  
  
}


