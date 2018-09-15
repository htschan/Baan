import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TodoService } from '../services/todo.service';
import { PopoverController, ModalController, Events, Fab, App } from '@ionic/angular';
import { Todo } from '../../model/todo';
import { ItemviewComponent } from './itemview/itemview.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  constructor(
    public auth: AuthService,
    public appCtrl: App,
    public todoService: TodoService,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public events: Events) {
    events.subscribe('user:signout', (user) => {
      console.log('home.component user logged out');
    });
  }

  ngOnInit(): void {
    console.log('ToDo on init');
  }

  importantItem(key: any, val: boolean) {
    // this.todoService.importantProduct(key, val);
  }

  favoriteItem(key: any, val: boolean) {
    // this.todoService.favoriteProduct(key, val);
  }

  deleteItem(key: any) {
    // this.todoService.deleteShoppinglistItem(key);

  }

  viewItem(item: any) {
    // let modal = this.modalCtrl.create(TodoItemViewPage, { data: item });
    // modal.present();
  }

  editItem(item: any) {
    // let modal = this.modalCtrl.create(TodoItemPage, { data: item });
    // modal.onDidDismiss(data => {
    //   if (data) {
    //     let vm = new ShoppingItemVm(data);
    //     this.prodService.updateShoppinglistItem(vm.Key, vm);
    //   }
    // });
    // modal.present();
  }

  async addItem(fab: Fab) {
    fab.close();
    const modal = await this.modalCtrl.create({
      component: ItemviewComponent,
      componentProps: { title: 'the title', comment: 'the coment' }
    });
    modal.onDidDismiss().then(data => {
      if (data) {
        const vm = new Todo(data);
        this.todoService.addNewTodo(vm);
      }
    });
    return await modal.present();
  }

  selectProduct(fab: Fab) {
    fab.close();
    // let modal = this.modalCtrl.create(SelectProductPage);
    // modal.onDidDismiss(data => {
    //   if (data) {
    //     let vm = ShoppingItemVm.fromProductItem(data.item, data.key);
    //     vm.Key = data.key;
    //     this.prodService.addShoppinglistItem(vm);
    //   }
    // });
    // modal.present();
  }

  async presentPopover(myEvent) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
      translucent: false,
      backdropDismiss: true
    });
    return await popover.present();
  }
}

@Component({
  template: `
    <ion-list>
      <ion-list-header>Ionic</ion-list-header>
      <ion-button ion-item (click)="close()">Learn Ionic</ion-button>
      <ion-button ion-item (click)="close()">Documentation</ion-button>
      <ion-button ion-item (click)="close()">Showcase</ion-button>
      <ion-button ion-item (click)="close()">GitHub Repo</ion-button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public popCtrl: PopoverController) { }

  close() {
    this.popCtrl.dismiss();
  }
}
