import { useState, useEffect } from "react";
import Header from "../components/Header";
import Kpi from "../components/Kpi";
import BarChartHorizontal from "@/components/BarChartHorizontal";
import BarChartVertical from "@/components/BarChartVertical";
import { ChartArea } from "@/components/ChartArea";
import { ConversationSummariesTable } from "@/components/ConversationSummariesTable";
import { 
  getAverageResponseTime, 
  getAnalysisChannels, 
  getConversionRate, 
  getTopKeywords, 
  getSentimentDistribution,
  getConversionRateOverTime,
  getConversationsOverTime,
  getConversationSummaries
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

  interface ConversationSummariesAPIResponse {
    sample_summaries: ConversationSummary[];
    total_users_with_summary : number;
  }

  interface ConversationSummary {
    user: string;
    summary: string;
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
  const [conversationSummaries, setConversationSummaries] = useState<ConversationSummary[]>([]);
  const [isLoadingConversionRate, setIsLoadingConversionRate] = useState(true);
  const [isLoadingAverageResponseTime, setIsLoadingAverageResponseTime] = useState(true);
  const [isLoadingSentiment, setIsLoadingSentiment] = useState(true);
  const [isLoadingChannels, setIsLoadingChannels] = useState(true);
  const [isLoadingKeywords, setIsLoadingKeywords] = useState(true);
  const [isLoadingConversionRatePoints, setIsLoadingConversionRatePoints] = useState(true);
  const [isLoadingConversationsOverTime, setIsLoadingConversationsOverTime] = useState(true);
  const [isLoadingConversationSummaries, setIsLoadingConversationSummaries] = useState(true);
  const idToken = localStorage.getItem('cognitoToken') || '';

  
  useEffect(() => {
    setIsLoadingConversionRate(true);
    setIsLoadingAverageResponseTime(true);
    setIsLoadingSentiment(true);
    setIsLoadingChannels(true);
    setIsLoadingKeywords(true);
    setIsLoadingConversionRatePoints(true);
    setIsLoadingConversationsOverTime(true);
    setIsLoadingConversationSummaries(true);

    const queryParams = getQueryParams();
    
    getConversionRate(queryParams, idToken).then((data) => {
      const typedData = data as ConversionRateAPIResponse;
      setConversionRate({
        conversionRate: typedData.conversion_rate,
        totalAppointments: typedData.total_appointments,
        totalChatHistories: typedData.total_chats
      });
    }).catch(() => {
      setConversionRate({
        conversionRate: 0,
        totalAppointments: 0,
        totalChatHistories: 0
      });
    }).finally(() => setIsLoadingConversionRate(false));

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
    }).catch(() => {
      setAverageResponseTime(0);
    }).finally(() => setIsLoadingAverageResponseTime(false));

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

    getConversationSummaries(idToken).then((data) => {
      const typedData = data as ConversationSummariesAPIResponse;
      setConversationSummaries(typedData.sample_summaries || []);
    }).catch(() => {
      console.error('Failed to fetch conversation summaries');
      setConversationSummaries([]);
    }).finally(() => setIsLoadingConversationSummaries(false));

  }, [getQueryParams, idToken]); 

  const isDashboardLoading = 
    isLoadingConversionRate ||
    isLoadingAverageResponseTime ||
    isLoadingSentiment ||
    isLoadingChannels ||
    isLoadingKeywords ||
    isLoadingConversionRatePoints ||
    isLoadingConversationsOverTime ||
    isLoadingConversationSummaries;

  return (
    <div className="bg-white min-h-screen flex flex-col relative">
      {isDashboardLoading && (
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
          <ConversationSummariesTable 
            data={conversationSummaries} 
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
