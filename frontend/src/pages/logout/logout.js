import { Component } from 'react';

class Logout extends Component {
    constructor(props){
        super(props);
        localStorage.clear();
        window.location.replace('/');
    }
}

export default Logout;