import styled from "styled-components";
import { handleLogout } from "../apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Shop from "../components/Shop";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const SEE_COFFEE_SHOPS = gql`
  query SeeAllCoffeeShops($page: Int!) {
    seeAllCoffeeShops(page: $page) {
      ok
      message
      totalCoffeeShops
      coffeeShops {
        id
        name
        latitude
        longitude
        createdAt
        updatedAt
        categories {
          id
          name
          slug
        }
        user {
          id
          email
          username
          name
        }
      }
    }
  }
`;

const Container = styled.div`
  padding: 20px;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const PageButtons = styled.div``;

const Title = styled.h1`
  font-size: 65px;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  text-align: center;
  padding: 6px 18px;
  border-radius: 5px;
  font-size: 25px;
  margin-bottom: 20px;
`;

const AddButton = styled(Link)`
  position: fixed;
  bottom: 50px;
  right: 50px;
  padding: 13px;
  background-color: white;
  border-radius: 50%;
  color: ${(props) => props.theme.mainColor};
`;

const PageButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #2c2c2c;
  color: white;
  text-align: center;
  padding: 6px 15px;
  border-radius: 5px;
  font-size: 25px;
  margin-right: 5px;
  margin-bottom: 20px;
`;

const ShopContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [totalCoffeeShops, setTotalCoffeeShops] = useState<number>(0);
  const { data, loading, refetch } = useQuery(SEE_COFFEE_SHOPS, { variables: { page } });

  const handleGoToFirstPage = () => {
    setPage(1);
    refetch({ page: 1 });
  };

  const handleGoToPrevPage = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
    refetch({ page: page - 1 });
  };

  const handleGoToNextPage = () => {
    if (Math.ceil(totalCoffeeShops / 6) === page) return;
    setPage((page) => page + 1);
    refetch({ page: page + 1 });
  };

  useEffect(() => {
    if (data?.seeAllCoffeeShops?.totalCoffeeShops) {
      setTotalCoffeeShops(data?.seeAllCoffeeShops?.totalCoffeeShops);
    }
  }, [data]);

  return (
    <div>
      {loading === true ? (
        "Loading..."
      ) : (
        <>
          <Helmet>
            <title>커피숍 메인</title>
          </Helmet>
          <Container>
            <SHeader>
              <Title>☕️ 커피숍 ☕️</Title>
            </SHeader>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            <PageButtons>
              <PageButton onClick={handleGoToFirstPage}>첫 페이지</PageButton>
              <PageButton onClick={handleGoToPrevPage}>←</PageButton>
              <PageButton onClick={handleGoToNextPage}>→</PageButton>
            </PageButtons>
            <ShopContainer>
              {data?.seeAllCoffeeShops.coffeeShops.map((coffeeShop: any) => (
                <Shop key={coffeeShop.id} coffeeShop={coffeeShop} />
              ))}
            </ShopContainer>
            <AddButton to="/add">
              <FontAwesomeIcon icon={faPlus} size="3x"></FontAwesomeIcon>
            </AddButton>
          </Container>
        </>
      )}
    </div>
  );
};

export default Home;
