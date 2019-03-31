<template>
  <div class="app">
    <div class="title">
      <h1 v-html="title"></h1>
    </div>
    <div class="main">
      <div class="new-todo">
        <!-- <input type="checkbox" name id class="todolistSelectAll" v-model="allchecked" v-show="todolist.some(item => !item.state)"> -->
        <input
          type="checkbox"
          class="todolistSelectAll"
          v-model="allchecked"
          v-show="todolist.length"
        >

        <input
          type="text"
          name
          id
          class="userinput"
          placeholder="What needs to be done?"
          v-model="newtodo"
          @keyup.enter="addtodo"
        >
      </div>
    </div>
    <div class="todolist">
      <div class="listinfo">
        <ul>
          <li v-for="item in todolist" :key="item.id">
            <div v-show="!item.edit">
              <input type="checkbox" class="todoCheck" v-model="item.state">
              <span
                v-html="item.info"
                v-bind:class="{finshtodo: !item.state }"
                @dblclick="change_todo(item)"
              ></span>
              <button class="delete" @click="delect(item.info)"></button>
            </div>
            <input
              type="text"
              class="userChangeTodo"
              v-model="item.info"
              v-focus=" item == changetodo"
              v-show="item.edit"
              @blur="changetodoinfo(item)"
              v-on:change="changetodoinfo(item)"
            >
          </li>
        </ul>
      </div>
      <div class="listbutton" v-show="todolist.length">
        <span v-show="todolist.length">{{todolist.filter(item => item.state).length}} items left</span>
        <button v-on:click="showtodolist('all')">All</button>
        <button v-on:click="showtodolist('Active')">Active</button>
        <button v-on:click="showtodolist('Completed')">Completed</button>
        <button
          class="cleartodo"
          @click="cleartodos()"
          v-show="todolist.some(item => !item.state)"
        >Clear completed</button>
      </div>
    </div>
  </div>
</template>
<script>
import store from "./../store/index.js";
export default {
  data() {
    return {
      title: "todos",
      newtodo: "",
      todolist: [],
      changetodo: "",
      allchecked: false
    };
  },
  store,
  mounted() {
    this.getData();
    console.log("asdasdad");
  },
  methods: {
    showtodolist: function(type) {
      console.log(type);
      switch (type) {
        case "Active":
          return this.todolist.filter(item => !item.state);
          break;
        case "Completed":
          return this.todolist.filter(item => item.state);
          break;
        default:
          return this.todolist;
          break;
      }
    },
    getData: function() {
      this.todolist = this.$store.state.todolist;
      this.allchecked = this.$store.state.todolist.some(item => item.state);
    },
    change_todo: function(info) {
      info.edit = true;
      this.changetodo = info;
    },
    addtodo: function() {
      if (this.newtodo.replace(/^\s+|\s+$/g, "")) {
        this.$store.commit("addtodo", this.newtodo);
        this.newtodo = "";
      }
    },
    delect: function(info) {
      this.$store.commit("delectodo", info);
    },
    commitlocalstogre: function() {
      localStorage.setItem("todolist", JSON.stringify(this.todolist));
    },
    cleartodos: function(info) {
      console.log("123456");
      this.$store.commit("delectodoed");
    },
    activetodolist: function() {
      // console.log('1111')
      // console.log(this.$store.getters.donetodos);
      // console.log(this.$store.getters.active);
      // return this.$store.getters.active.length + "items left"
    },
    changetodoinfo: function(todoinfo) {
      if (todoinfo.info) {
        todoinfo.edit = false;
        this.changetodo = null;
        this.$store.commit("changetodo", todoinfo.info);
      } else {
        this.$store.commit("delectodo", todoinfo.info);
      }
      console.log("unfouce");
    }
  },
  watch: {
    // todolist: function() {
    //   console.log(this.todolist);
    //   localStorage.setItem("todolist", JSON.stringify(this.todolist));
    //   console.log(this.allchecked);
    //   this.allchecked = this.$store.state.todolist.some(item => item.state);
    //   console.log(this.allchecked);
    // },
    // allchecked: function() {
    //   this.todolist.forEach(item => (item.state = !this.allchecked));
    // }
    todolist: {
      deep: true,
      handler: function() {
        localStorage.setItem("todolist", JSON.stringify(this.todolist));
      },
      allchecked: function() {
        this.todolist.forEach(item => (item.state = !this.allchecked));
      }
    }
  },
  directives: {
    focus: {
      componentUpdated: function(el, bing) {
        if (bing.value) {
          el.focus();
        }
      }
    }
  }
};
</script>

