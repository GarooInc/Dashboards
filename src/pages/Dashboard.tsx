import React from "react";
import {useState, useEffect} from "react";
import Header from "../components/Header";
import Kpi from "../components/Kpi";
import ChartBarMixed from "../components/BarChart";
import { getUserChannels, getConversionRate, getTopKeywords, getSentimentDistribution } from "../services/dashboard";

function Dashboard (){

    interface ConversionRateResponse {
        conversionRate: number;
        totalAppointments: number;
        totalChatHistories: number;
    }

    const [userChannels, setUserChannels] = useState([]);
    const [conversionRate, setConversionRate] = useState<ConversionRateResponse>({} as ConversionRateResponse);
    const [topKeywords, setTopKeywords] = useState([]);
    const [sentimentDistribution, setSentimentDistribution] = useState({});
    
    useEffect(() => {

        getConversionRate().then(data => {
            setConversionRate({
                conversionRate: data.conversion_rate,
                totalAppointments: data.total_appointments,
                totalChatHistories: data.total_chat_histories
            });
        });

        getUserChannels().then(data => {
            console.log(data);
            setUserChannels(data);
        });

        getTopKeywords().then(data => {
           const keywords = data.top_keywords.map((item: { keyword: string; count: number }) => ({
                category: item.keyword,
                value: item.count
           }));
           
           setTopKeywords(keywords);
           console.log("keywords",keywords);
        });

        getSentimentDistribution().then(data => {
            setSentimentDistribution(data);
        });

    }, []);


    return (
        <div className="bg-white min-h-screen">
            <Header title= "Dashboard" />
            <div className="flex flex-col md:px-20 md:py-10 gap-8">
                <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
                    <Kpi title="Conversaciones" value={conversionRate.totalChatHistories} />
                    <Kpi title="Citas" value={conversionRate.totalAppointments} />
                    <Kpi title="Valor" value={""} />
                    <Kpi title="Tiempo de Respuesta (s)" value={"85s"} />
                    <Kpi title="% Conversión de citas" value={conversionRate.conversionRate} />
                </div>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                    <ChartBarMixed title="Conversaciones por Canal" chartData={topKeywords} />
                    <ChartBarMixed title="Conversaciones por Canal" chartData={topKeywords} />
                    <ChartBarMixed title="Conversaciones por Canal" chartData={topKeywords} />

                </div>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                    <ChartBarMixed title="Conversaciones por Canal" chartData={topKeywords} />
                    <ChartBarMixed title="Conversaciones por Canal" chartData={topKeywords} />
                    <ChartBarMixed title="Conversaciones por Canal" chartData={topKeywords} />

                </div>
            </div>
        </div>
    );
}

export default Dashboard;