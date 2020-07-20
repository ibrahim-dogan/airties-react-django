// frontend/src/App.js

import React, {Component} from "react";
import axios from "axios";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import TimeAgo from 'javascript-time-ago'
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newTaskInput: '',
            filter: 'all',
            selectedItem: {},
            modal: false,
            authModal: true,
            todoList: [],
            auth: {},
            signupOrLogin: 'login',
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    readLocalStorage = () => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        let auth = (username && password) ? {username, password} : false;
        if (auth) {
            this.setState({auth})
        }
        return auth
    };

    refreshList = () => {
        const localAuth = this.readLocalStorage();
        axios
            .get("http://localhost:8000/api/tasks/", {auth: localAuth ? localAuth : this.state.auth})
            .then(res => {
                localStorage.setItem('username', this.state.auth.username);
                localStorage.setItem('password', this.state.auth.password);
                this.setState({todoList: res.data, authModal: false})
            })
            .catch(err => {
                console.log(err.response.status);
                if (err.response.status === 401) {
                    this.setState({authModal: true})
                }
            });
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
                                onClick={() => this.toggle(item)}><small>Delete</small></button>
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
            <button key={index}
                    className={`ml-1 btn btn-sm btn-outline-primary ${this.state.filter === tag ? 'active' : ''}`}
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
        const localAuth = this.readLocalStorage();
        axios
            .post("http://localhost:8000/api/tasks/", item, {auth: localAuth ? localAuth : this.state.auth})
            .then(res => this.refreshList())
            .catch(err => {
                console.log(err.response.status);
                if (err.response.status === 401) {
                    this.setState({authModal: true})
                }
            });
    };
    handleDone = item => {
        const localAuth = this.readLocalStorage();

        item.is_completed = !item.is_completed;
        axios
            .put(`http://localhost:8000/api/tasks/${item.id}/`, item, {auth: localAuth ? localAuth : this.state.auth})
            .then(res => this.refreshList())
            .catch(err => {
                console.log(err.response.status);
                if (err.response.status === 401) {
                    this.setState({authModal: true})
                }
            });
    };
    handleDelete = item => {
        const localAuth = this.readLocalStorage();

        this.setState({modal: false});
        axios
            .delete(`http://localhost:8000/api/tasks/${item.id}`, {auth: localAuth ? localAuth : this.state.auth})
            .then(res => this.refreshList())
            .catch(err => {
                console.log(err.response.status);
                if (err.response.status === 401) {
                    this.setState({authModal: true})
                }
            });
    };

    handleChange = e => {
        let {name, value} = e.target;

        const auth = {...this.state.auth, [name]: value};
        this.setState({auth});
    };

    handleAuth = () => {
        const auth = this.state.auth;
        if (this.state.signupOrLogin === 'login') {
            this.refreshList()
        } else {
            axios.post("http://localhost:8000/api/users/", auth)
                .then(res => {
                    if (res.status === 201) {
                        this.setState({auth: auth});
                        this.refreshList()
                    }
                })
        }
    };

    createItem = (event) => {
        if (event.key === 'Enter') {
            const item = {task: this.state.newTaskInput};
            this.handleSubmit(item);
            this.refreshList();
            this.setState({newTaskInput: ''});
        }
    };

    logout = () => {
        localStorage.clear();
        window.location.reload(false);
    };

    render() {
        return (
            <div className="container-fluid text-dark">
                {!this.state.authModal &&
                <main>
                    <div className="row bg-light pl-5 pr-5 pt-1 pb-1 mb-3">
                        <div className="col-8 offset-2">
                            <div className="form-group mt-3">
                                <input autoComplete="off" name="task" type="text" className="form-control"
                                       value={this.state.newTaskInput}
                                       onChange={(e) => {
                                           this.setState({newTaskInput: e.target.value})
                                       }}
                                       onKeyDown={this.createItem}
                                       placeholder="Task to be done.. You can use #tag to tag your task."/>
                                <small className="form-text text-muted text-center"><b>🛎️ Tip:</b> Please
                                    press <kbd>↵</kbd> key to automaticly create a task. You can use #tag to tag your
                                    task.</small>
                                <p className='text-center mt-2'>Logged as {this.state.auth.username}
                                    <span className='text-primary cursor-pointer'
                                          onClick={this.logout}> logout</span>.</p>
                                <div className="invalid-feedback"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6 offset-3">
                            {this.state.todoList.length > 0 ?
                                <button
                                    className={`btn btn-outline-primary ${this.state.filter === 'all' ? 'active' : ''}`}
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
                </main>
                }
                {this.renderDeleteModal()}
                {this.renderLoginModal()}
            </div>
        );
    }

    renderDeleteModal() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}> Todo Item </ModalHeader>
                <ModalBody>
                    {this.state.selectedItem.task}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => this.handleDelete(this.state.selectedItem)}>
                        Remove
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

    renderLoginModal() {
        return (
            <Modal isOpen={this.state.authModal}>
                <ModalBody>
                    <h1 className={`d-inline cursor-pointer ${this.state.signupOrLogin === 'login' ? 'text-primary' : 'text-secondary'} `}
                        onClick={() => this.setState({signupOrLogin: 'login'})}>Login</h1>
                    <h1 className={`d-inline cursor-pointer ml-2 ${this.state.signupOrLogin === 'signup' ? 'text-primary' : 'text-secondary'} `}
                        onClick={() => this.setState({signupOrLogin: 'signup'})}>Sign
                        up</h1>
                    <Form>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="username" name="username" id="username"
                                   onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password"
                                   onChange={this.handleChange}/>
                        </FormGroup>
                        <Button onClick={this.handleAuth}>Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }

    toggle = (item) => {
        this.setState({selectedItem: item, modal: !this.state.modal});
    };
}

export default App;
