import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dna, Upload, BarChart3, Download, ArrowRight, CheckCircle, Zap, Target, Microscope, Database, FileText, TrendingUp, Waves, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Upload,
      title: "Upload Datasets",
      description: "Support for FASTA and FASTQ files from NCBI SRA, PR2, SILVA databases"
    },
    {
      icon: Zap,
      title: "AI-Powered Analysis",
      description: "QIIME2 + DADA2 preprocessing with VAE-based novel taxa discovery"
    },
    {
      icon: BarChart3,
      title: "Interactive Dashboard",
      description: "Real-time biodiversity charts and species abundance visualizations"
    },
    {
      icon: Target,
      title: "SDG Impact",
      description: "Automated reporting for SDG 14 (Life Below Water) and SDG 13 (Climate Action)"
    },
    {
      icon: Microscope,
      title: "Novel Taxa Discovery",
      description: "VAE clustering identifies unknown species beyond reference databases"
    },
    {
      icon: Database,
      title: "Quality Assurance",
      description: "Automated confidence scoring and classification validation"
    }
  ];

  const workflow = [
    { step: 1, title: "Upload Data", description: "FASTA/FASTQ files" },
    { step: 2, title: "Preprocess", description: "QIIME2 + DADA2" },
    { step: 3, title: "Classify", description: "Kraken2 + AI Discovery" },
    { step: 4, title: "Analyze", description: "Biodiversity & Results" }
  ];

  const taxonomyHighlights = [
    {
      category: "Marine Bacteria",
      icon: Microscope,
      species: ["Prochlorococcus marinus", "Synechococcus sp.", "Pelagibacter ubique"],
      count: "2,547 classified",
      confidence: "98.3%"
    },
    {
      category: "Phytoplankton",
      icon: Leaf,
      species: ["Thalassiosira pseudonana", "Emiliania huxleyi", "Alexandrium minutum"],
      count: "1,823 classified", 
      confidence: "95.7%"
    },
    {
      category: "Zooplankton",
      icon: Waves,
      species: ["Calanus finmarchicus", "Acartia tonsa", "Centropages typicus"],
      count: "986 classified",
      confidence: "97.1%"
    }
  ];

  const stats = [
    { label: "Species Classified", value: "5,356", icon: Database },
    { label: "Novel Taxa Discovered", value: "127", icon: Zap },
    { label: "Analysis Accuracy", value: "96.8%", icon: TrendingUp },
    { label: "Processing Speed", value: "< 2min", icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Sidebar */}
      <AppSidebar />

      {/* Header */}
      <header className="bg-gradient-ocean shadow-marine">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 ml-12">
              <div className="bg-primary-foreground/20 p-2 rounded-lg">
                <Dna className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary-foreground">OceanOMICS</h1>
            </div>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/upload')}
              className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <Badge className="bg-accent text-accent-foreground mb-4">
            AI-Powered Marine Biodiversity Discovery
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-ocean bg-clip-text text-transparent leading-tight">
            Discover Marine Life with<br />Next-Gen eDNA Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            OceanOMICS combines supervised and unsupervised AI to analyze environmental DNA sequences, 
            discover novel marine species, and assess biodiversity impact on climate and ocean health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              size="lg" 
              onClick={() => navigate('/upload')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Your Data
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/demo')}
              className="px-8"
            >
              View Demo Analysis
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-card shadow-elevation border-none">
              <CardHeader className="pb-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Workflow Section */}
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How OceanOMICS Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our automated pipeline processes your eDNA data through four key stages, 
              from raw sequences to actionable biodiversity insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {workflow.map((item, index) => (
              <div key={index} className="relative">
                <Card className="bg-gradient-card shadow-elevation border-none">
                  <CardHeader className="text-center pb-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto font-bold text-lg">
                      {item.step}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
                {index < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card shadow-elevation border-none text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Taxonomy Classification Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Marine Taxonomy Classification
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered pipeline accurately identifies and classifies marine organisms 
              with species-level precision across multiple taxonomic groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {taxonomyHighlights.map((taxonomy, index) => (
              <Card key={index} className="bg-gradient-card shadow-elevation border-none">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <taxonomy.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{taxonomy.category}</CardTitle>
                    </div>
                    <Badge className="bg-success/10 text-success border-success/20">
                      {taxonomy.confidence}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm font-medium">
                    {taxonomy.count}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Featured Species:</h4>
                    <div className="space-y-1">
                      {taxonomy.species.map((species, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground italic">
                          {species}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <Card className="bg-gradient-biodiversity shadow-marine border-none">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-foreground">
                  Revolutionizing Marine Discovery
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Novel Taxa Discovery</h4>
                      <p className="text-sm text-muted-foreground">
                        VAE-based clustering identifies unknown species beyond reference databases
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Quality Assurance</h4>
                      <p className="text-sm text-muted-foreground">
                        Automated quality checks flag low-confidence classifications
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">SDG Alignment</h4>
                      <p className="text-sm text-muted-foreground">
                        Direct impact measurement for UN Sustainable Development Goals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Species-Level Precision</h4>
                      <p className="text-sm text-muted-foreground">
                        Accurate identification with scientific nomenclature and taxonomic hierarchy
                      </p>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/upload')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Start Your Analysis
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div className="lg:text-right space-y-4">
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Supported Formats</h4>
                  <div className="space-y-2 text-sm">
                    <Badge variant="outline" className="mr-2">FASTA</Badge>
                    <Badge variant="outline" className="mr-2">FASTQ</Badge>
                    <Badge variant="outline" className="mr-2">NCBI SRA</Badge>
                    <Badge variant="outline" className="mr-2">PR2</Badge>
                    <Badge variant="outline">SILVA</Badge>
                  </div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Database Coverage</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• 18S/28S rRNA sequences</p>
                    <p>• COI barcoding genes</p>
                    <p>• 16S prokaryotic sequences</p>
                    <p>• ITS fungal markers</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 OceanOMICS. Advancing marine biodiversity research through AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;