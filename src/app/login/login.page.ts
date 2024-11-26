import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GameApiService } from '../services/game-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private api: GameApiService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async onClickIngresar(form: NgForm) {
    if (form.invalid) {
      this.mostrarToast('Debes completar todos los campos', 'danger');
      return;
    }

    const validacion = this.validarCampos(this.usuario, this.password);

    if (!validacion.esValido) {
      this.mostrarToast(validacion.mensajeError, 'danger');
      return;
    }

    try {
      await this.api.login(this.usuario.trim(), this.password.trim());
      this.router.navigate(['/menu']);
    } catch (error: any) {
      this.mostrarToast('Error al iniciar sesión: ' + (error.error?.message || 'Desconocido'), 'danger');
    }
  }

  validarCampos(usuario: string, password: string): { esValido: boolean; mensajeError: string } {
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(usuario)) {
      return { esValido: false, mensajeError: 'El usuario debe tener entre 3 y 20 caracteres alfanuméricos.' };
    }

    if (password.length < 6) {
      return { esValido: false, mensajeError: 'La contraseña debe tener al menos 6 caracteres.' };
    }

    return { esValido: true, mensajeError: '' };
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
      color,
    });
    await toast.present();
  }
}
