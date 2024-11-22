import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage {
  numero: number | null = null;
  numeroCorrecto: number = Math.floor(Math.random() * 100) + 1;

  constructor(private toastController: ToastController) {}

  async mostrarMensaje(mensaje: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, 
      position: 'top', 
      color, 
    });
    await toast.present();
  }

  onClickAdivinar() {
    if (this.numero === null || this.numero < 1 || this.numero > 100) {
      this.mostrarMensaje('Por favor, ingresa un número válido entre 1 y 100.', 'danger');
      return;
    }

    if (this.numero === this.numeroCorrecto) {
      this.mostrarMensaje('¡Felicidades, adivinaste!', 'success');
    } else if (this.numero < this.numeroCorrecto) {
      this.mostrarMensaje('El número es mayor.', 'warning');
    } else {
      this.mostrarMensaje('El número es menor.', 'warning');
    }
  }

  onClickReiniciar() {
    this.numero = null;
    this.numeroCorrecto = Math.floor(Math.random() * 100) + 1;
    this.mostrarMensaje('El juego ha sido reiniciado.', 'tertiary');
  }
}
