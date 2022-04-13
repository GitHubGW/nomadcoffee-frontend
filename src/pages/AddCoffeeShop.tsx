import { useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { SAuthButton, SInput } from "../common/shared";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import { useNavigate, NavigateFunction } from "react-router";

const CREATE_COFFEE_SHOP = gql`
  mutation CreateCoffeeShop($name: String!, $category: String) {
    createCoffeeShop(name: $name, category: $category) {
      ok
      message
    }
  }
`;

const AddCoffeeShop = () => {
  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [createCoffeeShop, { loading }] = useMutation(CREATE_COFFEE_SHOP, {
    onCompleted: (result) => {
      const {
        createCoffeeShop: { ok, message },
      } = result;
      if (!ok) return setError("result", { message });
      navigate("/");
    },
  });

  const onValid = (data: any) => {
    if (loading === true) return;
    const { name, category } = data;
    createCoffeeShop({ variables: { name, category } });
  };

  return (
    <AuthLayout>
      <Helmet>
        <title>커피숍 추가</title>
      </Helmet>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onValid)}>
          <SInput {...register("name", { required: "CoffeeShop name is required." })} type="text" placeholder="커피숍 이름" />
          <FormError message={errors?.name?.message}></FormError>
          <SInput {...register("category")} type="text" placeholder="카테고리" />
          <FormError message={errors?.category?.message}></FormError>
          <SAuthButton type="submit" disabled={!isValid || loading}>
            {loading ? "로딩중..." : "커피숍 추가"}
          </SAuthButton>
          <FormError message={errors?.result?.message}></FormError>
        </form>
      </FormBox>
    </AuthLayout>
  );
};

export default AddCoffeeShop;
