import React, {
    Component
} from 'react';
import SiteWrapper from '../container/layout';
import { Page } from 'tabler-react';

class Home extends Component {
    componentDidMount = () => {
        if (!localStorage.user) {
            this.props.history.push('/login');
        }
        console.log(localStorage.user);
    }
      
  render() {
    return (
      <SiteWrapper>
        <Page.Content title="Home">
            
        </Page.Content>
      </SiteWrapper>
    );
  }
}

export default Home;
