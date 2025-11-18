import React from "react";
import {useState, useEffect} from "react";
import Header from "../components/Header";
import Kpi from "../components/Kpi";
import BarChartHorizontal from "@/components/BarChartHorizontal";
import  BarChartVertical from "@/components/BarCharVertical";
import { getAnalysisChannels, getConversionRate, getTopKeywords, getSentimentDistribution } from "../services/dashboard";

function Dashboard (){

    interface ConversionRateResponse {
        conversionRate: number;
        totalAppointments: number;
        totalChatHistories: number;
    }

    const [conversionRate, setConversionRate] = useState<ConversionRateResponse>({} as ConversionRateResponse);
    const [userChannels, setUserChannels] = useState([]);
    const [topKeywords, setTopKeywords] = useState([]);
    const [sentimentDistribution, setSentimentDistribution] = useState([]);
    
    useEffect(() => {

        getConversionRate().then(data => {
            setConversionRate({
                conversionRate: data.conversion_rate,
                totalAppointments: data.total_appointments,
                totalChatHistories: data.total_chat_histories
            });
        });

        getSentimentDistribution().then(data => {
            console.log(data);
            const sentiments = data.sentiments.map((item: { sentiment: string; count: number }) => ({
                category: item.sentiment,
                value: item.count
            }));
            setSentimentDistribution(sentiments);
        });


        getAnalysisChannels().then(data => {
            const channels = data.channels.map((item: { channel: string; count: number }) => ({
                category: item.channel,
                value: item.count
            }));
            setUserChannels(channels);
        });

        getTopKeywords().then(data => {
           const keywords = data.top_keywords.map((item: { keyword: string; count: number }) => ({
                category: item.keyword,
                value: item.count
           }));
           
           setTopKeywords(keywords);
        });

    }, []);


    return (
        <div className="bg-white min-h-screen md:h-screen md:overflow-hidden flex flex-col">
            <Header title= "Dashboard" />
            <div className="flex-1 flex flex-col md:px-20 md:py-6 gap-12 md:overflow-hidden p-10">
                <div className="grid md:grid-cols-5 grid-cols-2 gap-4 md:h-24">
                    <Kpi title="Conversaciones" value={conversionRate.totalChatHistories} />
                    <Kpi title="Citas" value={conversionRate.totalAppointments} />
                    <div></div>
                    <Kpi title="Tiempo de Respuesta (s)" value={""} />
                    <Kpi title="% Conversión de citas" value={conversionRate.conversionRate} />
                </div>
                <div className="grid md:grid-cols-3  gap-4 md:h-[calc(40%-1rem)]">
                    <BarChartHorizontal title="Distribución de Sentimientos" chartData={sentimentDistribution} />
                    <div></div>
                    <BarChartVertical title="Conversaciones por Canal" chartData={userChannels}/>

                </div>
                <div className="md:grid md:grid-cols-2 gap-4 md:h-[calc(40%-1rem)]">
                    <div></div>
                    <BarChartHorizontal title="Conversaciones por Keywords" chartData={topKeywords} />

                </div>
            </div>
        </div>
    );
}

export default Dashboard;