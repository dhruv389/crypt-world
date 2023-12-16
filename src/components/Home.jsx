import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btcsrc from "../assets/mage-from-rawpixel-id-6283435-png.png";
import { motion } from "framer-motion";
import { Tilt } from '@jdion/tilt-react'

const Home = () => {
  return (
    <Box  bgColor={"blackAlpha.900"} w={"full"} h={"85vh"} m={"0"} p={"0"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
<Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        mt={"7"}
      >
        MyCrypto
      </Text>
    <motion.div  style={{
      height:"80vh",
    }}
    animate={{
 translateY:"27px"
    }}
    
    transition={{
      duration:2,
      repeat:Infinity,
      repeatType:"reverse"

    }}>
    <Tilt style={{width:"100%",overflowX:"hidden",height:"100%",paddingBottom:"3rem"}}> <Image h={"full"} w={"full"} objectFit={"contain"} src={btcsrc} /></Tilt>
    

   
    </motion.div>
     
      
    </Box>
  );
};

export default Home;
