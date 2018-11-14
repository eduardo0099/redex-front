import React from 'react';
import API from '../../Services/Api';
import notify from '../../utils/notify';
import { Button, Modal, Upload, message } from "antd";


const success = () => {
    const hide = message.loading('Action in progress..', 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 2500);
  };

export default class CrimsonUpload extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            visible : false,
            fileList: [],
            formdata: ''
        }
    }

    open = () => {
        this.setState({visible: true, fileList: [], formData: ''});
    }

    close = () => {
        this.setState({visible: false});
    }

    upload = () => {
        this.close();
        const hide = message.loading('Cargando archivo...', 0);

        API.post(this.props.url, this.state.formdata)
            .then(response => {
                hide();
                notify.success({
                    message: "Carga finalizada",
                    description: `${response.data.cantidadRegistros} registros agregados`
                })
                this.props.fetch();
            })
    }

    render() {
        const { title } = this.props;

        const uploadProps = {
            onRemove: fileForm => {
                this.setState({ ...this.state, fileList: [], formdata: "" });
            },
            beforeUpload: fileForm => {
                let file = fileForm;
                let formData = new FormData();
                formData.append("file", file);
                this.setState({
                    ...this.state,
                    fileList: [fileForm],
                    formdata: formData
                });
                return false;
            },
            fileList: this.state.fileList
        };

        return (
            <Modal
            title={title}
            visible={this.state.visible}
            onOk={this.upload}
            onCancel={this.close}
            okText="Subir"
            cancelText="Cancelar"
          >
            <Upload {...uploadProps}>
              <Button>Seleccionar archivo</Button>
            </Upload>
          </Modal>
        )
    }
}