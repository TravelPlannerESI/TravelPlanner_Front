import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CostChart = ({ dashboard }: any) => {
  const chartData = dashboard?.chartData;

  let map = {};

  if (dashboard !== undefined) {
    Object.values(chartData).forEach(({ days, cost }: any) => {
      let day = `${days + 1}일차`;
      if (map[day] === undefined) map[day] = Number.parseInt(cost);
      else map[day] = map[day] + Number.parseInt(cost);
    });
  }

  const data = {
    datasets: [
      {
        data: map,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default CostChart;
