import { Component } from '@angular/core';
import {
  IonHeader,
  IonButton,
  IonToolbar,
  IonTitle,
  IonContent,
  ToastController,
  IonIcon,
  IonLabel,
  IonList,
  IonItem
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../apis/server';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonButton,
    IonIcon,
    IonLabel,
    IonList,
    IonItem,
    HttpClientModule,
    CommonModule
  ],
  providers: [ApiService],
})
export class Tab4Page {
  public users: any[] = [];

  constructor(
    private toastController: ToastController,
    private apiService: ApiService
  ) {
    addIcons({ heart });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message?: string) {
    const toast = await this.toastController.create({
      message: message || 'Hello World!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  async call() {
    this.apiService.getItems().subscribe({
      next: (data) => {
        this.users = data;

        this.presentToast('top', 'Dados recebidos com sucesso!');
      },
      error: (err) => {
        this.presentToast('top', 'Erro ao buscar dados');
      },
    });
  }
}
