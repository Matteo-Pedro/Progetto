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
  diff: number;
  savedUser: string;
  utenti = ["Pedro", "Bianco"]
  changedUser: string;
  date = new Date();
  savedDate: string;
  currentDate: Date;
  currentDay: number;
  currentMonth: number;
  currentYear: number;
  savedDay: number;
  savedMonth: string;
  savedYear: number;
  isFestivo: boolean;
  objectDate = {
    utente: "",
    giorno: "",
    mese: "",
    anno: "",
    giorniPerMese: ""
  }

  constructor(private personaService: PersonaService) {
    // this.currentDate = this.datePipe.transform(this.date, 'dd-MM-yyyy');
  }

  ngOnInit(): void {
    document.body.style.background = "white";
    this.saveFirstDate();
    this.getSavedDate();
    this.changeMacchina();
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


  saveFirstDate() {
    this.currentDate = this.date;
    this.currentDay = this.currentDate.getDay();
    this.currentMonth = this.currentDate.getMonth() + 1;
    this.currentYear = this.currentDate.getFullYear();


    // this.currentDate = this.date.toString().split(" ");
    // this.currentDay = +this.currentDate[2];
    // this.currentMonth = this.currentDate[1];
    // this.currentYear = +this.currentDate[3];
    this.objectDate.giorno = this.currentDay.toString();
    this.objectDate.mese = this.currentMonth.toString();
    this.objectDate.anno = this.currentYear.toString();
    const localStorageDate = JSON.parse(localStorage.getItem("Data"));
    if (localStorageDate == null) {
      this.objectDate.utente = "Pedro";
      this.objectDate.giorniPerMese = new Date(this.currentYear, +this.currentMonth, 0).getDate().toString();
      localStorage.setItem('Data', JSON.stringify(this.objectDate));
    }
  }



  changeMacchina() {
    if (+this.savedMonth == this.currentMonth) {
      this.diff = this.currentDay - +this.savedDay;
    }
    else {
      this.diff = this.currentDay + (this.savedDate['giorniPerMese'] - this.savedDay);
    }
    if (this.diff / 2 != 0) {
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
    this.saveDate();
  }



  checkFestivo() {
    if (this.currentDate[0] == "Sun" || this.currentDate[0] == "Sat") {
      this.isFestivo = true;
    }
    else {
      this.isFestivo = false;
    }
  }

  changeUser() {
    if (this.savedUser == this.utenti[0]) {
      this.changedUser = this.utenti[1];
    }
    else {
      this.changedUser = this.utenti[0];
    }
    this.objectDate.utente = this.changedUser;
    localStorage.setItem('Data', JSON.stringify(this.objectDate));
  }


  saveDate() {
    this.objectDate.giorno = this.currentDay.toString();
    this.objectDate.mese = this.currentMonth.toString();
    this.objectDate.anno = this.currentYear.toString();
    this.objectDate.giorniPerMese = new Date(this.currentYear, +this.currentMonth, 0).getDate().toString();
    this.objectDate.utente = this.newUser;
    localStorage.setItem('Data', JSON.stringify(this.objectDate));
  }
}

