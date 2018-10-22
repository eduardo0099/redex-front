import  React from 'react';
import { Layout } from 'antd';

const Header = Layout.Header;

export default class TheHeader extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
   return (
     <Header style={{ background: '#fff', paddingLeft: '20px', paddingRight: '20px' }}>
       {this.props.children}
     </Header>
   );
}
}
