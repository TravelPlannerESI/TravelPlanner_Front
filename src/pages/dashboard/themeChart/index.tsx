import { Bar } from 'react-chartjs-2';
import { theme } from './theme';

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

const ThemeChart = ({ dashboard }: any) => {
  const map = {
    TOURISM: 0,
    FOOD: 0,
    CAFE: 0,
    REST: 0,
    EXPERIENCE: 0,
    EXTREME: 0,
  };

  dashboard?.chartData.forEach(({ travelTheme }: any) => {
    if (travelTheme !== null) map[travelTheme] = map[travelTheme] + 1;
  });

  const data = {
    datasets: [
      {
        data: [
          { x: theme.TOURISM.name, y: map['TOURISM'] },
          { x: theme.FOOD.name, y: map['FOOD'] },
          { x: theme.CAFE.name, y: map['CAFE'] },
          { x: theme.REST.name, y: map['REST'] },
          { x: theme.EXPERIENCE.name, y: map['EXPERIENCE'] },
          { x: theme.EXTREME.name, y: map['EXTREME'] },
        ],
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

export default ThemeChart;
