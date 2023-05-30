import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { Toast } from '@capacitor/toast';




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

  // ngOnInit, sin preference
  // ngOnInit() {
  //   this.rickAndMortyService.getCharacters().subscribe((response: any) => {
  //     this.personajes = response.results;
  //   });
  // }


  ngOnInit() {
    this.cargarPersonajes();
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
        Toast.show({text: 'Personaje eliminado con éxito',});
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

  //Preferences
  async cargarPersonajes() {
    try {
      const { value } = await Preferences.get({ key: 'personajes' }); // Recupera los personajes desde las preferencias
      if (value && value.length > 0) {
        this.personajes = JSON.parse(value);
      } else {
        const response: any = await this.rickAndMortyService.getCharacters().toPromise();
        this.personajes = response.results;
        await Preferences.set({ key: 'personajes', value: JSON.stringify(this.personajes) }); // Guarda los personajes en las preferencias
      }
    } catch (error) {
      console.log('Error al recuperar o guardar personajes en las preferencias:', error);
      Toast.show({text: 'Error al consultar la API',});
      const response: any = await this.rickAndMortyService.getCharacters().toPromise();
      this.personajes = response.results;
      await Preferences.set({ key: 'personajes', value: JSON.stringify(this.personajes) }); // Guarda los personajes en las preferencias
    }
    console.log('Personajes almacenados en las preferencias:', this.personajes);
  }

}
