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
            axios.get('/apis/todo')
            .then((res) => {
                
            })
            .catch(err => {
                console.log(err);
            });
        } catch (ex) {
            console.log(ex);
        }
    }

    update = async () => {
        try {
            this.setState({
                loading: true
            });
            axios.post('/apis/todo/update', {
                updatedList: this.state.currentList
            })
            .then((res) => {
                if(res.data.success){
                    this.setState({
                        loading: false,
                        AlertText: "List Updated!",
                        AlertType: "success"
                    });
                    this.getAllToDos();
                }
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
            this.setState({removeLoader: true});
            axios.post('/apis/todo/remove', {
                "id": this.state.currentList._id
            })
            .then((res) => {
                if(res.data.success){
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
        if (this.state.todoList.length >= (index + 1)) {
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
                    RootComponent="a"
                    href="/email"
                    block={true}
                    color="secondary"
                  >
                    Compose new List
                  </Button>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col md={9}>
                <div style={{marginTop: '10%'}}>
                    {this.state.editMode ? (
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
                    )}
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
