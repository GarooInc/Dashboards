import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An area chart with a legend"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

interface ChartAreaProps {
  title?: string;
  dataPoints?: Array<{
    bucket_start: string;
    bucket_end: string;
    range_label?: string;
    conversations?: number;
    conversion_rate?: number;
  }>;
  dataKeys?: {
    primary: string;
    secondary?: string;
  };
}

export function ChartArea({ title, dataPoints, dataKeys }: ChartAreaProps) {  
  const transformedData = dataPoints?.map(point => {
    const startDate = new Date(point.bucket_start);
    const dateLabel = startDate.toLocaleDateString('es-ES', { 
      month: 'short', 
      day: 'numeric' 
    });

    return {
      date: dateLabel,
      conversations: point.conversations || 0,
      conversion_rate: point.conversion_rate || 0,
    };
  }) || [];
  

  if (!transformedData || transformedData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-black">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px] text-muted-foreground text-black">
            No hay datos disponibles
          </div>
        </CardContent>
      </Card>
    );
  }

  const dynamicConfig: ChartConfig = dataKeys ? {
    [dataKeys.primary]: {
      label: dataKeys.primary.charAt(0).toUpperCase() + dataKeys.primary.slice(1),
      color: "hsl(340, 70%, 50%)",
    },
    ...(dataKeys.secondary && {
      [dataKeys.secondary]: {
        label: dataKeys.secondary.charAt(0).toUpperCase() + dataKeys.secondary.slice(1),
        color: "hsl(0, 72%, 51%)",
      }
    })
  } : chartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-black">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={dynamicConfig}>
          <AreaChart
            accessibilityLayer
            data={transformedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="text-black bg-white" indicator="line" />}/>
            {dataKeys?.secondary && (
              <Area
                type="monotone"
                dataKey={dataKeys.secondary}
                stroke="hsl(0, 72%, 51%)"
                fill="hsl(0, 72%, 51%)"
                fillOpacity={0.3}
                strokeWidth={2}
                activeDot={{ r: 4 }}
              />
            )}
            <Area
              type="monotone"
              dataKey={dataKeys?.primary || 'conversations'}
              stroke="hsl(340, 70%, 50%)"
              fill="hsl(340, 70%, 50%)"
              fillOpacity={0.3}
              strokeWidth={2}
              activeDot={{ r: 4 }}
            />
            <ChartLegend content={<ChartLegendContent  className="text-black"/>} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}