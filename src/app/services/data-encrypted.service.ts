import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataModel  } from '../models/dataEncrypted';
import { Data2Model  } from '../models/dataSigned';
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

  postData2(data: String, keyA: String, keyB: String ){
    return this.http.post(environment.apiURL + '/home/postData2', {data, keyA, keyB});
  }

  getData2(password: string){
    return this.http.get<Data2Model[]>(environment.apiURL+'/home/getData2/'+ password)
  }

}
