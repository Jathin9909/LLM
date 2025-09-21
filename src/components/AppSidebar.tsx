import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Upload,
  BarChart3,
  FlaskConical,
  Menu,
  X,
  Dna,
  Database,
  Microscope,
  FileText,
  Settings,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Upload Data", url: "/upload", icon: Upload },
  { title: "Analysis", url: "/analysis", icon: BarChart3 },
  { title: "Demo", url: "/demo", icon: FlaskConical },
];

const taxonomyItems = [
  { title: "Marine Bacteria", icon: Microscope, count: "2,547 species" },
  { title: "Phytoplankton", icon: Database, count: "1,823 species" },
  { title: "Zooplankton", icon: Dna, count: "986 species" },
  { title: "Fish eDNA", icon: FileText, count: "445 species" },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-card/95 backdrop-blur-md border-r shadow-lg transform transition-transform duration-300 ease-in-out z-50",
          "w-80",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-ocean">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-foreground/20 p-2 rounded-lg">
              <Dna className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-bold text-primary-foreground">OceanOMICS</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-6 overflow-y-auto h-full pb-20">
          {/* Main Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  onClick={toggleSidebar}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive(item.url)
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Taxonomy Classification */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Taxonomy Database
            </h3>
            <div className="space-y-3">
              {taxonomyItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    alert(`Viewing ${item.title}: ${item.count} classified species including marine bacteria, phytoplankton, and zooplankton with detailed taxonomic hierarchy.`);
                  }}
                  className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-lg border hover:bg-muted/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <item.icon className="h-3 w-3 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.count}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Featured Classifications
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  alert("Dinoflagellates - Novel Taxa Discovery:\n• Alexandrium minutum (toxic bloom species)\n• Karenia brevis (red tide organism)\n• Gymnodinium catenatum (chain-forming species)\n\nConfidence: 94.2% | Database: PR2 + AI clustering");
                }}
                className="w-full p-3 bg-gradient-card rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">Dinoflagellates</h4>
                  <Badge variant="secondary" className="text-xs">Novel Taxa</Badge>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  <em>Alexandrium minutum</em>, <em>Karenia brevis</em>, 
                  <em>Gymnodinium catenatum</em>
                </p>
              </button>
              
              <button
                onClick={() => {
                  alert("Copepods - High Confidence Classifications:\n• Calanus finmarchicus (Arctic copepod)\n• Acartia tonsa (coastal planktonic)\n• Centropages typicus (marine calanoid)\n\nConfidence: 97.1% | Database: SILVA + NCBI");
                }}
                className="w-full p-3 bg-gradient-card rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">Copepods</h4>
                  <Badge variant="outline" className="text-xs">High Confidence</Badge>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  <em>Calanus finmarchicus</em>, <em>Acartia tonsa</em>, 
                  <em>Centropages typicus</em>
                </p>
              </button>

              <button
                onClick={() => {
                  alert("Diatoms - Reference Database Match:\n• Thalassiosira pseudonana (model organism)\n• Chaetoceros socialis (chain-forming)\n• Skeletonema marinoi (bloom species)\n\nConfidence: 99.1% | Database: SILVA");
                }}
                className="w-full p-3 bg-gradient-card rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">Diatoms</h4>
                  <Badge variant="outline" className="text-xs">Reference DB</Badge>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  <em>Thalassiosira pseudonana</em>, <em>Chaetoceros socialis</em>, 
                  <em>Skeletonema marinoi</em>
                </p>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => {
                  alert("Pipeline Settings:\n• Confidence threshold: 95%\n• Clustering algorithm: HDBSCAN\n• Database priority: SILVA > PR2 > NCBI\n• Novel taxa detection: Enabled");
                }}
              >
                <Settings className="h-3 w-3 mr-2" />
                Pipeline Settings
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => {
                  window.open("https://docs.lovable.dev", "_blank");
                }}
              >
                <HelpCircle className="h-3 w-3 mr-2" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}