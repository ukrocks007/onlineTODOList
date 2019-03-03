import * as React from "react";
import { withRouter} from 'react-router-dom';

import {
    Site,
    RouterContextProvider,
    Nav, Button
} from "tabler-react";

class SiteWrapper extends React.Component {
    state = {
        notificationsObjects: [],
    };

    render() {
        return (
            <Site.Wrapper
                headerProps={{
                    href: "/",
                    alt: "Online ToDo List",
                    imageURL: "./images/logo.png",
                    navItems: (
                        <Nav.Item type="div" className="">
                            <Button icon="log-out" color="primary" onClick={()=> this.props.history.push('/logout')}>
                            Logout
                            </Button>
                        </Nav.Item>
                      ),
                }}
                navprops={[]}
                routerContextComponentType={withRouter(RouterContextProvider)}
            >
                {this.props.children}
            </Site.Wrapper>
        );
    }
}

export default SiteWrapper;