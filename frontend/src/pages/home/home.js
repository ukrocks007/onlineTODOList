import React, {
    Component
} from 'react';
import SiteWrapper from '../container/layout';
import {
    Page, Card, Button, Form, Grid, List, Container, Alert
} from 'tabler-react';
import axios from 'axios';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            currentindex: -1,
            currentList: {},
            currentTodos: [],
            editMode: false,
            loading: false,
            AlertText: "",
            AlertType: "danger",
            removeLoader: false,
        }
    }

    componentDidMount = () => {
        if (!localStorage.user) {
            this.props.history.push('/login');
        }
        this.getAllToDos();
        console.log(localStorage.user);
    }

    getAllToDos = async () => {
        try {
            axios.get('/apis/todo')
                .then((res) => {
                    if (res.data.success) {
                        this.setState({
                            todoList: res.data.todo,
                        });
                        if(res.data.todo.length > 0){
                            this.onListChanged((this.state.currentindex >=0 && this.state.currentindex <= (res.data.todo.length - 1)) 
                            ? this.state.currentindex : 0);
                        } else {
                            this.setState({
                                currentList: {},
                                currentTodos: [],
                                currentindex: -1,
                            });
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (ex) {
            console.log(ex);
        }
    }

    create = async () => {
        try {
            if (this.state.currentList.list.length > 0) {
                this.setState({
                    AlertText: "",
                    AlertType: "danger",
                    createLoader: true,
                    newList: false
                });
                axios.post('/apis/todo', {
                        newList: this.state.currentList,
                    })
                    .then((res) => {
                        if (res.data.success) {
                            this.setState({
                                AlertText: "New Todo List added!",
                                AlertType: "success",
                                createLoader: false
                            });
                        }
                        this.getAllToDos();
                    })
                    .catch(err => {
                        this.setState({
                            AlertText: err,
                            AlertType: "danger",
                            createLoader: false
                        });
                        console.log(err);
                    });
            } else {
                this.setState({
                    AlertText: "Please add at least one task",
                    AlertType: "danger",
                });
            }
        } catch (ex) {
            this.setState({
                AlertText: ex.message,
                AlertType: "danger",
                createLoader: false
            });
            console.log(ex);
        }
    }

    update = async () => {
        try {
            this.setState({
                loading: true,
                AlertText: "",
                AlertType: "danger",
            });
            axios.post('/apis/todo/update', {
                updatedList: this.state.currentList
            })
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        AlertText: "List Updated!",
                        AlertType: "success"
                    });
                    this.getAllToDos();
                }
                this.setState({
                    loading: false
                });
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    AlertText: err,
                    AlertType: "danger"
                });
                console.log(err);
            });
        } catch (ex) {
            this.setState({
                loading: false,
                AlertText: ex.message,
                AlertType: "danger"
            });
            console.log(ex);
        }
    }

    remove = async () => {
        try {
            this.setState({
                removeLoader: true,
                AlertText: "",
                AlertType: "danger",
            });
            axios.post('/apis/todo/remove', {
                    "id": this.state.currentList._id
                })
                .then((res) => {
                    if (res.data.success) {
                        this.setState({
                            removeLoader: false,
                            AlertText: "ToDo list deleted!",
                            AlertType: "success"
                        });
                        this.getAllToDos();
                    }
                })
                .catch(err => {
                    this.setState({
                        removeLoader: false,
                        AlertText: err,
                        AlertType: "danger"
                    });
                    console.log(err);
                });
        } catch (ex) {
            this.setState({
                removeLoader: false,
                AlertText: ex.message,
                AlertType: "danger"
            });
            console.log(ex);
        }
    }

    initiateNewTodo = () => {
        this.setState({
            newList: true,
            currentList: {
                title: "",
                list: [],
                AlertText: "",
                AlertType: "danger",
            },
            currentTodos: []
        });
    }

    resetNew = () => {
        this.setState({
            newList: false,
            AlertText: "",
            AlertType: "danger",
        });
        let index = this.state.currentindex >=0 ? this.state.currentindex : 0;
        if (this.state.todoList.length >= (index+ 1)) {
            this.setState({
                currentList: this.state.todoList[index],
                currentTodos: this.state.todoList[index].list,
                currentindex: index,
            });
        }
    }

    addNewTodoItem = () => {
        let newItem = {
            item: this.state.newTodoItem,
            done: false,
            timeStemp: +new Date()
        }
        let currentList = this.state.currentList;
        currentList.list.push(newItem);
        this.setState({
            currentList: currentList,
            currentTodos: currentList.list,
            newTodoItem: "",
        });
    }

    toggleChecked = (index) => {
        let currentList = this.state.currentList;
        currentList.list[index].done = !currentList.list[index].done;
        let allTodos = this.state.todoList;
        allTodos[this.state.currentindex] = currentList;
        this.setState({
            todoList: allTodos,
            currentList: currentList
        });
    }

    onListChanged = (index) => {
        if (this.state.todoList.length >= (index + 1) && !this.state.newList) {
            this.setState({
                currentList: this.state.todoList[index],
                currentTodos: this.state.todoList[index].list,
                currentindex: index,
            });
        }
    }

    handleTodoTitleChange = (e) => {
        let currentList = this.state.currentList;
        currentList[e.target.name] = e.target.value;
        this.setState({
            currentList: currentList
        });
    }

    handleTodoTextChange = (e) => {
        let currentList = this.state.currentList;
        currentList.list[e.target.name].item = e.target.value;
        this.setState({
            currentList: currentList
        });
    }

    handleTodoItemRemove = (e) => {
        let currentList = this.state.currentList;
        currentList.list.splice(e.target.name, 1);
        this.setState({
            currentList: currentList
        });
    }
      
  render() {
    return (
      <SiteWrapper>
        <div className="my-3 my-md-5">
        <Container>
          <Grid.Row>
            <Grid.Col md={3}>
              <Page.Title className="mb-5">Your Todo lists</Page.Title>
              <div>
                <List.Group transparent={true}>
                    {
                        this.state.todoList.map((data, i) => {
                            return (
                                <List.GroupItem
                                    key={i}
                                    className="d-flex align-items-center"
                                    to='#'
                                    active={this.state.currentindex == i}
                                    action
                                >
                                    <div style={{width: '100%'}} onClick={this.onListChanged.bind(this, i)}>{data.title ? data.title : "Untitled"}</div>
                                </List.GroupItem>
                            )
                        })
                    }
                </List.Group>
                <div className="mt-6">
                  <Button
                    block={true}
                    color="primary"
                    icon="plus"
                    onClick={this.initiateNewTodo}
                    disabled={this.state.newList}
                  >
                    New List
                  </Button>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col md={9}>
                <div style={{marginTop: '10%'}}>
                {!this.state.newList ?
                    this.state.editMode ? (
                        <Card>
                        <Card.Header>
                            <Card.Title><Form.Input name="title" value={this.state.currentList.title} onChange={this.handleTodoTitleChange} /></Card.Title>
                            <Card.Options>
                            <Button 
                                color={this.state.editMode ? "success" : "info"} 
                                size="sm" 
                                icon={this.state.editMode ? "check" : "edit"} 
                                onClick={()=>{
                                this.setState({editMode: !this.state.editMode})
                            }}>
                                {this.state.editMode ? "Done" : "Edit"}
                            </Button>
                            <Button disabled={this.state.editMode} loading={this.state.removeLoader} color="danger" size="sm" className="ml-2" icon="trash-2" onClick={this.remove.bind(this)}>
                                Remove
                            </Button>
                            </Card.Options>
                        </Card.Header>
                        <Card.Body>
                        <Form.Group label="Tasks">
                            {
                                this.state.currentTodos.map((data, i) => {
                                    return (
                                            <Form.InputGroup key={i}>
                                                <Form.Input name={i} value={data.item} onChange={this.handleTodoTextChange.bind(this)}/>
                                                <Form.InputGroupAppend>
                                                <Button
                                                    name={i}
                                                    color="danger"
                                                    icon="x"
                                                    outline
                                                    onClick={this.handleTodoItemRemove.bind(this)}
                                                >
                                                </Button>
                                                </Form.InputGroupAppend>
                                            </Form.InputGroup>
                                    )
                                })
                            }
                            <Form.InputGroup>
                                <Form.Input value={this.state.newTodoItem} onChange={e => {this.setState({newTodoItem: e.target.value})}}/>
                                <Form.InputGroupAppend>
                                <Button
                                    color="primary"
                                    icon="plus"
                                    outline
                                    onClick={this.addNewTodoItem.bind(this)}
                                >
                                </Button>
                                </Form.InputGroupAppend>
                            </Form.InputGroup>
                        </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <div style={{float:"right"}}>
                                <Button disabled={this.state.editMode} loading={this.state.loading} color="primary" icon="repeat" onClick={this.update.bind(this)}>Update</Button>
                            </div>
                        </Card.Footer>
                    </Card>
                    ) : (
                        <Card>
                        <Card.Header>
                            <Card.Title>{this.state.currentList ? this.state.currentList.title : ""}</Card.Title>
                            <Card.Options>
                            <Button 
                                color={this.state.editMode ? "success" : "info"} 
                                size="sm" 
                                icon={this.state.editMode ? "check" : "edit"} 
                                onClick={()=>{
                                this.setState({editMode: !this.state.editMode})
                            }}>
                                {this.state.editMode ? "Done" : "Edit"}
                            </Button>
                            <Button disabled={this.state.editMode} loading={this.state.removeLoader} color="danger" size="sm" className="ml-2" icon="trash-2" onClick={this.remove.bind(this)}>
                                Remove
                            </Button>
                            </Card.Options>
                        </Card.Header>
                        <Card.Body>
                        <Form.Group label="Tasks">
                            {
                                this.state.currentTodos.map((data, i) => {
                                    return (
                                            <Form.Checkbox 
                                                key = { i }
                                                checked = { data.done } 
                                                onChange = { this.toggleChecked.bind(this, i) }
                                                label = { data.item } 
                                                name = { i } 
                                            />
                                    )
                                })
                            }
                        </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <div style={{float:"right"}}>
                                <Button disabled={this.state.editMode} loading={this.state.loading} color="primary" icon="repeat" onClick={this.update.bind(this)}>Update</Button>
                            </div>
                        </Card.Footer>
                    </Card>
                    ) : (
                        <Card>
                        <Card.Header>
                            <Card.Title><Form.Input name="title" value={this.state.currentList.title} onChange={this.handleTodoTitleChange} /></Card.Title>
                            <Card.Options>
                            <Button 
                                color="success"
                                size="sm" 
                                icon="check"
                                loading={this.state.createLoader}
                                onClick={this.create.bind(this)}>
                                Save
                            </Button>
                            <Button color="danger" size="sm" className="ml-2" icon="trash-2" onClick={this.resetNew.bind(this)}>
                                Reset
                            </Button>
                            </Card.Options>
                        </Card.Header>
                        <Card.Body>
                        <Form.Group label="Tasks">
                            {
                                this.state.currentTodos.map((data, i) => {
                                    return (
                                            <Form.InputGroup key={i}>
                                                <Form.Input name={i} value={data.item} onChange={this.handleTodoTextChange.bind(this)}/>
                                                <Form.InputGroupAppend>
                                                <Button
                                                    color="primary"
                                                    icon="x"
                                                    outline
                                                    onClick={this.handleTodoItemRemove.bind(this)}
                                                >
                                                </Button>
                                                </Form.InputGroupAppend>
                                            </Form.InputGroup>
                                    )
                                })
                            }
                            <Form.InputGroup>
                                <Form.Input value={this.state.newTodoItem} onChange={e => {this.setState({newTodoItem: e.target.value})}}/>
                                <Form.InputGroupAppend>
                                <Button
                                    color="primary"
                                    icon="plus"
                                    outline
                                    onClick={this.addNewTodoItem.bind(this)}
                                >
                                </Button>
                                </Form.InputGroupAppend>
                            </Form.InputGroup>
                        </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <div style={{float:"right"}}>
                                <Button disabled={this.state.editMode || this.state.newList} loading={this.state.loading} color="primary" icon="repeat" onClick={this.update.bind(this)}>Update</Button>
                            </div>
                        </Card.Footer>
                    </Card>
                    )
                    }
                    <div style={{
                        display: this.state.AlertText ? "block" : "none"
                    }}>
                        <Alert type = { this.state.AlertType } icon = {
                            this.state.AlertType == "success" ? "check" : "alert-triangle"
                        }>
                            {this.state.AlertText}
                        </Alert>
                    </div>
                </div>
            </Grid.Col>
          </Grid.Row>
        </Container>
      </div>
      </SiteWrapper>
    );
  }
}

export default Home;
