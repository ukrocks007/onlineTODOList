import * as React from "react";
import { withRouter } from "react-router-dom";

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
                          Welcome To Online ToDo Lost
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