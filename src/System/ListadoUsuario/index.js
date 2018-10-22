import { Button } from 'antd';
import React, { Component } from 'react';

class ListadoUsuario extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Button type="primary">Nuevo</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
            </div>

        )
    }
}

export default ListadoUsuario;