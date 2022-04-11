import gql from "graphql-tag";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import { useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router";
import { SAuthButton, SInput } from "../common/shared";

interface SignUpFormData {
  email: string;
  username: string;
  name: string;
  password: string;
  result: any;
}

const CREATE_ACCOUNT = gql`
  mutation CreateAccount($email: String!, $username: String!, $name: String, $password: String!) {
    createAccount(email: $email, username: $username, name: $name, password: $password) {
      ok
      message
    }
  }
`;

const SignUp = () => {
  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({ mode: "onChange" });
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT, {
    onCompleted: (result) => {
      const {
        createAccount: { ok, message },
      } = result;
      console.log("ok", ok, message);

      if (ok === false) return setError("result", { message });
      const { username, password } = getValues();
      navigate("/", { state: { username, password, message: "Account created. Please log in." } });
    },
  });

  const onValid = (data: SignUpFormData): void => {
    if (loading) return;
    const { email, username, name, password } = data;
    createAccount({ variables: { email, username, name, password } });
  };

  return (
    <AuthLayout>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onValid)}>
          <SInput {...register("email", { required: "Email is required" })} type="text" placeholder="Email" />
          <FormError message={errors?.email?.message}></FormError>
          <SInput {...register("username", { required: "Username is required" })} type="text" placeholder="Username" />
          <FormError message={errors?.username?.message}></FormError>
          <SInput {...register("name")} type="text" placeholder="Name" />
          <FormError message={errors?.name?.message}></FormError>
          <SInput {...register("password", { required: "Password is required" })} type="password" placeholder="Password" />
          <FormError message={errors?.password?.message}></FormError>
          <SAuthButton type="submit" disabled={!isValid || loading}>
            {loading ? "Loading..." : "Sign up"}
          </SAuthButton>
          <FormError message={errors?.result?.message}></FormError>
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link="/" linkText="Login" />
    </AuthLayout>
  );
};

export default SignUp;
