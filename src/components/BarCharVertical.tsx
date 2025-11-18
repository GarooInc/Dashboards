import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, Cell, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart"

interface BarChartVerticalProps {
  title?: string;
  description?: string;
  chartData?: Array<{
    category: string;
    value: number;
    fill?: string;
  }>;
  valueLabel?: string;
}

const CHART_COLORS = [
    "hsl(340, 70%, 50%)",   // Rojo frambuesa
    "hsl(0, 72%, 51%)",     // Rojo vibrante 
    "hsl(0, 84%, 60%)",     // Rojo coral 
    "hsl(350, 75%, 55%)",   // Rojo rosado
    "hsl(10, 80%, 58%)",    // Rojo anaranjado
];

const BarChartVertical = function ({
  title = "Chart", 
  description, 
  chartData = [],
  valueLabel = "Value"
}: BarChartVerticalProps) {

  if (!chartData || chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-black">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
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
        color: CHART_COLORS[index % CHART_COLORS.length],
      }
      return acc
    }, {} as ChartConfig),
  }

  const formattedData = chartData.map((item, index) => ({
    category: item.category,
    value: item.value,
    fill: item.fill ?? CHART_COLORS[index % CHART_COLORS.length],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-black">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={formattedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="uppercase"
            />
            <YAxis 
                dataKey="value"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent  />}
            />
            <Bar dataKey="value" radius={8}>
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total values by category
        </div>
      </CardFooter> */}
    </Card>
  )
}

export default BarChartVertical;
