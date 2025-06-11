
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Target, TrendingUp, CalendarDays, Percent } from "lucide-react";

interface Kpi {
  id: string;
  label: string;
  value: number;
  target?: number;
  unit?: string;
}

const initialKpis: Kpi[] = [
  { id: "kpi-1", label: "Monthly Sales Target", value: 75000, target: 100000, unit: "$" },
  { id: "kpi-2", label: "Deals Closed This Month", value: 12, target: 20 },
  { id: "kpi-3", label: "Lead Conversion Rate", value: 25, target: 30, unit: "%" },
  { id: "kpi-4", label: "Customer Interaction Success", value: 85, target: 90, unit: "%" },
];

export function PerformanceOverviewCard() {
  const { toast } = useToast();
  const [kpis, setKpis] = useState<Kpi[]>(initialKpis);
  const [salesDeadline, setSalesDeadline] = useState("2024-12-31");

  const handleUpdateKpi = (id: string, newValue: number, newTarget?: number) => {
    setKpis(kpis.map(kpi => 
      kpi.id === id ? { ...kpi, value: newValue, target: newTarget !== undefined ? newTarget : kpi.target } : kpi
    ));
  };
  
  const handleSaveChanges = () => {
    console.log({ kpis, salesDeadline });
    toast({
      title: "Performance Settings Updated",
      description: "Your KPI targets and deadlines have been noted.",
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Performance Overview & Targets</CardTitle>
        <CardDescription>Track your KPIs, set targets, and monitor interaction success.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Target className="mr-2 h-5 w-5 text-primary" /> Key Performance Indicators (KPIs)
          </h3>
          <div className="space-y-4">
            {kpis.map(kpi => (
              <div key={kpi.id}>
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor={`kpi-${kpi.id}`} className="text-sm font-medium">{kpi.label}</Label>
                  <span className="text-sm text-muted-foreground">
                    {kpi.unit === "$" && kpi.unit}{kpi.value.toLocaleString()}{kpi.unit !== "$" && kpi.unit}
                    {kpi.target && ` / ${kpi.unit === "$" && kpi.unit}${kpi.target.toLocaleString()}${kpi.unit !== "$" && kpi.unit}`}
                  </span>
                </div>
                <Progress value={kpi.target ? (kpi.value / kpi.target) * 100 : kpi.value} className="h-2" />
                 {/* Mock inputs for updating KPI values/targets - in a real app these could be more sophisticated */}
                <div className="mt-1 flex gap-2">
                    <Input 
                        type="number" 
                        id={`kpi-${kpi.id}`}
                        value={kpi.value} 
                        onChange={(e) => handleUpdateKpi(kpi.id, parseInt(e.target.value) || 0, kpi.target)}
                        className="h-8 text-xs w-1/2"
                        placeholder="Current Value"
                    />
                     {kpi.target !== undefined && (
                        <Input 
                            type="number" 
                            value={kpi.target} 
                            onChange={(e) => handleUpdateKpi(kpi.id, kpi.value, parseInt(e.target.value) || 0)}
                            className="h-8 text-xs w-1/2"
                            placeholder="Target Value"
                        />
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="salesDeadline" className="flex items-center">
             <CalendarDays className="mr-2 h-5 w-5 text-primary" /> Current Sales Sprint Deadline
          </Label>
          <Input 
            id="salesDeadline" 
            type="date" 
            value={salesDeadline} 
            onChange={(e) => setSalesDeadline(e.target.value)} 
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" /> Customer Interaction Metrics
          </h3>
          <p className="text-sm text-muted-foreground">
            Overall success rate: <span className="font-semibold text-foreground">88%</span> (based on last 30 days).
          </p>
          <p className="text-sm text-muted-foreground">
            Average response time: <span className="font-semibold text-foreground">2.5 hours</span>.
          </p>
           <p className="text-xs text-muted-foreground mt-2">(Placeholder data for demonstration)</p>
        </div>
         <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Percent className="mr-2 h-5 w-5 text-primary" /> Success Rates for Sales Sprint
          </h3>
          <p className="text-sm text-muted-foreground">
            Analysis and discussion points for meetings will be summarized here based on your performance and targets.
          </p>
           <p className="text-xs text-muted-foreground mt-2">(This section would dynamically populate in a full implementation)</p>
        </div>


      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveChanges} className="w-full">Update Performance Settings</Button>
      </CardFooter>
    </Card>
  );
}
