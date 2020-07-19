// frontend/src/App.js

import React, {Component} from "react";
import axios from "axios";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import TimeAgo from 'javascript-time-ago'
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTaskInput: '',
            filter: 'all',
            todoList: []
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("http://localhost:8000/api/tasks/")
            .then(res => this.setState({todoList: res.data}))
            .catch(err => console.log(err));
    };
    renderItems = () => {
        let {todoList} = this.state;
        if (this.state.filter !== 'all')
            todoList = todoList.filter((todo) => {
                return todo.task.includes(this.state.filter)
            });
        return todoList.map(item => (

            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex w-100 justify-content-between">
                    <div className="text-center switch-button-todo">
                        <BootstrapSwitchButton
                            onstyle="success"
                            checked={item.is_completed}
                            onlabel='✓'
                            offlabel='✓'
                            onChange={() => this.handleDone(item)}
                        />
                    </div>
                    <div className={`pl-3 pr-3 ${item.is_completed ? 'line-through' : ''}`}>
                        {this.renderTask(item.task)}
                    </div>
                    <div className="text-center time-ago">
                        <small>{timeAgo.format(new Date(item.created_at))}</small><br/>
                        <button type="button" className="btn btn-sm btn-link btn-delete"
                                onClick={() => this.handleDelete(item)}><small>Delete</small></button>
                    </div>

                </div>
            </li>
        ));
    };
    renderTags = () => {
        const {todoList} = this.state;
        let tags = [];
        todoList.forEach(item => {
            const taskTags = item.task.match(/#\w[^!\W]+/g);
            console.log(taskTags);
            if (taskTags)
                tags.push(...taskTags);
        });
        tags = new Set(tags);
        tags = [...tags];
        return tags.map((tag, index) => (
            <button key={index} className={`ml-1 btn btn-sm btn-outline-primary ${this.state.filter === tag ? 'active' : ''}`}
                    onClick={() => this.setState({filter: tag})}>{tag}
            </button>
        ));
    };
    renderTask = (task) => {
        // const taskTags = task.match(/(?<hashtag>#\w[^!\W]+)|(?<nonhashtag>\w[^!\W]+)/g);
        const taskTags = task.split(' ');

        return taskTags.map((token, index) => (
            token.includes('#') ?
                <a className='mr-1 text-primary cursor-pointer'
                   key={index}
                   onClick={() => this.setState({filter: token})}>
                    {token}
                </a> : token + " "
        ));
    };

    handleSubmit = item => {
        axios
            .post("http://localhost:8000/api/tasks/", item)
            .then(res => this.refreshList());
    };
    handleDone = item => {
        item.is_completed = !item.is_completed;
        axios
            .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
            .then(res => this.refreshList());
    };
    handleDelete = item => {
        axios
            .delete(`http://localhost:8000/api/tasks/${item.id}`)
            .then(res => this.refreshList());
    };

    handleChange = e => {
        this.setState({temperature: e.target.value});
    };

    createItem = (event) => {
        if (event.key === 'Enter') {
            const item = {task: this.state.newTaskInput};
            this.handleSubmit(item);
            this.refreshList();
            this.setState({newTaskInput: ''});
        }
    };

    render() {
        return (
            <div className="container-fluid text-dark">
                <div className="row bg-light pl-5 pr-5 pt-1 pb-1 mb-3">
                    <div className="col-8 offset-2">
                        <div className="form-group mt-3">
                            <input autoComplete="off" name="task" type="text" className="form-control"
                                   value={this.state.newTaskInput}
                                   onChange={(e) => {
                                       this.setState({newTaskInput: e.target.value})
                                   }}
                                   onKeyDown={this.createItem}
                                   placeholder="Task to be done.."/>
                            <small className="form-text text-muted text-center"><b>🛎️ Tip:</b> Please
                                press <kbd>↵</kbd> key to automaticly create a task.</small>
                            <div className="invalid-feedback"></div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 offset-3">
                        {this.state.todoList.length > 0 ?
                            <button className={`btn btn-outline-primary ${this.state.filter === 'all' ? 'active' : ''}`}
                                    onClick={() => this.setState({filter: 'all'})}>All
                            </button>
                            : 'Please add some todos.'}
                        {this.renderTags()}

                    </div>
                </div>

                <div className="row">
                    <div className="col-6 offset-3">
                        <ul className="list-group list-group-flush">
                            {this.renderItems()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
