import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Table, BarChart3, Dna, FileSpreadsheet, FileImage } from "lucide-react";
import { useState } from "react";

const exportFormats = [
  { 
    name: "Taxonomy Tables", 
    description: "Complete species classification results", 
    format: "CSV/TSV",
    icon: Table,
    size: "2.4 MB"
  },
  { 
    name: "Novel Sequences", 
    description: "FASTA format with AI-discovered taxa", 
    format: "FASTA",
    icon: Dna,
    size: "1.8 MB"
  },
  { 
    name: "Biodiversity Report", 
    description: "Executive summary and visualizations", 
    format: "PDF",
    icon: FileText,
    size: "856 KB"
  },
  { 
    name: "Raw Data Matrix", 
    description: "ASV abundance table", 
    format: "Excel",
    icon: FileSpreadsheet,
    size: "3.2 MB"
  },
  { 
    name: "Charts & Figures", 
    description: "High-resolution plot exports", 
    format: "PNG/SVG",
    icon: FileImage,
    size: "1.1 MB"
  },
];

export const ExportResults = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDownload = (exportItem: typeof exportFormats[0]) => {
    // Simulate download
    console.log(`Downloading ${exportItem.name} as ${exportItem.format}`);
    // In a real app, this would trigger the actual download
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
          <Download className="h-4 w-4 mr-2" />
          Export Results
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Analysis Results
          </DialogTitle>
          <DialogDescription>
            Download processed data, reports, and visualizations in various formats
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-3 py-4">
          {exportFormats.map((exportItem, index) => (
            <Card key={index} className="border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <exportItem.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{exportItem.name}</h3>
                      <p className="text-sm text-muted-foreground">{exportItem.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {exportItem.format}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{exportItem.size}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDownload(exportItem)}
                    className="shrink-0"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Total export size: ~9.4 MB
            </div>
            <Button onClick={() => {
              exportFormats.forEach(handleDownload);
              setIsDialogOpen(false);
            }}>
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};