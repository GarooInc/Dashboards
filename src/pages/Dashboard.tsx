import { useState, useEffect } from "react";
import Header from "../components/Header";
import Kpi from "../components/Kpi";
import BarChartHorizontal from "@/components/BarChartHorizontal";
import BarChartVertical from "@/components/BarChartVertical";
import { ChartArea } from "@/components/ChartArea";
import { 
  getAverageResponseTime, 
  getAnalysisChannels, 
  getConversionRate, 
  getTopKeywords, 
  getSentimentDistribution ,
  getConversionRateOverTime,
  getConversationsOverTime
} from "../services/dashboard";
import { useDateFilter } from "@/contexts/DateFilterContext";

function Dashboard() {
  interface ConversionResponse {
    conversionRate: number;
    totalAppointments: number;
    totalChatHistories: number;
  }

  interface ConversionRatePoint {
    bucket_start: string;
    bucket_end: string;
    range_label?: string;
    appointments?: number;
    chats?: number;
    conversion_rate?: number;
  }

  interface ConversationsOverTimePoint {
    bucket_start: string;
    bucket_end: string;
    range_label?: string;
    conversations?: number;
  }

  const { getQueryParams } = useDateFilter();
  const [conversionRate, setConversionRate] = useState<ConversionResponse>({} as ConversionResponse);
  const [conversionRatePoints, setConversionRatePoints] = useState<ConversionRatePoint[]>([]);

  const [conversationsOverTimePoints, setConversationsOverTimePoints] = useState<ConversationsOverTimePoint[]>([]);
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

    getConversionRateOverTime(queryParams).then(data => {
      
        setConversionRatePoints(data.points || []);
    });

    getConversationsOverTime(queryParams).then(data => {
        setConversationsOverTimePoints(data.points || []);
    });

  }, [getQueryParams]); 

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
          <ChartArea 
            title="Tasa de conversión en el tiempo"
            dataPoints={conversionRatePoints}
            dataKeys={{ primary: "conversion_rate" }}
          />
          <BarChartVertical title="Conversaciones por Canal" chartData={userChannels}/>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
                    <ChartArea 
            title="Conversaciones en el tiempo"
            dataPoints={conversationsOverTimePoints}
            dataKeys={{ primary: "conversations" }}
          />
          <div></div>
          <BarChartHorizontal title="Conversaciones por Keywords" chartData={topKeywords} />

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
