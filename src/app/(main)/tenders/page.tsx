
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, AlertTriangle, FileText, Send, BarChart3 } from "lucide-react";

export default function TendersPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <Gavel className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Tenders & RFQs Management</h1>
          <p className="text-muted-foreground">Manage tender alerts, responses, submissions, and reporting.</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Tender & RFQ Hub</CardTitle>
          <CardDescription>
            This section is currently under development. Here you will be able to manage the full lifecycle of tenders and requests for quotation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-12">
            <Gavel className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-2">Tender Management Coming Soon!</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We are working on features for alerting, processing, submission, and reporting of Tenders & RFQs.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Features Planned:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-muted-foreground">
              <div className="flex items-start p-3 bg-muted/50 rounded-md">
                <AlertTriangle className="h-6 w-6 text-primary mr-3 shrink-0" />
                <div>
                    <h4 className="font-semibold text-foreground">Alerting</h4>
                    <p className="text-xs">Receive and manage new tender/RFQ notifications.</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-muted/50 rounded-md">
                <FileText className="h-6 w-6 text-primary mr-3 shrink-0" />
                <div>
                    <h4 className="font-semibold text-foreground">Processing</h4>
                    <p className="text-xs">Analyze requirements and prepare response documents.</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-muted/50 rounded-md">
                <Send className="h-6 w-6 text-primary mr-3 shrink-0" />
                <div>
                    <h4 className="font-semibold text-foreground">Submission</h4>
                    <p className="text-xs">Track submission deadlines and status.</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-muted/50 rounded-md">
                <BarChart3 className="h-6 w-6 text-primary mr-3 shrink-0" />
                <div>
                    <h4 className="font-semibold text-foreground">Reporting</h4>
                    <p className="text-xs">Generate reports on tender activities and outcomes.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
