import { BindingType } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent implements OnInit {

  value: boolean = false;
  userForm: FormGroup;
  authenticated: boolean = false;
  clickedLogin: boolean;

  constructor(private router: Router, private personaService: PersonaService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  auth() {
    if (this.userForm.value.username == "Pedro" && this.userForm.value.password == "ciao") {
      this.authenticated = true;
      this.personaService.getPersona(this.userForm.value.username);
      this.router.navigate(['/home']);
      
    } else {
      this.authenticated = false;
    }
    this.clickedLogin = true;
    this.userForm.reset();
  }

  closeLoginDialog() {
    this.clickedLogin = false;
  }

}
