import React, { useState,useEffect } from "react";
import "../App.css";
import {LoopCircleLoading} from 'react-loadingg';
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import {Navigate} from "react-router-dom";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { AiOutlineStar , AiTwotoneStar } from 'react-icons/ai';
import HeaderSection from "../components/HeaderSection";
import { useNavigate } from "react-router-dom/dist";

function MainPage() {
  const theme = useTheme([
    getTheme(),
    {
      Table: `
      --data-table-library_grid-template-columns:  50px 50px 250px 20% 20% 20% 20% 20% 150px;

    `,
          BaseCell: `
      &:nth-of-type(1) {
        left: 0px;
        
      }
      &:nth-of-type(2) {
        left: 50px;
      }
      &:nth-of-type(3) {
        left: 100px;
      }

      &:nth-of-type(9) {
        right: 0px;
      }
    `,
    },
  ]);

  const [nodes, setNodes] = React.useState([]);
  const [loading, setLoading] = useState(false)
  const [ids, setIds] = React.useState([]);
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url= "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=2&sparkline=false&locale=en"
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await fetch(url);
      const data = await response.json();
      setNodes(data);
      setLoading(false)

    }
    fetchData();
  }, []);
    const data = { nodes };
    const navigate = useNavigate();
    const toDetails=(id)=>{
        navigate(`/coins/${id}`);
        console.log(id)}
    useEffect(() => {
      console.log(loading);
    }, [loading])
    
  return (
    <div className="w-screen flex justify-center items-center flex-col bg-gradient-to-r from-[#0C0A1D] to-[#17162B] gap-5"> 
      <HeaderSection/>
    {
      loading ? 
      <LoopCircleLoading color='#ff0000'/>
      :   
      <Table data={data} theme={theme} layout={{ custom: true }} className=" w-screen  lg:w-[90%] h-screen rounded-3xl">
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell pinLeft></HeaderCell>
              <HeaderCell pinLeft>#</HeaderCell>
              <HeaderCell pinLeft>Coin</HeaderCell>
              <HeaderCell>Current Price</HeaderCell>
              <HeaderCell>24h Price</HeaderCell>
              <HeaderCell>24h high</HeaderCell>
              <HeaderCell>24h low</HeaderCell>
              <HeaderCell>total volume</HeaderCell>
              <HeaderCell pinRight>Last 7 days</HeaderCell>
            </HeaderRow>
          </Header>

          <Body >
            {tableList.map((item, index) => (
              <Row key={item.id} item={item} >
                <Cell pinLeft><AiOutlineStar /></Cell>
                <Cell pinLeft>
                    {index+1}
                </Cell>
                <Cell pinLeft onClick={()=>toDetails(item.id,index)}>
                  <div className="flex gap-2 items-center" >
                    <div><img width={'20px'} height={'20px'} src={item.image}/></div>
                    <div className="" >{item.name}</div>
                    <div className="font-light">{item.symbol}</div>
                  </div>
                </Cell>
                <Cell>{item.current_price}</Cell> 
                <Cell>{item.price_change_24h}</Cell>
                <Cell>{item.high_24h}</Cell>
                <Cell>{item.low_24h}</Cell>
                <Cell>{item.total_volume}</Cell>
                
                 
                <Cell pinRight><img src={`https://www.coingecko.com/coins/${item.image.split('images')[1].split('large')[0]}/sparkline.svg`} /></Cell>
              </Row>
            ))}
          </Body>
        </>

      )}
      </Table>
   
    }
    

   
  </div>
  );
            }

export default MainPage;