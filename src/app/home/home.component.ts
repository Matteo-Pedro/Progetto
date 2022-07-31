import { style } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Persona } from '../persona.model';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  newUser: string;
  savedUser: string;
  utenti = ["Pedro", "Bianco"]
  changedUser: string;
  date = new Date();
  savedDate: string;
  currentDate: string[];
  currentDay: number;
  currentMonth: string;
  currentYear: number;
  savedDay: number;
  savedMonth: string;
  savedYear: number;
  isFestivo: boolean;
  objectDate = {
    utente: "",
    giorno: "",
    mese: "",
    anno: ""
  }

  constructor(private personaService: PersonaService) {
    // this.currentDate = this.datePipe.transform(this.date, 'dd-MM-yyyy');
  }

  ngOnInit(): void {
    document.body.style.background = "white";
    this.getSavedDate();
    this.saveCurrentDate();
    this.checkFestivo();

    // console.log(this.personaService.user.nome);
  }

  getSavedDate() {
    this.savedDate = JSON.parse(localStorage.getItem("Data"));
    this.savedDay = this.savedDate['giorno'];
    this.savedMonth = this.savedDate['mese'];
    this.savedYear = this.savedDate['anno'];
    this.savedUser = this.savedDate['utente'];
  }


  saveCurrentDate() {
    this.currentDate = this.date.toString().split(" ");
    this.currentDay = +this.currentDate[2];
    this.currentMonth = this.currentDate[1];
    this.currentYear = +this.currentDate[3];
    this.objectDate.giorno = this.currentDay.toString();
    this.objectDate.mese = this.currentMonth;
    this.objectDate.anno = this.currentYear.toString();
    this.changeMacchina();
    if (this.savedDay != this.currentDay || this.savedDate == null) {
      localStorage.setItem('Data', JSON.stringify(this.objectDate));
    }

  }



  changeMacchina() {
    if (this.savedMonth == this.currentMonth) {
      const diff = this.currentDay - +this.savedDay;
      if (diff / 2 != 0) {
        if (this.savedUser == this.utenti[0]) {
          this.newUser = this.utenti[1];
        }
        else {
          this.newUser = this.utenti[0];
        }
      }
      else {
        this.newUser = this.savedUser;
      }
    }
    this.objectDate.utente = this.newUser;
  }

  checkFestivo() {
    if (this.currentDate[0] == "Sun" || this.currentDate[0] == "Sat"){
      this.isFestivo = true;
    }
    else {
      this.isFestivo = false;
    }
  }

  changeUser() {
    if(this.savedUser == this.utenti[0]) {
      this.changedUser = this.utenti[1];
    }
    else {
      this.changedUser = this.utenti[0];
    }
    this.objectDate.utente = this.changedUser;
    localStorage.setItem('Data', JSON.stringify(this.objectDate));
  }

}