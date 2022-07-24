import { Injectable } from '@angular/core';
import { Persona } from './persona.model';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  user: Persona;

  constructor() { }

getPersona(nome){
  this.user = new Persona();
  this.user.nome = nome;
  // this.user.cognome = persona.cognome;
  // this.user.macchina = persona.macchina;
}

}
