import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, AlertTriangle, CheckCircle, Target, TrendingUp } from "lucide-react";

const qualityMetrics = [
  { metric: "Read Quality (Q30+)", value: 94.2, threshold: 90, status: "pass" },
  { metric: "Chimera Detection", value: 97.8, threshold: 95, status: "pass" },
  { metric: "Taxonomic Coverage", value: 87.5, threshold: 85, status: "pass" },
  { metric: "Novel Cluster Confidence", value: 83.1, threshold: 80, status: "pass" },
  { metric: "Database Completeness", value: 76.3, threshold: 75, status: "warning" },
  { metric: "Cross-Validation Accuracy", value: 91.7, threshold: 90, status: "pass" }
];

const confidenceDistribution = [
  { range: "90-100%", count: 4234, percentage: 48.3 },
  { range: "80-89%", count: 2187, percentage: 24.9 },
  { range: "70-79%", count: 1456, percentage: 16.6 },
  { range: "60-69%", count: 687, percentage: 7.8 },
  { range: "<60%", count: 201, percentage: 2.3 }
];

export const QualityMetrics = () => {
  return (
    <div className="space-y-6">
      {/* Quality Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card shadow-elevation">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              Passed Checks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">5/6</div>
            <p className="text-xs text-muted-foreground">Quality thresholds met</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-elevation">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-ocean-deep" />
              Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ocean-deep">88.4%</div>
            <p className="text-xs text-muted-foreground">Weighted average</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-elevation">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">1</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Quality Metrics Detail */}
      <Card className="bg-gradient-card shadow-elevation">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-ocean-deep" />
            Quality Control Metrics
          </CardTitle>
          <CardDescription>
            Automated quality checks and confidence thresholds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {qualityMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{metric.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {metric.value}% (threshold: {metric.threshold}%)
                  </span>
                  <Badge
                    variant={metric.status === "pass" ? "default" : "secondary"}
                    className={
                      metric.status === "pass" 
                        ? "bg-success" 
                        : "bg-warning text-foreground"
                    }
                  >
                    {metric.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <Progress 
                value={metric.value} 
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Confidence Distribution */}
      <Card className="bg-gradient-card shadow-elevation">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-ocean-deep" />
            Classification Confidence Distribution
          </CardTitle>
          <CardDescription>
            Distribution of confidence scores across all classifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={confidenceDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))' 
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="hsl(var(--ocean-medium))" 
                fill="hsl(var(--ocean-light))" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Alert className="border-warning bg-warning/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Database Completeness Warning:</strong> Reference database coverage at 76.3% 
          may affect classification accuracy for rare species. Consider updating with recent 
          NCBI and PR2 releases.
        </AlertDescription>
      </Alert>
    </div>
  );
};