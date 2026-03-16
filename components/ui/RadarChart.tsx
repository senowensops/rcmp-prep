"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart as Chart, ResponsiveContainer } from "recharts";

export function RadarChart({ data }: { data: { section: string; score: number }[] }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <Chart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="section" tick={{ fill: '#6B6560', fontSize: 12 }} />
          <Radar dataKey="score" stroke="#C8102E" fill="#C8102E" fillOpacity={0.2} />
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}
