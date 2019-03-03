import React, { Component } from 'react';
import Layout from '../container/wrapper';
import { Form, FormCard, Dimmer, Page, Alert } from 'tabler-react'
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            AlertText: "",
            AlertType: "danger"
        }
    }

    componentDidMount() {
        if (localStorage.user) {
            this.props.history.push('/');
        }
    }

    createUser = (e) => {
        e.preventDefault();
        this.setState({
            loader: true,
            AlertText: "",
        });
        var data = {
            username: this.state.username,
            password: this.state.password
        };
        if (!data.username || !data.password) {
            this.setState({
                AlertText: "Enter both username and password!",
                AlertType: "danger",
                loader: false
            });
        } else {
            axios.post('/auth/create', data).then(response => {
                    if (response.data) {
                        console.log(response.data);
                        if (response.data.success) {
                            this.setState({
                                AlertText: "User created successfully!",
                                AlertType: "success",
                                loader: false
                            });
                            window.location.replace('/');
                        } else {
                            this.setState({
                                AlertText: response.data.message ? response.data.message : "Unexpected error occured!",
                                AlertType: "danger",
                                loader: false
                            });
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        loader: false
                    });
                });
        }
    }

    handleChanges = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

  render() {
    return (
        <div 
            style={{
                height: '100%',
                width: '100%',
                position: 'fixed',
                backgroundSize: "contain",
                backgroundPositionY: "bottom",
                backgroundRepeat: "repeat-x",
                backgroundRepeatX: "repeat",
                overflow: "scroll",
                WebkitOverflowScrolling: "touch"
            }}
        >
            <Layout signUp={true}>
                <Page.Content>
                    <FormCard
                        buttonText="Signup"
                        title="Create Account"
                        onSubmit={this.createUser}
                    >
                        <Dimmer active={this.state.loader} loader>
                            <Form.Input 
                                name='username' 
                                label='Email' 
                                placeholder='Enter Email Address' 
                                type="email" 
                                onChange={this.handleChanges} />
                            <Form.Input 
                                name='password' 
                                label='Password' 
                                placeholder='Enter Password' 
                                type="password" 
                                onChange={this.handleChanges} />
                        </Dimmer>
                    </FormCard>
                    <div style={{
                        visibility: this.state.AlertText ? "visible" : "hidden"
                    }}>
                        <Alert type = { this.state.AlertType } icon = {
                            this.state.AlertType == "success" ? "check" : "alert-triangle"
                        }>
                            {this.state.AlertText}
                        </Alert>
                    </div>
                </Page.Content>
            </Layout>
        </div>
    );
  }
}

export default Signup;
