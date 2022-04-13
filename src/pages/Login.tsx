import gql from "graphql-tag";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Separator from "../components/auth/Separator";
import { useMutation } from "@apollo/client";
import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useLocation, Location } from "react-router";
import { handleLogin } from "../apollo";
import { SAuthButton, SInput } from "../common/shared";

interface LoginFormData {
  username: string;
  password: string;
  result: any;
}

interface LoginState {
  username?: string;
  password?: string;
  message?: string;
}

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      message
      token
    }
  }
`;

const SFacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const SNotification = styled.h1`
  color: dodgerblue;
`;

const Login = () => {
  const location: Location = useLocation();
  const state = location.state as LoginState | null;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({ mode: "onChange", defaultValues: { username: state?.username || "", password: state?.password || "" } });
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (result) => {
      const {
        login: { ok, message, token },
      } = result;
      if (!ok) return setError("result", { message });
      if (token) handleLogin(token);
    },
  });

  const onValid = (data: LoginFormData): void => {
    if (loading) return;
    const { username, password } = data;
    login({ variables: { username, password } });
  };

  return (
    <AuthLayout>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <SNotification>{state?.message}</SNotification>
        <form onSubmit={handleSubmit(onValid)}>
          <SInput {...register("username", { required: "Username is required." })} type="text" placeholder="Username" />
          <FormError message={errors?.username?.message}></FormError>
          <SInput {...register("password", { required: "Password is required." })} type="password" placeholder="Password" />
          <FormError message={errors?.password?.message}></FormError>
          <SAuthButton type="submit" disabled={!isValid || loading}>
            {loading ? "Loading..." : "Login"}
          </SAuthButton>
          <FormError message={errors?.result?.message}></FormError>
        </form>
        <Separator />
        <SFacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </SFacebookLogin>
      </FormBox>
      <BottomBox cta="Don't have an account?" link="/signup" linkText="Sign Up" />
    </AuthLayout>
  );
};

export default Login;
