import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Text,
  Image,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import React from "react";
import { Loader } from "./Loader";
import axios from "axios";
import { server } from "../main";
import { useParams } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";

function CoinDetails() {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setchartArray] = useState([]);
  const params = useParams();
  const currencySymbole =
    currency === "inr" ? "₹ " : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (val) => {
    switch (val) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;

      case "7d":
        setDays("7d");
        setLoading(true);
        break;

      case "14d":
        setDays("14d");
        setLoading(true);
        break;

      case "30d":
        setDays("30d");
        setLoading(true);
        break;

      case "60d":
        setDays("60d");
        setLoading(true);
        break;

      case "200d":
        setDays("200d");
        setLoading(true);
        break;

      case "1y":
        setDays("1y");
        setLoading(true);
        break;

      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setCoin(data);
        setchartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    console.log(params.id);
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <ErrorComponent message={"Error while Fetching Coin"} />;

  return (
    <Container maxW={"90%"}  display={"flex"}  flexDirection={"column"} >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"95%"} borderWidth={"1"}>
            <Chart arr={chartArray} currency={currencySymbole} days={days} />
          </Box>
          {/* button */}

          <HStack p="4" overflowX={"auto"}>
            {btns.map((i) => (
              <Button key={i} onClick={() => switchChartStats(i)}>
                {i}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={"10"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>₹ INR</Radio>
              <Radio value={"usd"}>$ USD</Radio>
              <Radio value={"eur"}>€ EUR</Radio>
            </HStack>
          </RadioGroup>
          <VStack spacing={"4"} w={"100%"}p="16" alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
              Last updated on{" "}
              {Date(coin.market_data.last_updated).split("6")[0]}
            </Text>

           

            <Image
              src={coin.image.large}
              h={"57"}
              w={"57"}
              objectFit={"contain"}
              mb={"2"}
            />
            <Stat  display="flex"  justifyContent={"center"} rowGap={"7"} w={"100%"} backgroundColor={"teal"} color={"white"}>
              <StatNumber>{coin.name}</StatNumber>
          <hr/>

              <StatNumber>
                {currencySymbole}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <hr/>
              <StatHelpText>
                {coin.market_data.market_cap_change_percentage_24h < 0 ? (
                  <StatArrow type="decrease" />
                ) : (
                  <StatArrow type="increase" />
                )}
                {coin.market_data.market_cap_change_percentage_24h}
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}>
              {`#${coin.market_cap_rank}`}
            </Badge>

            <CustomBar
              high={`${currencySymbole} ${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbole} ${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p="4" >
              <Item title={"Max Supply"} value={coin.market_data.max_supply} /> 
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
                
              /><hr/>
              <Item
                title={"Market Cap"}
                value={`${currencySymbole} ${coin.market_data.market_cap[currency]}`}
              /><hr/>

              <Item
                title={"All Time High"}
                value={`${currencySymbole} ${coin.market_data.ath[currency]}`}
              /><hr/>
              <Item
                title={"All Time low"}
                value={`${currencySymbole} ${coin.market_data.atl[currency]}`}
              /><hr/>
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
}

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme="teal" w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme="red"></Badge>
        <Text fontSize={"small"}>24H Range</Text>
        <Badge children={high} colorScheme="green"></Badge>
      </HStack>
    </VStack>
  );
};

export default CoinDetails;
