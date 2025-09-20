import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PipelineWorkflow } from "@/components/PipelineWorkflow";
import { BiodiversityCharts } from "@/components/BiodiversityCharts";
import { NovelTaxaDiscovery } from "@/components/NovelTaxaDiscovery";
import { QualityMetrics } from "@/components/QualityMetrics";
import { SDGImpact } from "@/components/SDGImpact";
import { ExportResults } from "@/components/ExportResults";
import { 
  Dna, 
  ArrowLeft, 
  Activity, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

interface AnalysisStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  duration?: string;
}

const Analysis = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [steps, setSteps] = useState<AnalysisStep[]>([
    {
      id: 'preprocessing',
      name: 'Data Preprocessing',
      description: 'QIIME2 + DADA2 quality filtering and denoising',
      status: 'running',
      progress: 0
    },
    {
      id: 'asv_generation',
      name: 'ASV Generation',
      description: 'Amplicon Sequence Variants creation and clustering',
      status: 'pending',
      progress: 0
    },
    {
      id: 'classification',
      name: 'Taxonomic Classification',
      description: 'Kraken2 classification against marine eukaryote database',
      status: 'pending',
      progress: 0
    },
    {
      id: 'ai_discovery',
      name: 'AI Novel Taxa Discovery',
      description: 'VAE-based clustering and HDBSCAN for unknown species',
      status: 'pending',
      progress: 0
    },
    {
      id: 'biodiversity',
      name: 'Biodiversity Analysis',
      description: 'Species abundance and diversity calculations',
      status: 'pending',
      progress: 0
    },
    {
      id: 'quality_check',
      name: 'Quality Validation',
      description: 'Automated quality checks and confidence scoring',
      status: 'pending',
      progress: 0
    }
  ]);

  useEffect(() => {
    // Simulate analysis pipeline
    const runAnalysis = async () => {
      for (let i = 0; i < steps.length; i++) {
        // Start step
        setSteps(prev => prev.map((step, idx) => 
          idx === i 
            ? { ...step, status: 'running', progress: 0 }
            : step
        ));
        setCurrentStep(i);

        // Simulate progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setSteps(prev => prev.map((step, idx) => 
            idx === i 
              ? { ...step, progress }
              : step
          ));
        }

        // Complete step
        setSteps(prev => prev.map((step, idx) => 
          idx === i 
            ? { 
                ...step, 
                status: 'completed', 
                progress: 100,
                duration: `${Math.floor(Math.random() * 3) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
              }
            : step
        ));

        await new Promise(resolve => setTimeout(resolve, 500));
      }

      setAnalysisComplete(true);
    };

    runAnalysis();
  }, []);

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'running':
        return <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

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
                onClick={() => navigate('/upload')}
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
              <Badge 
                variant="secondary" 
                className={`${
                  analysisComplete 
                    ? 'bg-success text-primary-foreground' 
                    : 'bg-warning text-primary-foreground'
                }`}
              >
                <Activity className="h-4 w-4 mr-1" />
                {analysisComplete ? 'Analysis Complete' : 'Analysis Running'}
              </Badge>
              {analysisComplete && <ExportResults />}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {!analysisComplete ? (
          <>
            {/* Analysis Progress */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-foreground">Analyzing Your Data</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                OceanOMICS is processing your eDNA sequences through our AI-powered pipeline. 
                This may take several minutes depending on your dataset size.
              </p>
            </div>

            {/* Overall Progress */}
            <Card className="bg-gradient-card shadow-elevation border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Pipeline Progress
                </CardTitle>
                <CardDescription>
                  Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={(currentStep + 1) / steps.length * 100} 
                  className="mb-4" 
                />
                <div className="text-sm text-muted-foreground text-center">
                  {Math.round((currentStep + 1) / steps.length * 100)}% Complete
                </div>
              </CardContent>
            </Card>

            {/* Step Details */}
            <Card className="bg-card shadow-elevation">
              <CardHeader>
                <CardTitle>Analysis Steps</CardTitle>
                <CardDescription>
                  Real-time progress of the OceanOMICS pipeline
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {getStepIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{step.name}</span>
                        <Badge 
                          variant={
                            step.status === 'completed' ? 'default' :
                            step.status === 'running' ? 'secondary' :
                            step.status === 'error' ? 'destructive' : 'outline'
                          }
                          className="text-xs"
                        >
                          {step.status}
                        </Badge>
                        {step.duration && (
                          <span className="text-xs text-muted-foreground">
                            {step.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      {step.status === 'running' && (
                        <Progress value={step.progress} className="h-1" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Results Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
                <h1 className="text-4xl font-bold text-foreground">Analysis Complete!</h1>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your eDNA data has been successfully processed. Explore the results below 
                to discover marine biodiversity insights and novel taxa findings.
              </p>
            </div>

            {/* Results Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-card shadow-elevation">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Total Samples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-ocean-deep">2,847</div>
                  <p className="text-xs text-muted-foreground">Processed successfully</p>
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

            {/* Results Dashboard */}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Analysis;