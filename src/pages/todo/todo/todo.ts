import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, App, ModalController, Events, FabContainer } from 'ionic-angular';
import { TodoService } from '../../../services/todo.service';
import { AuthService } from '../../../services/auth.service';
import { NavGuard } from '../../support/nav.guard';

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
    // let modal = this.modalCtrl.create(ShoppingItemPage);
    // modal.onDidDismiss(data => {
    //   if (data) {
    //     let vm = new ShoppingItemVm(data);
    //     this.prodService.addShoppinglistItem(vm);
    //   }
    // });
    // modal.present();
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
}
