import { SpaRounded } from '@material-ui/icons';
import React from 'react'
import  "./loaderstyle.css"
import { VStack } from '@chakra-ui/react';

export  function Loader() {
  return ( 
  <VStack h={"90vh"} justifyContent={"center"} display={"flex"} flexDirection={"row"}>
    
    <span className="loader"></span>
  </VStack>
    
  );
};
