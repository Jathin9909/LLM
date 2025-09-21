import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Dna, FileText, Info } from "lucide-react";

const sequenceData = [
  {
    id: "ASV_001",
    classification: "Alexandrium minutum",
    confidence: 98.2,
    sequence: "ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG",
    abundance: 2847,
    taxonomy: "Eukaryota;Dinoflagellata;Dinophyceae;Gonyaulacales;Alexandriaceae;Alexandrium;minutum"
  },
  {
    id: "ASV_002", 
    classification: "Thalassiosira pseudonana",
    confidence: 99.1,
    sequence: "GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCT",
    abundance: 2134,
    taxonomy: "Eukaryota;Stramenopiles;Bacillariophyta;Mediophyceae;Thalassiosirales;Thalassiosiraceae;Thalassiosira;pseudonana"
  },
  {
    id: "ASV_003",
    classification: "Calanus finmarchicus",
    confidence: 97.1,
    sequence: "TTAATTAATTAATTAATTAATTAATTAATTAATTAATTAATTAATTAATTAATTAATTAATTAATTAATTAA",
    abundance: 1876,
    taxonomy: "Eukaryota;Arthropoda;Crustacea;Hexanauplia;Calanoida;Calanidae;Calanus;finmarchicus"
  }
];

interface SequenceViewerProps {
  onViewSequences?: () => void;
}

export const SequenceViewer = ({ onViewSequences }: SequenceViewerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewSequences = () => {
    setIsDialogOpen(true);
    if (onViewSequences) {
      onViewSequences();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          onClick={handleViewSequences}
          className="w-full"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Sequences
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Dna className="h-5 w-5" />
            Sequence Classification Results
          </DialogTitle>
          <DialogDescription>
            Detailed view of classified sequences with taxonomic assignments and confidence scores
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] w-full">
          <div className="space-y-4 pr-4">
            {sequenceData.map((seq, index) => (
              <Card key={index} className="border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {seq.id}
                    </CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={
                        seq.confidence >= 95 
                          ? "bg-success/10 text-success border-success/20" 
                          : "bg-warning/10 text-warning border-warning/20"
                      }
                    >
                      {seq.confidence.toFixed(1)}% confidence
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    <em>{seq.classification}</em> • Abundance: {seq.abundance.toLocaleString()} reads
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      Taxonomic Classification
                    </h4>
                    <p className="text-xs font-mono bg-muted p-2 rounded text-muted-foreground">
                      {seq.taxonomy}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      <Dna className="h-3 w-3" />
                      DNA Sequence (5' → 3')
                    </h4>
                    <div className="bg-muted p-3 rounded border">
                      <p className="font-mono text-xs break-all text-muted-foreground leading-relaxed">
                        {seq.sequence}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
        
        <div className="border-t pt-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {sequenceData.length} of 5,356 classified sequences
          </div>
          <Button onClick={() => setIsDialogOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};