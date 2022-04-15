import { Link } from "react-router-dom";
import styled from "styled-components";

const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 430px;
  padding: 15px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  border-radius: 10px;
  transition: 0.3s;
  margin: 10px;
  &:hover {
    transform: scale(1.03);
  }
`;

const ShopImage = styled.img`
  height: 300px;
  border-radius: 10px;
`;

const ShopInfo = styled.div`
  margin-top: 20px;
  color: black;
`;

const ShopName = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: dodgerblue;
`;

const ShopOwner = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin: 10px 0;
`;

const ShopCategories = styled.h1`
  font-size: 25px;
  color: crimson;
`;

const ShopPosition = styled.h1`
  font-size: 20px;
  color: gray;
  margin: 10px 0;
`;

const ShopCreatedAt = styled.h1`
  font-size: 18px;
  color: gray;
  margin: 10px 0;
`;

const ShopUpdatedAt = styled.h1`
  font-size: 18px;
  color: gray;
`;

const Shop = ({ coffeeShop }: any) => {
  return (
    <ShopContainer>
      <Link
        to={`/shop/${coffeeShop.id}`}
        state={{
          username: coffeeShop?.user?.username,
          name: coffeeShop?.name,
          latitude: coffeeShop?.latitude,
          longitude: coffeeShop?.longitude,
          categories: coffeeShop?.categories,
        }}
      >
        <ShopImage src={coffeeShop?.photos?.url || "https://i.ibb.co/gFsKkBG/cafe-2081857-640.jpg"} alt="coffeeShop" />
        <ShopInfo>
          <ShopName>{coffeeShop?.name}</ShopName>
          <ShopOwner>
            {coffeeShop?.user?.username} ({coffeeShop?.user?.email})
          </ShopOwner>
          <ShopCategories>{coffeeShop?.categories?.map((category: any) => category.name + " ")}</ShopCategories>
          <ShopPosition>
            위치: {coffeeShop?.latitude}-{coffeeShop?.longitude}
          </ShopPosition>
          <ShopCreatedAt>오픈 날짜: {new Date(+coffeeShop?.createdAt).toLocaleDateString()}</ShopCreatedAt>
          <ShopUpdatedAt>최근 업데이트: {new Date(+coffeeShop?.updatedAt).toLocaleDateString()}</ShopUpdatedAt>
        </ShopInfo>
      </Link>
    </ShopContainer>
  );
};

export default Shop;
