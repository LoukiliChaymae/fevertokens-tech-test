// Data generated from http://www.bikeforums.net/professional-cycling-fans/1113087-2017-tour-de-france-gpx-tcx-files.html
// import Highcharts from 'highcharts';
import { useEffect ,useState, React} from 'react';
import { useParams } from 'react-router-dom/dist';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
export const options = {
responsive: true,
plugins: {
legend: {
  position: 'top' ,
},
title: {
  display: true,
  text: 'wewe',
},
},
};

// Now create the chart
function Chart(){
    const { Id } = useParams();
    const [chartInfo, setChartInfo] = useState([]);

    useEffect(() => {
      const fetchForChart = async()=>{
        try {
        const fetchChart= await fetch(`https://api.coingecko.com/api/v3/coins/${Id}/market_chart?vs_currency=usd&days=70&interval=daily`)
        const chart = await fetchChart.json();
        const prices = chart.prices.map( (price) => (
          {
              x : price[0],
              y : price[1].toFixed(2)
          }
        ))
        setChartInfo(prices);
      }  catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
    }}
      fetchForChart()
  }, [])

      const data = {
        labels:chartInfo.map(value => moment(value.x). format('MMM DD')),
        datasets: [
          {
            fill: true,
            label: 'Dataset 2',
            data: chartInfo.map((info)=> info.y),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    return(
        
          <Line options={options} data={data} className="w-full" />
        
      );
}
export default Chart;