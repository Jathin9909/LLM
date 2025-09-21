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
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <item.icon className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Taxonomic Groups */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Featured Classifications
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-gradient-card rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">Dinoflagellates</h4>
                  <Badge variant="secondary" className="text-xs">Novel Taxa</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  <em>Alexandrium minutum</em>, <em>Karenia brevis</em>, 
                  <em>Gymnodinium catenatum</em>
                </p>
              </div>
              
              <div className="p-3 bg-gradient-card rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">Copepods</h4>
                  <Badge variant="outline" className="text-xs">High Confidence</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  <em>Calanus finmarchicus</em>, <em>Acartia tonsa</em>, 
                  <em>Centropages typicus</em>
                </p>
              </div>

              <div className="p-3 bg-gradient-card rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">Diatoms</h4>
                  <Badge variant="outline" className="text-xs">Reference DB</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  <em>Thalassiosira pseudonana</em>, <em>Chaetoceros socialis</em>, 
                  <em>Skeletonema marinoi</em>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Settings className="h-3 w-3 mr-2" />
                Pipeline Settings
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
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