<style scoped>
.main {
  max-width: 550px;
  margin: 0 auto 0;
  background: rgba(0, 0, 0, 0);
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
.title h1 {
  font-size: 100px;
  color: rgba(255, 0, 0, 0.1);
}
.new-todo {
  position: relative;
  width: 550px;
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.new-todo .todolistSelectAll {
  width: 50px;
  height: 50px;
  transform: rotate(90deg);
  -webkit-appearance: none;
  outline: none;
  position: absolute;
  margin: 0;
  margin-top: -10px;
  margin-left: -10px;
  transition: 0.6s;
}
.new-todo .todolistSelectAll::before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}
.new-todo .todolistSelectAll:checked:before {
  color: #737373;
  transition: 0.6s;
}
.new-todo .userinput {
  width: 500px;
  height: 50px;
  margin-left: 50px;
  font-size: 22px;
  border: 0;
  padding: 0;
  outline: none;
}
.new-todo .userinput::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.2);
  font-style: oblique;
  font-size: 22px;
}
.todolist {
  max-width: 550px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 1);
}
.todolist .listinfo ul,
li {
  position: relative;
  list-style: none;
  margin: 0;
  text-align: left;
  padding: 0;
  border: 0;
}
.todolist .listinfo ul li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.todolist .listinfo .todoCheck {
  width: 50px;
  height: 50px;
  -webkit-appearance: none;
  outline: none;
  margin: 0;
  float: left;
  padding: 5px 0 5px;
  margin: auto 0;
  top: 0;
  bottom: 0;
  position: absolute;
}
.todolist .listinfo .todoCheck::after {
  content: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
}
.todolist .listinfo .todoCheck:checked:after {
  content: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
}
.todolist .listinfo span {
  width: 450px;
  margin-left: 50px;
  display: inherit;
  line-height: 50px;
  font-size: 22px;
  white-space: pre-line;
  word-break: break-all;
}
.todolist .listinfo li:hover > bottom {
  display: block;
}
.todolist .listinfo .delete {
  position: absolute;
  background: rgba(0, 0, 0, 0);
  border: 0px;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  outline: none;
  opacity: 0.5;
}
.todolist .listinfo .delete::after {
  content: "x";
}

.todolist .listinfo .delete:hover {
  opacity: 1;
}
.todolist .listinfo .userChangeTodo {
  width: 499px;
  height: 50px;
  margin-left: 50px;
  font-size: 22px;
  border: 0;
  padding: 0;
  outline: none;
}
.todolist .listinfo .userChangeTodo:focus {
  border: 1px solid rgba(0, 0, 0, 0.8);
}
.todolist .listinfo .todoOver {
  text-decoration: line-through;
  opacity: 0.2;
}
.listbutton {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: left;
  border-top: 1px solid #e6e6e6;
  position: relative;
  z-index: 1;
  padding-left: 25px;
}
.listbutton span {
  margin-left: -10px;
  margin-right: 100px;
}
.listbutton button {
  border: 1px solid rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  color: inherit;
  outline: none;
}
.listbutton button:hover {
  border: 1px solid rgba(255, 0, 0, 0.2);
  border-radius: 3px;
}
.listbutton .btnchecked {
  border: 1px solid rgba(255, 0, 0, 0.2);
  border-radius: 3px;
}
.listbutton a {
  margin-left: 40px;
  color: inherit;
  text-decoration: none;
}
.listbutton a:hover {
  text-decoration: underline;
}
.listbutton::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  z-index: -1;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}
.finshtodo {
  text-decoration: line-through;
  opacity: 0.4;
  transition: 0.4s;
}
.cleartodo {
  position: absolute;
  right: 50px;
}
</style>