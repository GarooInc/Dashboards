import { useState, useEffect } from "react";
import Header from "../components/Header";
import Kpi from "../components/Kpi";
import BarChartHorizontal from "@/components/BarChartHorizontal";
import BarChartVertical from "@/components/BarCharVertical";
import { 
  getAverageResponseTime, 
  getAnalysisChannels, 
  getConversionRate, 
  getTopKeywords, 
  getSentimentDistribution 
} from "../services/dashboard";
import { useDateFilter } from "@/contexts/DateFilterContext";

function Dashboard() {
  interface ConversionRateResponse {
    conversionRate: number;
    totalAppointments: number;
    totalChatHistories: number;
  }

  const { getQueryParams } = useDateFilter();
  const [conversionRate, setConversionRate] = useState<ConversionRateResponse>({} as ConversionRateResponse);
  const [userChannels, setUserChannels] = useState([]);
  const [topKeywords, setTopKeywords] = useState([]);
  const [sentimentDistribution, setSentimentDistribution] = useState([]);
  const [averageResponseTime, setAverageResponseTime] = useState(0);
  
  useEffect(() => {
    const queryParams = getQueryParams();

    getConversionRate(queryParams).then(data => {
      setConversionRate({
        conversionRate: data.conversion_rate,
        totalAppointments: data.total_appointments,
        totalChatHistories: data.total_chats
      });
    });

    getSentimentDistribution(queryParams).then(data => {
      const sentiments = data.sentiments.map((item: { sentiment: string; count: number }) => ({
        category: item.sentiment,
        value: item.count
      }));
      setSentimentDistribution(sentiments);
    });

    getAnalysisChannels(queryParams).then(data => {
      const channels = data.channels.map((item: { channel: string; count: number }) => ({
        category: item.channel,
        value: item.count
      }));
      setUserChannels(channels);
    });

    getTopKeywords(queryParams).then(data => {
      const keywords = data.top_keywords.map((item: { keyword: string; count: number }) => ({
        category: item.keyword,
        value: item.count
      }));
      setTopKeywords(keywords);
    });

    getAverageResponseTime(queryParams).then(data => {
        setAverageResponseTime(data.average_execution_time_inSec);
    });

  }, [getQueryParams]); // Se ejecuta cuando cambian los filtros

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header title="Dashboard" />
      <div className="flex-1 flex flex-col md:px-20 md:py-6 gap-4 p-10">
        <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
          <Kpi title="Conversaciones" value={conversionRate.totalChatHistories} />
          <Kpi title="Citas" value={conversionRate.totalAppointments} />
          <div></div>
          <Kpi title="Tiempo de Respuesta (s)" value={averageResponseTime} />
          <Kpi title="% Conversión de citas" value={conversionRate.conversionRate} />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <BarChartHorizontal title="Distribución de Sentimientos" chartData={sentimentDistribution} />
          <BarChartHorizontal title="Conversaciones por Keywords" chartData={topKeywords} />
          <BarChartVertical title="Conversaciones por Canal" chartData={userChannels}/>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <BarChartHorizontal title="Distribución de Sentimientos" chartData={sentimentDistribution} />
          <BarChartHorizontal title="Conversaciones por Keywords" chartData={topKeywords} />
          <BarChartVertical title="Conversaciones por Canal" chartData={userChannels}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
