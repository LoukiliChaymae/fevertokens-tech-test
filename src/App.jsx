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
        --data-table-library_grid-template-columns:  250px 25% 25% 25% 50% 150px;
      `,
      BaseCell: `
      &:nth-of-type(1) {
        left: 0px;
      }

      &:nth-of-type(6) {
        right: 0px;
      }
    `,
    },
  ]);

  const [nodes, setNodes] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=2&sparkline=false&locale=en");
      const data = await response.json();
      setNodes(data);
    }
    fetchData();
  }, []);
    const data = { nodes };
  return (
    <div className="w-screen h-screen">
      <Table data={data} theme={theme} layout={{ custom: true }} className="h-full">
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell pinLeft>#</HeaderCell>
              <HeaderCell pinLeft>Task</HeaderCell>
              <HeaderCell>Deadline</HeaderCell>
              <HeaderCell>Type</HeaderCell>
              <HeaderCell>Complete</HeaderCell>
              <HeaderCell pinRight>Tasks</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item, index) => (
              <Row key={item.id} item={item}>
                <Cell pinLeft>{index}</Cell>
                <Cell >
                <div className="flex items-center" >
                <div><img width={'20px'} height={'20px'} src={item.image}/></div>
                <div>{item.name}</div>
                <div>{item.symbol}</div>
                </div>
                </Cell>
                <Cell>{item.name}</Cell>
                <Cell>
                  {item.name}
                </Cell>
                <Cell>{item.current_price}</Cell> 
                 
                <Cell pinRight><img src="https://img.icons8.com/ios/50/000000/plus.png" /></Cell>
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

