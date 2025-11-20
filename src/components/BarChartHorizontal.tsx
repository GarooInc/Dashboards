import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartBarMixedProps {
  title?: string;
  description?: string;
  chartData?: Array<{
    category: string;
    value: number;
    fill?: string;
  }>;
  valueLabel?: string;
  maxHeight?: number | string;
}

const CHART_COLORS = [
  "hsl(0, 72%, 51%)",     // Rojo vibrante (primary)
  "hsl(0, 84%, 60%)",     // Rojo coral (destructive)
  "hsl(350, 75%, 55%)",   // Rojo rosado
  "hsl(10, 80%, 58%)",    // Rojo anaranjado
  "hsl(340, 70%, 50%)",   // Rojo frambuesa
];

const BarChartHorizontal = function ({
  title = "Chart", 
  description, 
  chartData = [],
  valueLabel = "Value",
}: ChartBarMixedProps) {
  
  if (!chartData || chartData.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-black">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex-1 ">
          <div className="flex items-center justify-center h-[200px] text-muted-foreground text-black">
            No hay datos disponibles
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartConfig: ChartConfig = {
    value: {
      label: valueLabel,
    },
    ...chartData.reduce((acc, item, index) => {
      acc[item.category] = {
        label: item.category,
        color: CHART_COLORS[index % 5],
      };
      return acc;
    }, {} as ChartConfig)
  };

  const formattedData = chartData.map((item, index) => ({
    category: item.category,
    value: item.value,
    fill: CHART_COLORS[index % 5],
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-black">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-full"
        >
          <BarChart
            accessibilityLayer
            data={formattedData}
            layout="vertical"
            className="h-full"
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              axisLine={false}
              width={100}
              tick={{ fontSize: 12 }}
              className="uppercase"
            />
            <XAxis dataKey="value" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar 
              dataKey="value" 
              layout="vertical" 
              radius={4}
              className="h-full"
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BarChartHorizontal;
