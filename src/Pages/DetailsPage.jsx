import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom/dist';
import HeaderSection from '../components/HeaderSection';
import Chart from '../components/Chart';
import { Progress, Space } from 'antd';
function DetailsPage() {
    const { Id } = useParams();
    const [details, setDetails] = useState([]);
    const a = Math.floor(Math.random() * (10 - 1)) + 1;
    useEffect(() => {
        const fetchData = async () => {
          try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";

            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${Id}`);
            const data = await response.json();
            console.log("details",data.market_data)
            setDetails(data);
        
          } catch (error) {
          console.error("Une erreur s'est produite lors de la récupération des données :", error);
      }
        } 
        fetchData();
    }, [Id]);

  const changeColor = details?.market_data?.market_cap_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600';
  const   getmax = 
    
   ( (details?.market_data?.current_price?.usd - details?.market_data?.low_24h?.usd)/ (details?.market_data?.high_24h?.usd - details?.market_data?.low_24h?.usd )) * 100
 

const twoColors = { '0%': '#F8DB5A', '100%': '#82DB4C' };
  return (   
    <div className="h-full max-w-lg "> 
      <HeaderSection className="mt-4 flex justify-center items-center" />
    
      <div className=" w-screen flex flex-col md:flex-row align-center p-2 gap-5 justify-around bg-gradient-to-r from-[#0C0A1D] to-[#17162B]">
        
        <div className=' lg:min-w-[500px]  md:h-full  md:px-6 shadow-lg bg-[#EFF2F5] p-6 rounded-xl  '>
          <div className="rounded-xl justify-center text-sm bg-zinc-950 text-white flex w-[4rem] px-1">
            Rank #{a}
          </div>
          <div className="flex gap-2 items-center h-[50px]" >
            <div><img width={'25px'} height={'25px'} src={details?.image?.small}/></div>
              <div className="font-bold text-sm">{details.name}</div>
            <div className="font-light text-base">{details.symbol}</div>
          </div>
          <div className='flex flex-row gap-5 items-center'>
            <div className='font-bold text-3xl '> ${details?.market_data?.current_price?.usd}</div>
            <div className={`font-bold text-sm  ${changeColor} `}> {details?.market_data?.market_cap_change_percentage_24h.toFixed(2)}%
          </div>
           
          
          </div>
          <div className='font-light text-base'>
          <Progress percent={getmax} strokeColor={twoColors} showInfo= {false} />
            
            <div className="flex justify-between">
              <div className='font-semibold text-sm'>
                ${details?.market_data?.low_24h?.usd}
              </div>
              <div className='font-semibold text-sm'>
                24H range
              </div>
              <div className='font-semibold text-sm'>
                ${details?.market_data?.high_24h?.usd}
              </div>
              
            </div>
          </div>
          <div className=''>
            <div className='border-b-2 border-gray-200 pb-2 flex justify-between mt-2'>
              <div>Market Cap</div>
              <div>${details?.market_data?.current_price?.usd}</div>
            </div>
            <div className='border-b-2 border-gray-200 pb-2 flex justify-between '>
              <div>Market Cap</div>
              <div>${details?.market_data?.current_price?.usd}</div>
            </div>
            <div className='border-b-2 border-gray-200 pb-2 flex justify-between '>
              <div>Market Cap</div>
              <div>${details?.market_data?.current_price?.usd}</div>
            </div>
            <div className='border-b-2 border-gray-200 pb-2 flex justify-between '>
              <div>Market Cap</div>
              <div>${details?.market_data?.current_price?.usd}</div>
            </div>
     
          </div>
       </div>
       <div className=' w-full  md:h-full   shadow-lg px-1 rounded flex justify-center items-center'>
        <Chart />
      </div>
      </div>

      
    </div> 
  )
}

export default DetailsPage