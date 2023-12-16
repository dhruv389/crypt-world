import { transform } from 'framer-motion';
import { Button, Container, HStack, Heading, VStack,Alert } from "@chakra-ui/react";
import React from 'react'


function ErrorComponent({message}) {
  return (<>
   <img src='/error.png' height={"20%"} width={"30%"} 
   style={{position:'relative', left:"30%",top:"70%"}}></img>

   <Alert status="error" position={"relative"} bottom={"-50"} left={"50%"} bgColor={"pink"} transform={"translateX(-50%)"} w={"80%"}  textStyle={"sas-serif"}>
  <h1>{message}</h1>
   </Alert>
   </>
  );
}

export default ErrorComponent;