import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom/dist';
import HeaderSection from '../components/HeaderSection';
import Chart from '../components/Chart';

function DetailsPage() {
    const { Id } = useParams();
    const [details, setDetails] = useState([]);
    const [chartInfo, setChartInfo] = useState([]);
    const a = Math.floor(Math.random() * (10 - 1)) + 1;
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${Id}`);
            const data = await response.json();
            console.log("details",data)
            setDetails(data);
        
          } catch (error) {
          console.error("Une erreur s'est produite lors de la récupération des données :", error);
      }
        } 
        fetchData();
    }, [Id]);

    
    
  return (   
    <div className="h-screen bg-gradient-to-r from-[#0C0A1D] to-[#17162B]"> <HeaderSection className="mt-4 flex justify-center items-center" />

    <div className="flex">
    <div className="w-2/5  flex justify-center">
      <div className='lg:w-[98%] rounded overflow-hidden shadow-lg bg-white p-6'>
        <div className="rounded-md justify-center text-sm bg-zinc-950 text-white flex w-[4rem] px-0">Rank #{a}</div>
        <div className="flex gap-2 items-center h-[50px]" >
          <div><img width={'25px'} height={'25px'} src={details?.image?.small}/></div>
            <div className="font-bold text-x1">{details.name}</div>
            <div className="font-light text-base">{details.symbol}</div>
        </div>
        <div className='font-bold text-lg'>${details?.market_data?.current_price?.usd}</div>
        <progress className="rounded-full tw-flex h-[8px] tw-justify-between tw-w-full high-low-range-slider tw-mt-3" min={0} max={details?.market_data?.high_24h?.usd - details?.market_data?.low_24h?.usd} value={details?.market_data?.current_price?.usd - details?.market_data?.low_24h?.usd}></progress>
      </div>
    </div>
    <div className="w-3/5  flex justify-center"> 
     <div className='lg:w-[98%] rounded overflow-hidden shadow-lg '>
     <Chart/>
     </div>
    </div>
      
    </div></div> 
  )
}

export default DetailsPage
