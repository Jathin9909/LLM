import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Sparkles, Eye, Download } from "lucide-react";

const novelClusters = [
  { 
    id: "NC_001", 
    name: "Cluster Alpha-1", 
    sequences: 45, 
    confidence: 92, 
    habitat: "Deep Benthic", 
    similarity: 0.73,
    coordinates: { x: -2.1, y: 1.8 }
  },
  { 
    id: "NC_002", 
    name: "Cluster Beta-3", 
    sequences: 67, 
    confidence: 88, 
    habitat: "Pelagic Zone", 
    similarity: 0.68,
    coordinates: { x: 1.4, y: -1.2 }
  },
  { 
    id: "NC_003", 
    name: "Cluster Gamma-7", 
    sequences: 23, 
    confidence: 95, 
    habitat: "Hydrothermal Vents", 
    similarity: 0.45,
    coordinates: { x: -0.8, y: 2.3 }
  },
  { 
    id: "NC_004", 
    name: "Cluster Delta-2", 
    sequences: 34, 
    confidence: 85, 
    habitat: "Continental Shelf", 
    similarity: 0.71,
    coordinates: { x: 2.1, y: 0.9 }
  }
];

const latentSpaceData = [
  { x: -2.1, y: 1.8, cluster: "Alpha-1", confidence: 92 },
  { x: 1.4, y: -1.2, cluster: "Beta-3", confidence: 88 },
  { x: -0.8, y: 2.3, cluster: "Gamma-7", confidence: 95 },
  { x: 2.1, y: 0.9, cluster: "Delta-2", confidence: 85 },
  { x: -1.5, y: -1.8, cluster: "Epsilon-5", confidence: 79 },
  { x: 0.3, y: 1.1, cluster: "Zeta-4", confidence: 82 },
];

interface NovelTaxaDiscoveryProps {
  detailed?: boolean;
}

export const NovelTaxaDiscovery = ({ detailed = false }: NovelTaxaDiscoveryProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-elevation">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-accent" />
            VAE Latent Space Visualization
          </CardTitle>
          <CardDescription>
            HDBSCAN clusters in the learned sequence embedding space
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                type="number" 
                dataKey="x" 
                domain={[-3, 3]} 
                tick={{ fontSize: 12 }}
                label={{ value: 'Latent Dimension 1', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                domain={[-3, 3]} 
                tick={{ fontSize: 12 }}
                label={{ value: 'Latent Dimension 2', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))' 
                }}
                labelFormatter={(value, payload) => {
                  if (payload && payload[0]) {
                    return `Cluster: ${payload[0].payload.cluster}`;
                  }
                  return '';
                }}
                formatter={(value, name) => {
                  if (name === 'confidence') return [`${value}%`, 'Confidence'];
                  return [value, name];
                }}
              />
              <Scatter 
                name="Novel Clusters" 
                data={latentSpaceData} 
                fill="hsl(var(--accent))"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {novelClusters.map((cluster) => (
          <Card key={cluster.id} className="bg-gradient-card shadow-elevation hover:shadow-marine transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  {cluster.name}
                </CardTitle>
                <Badge 
                  variant="secondary" 
                  className={`${
                    cluster.confidence >= 90 ? 'bg-success text-primary-foreground' : 
                    cluster.confidence >= 85 ? 'bg-warning text-foreground' : 
                    'bg-muted'
                  }`}
                >
                  {cluster.confidence}% confidence
                </Badge>
              </div>
              <CardDescription>{cluster.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Sequences</p>
                  <p className="font-semibold">{cluster.sequences}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Habitat</p>
                  <p className="font-semibold">{cluster.habitat}</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">DB Similarity</span>
                  <span>{(cluster.similarity * 100).toFixed(1)}%</span>
                </div>
                <Progress value={cluster.similarity * 100} className="h-2" />
              </div>

              {detailed && (
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View Sequences
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};