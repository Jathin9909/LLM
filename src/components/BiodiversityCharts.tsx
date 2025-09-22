import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface BiodiversityChartsProps {
  detailed?: boolean;
}

const BiodiversityCharts = ({ detailed }: BiodiversityChartsProps) => {
  const speciesData = [
    { category: 'Bacteria', count: 1247, percentage: 52 },
    { category: 'Phytoplankton', count: 823, percentage: 34 },
    { category: 'Zooplankton', count: 186, percentage: 8 },
    { category: 'Fungi', count: 95, percentage: 4 },
    { category: 'Other', count: 49, percentage: 2 }
  ];

  const confidenceData = [
    { range: '95-100%', count: 1847, color: 'hsl(var(--success))' },
    { range: '90-95%', count: 398, color: 'hsl(var(--primary))' },
    { range: '85-90%', count: 155, color: 'hsl(var(--warning))' },
    { range: '<85%', count: 0, color: 'hsl(var(--destructive))' }
  ];

  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--accent))', 
    'hsl(var(--success))',
    'hsl(var(--warning))',
    'hsl(var(--muted))'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Biodiversity Analysis Results
        </h3>
        <p className="text-muted-foreground">
          Real-time taxonomic classification and confidence metrics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Species Distribution Chart */}
        <Card className="bg-gradient-card shadow-elevation border-none">
          <CardHeader>
            <CardTitle className="text-lg">Species Distribution</CardTitle>
            <CardDescription>Taxonomic groups by abundance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={speciesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({category, percentage}) => `${category} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {speciesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Classification Confidence Chart */}
        <Card className="bg-gradient-card shadow-elevation border-none">
          <CardHeader>
            <CardTitle className="text-lg">Classification Confidence</CardTitle>
            <CardDescription>Distribution by confidence scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={confidenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BiodiversityCharts;