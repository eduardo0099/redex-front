import React from 'react';
import API from '../../Services/Api';
import notify from '../../utils/notify';
import { Button, Modal, Upload } from "antd";

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
        API.post(this.props.url, this.state.formdata)
            .then(response => {
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