import Vuex from 'vuex'
import vue from 'vue'
import axios from 'axios'

vue.use(Vuex)

function getTodos(){

}

const store  = new Vuex.Store({
    state:{
        todolist:JSON.parse(localStorage.getItem('todolist') || '[]'),
        
    },
    mutations:{
        addtodo(state,info){
            state.todolist.push(
                {'info':info,'state':true,'edit':false}
            );
            console.log(state.todolist)
        },
        delectodo(state,info){
            let _index;
            state.todolist.map(function(item,index){
                if(item.info == info){
                    _index = index
                }
            })
            state.todolist.splice(_index,1);
        },
        changestate(state,info){
            state.todolist.map(function(item){
                if(item.info == info){
                    item.state = !item.state;
                }
            })
        },
        delectodoed:function(state){
            // console.log(state.todolist.filter(item => item.state))
            // const result = state.todolist.filter(item => item.state);
            // state.todolist = result;
            // if(state.todolist.some(item => item.state)){
            //     state.map(function(item,index){
            //     })
            // }
            state.todolist = state.todolist.filter(item => item.state);
            localStorage.setItem("todolist", JSON.stringify(state.todolist));
        },
        todostateAll(state){
            state.todolist.forEach(item => item.state = !state.allchecked);
            
        },
        changetodo(state,info){
            state.todolist.map(function(item){
                if(item.info == info.old){
                    item.info = info.new;
                }
            })
        },
        clear:function(){
            state.todolist = [];
        },
        all:function(state){
            console.log(state.todolist);
            console.log(JSON.parse(localStorage.getItem('todolist') || '[]'));
            state.todolist = JSON.parse(localStorage.getItem('todolist') || '[]')
        }
    },
    getters:{
        active:function(state){
            return state.todolist.filter((item) => item.state)
        },
        completed:function(state){
            return state.todolist.filter((item) => !item.state)
        },
        all:function(state){
            return state.todolist
        },
        donetodos:state => {
            return state.todolist.filter(todo => todo.state)
        }
    },
    actions:{
        addtodo (context){
            context.commit('addtodo');
        },
        getInfo(){
            axios.get('http://localhost:3030/todos').then(data =>{
                var ss = data;
                console.log(data);
            })
        }
    }

})

export default store

