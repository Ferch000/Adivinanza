import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GameApiService } from '../services/game-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  correo: string = '';
  usuario: string = '';
  password: string = '';
  confirmarPassword: string = '';

  constructor(
    private router: Router,
    private api: GameApiService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    
      this.usuario = '';
      this.correo = '';
      this.password = '';
    
    
  }

  async onClickRegistrar(form: NgForm) {
    if (form.invalid) {
      this.mostrarToast('Debes completar todos los campos', 'danger');
      return;
    }

    const validacion = this.validarCampos(this.correo, this.usuario, this.password, this.confirmarPassword);

    if (!validacion.esValido) {
      this.mostrarToast(validacion.mensajeError, 'danger');
      return;
    }

    try {
      await this.api.register(this.correo.trim(), this.usuario.trim(), this.password.trim());
      this.mostrarToast('¡Registro exitoso!', 'success');
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.mostrarToast('Error al registrarse: ' + (error.error?.message || 'Desconocido'), 'danger');
    }
  }

  validarCampos(
    correo: string,
    usuario: string,
    password: string,
    confirmarPassword: string
  ): { esValido: boolean; mensajeError: string } {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return { esValido: false, mensajeError: 'El correo no es válido.' };
    }

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(usuario)) {
      return { esValido: false, mensajeError: 'El usuario debe tener entre 3 y 20 caracteres alfanuméricos.' };
    }

    if (password.length < 6) {
      return { esValido: false, mensajeError: 'La contraseña debe tener al menos 6 caracteres.' };
    }

    if (password !== confirmarPassword) {
      return { esValido: false, mensajeError: 'Las contraseñas no coinciden.' };
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
