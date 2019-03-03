import { Component } from 'react';
import { Route , withRouter} from 'react-router-dom';


class Logout extends Component {
    constructor(props){
        super(props);
        localStorage.clear();
        window.location.replace('/');
    }
}

export default Logout;