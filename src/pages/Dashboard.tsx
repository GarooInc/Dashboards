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
  getSentimentDistribution,
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

  interface ChartDataItem {
    category: string;
    value: number;
  }

  const { getQueryParams } = useDateFilter();
  const [conversionRate, setConversionRate] = useState<ConversionResponse>({} as ConversionResponse);
  const [conversionRatePoints, setConversionRatePoints] = useState<ConversionRatePoint[]>([]);
  const [conversationsOverTimePoints, setConversationsOverTimePoints] = useState<ConversationsOverTimePoint[]>([]);
  const [userChannels, setUserChannels] = useState<ChartDataItem[]>([]);
  const [topKeywords, setTopKeywords] = useState<ChartDataItem[]>([]);
  const [sentimentDistribution, setSentimentDistribution] = useState<ChartDataItem[]>([]);
  const [averageResponseTime, setAverageResponseTime] = useState(0);
  const [isLoadingSentiment, setIsLoadingSentiment] = useState(true);
  const [isLoadingChannels, setIsLoadingChannels] = useState(true);
  const [isLoadingKeywords, setIsLoadingKeywords] = useState(true);
  const [isLoadingConversionRatePoints, setIsLoadingConversionRatePoints] = useState(true);
  const [isLoadingConversationsOverTime, setIsLoadingConversationsOverTime] = useState(true);
  const idToken = localStorage.getItem('cognitoToken') || '';

  
  useEffect(() => {
    const queryParams = getQueryParams();
    
    getConversionRate(queryParams, idToken).then((data) => {
      const typedData = data as ConversionRateAPIResponse;
      setConversionRate({
        conversionRate: typedData.conversion_rate,
        totalAppointments: typedData.total_appointments,
        totalChatHistories: typedData.total_chats
      });
    });

    getSentimentDistribution(queryParams, idToken).then((data) => {
      const typedData = data as SentimentAPIResponse;
      const sentiments = typedData.sentiments.map((item) => ({
        category: item.sentiment,
        value: item.count
      }));
      setSentimentDistribution(sentiments);
    }).catch(() => setSentimentDistribution([]))
      .finally(() => setIsLoadingSentiment(false));

    getAnalysisChannels(queryParams, idToken).then((data) => {
      const typedData = data as ChannelsAPIResponse;
      const channels = typedData.channels.map((item) => ({
        category: item.channel,
        value: item.count
      }));
      setUserChannels(channels);
    }).catch(() => setUserChannels([]))
      .finally(() => setIsLoadingChannels(false));

    getTopKeywords(queryParams, idToken).then((data) => {
      const typedData = data as KeywordsAPIResponse;
      const keywords = typedData.top_keywords.map((item) => ({
        category: item.keyword,
        value: item.count
      }));
      setTopKeywords(keywords);
    }).catch(() => setTopKeywords([]))
      .finally(() => setIsLoadingKeywords(false));

    getAverageResponseTime(queryParams, idToken).then((data) => {
      const typedData = data as AverageResponseTimeAPIResponse;
      setAverageResponseTime(typedData.average_execution_time_inSec);
    });

    getConversionRateOverTime(queryParams, idToken).then((data) => {
      const typedData = data as ConversionRateOverTimeAPIResponse;
      setConversionRatePoints(typedData.points || []);
    }).catch(() => setConversionRatePoints([]))
      .finally(() => setIsLoadingConversionRatePoints(false));

    getConversationsOverTime(queryParams, idToken).then((data) => {
      const typedData = data as ConversationsOverTimeAPIResponse;
      setConversationsOverTimePoints(typedData.points || []);
    }).catch(() => setConversationsOverTimePoints([]))
      .finally(() => setIsLoadingConversationsOverTime(false));

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
          <BarChartHorizontal 
            title="Distribución de Sentimientos" 
            chartData={sentimentDistribution}
            isLoading={isLoadingSentiment} 
          />
          <ChartArea 
            title="Tasa de conversión en el tiempo"
            dataPoints={conversionRatePoints}
            dataKeys={{ primary: "conversion_rate" }}
            isLoading={isLoadingConversionRatePoints}
          />
          <BarChartVertical 
            title="Conversaciones por Canal" 
            chartData={userChannels}
            isLoading={isLoadingChannels}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <ChartArea 
            title="Conversaciones en el tiempo"
            dataPoints={conversationsOverTimePoints}
            dataKeys={{ primary: "conversations" }}
            isLoading={isLoadingConversationsOverTime}
          />
          <div></div>
          <BarChartHorizontal 
            title="Conversaciones por Keywords" 
            chartData={topKeywords} 
            isLoading={isLoadingKeywords}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;