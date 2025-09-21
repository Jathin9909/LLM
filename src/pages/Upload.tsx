import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload as UploadIcon, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Dna, 
  ArrowLeft,
  Play
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  file: File;
  status: 'uploading' | 'ready' | 'error';
  progress: number;
}

const Upload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const acceptedTypes = ['.fasta', '.fa', '.fastq', '.fq', '.fas'];

  const validateFile = (file: File): boolean => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    return acceptedTypes.includes(extension);
  };

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      if (!validateFile(file)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported format. Please upload FASTA or FASTQ files.`,
          variant: "destructive"
        });
        continue;
      }

      if (file.size > 5 * 1024 * 1024 * 1024) { // 5GB limit
        toast({
          title: "File too large",
          description: `${file.name} exceeds 5GB limit.`,
          variant: "destructive"
        });
        continue;
      }

      const fileId = `${file.name}_${Date.now()}_${i}`;
      newFiles.push({
        id: fileId,
        file,
        status: 'uploading',
        progress: 0
      });
    }

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((uploadFile) => {
      simulateUpload(uploadFile.id);
    });
  }, [toast]);

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'ready', progress: 100 }
            : f
        ));
        clearInterval(interval);
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, progress }
            : f
        ));
      }
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const startAnalysis = () => {
    if (files.filter(f => f.status === 'ready').length === 0) {
      toast({
        title: "No files ready",
        description: "Please upload at least one file before starting analysis.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis start
    setTimeout(() => {
      navigate('/analysis');
    }, 2000);
  };

  const readyFiles = files.filter(f => f.status === 'ready').length;
  const uploadingFiles = files.filter(f => f.status === 'uploading').length;

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
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              Upload Data
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Upload Your eDNA Data</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your FASTA or FASTQ files to begin AI-powered biodiversity analysis. 
            Our pipeline supports data from NCBI SRA, PR2, SILVA, and other major databases.
          </p>
        </div>

        {/* Upload Area */}
        <Card className="bg-gradient-card shadow-elevation border-none">
          <CardContent className="p-8">
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
                isDragOver 
                  ? 'border-primary bg-primary/5 scale-105' 
                  : 'border-border hover:border-primary/50 hover:bg-accent/5'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <UploadIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Drop files here or click to upload
              </h3>
              <p className="text-muted-foreground mb-6">
                Supports FASTA (.fasta, .fa, .fas) and FASTQ (.fastq, .fq) files up to 5GB
              </p>
              <input
                type="file"
                multiple
                accept=".fasta,.fa,.fas,.fastq,.fq"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" />
                  Choose Files
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* File List */}
        {files.length > 0 && (
          <Card className="bg-card shadow-elevation">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Uploaded Files ({files.length})
              </CardTitle>
              <CardDescription>
                {readyFiles} ready • {uploadingFiles} uploading
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-foreground">{file.file.name}</span>
                      <Badge 
                        variant={
                          file.status === 'ready' ? 'default' : 
                          file.status === 'uploading' ? 'secondary' : 'destructive'
                        }
                        className="text-xs"
                      >
                        {file.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{(file.file.size / 1024 / 1024).toFixed(2)} MB</span>
                      {file.status === 'uploading' && (
                        <>
                          <span>•</span>
                          <span>{file.progress.toFixed(0)}%</span>
                        </>
                      )}
                    </div>
                    {file.status === 'uploading' && (
                      <Progress value={file.progress} className="mt-2" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === 'ready' && (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Analysis Section */}
        {readyFiles > 0 && (
          <Card className="bg-gradient-card shadow-elevation border-none">
            <CardHeader>
              <CardTitle>Start Analysis</CardTitle>
              <CardDescription>
                Ready to analyze {readyFiles} file{readyFiles > 1 ? 's' : ''} with OceanOMICS pipeline
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Analysis will process your files through QIIME2 + DADA2 preprocessing, 
                  Kraken2 classification, and AI-powered novel taxa discovery. 
                  This may take several minutes depending on file size.
                </AlertDescription>
              </Alert>
              
              <Button 
                size="lg" 
                onClick={startAnalysis}
                disabled={isAnalyzing || readyFiles === 0}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                    Starting Analysis...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start OceanOMICS Analysis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Supported Formats Info */}
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-3">Supported File Formats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-foreground mb-2">FASTA Files</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• .fasta, .fa, .fas extensions</li>
                  <li>• Raw sequence data</li>
                  <li>• Single or multi-sequence files</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">FASTQ Files</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• .fastq, .fq extensions</li>
                  <li>• Sequence data with quality scores</li>
                  <li>• Paired-end reads supported</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;