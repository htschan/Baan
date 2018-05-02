import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, App, ModalController, Events, FabContainer, PopoverController, ViewController } from 'ionic-angular';
import { TodoService } from '../../../services/todo.service';
import { AuthService } from '../../../services/auth.service';
import { NavGuard } from '../../support/nav.guard';
import { Todo } from '../../../model/todo';
import { TodoItemviewPage } from '../itemview/todo-itemview';

@IonicPage()
@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html',
})
export class TodoPage extends NavGuard implements OnInit, OnDestroy {

  constructor(
    public auth: AuthService,
    public appCtrl: App,
    public todoService: TodoService,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public events: Events) {
    super(auth, modalCtrl, appCtrl);
    events.subscribe('user:signout', (user) => {
      console.log("home.component user logged out");
    });
  }

  ngOnInit(): void {
    console.log("ToDo on init");
  }

  ngOnDestroy(): void {
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

  addItem(fab: FabContainer) {
    fab.close();
    debugger;
    let modal = this.modalCtrl.create(TodoItemviewPage);
    modal.onDidDismiss(data => {
      if (data) {
        let vm = new Todo(data);
        this.todoService.addNewTodo(vm);
      }
    });
    modal.present();
  }

  selectProduct(fab: FabContainer) {
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

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}

@Component({
  template: `
    <ion-list>
      <ion-list-header>Ionic</ion-list-header>
      <button ion-item (click)="close()">Learn Ionic</button>
      <button ion-item (click)="close()">Documentation</button>
      <button ion-item (click)="close()">Showcase</button>
      <button ion-item (click)="close()">GitHub Repo</button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}