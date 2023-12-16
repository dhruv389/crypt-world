
import { Button, HStack} from '@chakra-ui/react';
import React from 'react'
import {Link} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home"
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import GifIcon from '@material-ui/icons/Gif';



import Confetti from 'react-confetti'


const scaleEffect ={
  "&:hover": {
    color:"yellow"
  },
}
const Header = () => {
 
 return <HStack p={"4"}  shadow={"base"} bgColor={"blackAlpha.900"}>

  <Button variant={"unstyled"} color={"white"} css={scaleEffect}  >
    <Link to="/"> Home </Link>
  </Button>
  <Button variant={"unstyled"} color={"white"} css={scaleEffect}>
    <Link to="/exchanges">
  Coin
    </Link>
  </Button>
  <Button variant={"unstyled"} color={"white"}  css={scaleEffect}>
    <Link to="/coins"> Exchange </Link>
  </Button>
 </HStack>
}

export default Header;