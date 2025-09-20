import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Play, Database, Cpu, BarChart3 } from "lucide-react";

const workflowSteps = [
  {
    id: 1,
    title: "Data Acquisition",
    description: "NCBI SRA, PR2, SILVA datasets",
    status: "completed",
    icon: Database,
    progress: 100,
  },
  {
    id: 2,
    title: "QIIME2 + DADA2",
    description: "ASV generation and denoising",
    status: "completed",
    icon: Play,
    progress: 100,
  },
  {
    id: 3,
    title: "Kraken2 Classification",
    description: "Known taxa identification",
    status: "completed",
    icon: BarChart3,
    progress: 100,
  },
  {
    id: 4,
    title: "VAE + HDBSCAN",
    description: "Novel taxa discovery",
    status: "running",
    icon: Cpu,
    progress: 78,
  },
  {
    id: 5,
    title: "Quality Control",
    description: "Confidence scoring",
    status: "pending",
    icon: CheckCircle,
    progress: 0,
  },
];

export const PipelineWorkflow = () => {
  return (
    <Card className="bg-gradient-card shadow-elevation">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-primary" />
          Pipeline Workflow Status
        </CardTitle>
        <CardDescription>
          Real-time progress of the eDNA biodiversity analysis pipeline
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {workflowSteps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  step.status === "completed"
                    ? "bg-success text-primary-foreground"
                    : step.status === "running"
                    ? "bg-warning text-primary-foreground animate-pulse"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <step.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                <Badge
                  variant={
                    step.status === "completed"
                      ? "default"
                      : step.status === "running"
                      ? "secondary"
                      : "outline"
                  }
                  className={
                    step.status === "completed"
                      ? "bg-success"
                      : step.status === "running"
                      ? "bg-warning"
                      : ""
                  }
                >
                  {step.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                  {step.status === "running" && <Clock className="h-3 w-3 mr-1" />}
                  {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                </Badge>
              </div>
              <Progress value={step.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">{step.progress}% complete</p>
            </div>
            {index < workflowSteps.length - 1 && (
              <div className="absolute left-6 mt-16 h-8 w-px bg-border" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};