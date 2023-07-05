import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 36px;
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 260px;
  margin: 0 auto;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 12px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
    padding: 10px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 10px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>💰 Coins 😍</Title>
      </Header>
      {loading ? (
        <Loader>" Loading... "</Loader>
      ) : (
        <CoinList>
          {coins.map((c) => (
            <Coin key={c.id}>
              <Link to={`/${c.id}`}>
                <Img
                  src={`https://static.coinpaprika.com/coin/${c.id}/logo.png`}
                />
                {c.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
