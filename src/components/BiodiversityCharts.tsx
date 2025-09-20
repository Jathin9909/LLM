import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Waves } from "lucide-react";

const speciesAbundanceData = [
  { name: 'Dinoflagellates', count: 2847, percentage: 32 },
  { name: 'Diatoms', count: 2134, percentage: 24 },
  { name: 'Copepods', count: 1876, percentage: 21 },
  { name: 'Foraminifera', count: 987, percentage: 11 },
  { name: 'Radiolaria', count: 654, percentage: 7 },
  { name: 'Others', count: 432, percentage: 5 },
];

const diversityIndexData = [
  { depth: '0-10m', shannon: 3.2, simpson: 0.85, chao1: 456 },
  { depth: '10-50m', shannon: 3.8, simpson: 0.91, chao1: 578 },
  { depth: '50-100m', shannon: 4.1, simpson: 0.94, chao1: 623 },
  { depth: '100-200m', shannon: 3.9, simpson: 0.89, chao1: 567 },
  { depth: '>200m', shannon: 3.4, simpson: 0.82, chao1: 432 },
];

const COLORS = ['hsl(var(--ocean-deep))', 'hsl(var(--ocean-medium))', 'hsl(var(--ocean-light))', 'hsl(var(--coral))', 'hsl(var(--algae))', 'hsl(var(--accent))'];

interface BiodiversityChartsProps {
  detailed?: boolean;
}

export const BiodiversityCharts = ({ detailed = false }: BiodiversityChartsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Species Abundance */}
        <Card className="bg-gradient-card shadow-elevation">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-ocean-deep" />
              Species Abundance
            </CardTitle>
            <CardDescription>Distribution of identified marine taxa</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={speciesAbundanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))' 
                  }} 
                />
                <Bar dataKey="count" fill="hsl(var(--ocean-medium))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Taxonomic Diversity Pie Chart */}
        <Card className="bg-gradient-card shadow-elevation">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-ocean-deep" />
              Taxonomic Distribution
            </CardTitle>
            <CardDescription>Relative abundance by major groups</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={speciesAbundanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {speciesAbundanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))' 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {detailed && (
        <Card className="bg-gradient-card shadow-elevation">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-ocean-deep" />
              Diversity Indices by Depth
            </CardTitle>
            <CardDescription>Shannon, Simpson, and Chao1 indices across depth zones</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={diversityIndexData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="depth" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))' 
                  }} 
                />
                <Line yAxisId="left" type="monotone" dataKey="shannon" stroke="hsl(var(--ocean-deep))" strokeWidth={3} name="Shannon Index" />
                <Line yAxisId="left" type="monotone" dataKey="simpson" stroke="hsl(var(--ocean-medium))" strokeWidth={3} name="Simpson Index" />
                <Line yAxisId="right" type="monotone" dataKey="chao1" stroke="hsl(var(--coral))" strokeWidth={3} name="Chao1 Richness" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};