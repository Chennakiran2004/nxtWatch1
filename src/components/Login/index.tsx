import { Component, ChangeEvent, FormEvent, MouseEvent } from "react";

import { Redirect, RouteComponentProps } from "react-router-dom";

import { setCookie, getCookie } from "../../Constants/storageUtilities";

import fetchApi from "../../Constants/fetchUtilities";

import "./index.css";

import {
  LoginContainer,
  LoginCardContainer,
  WebsiteLogo,
  Label,
  Form,
  LoginButton,
  ShowPasswordLabel,
  LoginInput,
  ErrorMsg,
} from "./styledComponents";

const websiteLogo =
  "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png";

interface LoginState {
  username: string;
  password: string;
  passwordType: string;
  isError: boolean;
  errorMsg: string;
}

interface LoginProps extends RouteComponentProps {
  history: any;
}

class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
    username: "",
    password: "",
    passwordType: "password",
    isError: false,
    errorMsg: "",
  };

  updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  // onCheckBox = (event: React.MouseEvent<HTMLInputElement>) => {
  //   this.setState({ passwordType: event.target.checked ? "text" : "password" });
  // };
  onCheckBox = (event: React.MouseEvent<HTMLInputElement>) => {
    this.setState({
      passwordType: (event.target as HTMLInputElement).checked
        ? "text"
        : "password",
    });
  };

  onSubmitFailure = (errorMsg: string) => {
    this.setState({ errorMsg, isError: true });
  };

  onSubmitSuccess = (jwtToken: string) => {
    const { history } = this.props;
    setCookie("jwt_token", jwtToken, { expires: 30 });
    history.replace("/");
    this.setState({ isError: false });
  };

  onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const apiUrl = "https://apis.ccbp.in/login";

    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    // const response = await fetch(apiUrl, options)
    // const data = await response.json()

    const response = await fetchApi(apiUrl, options);

    if (response.success) {
      this.onSubmitSuccess(response.data.jwt_token);
    } else {
      this.onSubmitFailure(response.data.error_msg);
    }
  };

  render() {
    const { username, password, passwordType, isError, errorMsg } = this.state;

    const jwtToken = getCookie();

    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <LoginContainer>
        <LoginCardContainer>
          <WebsiteLogo src={websiteLogo} alt="website logo" />
          <Form onSubmit={this.onSubmit}>
            <Label htmlFor="username">USERNAME</Label>
            <LoginInput
              type="text"
              id="username"
              placeholder="Username"
              onChange={this.updateUsername}
              value={username}
            />
            <Label htmlFor="password">PASSWORD</Label>
            <LoginInput
              id="password"
              placeholder="Password"
              onChange={this.updatePassword}
              value={password}
              type={passwordType}
            />
            <input
              type="checkbox"
              id="showPassword"
              onClick={this.onCheckBox}
              className="showPassword"
            />
            <ShowPasswordLabel htmlFor="showPassword">
              Show Password
            </ShowPasswordLabel>
            <div>
              <LoginButton type="submit">Login</LoginButton>
            </div>
            <ErrorMsg>{isError && `* ${errorMsg}`}</ErrorMsg>
          </Form>
        </LoginCardContainer>
      </LoginContainer>
    );
  }
}

export default Login;
