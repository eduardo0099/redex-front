import React from 'react';
import { Divider ,Col} from 'antd';

export default class PaquetesNuevo extends React.Component {

    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <Col>
                <Divider orientation="left">Origen</Divider>
            </Col>

        )
    }
    
}