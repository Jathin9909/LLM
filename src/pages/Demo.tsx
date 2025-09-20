import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PipelineWorkflow } from "@/components/PipelineWorkflow";
import { BiodiversityCharts } from "@/components/BiodiversityCharts";
import { NovelTaxaDiscovery } from "@/components/NovelTaxaDiscovery";
import { QualityMetrics } from "@/components/QualityMetrics";
import { SDGImpact } from "@/components/SDGImpact";
import { ExportResults } from "@/components/ExportResults";
import { Dna, ArrowLeft, Activity, Play, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Demo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-gradient-ocean shadow-marine">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-primary-foreground/20 p-2 rounded-lg">
                  <Dna className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-primary-foreground">OceanOMICS</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-accent text-primary-foreground">
                <Database className="h-4 w-4 mr-1" />
                Demo Dataset
              </Badge>
              <Button 
                onClick={() => navigate('/upload')}
                className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30"
              >
                <Play className="h-4 w-4 mr-2" />
                Try Your Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Demo Introduction */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Demo Analysis Results</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore this interactive demonstration of OceanOMICS analysis results using 
            a curated marine eDNA dataset from the North Atlantic Ocean.
          </p>
        </div>

        {/* Demo Dataset Info */}
        <Card className="bg-gradient-biodiversity shadow-marine border-none">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  North Atlantic Marine Survey
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">NCBI SRA</Badge>
                    <span className="text-sm text-muted-foreground">Accession: PRJNA123456</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">18S rRNA</Badge>
                    <span className="text-sm text-muted-foreground">V4-V5 Region</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Illumina</Badge>
                    <span className="text-sm text-muted-foreground">Paired-end 250bp</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  This dataset represents water samples collected from 15 stations across 
                  the North Atlantic, focusing on marine eukaryotic diversity in surface waters.
                </p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border">
                <h4 className="font-semibold text-foreground mb-4">Dataset Statistics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Samples</div>
                    <div className="font-semibold">2,847</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Raw Reads</div>
                    <div className="font-semibold">45.2M</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">File Size</div>
                    <div className="font-semibold">8.7 GB</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Analysis Time</div>
                    <div className="font-semibold">2.3 hours</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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

        {/* Call to Action */}
        <Card className="bg-gradient-card shadow-elevation border-none text-center">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Analyze Your Own Data?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Upload your FASTA or FASTQ files to discover marine biodiversity insights 
              and novel taxa in your own eDNA datasets using the same AI-powered pipeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/upload')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Your Analysis
              </Button>
              <ExportResults />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Demo;