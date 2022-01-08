import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataModel  } from '../models/dataEncrypted';
import { PublicKey } from '../../../../RSA-Module/types';
import { PublicKeyModel } from '../models/publicKey';
import { PrivateKeyModel } from '../models/privateKey';

@Injectable({
  providedIn: 'root'
})
export class DataEncryptedService {

  constructor(private http: HttpClient) { }

  postData(data: String, n: String ){
    return this.http.post(environment.apiURL + '/home/postData', {data, n});
  }
  getData(password: string){
    return this.http.get<DataModel[]>(environment.apiURL+'/home/getData/'+ password)
  }
  getPrivateKey(password: string){
    return this.http.get<PrivateKeyModel[]>(environment.apiURL+'/home/getPrivateKey/'+ password)
  }

}
