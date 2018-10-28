import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
import OpenAPI from "../../Services/OpenAPI";
import API from "../../Services/Api";
import notify from "../../utils/notify";

const FormItem = Form.Item;
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAuth: false
    };
  }

  componentWillMount() {}

  componentDidMount() {
      this.setState({hasAuth: localStorage.getItem('token') !== null});
  }

  login = values => {
    localStorage.removeItem("token");
    localStorage.removeItem("datasession");
    OpenAPI.post("/auth/signin", values)
      .then(response => {
        localStorage.setItem(
          "token",
          `${response.data.tokenType} ${response.data.accessToken}`
        );

        API.get("/usuarios/yo").then(response => {
          localStorage.setItem("datasession", JSON.stringify(response.data));
          this.props.history.push("/oficinas");
        });
      })
      .catch(response => {
        notify.error({
          message: "Error",
          description: "Credenciales incorrectos"
        });
      });
  };

  checkLogin = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.hasAuth === true) {
      return <Redirect to="/oficinas" />;
    } else {
      return (
        <div className="container-login-form">
          <h3 className="title-login">Sistema de redex</h3>
          <Form onSubmit={this.checkLogin} className="login-form">
            <FormItem>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "Ingrese su usuario" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Usuario"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "Ingrese su contraseña" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Contraseña"
                />
              )}
            </FormItem>
            <FormItem>
              <a className="login-form-forgot" href="">
                Recuperar contraseña
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Iniciar Sesión
              </Button>
            </FormItem>
          </Form>
        </div>
      );
    }
  }
}
const Login = Form.create()(LoginForm);

export default Login;
