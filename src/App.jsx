import React, { useState } from "react";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import { AiOutlineStar , AiTwotoneStar } from 'react-icons/ai';
// Example implementation of getData function in server.js or similar file

// export const getData = async (params) => {
//   try {
//     // Perform an API request using the params provided
//     const response = await fetch('your_api_endpoint', {
//       method: 'GET', // or 'POST', 'PUT', etc.
//       // Add necessary headers or body based on the API requirements
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }

//     const data = await response.json();
//     return data; // Assuming the response contains the necessary data
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return { nodes: [] }; // Return an empty array or handle errors appropriately
//   }
// };


const nodes = [
  {
    id: '0',
    name: 'Shopping List',
    deadline: new Date(2020, 1, 15),
    type: 'TASK',
    isComplete: true,
    nodes: 3,
  },
  {
    id: '1',
    name: 'Shopping List',
    deadline: new Date(2020, 1, 25),
    type: 'TASK',
    isComplete: true,
    nodes: 7,
  
  },
];

function App() {
    

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
  const [ids, setIds] = React.useState([]);
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(proxyurl+"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=2&sparkline=false&locale=en");
      const data = await response.json();
      console.log(data)
      // const ids = data.map((item) => item.image.split('images/')[1].split('/')[0] ).join(',');
      // console.log(ids)
     
      setNodes(data);
      // setIds(ids);
      // const idsData = await fetch(proxyurl+`https://www.coingecko.com/coins/price_percentage_change?ids=${ids}&vs_currency=usd`)
      // console.log(idsData)
    }
    fetchData();
  }, []);
    const data = { nodes };
  return (
    <div className="w-screen flex align-center justify-center">
      <Table data={data} theme={theme} layout={{ custom: true }} className="w-screen h-screen">
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

          <Body>
            {tableList.map((item, index) => (
              <Row key={item.id} item={item}>
                <Cell pinLeft><AiOutlineStar /></Cell>
                <Cell pinLeft>
                    {index+1}
                </Cell>
                <Cell pinLeft>
                  <div className="flex gap-2 items-center" >
                    <div><img width={'20px'} height={'20px'} src={item.image}/></div>
                    <div className="">{item.name}</div>
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
    {/* {data.pageInfo && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Total Rows: {data.pageInfo.total}</span>
          <span>
            Rows per page: {data.pageInfo.startSize}
            {"-"}
            {data.pageInfo.endSize}
            {" of "}
            {data.pageInfo.total}{" "}
            <button
              type="button"
              disabled={pagination.state.page === 0}
              onClick={() => pagination.fns.onSetPage(0)}
            >
              {"|<"}
            </button>
            <button
              type="button"
              disabled={pagination.state.page === 0}
              onClick={() =>
                pagination.fns.onSetPage(pagination.state.page - 1)
              }
            >
              {"<"}
            </button>
            <button
              type="button"
              disabled={pagination.state.page + 1 === data.pageInfo.totalPages}
              onClick={() =>
                pagination.fns.onSetPage(pagination.state.page + 1)
              }
            >
              {">"}
            </button>
            <button
              type="button"
              disabled={pagination.state.page + 1 === data.pageInfo.totalPages}
              onClick={() =>
                pagination.fns.onSetPage(data.pageInfo.totalPages - 1)
              }
            >
              {">|"}
            </button>
          </span>
        </div>
      )
    } */}
   
  </div>
  );
}

export default App;

