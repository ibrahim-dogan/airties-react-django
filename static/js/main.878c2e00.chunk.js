(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,t,a){e.exports=a(55)},33:function(e,t,a){},55:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),o=a(5),l=a.n(o),i=(a(31),a(33),a(7)),r=a(8),s=a(11),m=a(9),d=a(12),u=a(10),h=a(24),p=a(3),v=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){var t=e.target,n=t.name,c=t.value;"checkbox"===e.target.type&&(c=e.target.checked);var o=Object(h.a)({},a.state.activeItem,Object(u.a)({},n,c));a.setState({activeItem:o})},a.state={activeItem:a.props.activeItem},a}return Object(d.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.toggle,n=t.onSave;return c.a.createElement(p.f,{isOpen:!0,toggle:a},c.a.createElement(p.i,{toggle:a}," Todo Item "),c.a.createElement(p.g,null,c.a.createElement(p.b,null,c.a.createElement(p.c,null,c.a.createElement(p.e,{for:"title"},"Title"),c.a.createElement(p.d,{type:"text",name:"title",value:this.state.activeItem.title,onChange:this.handleChange,placeholder:"Enter Todo Title"})),c.a.createElement(p.c,null,c.a.createElement(p.e,{for:"description"},"Description"),c.a.createElement(p.d,{type:"text",name:"description",value:this.state.activeItem.description,onChange:this.handleChange,placeholder:"Enter Todo description"})),c.a.createElement(p.c,{check:!0},c.a.createElement(p.e,{for:"completed"},c.a.createElement(p.d,{type:"checkbox",name:"completed",checked:this.state.activeItem.completed,onChange:this.handleChange}),"Completed")))),c.a.createElement(p.h,null,c.a.createElement(p.a,{color:"success",onClick:function(){return n(e.state.activeItem)}},"Save")))}}]),t}(n.Component),f=a(6),E=a.n(f),g=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).refreshList=function(){E.a.get("http://localhost:8000/api/tasks/").then(function(e){return a.setState({todoList:e.data})}).catch(function(e){return console.log(e)})},a.displayCompleted=function(e){return e?a.setState({viewCompleted:!0}):a.setState({viewCompleted:!1})},a.renderTabList=function(){return c.a.createElement("div",{className:"my-5 tab-list"},c.a.createElement("span",{onClick:function(){return a.displayCompleted(!0)},className:a.state.viewCompleted?"active":""},"complete"),c.a.createElement("span",{onClick:function(){return a.displayCompleted(!1)},className:a.state.viewCompleted?"":"active"},"Incomplete"))},a.renderItems=function(){var e=a.state.viewCompleted;return a.state.todoList.filter(function(t){return t.is_completed===e}).map(function(e){return c.a.createElement("li",{key:e.id,className:"list-group-item d-flex justify-content-between align-items-center"},c.a.createElement("span",{className:"todo-title mr-2 ".concat(a.state.viewCompleted?"completed-todo":""),task:e.created_at},e.task),c.a.createElement("span",null,c.a.createElement("button",{onClick:function(){return a.editItem(e)},className:"btn btn-secondary mr-2"}," ","Edit"," "),c.a.createElement("button",{onClick:function(){return a.handleDelete(e)},className:"btn btn-danger"},"Delete"," ")))})},a.toggle=function(){a.setState({modal:!a.state.modal})},a.handleSubmit=function(e){a.toggle(),e.id?E.a.put("http://localhost:8000/api/tasks/".concat(e.id,"/"),e).then(function(e){return a.refreshList()}):E.a.post("http://localhost:8000/api/tasks/",e).then(function(e){return a.refreshList()})},a.handleDelete=function(e){E.a.delete("http://localhost:8000/api/tasks/".concat(e.id)).then(function(e){return a.refreshList()})},a.createItem=function(){a.setState({activeItem:{task:"",created_at:"",is_completed:!1},modal:!a.state.modal})},a.editItem=function(e){a.setState({activeItem:e,modal:!a.state.modal})},a.state={viewCompleted:!1,activeItem:{task:"",created_at:"",is_completed:!1},todoList:[]},a}return Object(d.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.refreshList()}},{key:"render",value:function(){return c.a.createElement("main",{className:"content"},c.a.createElement("h1",{className:"text-white text-uppercase text-center my-4"},"Todo app"),c.a.createElement("div",{className:"row "},c.a.createElement("div",{className:"col-md-6 col-sm-10 mx-auto p-0"},c.a.createElement("div",{className:"card p-3"},c.a.createElement("div",{className:""},c.a.createElement("button",{onClick:this.createItem,className:"btn btn-primary"},"Add task")),this.renderTabList(),c.a.createElement("ul",{className:"list-group list-group-flush"},this.renderItems())))),this.state.modal?c.a.createElement(v,{activeItem:this.state.activeItem,toggle:this.toggle,onSave:this.handleSubmit}):null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[26,2,1]]]);
//# sourceMappingURL=main.878c2e00.chunk.js.map