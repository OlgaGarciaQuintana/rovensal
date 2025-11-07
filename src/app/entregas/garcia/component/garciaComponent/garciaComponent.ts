import { Component } from '@angular/core';
import { Character, CharacterResponse } from '../../model/apiInterface';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-garcia',
  imports: [CommonModule],
  templateUrl: './garciaComponent.html',
  styleUrl: './garciaComponent.css',
  standalone: true,
})
export class GarciaComponent {
  //INICIAR COMBATE:
  startCombat() {
    console.log('Combate iniciado');
  }

  //ELEGIR PERSONAJE:
  imagenPersonaje: string | null = null;
  mostrar = true;

imagenes = {
  hombre: "/garcia/imagenes/personajeMasc.png",
  mujer:  "/garcia/imagenes/personajeFem.png"
};

selectMan() {
  this.imagenPersonaje = this.imagenes.hombre;
  this.mostrar = false;

}

selectWoman() {
  this.imagenPersonaje = this.imagenes.mujer;
  this.mostrar = false;
}

  //API:
  personajes: Character[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    const url =
      'https://corsproxy.io/?' +
      encodeURIComponent('https://www.demonslayer-api.com/api/v1/characters');

    this.http.get<CharacterResponse>(url).subscribe({
      next: (response: CharacterResponse) => {
        console.log(response);
        this.personajes = response.content;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  // ATRIBUTOS HUMANOS:
  endCombat() {
    console.log('Combate finalizado');
  }
}