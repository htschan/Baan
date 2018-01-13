



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