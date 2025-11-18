import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
interface  KpiProps {
  title: string;
  value: string | number;
}

const Kpi = ({ title, value }: KpiProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xs md:text-sm text-gray-500">{title}</CardTitle>
            </CardHeader>
            <CardContent className="m-0">
                <div className="text-xl font-bold text-black">{value}</div>
             </CardContent>
        </Card>
    );
};

export default Kpi;