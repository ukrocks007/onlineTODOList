import React, {
    Component
} from 'react';
import SiteWrapper from '../container/layout';
import {
    Page, Card, Button, Form, Grid, List, Container
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
            mode: 'view',
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
                            this.onListChanged(0);
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
            .then((err, res) => {
                if(err){
                    console.log(err);
                }
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
            axios.get('/apis/todo')
            .then((err, res) => {
                if(err){
                    console.log(err);
                }
            })
            .catch(err => {
                console.log(err);
            });
        } catch (ex) {
            console.log(ex);
        }
    }

    remove = async () => {
        try {
            axios.get('/apis/todo')
            .then((err, res) => {
                if(err){
                    console.log(err);
                }
            })
            .catch(err => {
                console.log(err);
            });
        } catch (ex) {
            console.log(ex);
        }
    }

    toggleChecked = (index) => {
        
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
                    <Card>
                        <Card.Header>
                            <Card.Title>{this.state.currentList ? this.state.currentList.title : ""}</Card.Title>
                            <Card.Options>
                            <Button color="primary" size="sm">
                                Action 1
                            </Button>
                            <Button color="secondary" size="sm" className="ml-2">
                                Action 2
                            </Button>
                            </Card.Options>
                        </Card.Header>
                        <Card.Body>
                        <Form.Group label="Tasks">
                            {
                                this.state.currentTodos.map((data, i) => {
                                    return (
                                            <Form.Checkbox 
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
                    </Card>
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
