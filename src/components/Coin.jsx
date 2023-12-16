import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";

import {
  Button,
  Container,
  HStack,
  Heading,
  RadioGroup,
  Radio,
  VStack,
} from "@chakra-ui/react";
import { Loader } from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";
import "./loaderstyle.css";
import Searchbar from "./Searchbar";

import { motion, useScroll } from "framer-motion"



function Coin() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [btn16, setbtn16] = useState(1);
 
  const { scrollYProgress } = useScroll();
  const currencySymbole =
    currency === "inr" ? "₹." : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={`Error while Fetching Coins : ${error}`} />;

    // ****************************************************************************************
  
    const [searchTerm, setSearchTerm] = useState("");
    
    // Filter the names based on the search term
   
    const filteredNames = coins.filter((i, i1)=>
      i.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
 // ****************************************************************************************
  return (
   
    <Container maxW={"container.xl"}>
     
      {loading ? (
        <Loader />
      ) : (
        <>
        <motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", bounce: 0.25 }}
/>
          <RadioGroup value={currency} onChange={setCurrency} p={"10"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>₹ INR</Radio>
              <Radio value={"usd"}>$ USD</Radio>
              <Radio value={"eur"}>€ EUR</Radio>
            </HStack>
          </RadioGroup>
        <div className="searchd" > <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>
          <HStack wrap={"wrap"}  justifyContent={"center"}>
            {filteredNames.map((i, i1) => (
              <CoinCard
                key={i1}
                id={i.id}
                name={i.name}
                price={i.current_price}
                img={i.image}
                symbole={i.symbole}
                url={i.url}
                currencySymbole={currencySymbole}
              />
            ))}
          </HStack>



          <div className="buttond">
            <button
              className="custom-btn btn-16"
              onClick={() => {
                if (btn16 > 1) {
                  changePage(btn16 - 1);
                  setbtn16(btn16 - 1);
                } else {
                  changePage(1);
                  setbtn16(1);
                  window.alert("You are already on the first page");
                }
              }}
            >
              Previous
            </button>
            <h1>{btn16}</h1>
            <button
              className="custom-btn btn-16"
              onClick={() => {
                if (btn16 < 94) {
                  changePage(btn16 + 1);
                  setbtn16(btn16 + 1);
                } else {
                  window.alert("You are already on the last page");
                  changePage(94);
                  setbtn16(94);
                }
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Coin;
