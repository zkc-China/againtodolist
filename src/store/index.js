import Vuex from 'vuex'
import vue from 'vue'
import axios from 'axios'

vue.use(Vuex)

function getTodos() {

}
const store = new Vuex.Store({
    state: {
        todolist: [],
    },
    mutations: {
        addtodo(state, info) {
            state.todolist.push(
                {'info':info,'state':true,'edit':false}
            );
        },
        todoinfo: function (state) {
            
        },
        delectodo(state, info) {
            let _index;
            state.todolist.map(function (item, index) {
                if (item.info == info) {
                    _index = index
                }
            })
            state.todolist.splice(_index, 1);
        },
        changestate(state, info) {
            state.todolist.map(function (item) {
                if (item.info == info) {
                    item.state = !item.state;
                }
            })
        },
        delectodoed: function (state) {
            state.todolist = state.todolist.filter(item => item.state);
        },
        todostateAll(state) {
            state.todolist.forEach(item => item.state = !state.allchecked);

        },
        changetodo(state, info) {
            state.todolist.map(function (item) {
                if (item.info == info.old) {
                    item.info = info.new;
                }
            })
        },
        clear: function () {
            state.todolist = [];
        },
        all: function (state) {
            console.log('commit all')

        },
    },
    getters: {
        active: function (state) {
            return state.todolist.filter((item) => item.state)
        },
        completed: function (state) {
            return state.todolist.filter((item) => !item.state)
        },
        all: function (state) {
            return state.todolist
        },
        donetodos: state => {
            return state.todolist.filter(todo => todo.state)
        }
    },
    actions: {
        addTasktolist(context, info) {
            context.commit("addtodo", info);
            context.dispatch('postDataserver');
        },
        getTodolistInfo(context){
            axios.get('/api/getodos/?todos')
                .then(req => context.state.todolist = req.data);
        },
        delectodo(context,info){
            context.commit("delectodo", info);
            context.dispatch('postDataserver');
        },
        postDataserver(context){
            axios({
                url: '/api/todos',
                method: "post",
                data: context.state.todolist,
            })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        delectodoed(context){
            context.commit('delectodoed');
            context.dispatch('postDataserver');
        },
        changetodo(context){
            context.commit('changetodo');
            context.dispatch('postDataserver');
        }
        
    }

})

export default store

