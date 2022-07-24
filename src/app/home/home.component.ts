import { style } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
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
  currentUser: string = "Pedro";
  utenti = ["Pedro", "Bianco"]
  date = new Date();
  oldDate: string;
  currentDate: string[];
  currentDay: number;
  currentMonth: string;
  currentYear: number;
  oldDay: number;
  oldMonth: string;
  oldYear: number;
  objectDate = {
    giorno: "",
    mese: "",
    anno: ""
  }

  constructor(private personaService: PersonaService) {
    // this.currentDate = this.datePipe.transform(this.date, 'dd-MM-yyyy');
  }

  ngOnInit(): void {
    document.body.style.background = "white";
    this.getCurrentDate();
    this.getOldDate();
    this.changeMacchina();
    // console.log(this.personaService.user.nome);
  }

  getOldDate() {
    this.oldDate = JSON.parse(localStorage.getItem("Data"));
    this.oldDay = this.oldDate['giorno'];
    this.oldMonth = this.oldDate['mese'];
    this.oldYear = this.oldDate['anno'];
  }


  getCurrentDate() {
    this.currentDate = this.date.toString().split(" ");
    this.currentDay = +this.currentDate[2];
    this.currentMonth = this.currentDate[1];
    this.currentYear = +this.currentDate[3];
    this.objectDate.giorno = this.currentDay.toString();
    this.objectDate.mese = this.currentMonth;
    this.objectDate.anno = this.currentYear.toString();
    localStorage.setItem('Data', JSON.stringify(this.objectDate));
  }



  changeMacchina() {
    if (this.oldMonth == this.currentMonth) {
      const diff = this.currentDay - +this.oldDay;
      if (diff / 2 != 0) {
        if (this.currentUser == this.utenti[0]) {
          this.newUser = this.utenti[1];
        }
        else {
          this.newUser = this.utenti[0];
        }
      }
      else {
        this.newUser = this.currentUser;
      }
    }
    alert("Oggi è il turno di: " + this.newUser);
  }

}