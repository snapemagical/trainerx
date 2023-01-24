import { Bar,Line,Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  LineElement,
  PointElement,
  ArcElement,
  Legend,
} from 'chart.js'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
export const BarChart = ({chartData,options})=>{
    return<Bar
    data={chartData}
    options={options}
  />
}
export const LineChart = ({chartData,options})=>{
  return<Line
  data={chartData}
  options={options}
/>
}
export const PieChart = ({chartData,options})=>{
  return<Doughnut
  data={chartData}
  options={options}
/>
}