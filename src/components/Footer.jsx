import { Avatar, Box, Stack, VStack,Text } from "@chakra-ui/react";
import React from "react";
import avtr from "../assets/avtar.jpeg"
//background-color:#141414;
function Footer() {
  return (
    <Box
      bgColor={"#141414"}
      color={"whiteAlpha.700"}
      minH={"48"}
      mt={"-1"}
      px={"16"}
      py={["16", "8"]}
    
    >


       <Stack direction={["column","row"]} h={"full"} alignItems={"center"}>

     <VStack w={"full"} alignItems={["center","flex-start"]}>
      <Text fontWeight={"bold"}>About Us</Text>
      <Text  fontSize={"sm"} letterSpacing={"widest"} textAlign={["center","left"]}>We are the best crypto trading App in the world , We provide our guidance at a very effortable Price</Text>
    </VStack>

<VStack>
<Avatar  boxSize={"28"} mt={["4","0"]} src={avtr}/>
<Text>Our Founder</Text>
</VStack>


       </Stack> 
    </Box>
  );
}

export default Footer;
