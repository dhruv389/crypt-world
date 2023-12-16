import React from 'react'
import { Button, Container, HStack, Heading, VStack } from "@chakra-ui/react";
import  { Link }  from "react-router-dom"
const style = {
    objectfit: "contain",
    height: 40,
    width: 40,
    alt: "Exchange",
  };
  const CoinCard = ({id,name, img,symbole, price ,currencySymbole="₹"}) => (

    <Link to= {`/coin/${id}`} >
      <VStack
        w={"52"}
        shadow={"xl"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all .3s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        {/* <Image src={img} w={"10"} h={"10"} objectfit={"contain"} alt={"Exchange"}/> */}
        <img src={img} style={style} />
        <Heading size={"md"} noOfLines={1}>
          {symbole}
        </Heading>
  
        <h1>{name}</h1>
        <h1><b>{price? `${currencySymbole} ${price}`:"NA"}</b></h1>
      </VStack>
      
    </Link>
   
  );
  

export default CoinCard