import { useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams, Location } from "react-router";
import { SAuthButton, SInput } from "../common/shared";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";

interface EditCoffeeState {
  name?: string;
  latitude?: number;
  longitude?: number;
  categories?: any[];
}

interface FormData {
  name: string;
  latitude: number;
  longitude: number;
  categories: string;
  result: any;
}

const EDIT_COFFEE_SHOP = gql`
  mutation EditCoffeeShop($editCoffeeShopId: Int!, $name: String, $latitude: Int, $longitude: Int, $file: Upload, $category: String) {
    editCoffeeShop(id: $editCoffeeShopId, name: $name, latitude: $latitude, longitude: $longitude, file: $file, category: $category) {
      ok
      message
    }
  }
`;

const EditCoffeeShop = () => {
  const navigate = useNavigate();
  const location: Location = useLocation();
  const state = location.state as EditCoffeeState | null;
  const isMe = true;
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: state?.name || "",
      latitude: state?.latitude,
      longitude: state?.longitude,
      categories: state?.categories?.map((category: any) => category.name + " ")[0] || "",
    },
  });
  const [editCoffeeShop, { loading }] = useMutation(EDIT_COFFEE_SHOP, {
    onCompleted: (result) => {
      const {
        editCoffeeShop: { ok, message },
      } = result;
      if (!ok) return setError("result", { message });
      navigate("/");
    },
  });

  const onValid = (data: any) => {
    if (loading === true) return;
    const { name, latitude, longitude, categories } = data;
    editCoffeeShop({ variables: { editCoffeeShopId: Number(id), name, latitude: +latitude, longitude: +longitude, categories } });
  };

  return (
    <AuthLayout>
      <Helmet>
        <title>????????? ??????</title>
      </Helmet>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onValid)}>
          <FormError message={!isMe ? "???????????? ????????? ????????? ????????????." : ""}></FormError>
          <SInput {...register("name")} type="text" placeholder="????????? ??????" disabled={!isMe} />
          <FormError message={errors?.name?.message}></FormError>
          <SInput {...register("latitude")} type="number" placeholder="??????" disabled={!isMe} />
          <FormError message={errors?.latitude?.message}></FormError>
          <SInput {...register("longitude")} type="number" placeholder="??????" disabled={!isMe} />
          <FormError message={errors?.longitude?.message}></FormError>
          <SInput {...register("categories")} type="text" placeholder="????????????" disabled={!isMe} />
          <FormError message={errors?.categories?.message}></FormError>
          <SAuthButton type="submit" disabled={!isMe}>
            {loading ? "?????????..." : "????????? ??????"}
          </SAuthButton>
          <FormError message={errors?.result?.message}></FormError>
        </form>
      </FormBox>
    </AuthLayout>
  );
};

export default EditCoffeeShop;
