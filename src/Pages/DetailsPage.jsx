import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom/dist';
import HeaderSection from '../components/HeaderSection';

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

    useEffect(() => {
      const fetchForChart = async()=>{
        try {
        const fetchChart= await fetch(`https://api.coingecko.com/api/v3/coins/${Id}/market_chart?vs_currency=usd&days=30&interval=daily`)
        const chart = await fetchChart.json();
        console.log("chart",chart)
        setChartInfo(chart);
      }  catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
    }}
      fetchForChart()
    }, [])
    
  return (   
    <div className="h-screen bg-gradient-to-r from-[#0C0A1D] to-[#17162B]"> <div className=" flex-col "><HeaderSection className="mt-4 flex justify-center items-center" />

    <div className="flex flex-1 ">
    <div className="w-2/5 bg-gray-300 flex justify-center">
      <div className='lg:w-[98%] rounded overflow-hidden shadow-lg bg-blue-500'>
        <div class="rounded-md justify-center text-sm bg-zinc-950 text-white flex  w-[4rem] px-0">Rank #{a}</div>
        <div className="flex gap-2 items-center" >
          <div><img width={'25px'} height={'25px'} src={details?.image?.small}/></div>
            <div className="font-bold text-xl">{details.name}</div>
            <div className="font-light text-base">{details.symbol}</div>
        </div>
        <div>{details?.market_data?.current_price?.usd}</div>
        <div></div>
      </div>
    </div>
    <div class="w-3/5 bg-gray-500 flex justify-center"> 
     <div className='lg:w-[98%] rounded overflow-hidden shadow-lg bg-red-500'>chart</div>
    </div>
    
    </div></div></div>  
  )
}

export default DetailsPage
