import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Todo } from '../model/todo';
import * as firebase from 'firebase';

const FbBase = "/MyHome";

@Injectable()
export class TodoService {
    todosRef: AngularFireList<any>;
    todos: Observable<any[]>;

    constructor(
        private af: AngularFireDatabase,
        private authService: AuthService) {
        this.todosRef = af.list(`${FbBase}/Todos`);
        this.todos = this.todosRef.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
    }

    addNewTodo(item: Todo) {
        item.modifiedAt = firebase.database.ServerValue.TIMESTAMP as string;
        item.createdAt = firebase.database.ServerValue.TIMESTAMP as string;
        item.modifiedBy = this.authService.currentUser.displayName;
        item.createdBy = this.authService.currentUser.displayName;
        this.todosRef.push(item);
    }
    updateShoppinglistItem(key: string, item: Todo) {
        //        this.af.object(`${FbBase}/Todos/${key}`).update({Name: item.Name, Description: item.Description, Important: item.Important, Favorite: item.Favorite});
    }

}
/*
.service('Todos', ['$firebaseArray','Auth',function($firebaseArray,Auth){

   var ref = firebase.database().ref().child('MyHome/Todos');

    var getItems = function(){
        return $firebaseArray(ref);
    }
    var items = $firebaseArray(ref);
    
    var todos = {
        items: items,
        getItems: getItems,
        addItem: function(item){
            items.$add({
                'title': item.title,
                'finished': false,
                'comment': item.comment,
                'owner': item.owner,
                'prio': item.prio,
                'createdBy': Auth.fbAuth.$getAuth().uid,
                'createdAt': firebase.database.ServerValue.TIMESTAMP,
                'modifiedBy': '',
                'modiefiedAt': ''
            });
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        },
        deleteTask: function(item){
            return items.$remove(item);
        }
    }
    
    return todos;
}])

*/