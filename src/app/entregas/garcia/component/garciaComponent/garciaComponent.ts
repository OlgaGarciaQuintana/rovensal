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
  imagenPersonaje: HTMLImageElement | null = null;

  imagenes = {
  hombre: "../../imagenes/personajeMasc.png",
  mujer:  "../../imagenes/personajeFem.png"
};

  selectMan() {
  const img = new Image();
  img.src = this.imagenes.hombre;
  console.log("Ruta asignada:", img.src);
  this.imagenPersonaje = img;
}

selectWoman() {
  const img = new Image();
  img.src = this.imagenes.mujer;
  this.imagenPersonaje = img;
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