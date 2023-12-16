import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import { Container, HStack, Heading, VStack } from "@chakra-ui/react";
import { Loader } from "./Loader";
import  ErrorComponent  from "./ErrorComponent"
import Searchbar from "./Searchbar";
import "./loaderstyle.css"

function Exchange() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [btn16, setbtn16] = useState(1);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        console.log(data);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);


if(error) return <ErrorComponent  message={"Error while Fetching Exchanges"}/>

// ****************************************************************************************
  
const [searchTerm, setSearchTerm] = useState("");
    
// Filter the names based on the search term

const filteredNames = exchanges.filter((i, i1)=>
  i.name.toLowerCase().includes(searchTerm.toLowerCase())
  
)
// ****************************************************************************************

  return (
    <Container maxW={"container.xl"}>
      <div className="searchd" > <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>
    
   
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"center"} >
            {filteredNames.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
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

const style = {
  objectfit: "contain",
  height: 30,
  width: 30,
  alt: "Exchange",
};
const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
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
        {rank}
      </Heading>

      <h1>{name}</h1>
    </VStack>
  </a>
);
export default Exchange;
