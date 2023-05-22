import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  personajes: any[] = [];

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private modalController: ModalController,
    private alertController: AlertController

  ) { }

  ngOnInit() {
    this.rickAndMortyService.getCharacters().subscribe((response: any) => {
      this.personajes = response.results;
    });
  }
  
  // modal
  isModalOpen = false;
  personajeSeleccionado: any = null;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  openModal(personaje: any) {
    this.personajeSeleccionado = personaje;
    this.isModalOpen = true;
  }

  // alert
  isAlertOpen = false;

  public alertButtons = [
    {text: 'OK',
      handler: () => {
        const index = this.personajeSeleccionado;
        if (index !== -1) {this.personajes.splice(index, 1);}
        this.isAlertOpen = false;
      }
    },
    {text:'Cerrar',
      handler: () => {this.isAlertOpen = false;}
    }
  ];

  openAlert(personaje: any) {
    this.personajeSeleccionado = personaje;
    this.isAlertOpen = true;
  }
}
