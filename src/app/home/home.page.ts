import { Component } from '@angular/core';
import { PrivateKey, PublicKey } from "../../../../RSA-Module";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as bc from 'bigint-conversion';
import { AlertController } from '@ionic/angular';
import { PublicKeyService } from '../services/public-key.service';
import { PublicKeyModel } from '../models/publicKey';
import { DataModel } from '../models/dataEncrypted';
import { DataEncryptedService } from '../services/data-encrypted.service';
import { Console } from 'console';
import { PrivateKeyModel } from '../models/privateKey';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cipherForm: FormGroup;
  signForm: FormGroup;
  submitted = false;
  sub = false;
  data:any;
  x:any;
  response: DataModel[];
  resultados: String[];
  resultado:any;
  n:any;
  d:any

  publicKeys: PublicKeyModel[];
  privateKey: PrivateKeyModel[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    public publicKeyService: PublicKeyService,
    public privateKeyService: PublicKeyService,
    public dataEncryptedService: DataEncryptedService,
  ) {}

  get formControls() { return this.cipherForm.controls; }

  ngOnInit() {

    let password = localStorage.getItem('password');

    this.publicKeyService.getUser(password).subscribe((response) => {
      this.resultado = response;
      this.d = bc.base64ToBigint(this.resultado[0].privateKey[0].d)
      this.n = bc.base64ToBigint(this.resultado[0].publicKey[0].n)
      let e = bc.base64ToBigint("AQAB");

      const publicKey = new PublicKey(e, this.n);
      const privateKey = new PrivateKey(this.d, publicKey);
      this.dataEncryptedService.getData(password).subscribe((response) => {
          
        this.response = response; 

        for(let i =0; i<this.response.length;i++){
          const y = privateKey.decrypt(bc.base64ToBigint(this.response[i].data));
          this.response[i].data = bc.bigintToText(y);
        }
            
      });

    });  
     
    this.cipherForm = this.formBuilder.group({
        text: ['', Validators.required], key: ['', Validators.required]
    });

    this.signForm = this.formBuilder.group({
      text: ['', Validators.required]
  });
  }

  refresh(){
    window.location.reload();
  }
   
  submitSign() {

    this.sub = true;

    if (this.signForm.invalid) {
      return;
    }  

    let text = this.formControls.text.value;
    let e = bc.base64ToBigint("AQAB");
    const publicKey = new PublicKey(e, this.n);
    const privateKey = new PrivateKey(this.d, publicKey);
    console.log(privateKey);
    /*const y = privateKey.sign(bc.textToBigint(text));
    console.log(bc.bigintToText(y));*/

  }


  submitCipher() {
      this.submitted = true;

      if (this.cipherForm.invalid) {
          return;
      }  

      let text = this.formControls.text.value;
      let n = this.formControls.key.value;
      let m = bc.base64ToBigint(n);
      let e = bc.base64ToBigint("AQAB");
      const publicKey = new PublicKey(e, m);
      this.x =  publicKey.encrypt(bc.textToBigint(text));
      let s = bc.bigintToBase64(this.x);


      this.dataEncryptedService.postData(s, n).subscribe((response) => {
        this.cipherForm.reset();
      });
      //swIUh/p0MBSH3XOlOpXjQTk2B8JzSRrhrdS+Bwh5jlpwxWORSAEQsoVl/rfHqaO9eQ0zUSLws8XmmZULl8Khiq1gATESrYh6GR2bokPfJYLmpEHPL823kpfkylwgJwfBJccmsx6TumS9dlAnr6ZuHkzkY/ZUpZiiVp8yyA//Vj27kHnEaZNpBxQyXQdnJnfDcoQpzfiWyTA4gir0EkEbKFDQE3lDkD5ugSlgwS4V0RfTO0pooQj9bTXp1ETukGM/zbjrMm0hTkTxjihXENnS4adsSGogC2VWXqYXGw2EthiDlhPO9VITXnen/hPi9ryIrhKrQdGpO2hRJcUbF4ARc1M36eG6v6ov0pufuOXPEVdC1seJ+GOupr9OE0vkyY5o8aKChGtsfgnI4RGNZ8fhQQGVV55Wm4J0veD3x/HhgWq3EuAnP7S6+/2tK1k7Gk9K288qfdyQf8LTMRSbEq2201Pcd1nAIAQKelNSLK3T4W+JQ/FfxGMR7TasXz+SIh5F


      /*this.publicKeyService.getPublicKey(this.data).subscribe (data => {
        this.publicKeys = data;

        let e = bc.base64ToBigint(this.publicKeys[0].e);
        let n = bc.base64ToBigint(this.publicKeys[0].n);

        const publicKey = new PublicKey(e, n);
        let text = this.formControls.text.value;
        console.log(bc.bigintToHex(n));
        this.x =  publicKey.encrypt(bc.textToBigint(text));

        let dataEncrypted = { "data": bc.bigintToBase64(this.x)};

        
        let key = {'n': this.publicKeys[0].n, 'e':  this.publicKeys[0].e};
      
        this.dataEncryptedService.postData(dataEncrypted, key).subscribe((response) => {
          this.cipherForm.reset();
        });

      });*/

  }

}
