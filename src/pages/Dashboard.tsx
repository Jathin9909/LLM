import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PipelineWorkflow } from "@/components/PipelineWorkflow";
import BiodiversityCharts from "@/components/BiodiversityCharts";
import { NovelTaxaDiscovery } from "@/components/NovelTaxaDiscovery";
import { QualityMetrics } from "@/components/QualityMetrics";
import { SDGImpact } from "@/components/SDGImpact";
import { ExportResults } from "@/components/ExportResults";
import { Activity, Dna, TrendingUp, Award, Download, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-gradient-ocean shadow-marine p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-foreground/20 p-3 rounded-lg">
                <Dna className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary-foreground">
                  eDNA Biodiversity Pipeline
                </h1>
                <p className="text-primary-foreground/80">
                  AI-Powered Marine Species Discovery & Analysis
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-success text-primary-foreground">
                <Activity className="h-4 w-4 mr-1" />
                Pipeline Active
              </Badge>
              <ExportResults />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Pipeline Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card shadow-elevation">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Samples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ocean-deep">2,847</div>
              <p className="text-xs text-muted-foreground">From NCBI SRA</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card shadow-elevation">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">ASVs Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ocean-medium">15,432</div>
              <p className="text-xs text-muted-foreground">DADA2 processed</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card shadow-elevation">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Known Taxa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-coral">8,765</div>
              <p className="text-xs text-muted-foreground">Kraken2 classified</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card shadow-elevation">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Novel Clusters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">127</div>
              <p className="text-xs text-muted-foreground">AI discovered</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-card border shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
            <TabsTrigger value="novel-taxa">Novel Taxa</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="impact">SDG Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BiodiversityCharts />
              <NovelTaxaDiscovery />
            </div>
            <SDGImpact />
          </TabsContent>

          <TabsContent value="pipeline">
            <PipelineWorkflow />
          </TabsContent>

          <TabsContent value="biodiversity">
            <BiodiversityCharts detailed />
          </TabsContent>

          <TabsContent value="novel-taxa">
            <NovelTaxaDiscovery detailed />
          </TabsContent>

          <TabsContent value="quality">
            <QualityMetrics />
          </TabsContent>

          <TabsContent value="impact">
            <SDGImpact detailed />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;