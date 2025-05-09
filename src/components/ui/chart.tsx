
import React from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

type ChartProps = {
  data: any[];
  xAxisKey: string;
  yAxisKey: string;
  categories: string[];
  colors?: string[];
  className?: string;
  valueFormatter?: (value: number) => string;
};

export const BarChart = ({
  data,
  xAxisKey,
  yAxisKey,
  categories,
  colors = COLORS,
  className,
  valueFormatter = (value) => value.toString(),
}: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} />
        <YAxis 
          tick={{ fontSize: 12 }} 
          tickFormatter={valueFormatter}
        />
        <Tooltip 
          formatter={(value) => [valueFormatter(Number(value)), yAxisKey]}
          labelFormatter={(label) => `${xAxisKey}: ${label}`}
        />
        <Legend />
        {categories.map((category, index) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[index % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export const LineChart = ({
  data,
  xAxisKey,
  yAxisKey,
  categories,
  colors = COLORS,
  className,
  valueFormatter = (value) => value.toString(),
}: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} />
        <YAxis 
          tick={{ fontSize: 12 }} 
          tickFormatter={valueFormatter}
        />
        <Tooltip 
          formatter={(value) => [valueFormatter(Number(value)), yAxisKey]}
          labelFormatter={(label) => `${xAxisKey}: ${label}`}
        />
        <Legend />
        {categories.map((category, index) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[index % colors.length]}
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

type PieChartProps = {
  data: any[];
  colors?: string[];
  className?: string;
};

export const PieChart = ({ data, colors = COLORS, className }: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}`, 'Value']} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export const AreaChart = ({
  data,
  xAxisKey,
  yAxisKey,
  categories,
  colors = COLORS,
  className,
  valueFormatter = (value) => value.toString(),
}: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} />
        <YAxis 
          tick={{ fontSize: 12 }} 
          tickFormatter={valueFormatter}
        />
        <Tooltip 
          formatter={(value) => [valueFormatter(Number(value)), yAxisKey]}
          labelFormatter={(label) => `${xAxisKey}: ${label}`}
        />
        <Legend />
        {categories.map((category, index) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[index % colors.length]}
            fill={`${colors[index % colors.length]}30`}
            stackId="1"
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};
