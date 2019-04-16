import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, FormGroup, FormBuilder, ReactiveFormsModule, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contact-manager';
  contactForm: FormGroup;
  name: FormControl = null; 
  email: FormControl;
  observation: FormControl;
  phone1: FormControl;
  phone2: FormControl;
  cep1: FormControl;
  address1: FormControl;
  neighborhood1: FormControl;
  number1: FormControl;
  city1: FormControl;
  estate1: FormControl;
  cep2: FormControl;
  address2: FormControl;
  neighborhood2: FormControl;
  number2: FormControl;
  city2: FormControl;
  estate2: FormControl;
  http: HttpClient;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isDisabled: boolean = false; 
  submitted: boolean = false; 
  
  constructor(private appService: AppService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required),
    this.email = new FormControl('', [Validators.required, Validators.email]),
    this.observation = new FormControl(''),
    this.phone1 = new FormControl(''),
    this.phone2 = new FormControl(''),
    this.cep1 = new FormControl(''),
    this.address1 = new FormControl(''),
    this.neighborhood1 = new FormControl(''),
    this.number1 = new FormControl(''),
    this.city1 = new FormControl(''),
    this.estate1 = new FormControl(''),
    this.cep2 = new FormControl(''),
    this.address2 = new FormControl(''),
    this.neighborhood2 = new FormControl(''),
    this.number2 = new FormControl(''),
    this.city2 = new FormControl(''),
    this.estate2 = new FormControl('');
  }

  createForm() {
    this.contactForm = new FormGroup({
      name: this.name,
      email: this.email,
      observation: this.observation,
      phone1: this.phone1,
      phone2: this.phone2,
      cep1: this.cep1,
      address1: this.address1,
      neighborhood1: this.neighborhood1,
      number1: this.number1,
      city1: this.city1,
      estate1: this.estate1,
      cep2: this.cep2,
      address2: this.address2,
      neighborhood2: this.neighborhood2,
      number2: this.number2,
      city2: this.city2,
      estate2: this.estate2
    });
  }

  sendRequest() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    }
  }

  onSubmit(){
    this.sendRequest();
  }

  getAddress() {
    let cep = '';
    let url = '';
    if(this.cep1!=null){
      cep = this.cep1.value;
      url = 'https://api.postmon.com.br/v1/cep/'+cep;
      console.log('cep', cep);
      console.log('url', url);
    } else if(this.cep2!=null&&this.cep2!=this.cep1) {
      cep = this.cep2.value;
      url = 'https://api.postmon.com.br/v1/cep/'+cep;
    }
    let address;
    this.appService.getAddressFromAPI(url).subscribe(data=>{
      address = data;
      console.log('data: ', address);
      return address;
    });
  }
}
