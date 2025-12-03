import { useState, useEffect } from "react";
import Header from "../components/Header";
import Kpi from "../components/Kpi";
import BarChartHorizontal from "@/components/BarChartHorizontal";
import BarChartVertical from "@/components/BarChartVertical";
import { ChartArea } from "@/components/ChartArea";
import { useMemo } from "react";
import { 
  getAverageResponseTime, 
  getAnalysisChannels, 
  getConversionRate, 
  getTopKeywords, 
  getSentimentDistribution,
  getConversionRateOverTime,
  getConversationsOverTime,
  getAppointmentsOverTime,

} from "../services/dashboard";
import { useDateFilter } from "@/contexts/DateFilterContext";

function Dashboard() {
  interface ConversionResponse {
    conversionRate: number;
    totalAppointments: number;
    totalChatHistories: number;
  }

  interface ConversionRateAPIResponse {
    conversion_rate: number;
    total_appointments: number;
    total_chats: number;
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

    interface AppointmentsOverTimePoint {
    bucket_start: string;
    bucket_end: string;
    range_label?: string;
    appointments?: number;
  }


  interface SentimentItem {
    sentiment: string;
    count: number;
  }

  interface SentimentAPIResponse {
    sentiments: SentimentItem[];
  }

  interface ChannelItem {
    channel: string;
    count: number;
  }

  interface ChannelsAPIResponse {
    channels: ChannelItem[];
  }

  interface KeywordItem {
    keyword: string;
    count: number;
  }

  interface KeywordsAPIResponse {
    top_keywords: KeywordItem[];
  }

  interface AverageResponseTimeAPIResponse {
    average_execution_time_inSec: number;
  }

  interface ConversionRateOverTimeAPIResponse {
    points: ConversionRatePoint[];
  }

  interface ConversationsOverTimeAPIResponse {
    points: ConversationsOverTimePoint[];
  }

  interface AppointmentsOverTimeAPIResponse {
    points : AppointmentsOverTimePoint[];
  }


  interface ChartDataItem {
    category: string;
    value: number;
  }

  const { getQueryParams } = useDateFilter();
  const queryParams = useMemo(() => getQueryParams(), [getQueryParams]);

  const [conversionRate, setConversionRate] = useState<ConversionResponse>({} as ConversionResponse);
  const [conversionRatePoints, setConversionRatePoints] = useState<ConversionRatePoint[]>([]);
  const [conversationsOverTimePoints, setConversationsOverTimePoints] = useState<ConversationsOverTimePoint[]>([]);
  const [userChannels, setUserChannels] = useState<ChartDataItem[]>([]);
  const [topKeywords, setTopKeywords] = useState<ChartDataItem[]>([]);
  const [sentimentDistribution, setSentimentDistribution] = useState<ChartDataItem[]>([]);
  const [averageResponseTime, setAverageResponseTime] = useState(0);
  const [appointmentsOverTimePoints, setAppointmentsOverTimePoints] = useState<ConversationsOverTimePoint[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const idToken = localStorage.getItem('cognitoToken') || '';

  
  useEffect(() => {
    setIsLoading(true);

    Promise.all([
    getConversionRate(queryParams, idToken)
      .then((data) => {
        const typedData = data as ConversionRateAPIResponse;
        setConversionRate({
          conversionRate: typedData.conversion_rate,
          totalAppointments: typedData.total_appointments,
          totalChatHistories: typedData.total_chats
        });
      })
      .catch(() => {
        setConversionRate({
          conversionRate: 0,
          totalAppointments: 0,
          totalChatHistories: 0
        });
      }),
    
    getSentimentDistribution(queryParams, idToken)
      .then((data) => {
        const typedData = data as SentimentAPIResponse;
        const sentiments = typedData.sentiments.map((item) => ({
          category: item.sentiment,
          value: item.count
        }));
        setSentimentDistribution(sentiments);
      })
      .catch(() => setSentimentDistribution([])),
    
    getAnalysisChannels(queryParams, idToken)
      .then((data) => {
        const typedData = data as ChannelsAPIResponse;
        const channels = typedData.channels.map((item) => ({
          category: item.channel,
          value: item.count
        }));
        setUserChannels(channels);
      })
      .catch(() => setUserChannels([])),
    
    getTopKeywords(queryParams, idToken)
      .then((data) => {
        const typedData = data as KeywordsAPIResponse;
        const keywords = typedData.top_keywords.map((item) => ({
          category: item.keyword,
          value: item.count
        }));
        setTopKeywords(keywords);
      })
      .catch(() => setTopKeywords([])),
    
    getAverageResponseTime(queryParams, idToken)
      .then((data) => {
        const typedData = data as AverageResponseTimeAPIResponse;
        setAverageResponseTime(typedData.average_execution_time_inSec);
      })
      .catch(() => setAverageResponseTime(0)),
    
    getConversionRateOverTime(queryParams, idToken)
      .then((data) => {
        const typedData = data as ConversionRateOverTimeAPIResponse;
        setConversionRatePoints(typedData.points || []);
      })
      .catch(() => setConversionRatePoints([])),
    
    getConversationsOverTime(queryParams, idToken)
      .then((data) => {
        const typedData = data as ConversationsOverTimeAPIResponse;
        setConversationsOverTimePoints(typedData.points || []);
      })
      .catch(() => setConversationsOverTimePoints([])),
    
    getAppointmentsOverTime(queryParams, idToken)
      .then((data) => {
        const typedData = data as AppointmentsOverTimeAPIResponse;
        setAppointmentsOverTimePoints(typedData.points || []);
      })
      .catch(() => setAppointmentsOverTimePoints([]))
  ]).finally(() => {
    setIsLoading(false);
  });


  }, [queryParams, idToken]); 

  return (
    <div className="bg-white min-h-screen flex flex-col relative">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-black">
            <span className="loading loading-spinner text-white"></span>
          </div>
        </div>
      )}
      <Header title="Dashboard" />
      <div className="flex-1 flex flex-col md:px-20 md:py-6 gap-4 p-10 relative z-10">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          <Kpi title="Conversaciones" value={conversionRate.totalChatHistories} />
          <Kpi title="Citas" value={conversionRate.totalAppointments} />
          <Kpi title="Tiempo de Respuesta (s)" value={averageResponseTime} />
          <Kpi title="% Conversión de citas" value={conversionRate.conversionRate} />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <BarChartHorizontal 
            title="Distribución de Sentimientos" 
            chartData={sentimentDistribution}
          />
          <ChartArea 
            title="Tasa de conversión en el tiempo"
            dataPoints={conversionRatePoints}
            dataKeys={{ primary: "conversion_rate" }}
          />
          <BarChartVertical 
            title="Conversaciones por Canal" 
            chartData={userChannels}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <ChartArea 
            title="Conversaciones en el tiempo"
            dataPoints={conversationsOverTimePoints}
            dataKeys={{ primary: "conversations" }}
          />
          <BarChartHorizontal 
            title="Conversaciones por Keywords" 
            chartData={topKeywords} 
          />
            <ChartArea 
            title="Citas en el tiempo"
            dataPoints={appointmentsOverTimePoints}
            dataKeys={{ primary: "appointments" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
