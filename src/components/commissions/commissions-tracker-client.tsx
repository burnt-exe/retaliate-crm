
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { mockCommissions, mockSalesPersons, mockSales, commissionStatuses, type CommissionEntry, type Assignee, type Sale, type CommissionStatus } from "@/lib/mock-data";
import { ClientFormattedDate } from "@/components/ui/client-formatted-date";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Target, Filter, DollarSign, Edit3, CheckCircle, Clock } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { useTheme } from "@/components/theme/theme-provider";


interface EnrichedCommissionEntry extends CommissionEntry {
  salesPersonName: string;
  salesPersonAvatar?: string;
  salesPersonFallback?: string;
  productName: string;
  saleAmount: number;
  saleCurrency: string;
}

export function CommissionsTrackerClient() {
  const [commissions, setCommissions] = useState<CommissionEntry[]>(mockCommissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSalesPerson, setSelectedSalesPerson] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const { appliedTheme } = useTheme();


  const enrichedCommissions: EnrichedCommissionEntry[] = useMemo(() => {
    return commissions.map(commission => {
      const sale = mockSales.find(s => s.id === commission.saleId);
      const salesPerson = mockSalesPersons.find(sp => sp.id === commission.salesPersonId);
      return {
        ...commission,
        salesPersonName: salesPerson?.name || "Unknown",
        salesPersonAvatar: salesPerson?.avatarUrl,
        salesPersonFallback: salesPerson?.fallback,
        productName: sale?.product || "N/A",
        saleAmount: sale?.saleAmount || 0,
        saleCurrency: sale?.currency || "USD",
      };
    }).sort((a,b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime());
  }, [commissions]);

  const filteredCommissions = useMemo(() => {
    return enrichedCommissions.filter(commission => {
      const saleDate = new Date(commission.saleDate);
      const matchesSearch = searchTerm === "" ||
        commission.salesPersonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commission.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commission.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSalesPerson = selectedSalesPerson === "All" || commission.salesPersonId === selectedSalesPerson;
      const matchesStatus = selectedStatus === "All" || commission.status === selectedStatus;
      const matchesDateRange = !dateRange || 
                               (dateRange.from && dateRange.to && saleDate >= dateRange.from && saleDate <= dateRange.to) ||
                               (dateRange.from && !dateRange.to && saleDate >= dateRange.from) ||
                               (!dateRange.from && dateRange.to && saleDate <= dateRange.to);
      return matchesSearch && matchesSalesPerson && matchesStatus && matchesDateRange;
    });
  }, [enrichedCommissions, searchTerm, selectedSalesPerson, selectedStatus, dateRange]);

  const totalCommissionYTD = useMemo(() => {
    return filteredCommissions
      .filter(c => c.status === "Paid" && new Date(c.saleDate).getFullYear() === new Date().getFullYear())
      .reduce((sum, c) => sum + c.commissionAmount, 0);
  }, [filteredCommissions]);

  const topPerformer = useMemo(() => {
    const performance = filteredCommissions.reduce((acc, curr) => {
      acc[curr.salesPersonName] = (acc[curr.salesPersonName] || 0) + curr.commissionAmount;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(performance).sort((a,b) => b[1] - a[1])[0] || ["N/A", 0];
  }, [filteredCommissions]);
  
  const averageCommissionRate = useMemo(() => {
    if (filteredCommissions.length === 0) return 0;
    const totalRate = filteredCommissions.reduce((sum, c) => sum + c.commissionRate, 0);
    return (totalRate / filteredCommissions.length) * 100;
  }, [filteredCommissions]);

  const getStatusBadgeVariant = (status: CommissionStatus) => {
    switch (status) {
      case "Paid": return "default"; // Greenish or positive
      case "Approved": return "secondary"; // Neutral or progressing
      case "Pending": return "outline"; // Yellowish or needs attention
      case "Cancelled": return "destructive";
      default: return "default";
    }
  };
  
   const commissionChartData = useMemo(() => {
    const dataBySalesperson = filteredCommissions.reduce((acc, comm) => {
      const name = comm.salesPersonName;
      if (!acc[name]) {
        acc[name] = { name, totalCommission: 0 };
      }
      acc[name].totalCommission += comm.commissionAmount;
      return acc;
    }, {} as Record<string, { name: string; totalCommission: number }>);
    return Object.values(dataBySalesperson).sort((a, b) => b.totalCommission - a.totalCommission).slice(0, 10); // Top 10
  }, [filteredCommissions]);


  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commissions Paid (YTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommissionYTD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">Based on current filters</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topPerformer[0]}</div>
            <p className="text-xs text-muted-foreground">${(topPerformer[1] as number).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in commissions</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Commission Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCommissionRate.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">Across filtered sales</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-md">
        <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
                <Filter className="mr-2 h-5 w-5"/> Commission Filters
            </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            type="search"
            placeholder="Search by Salesperson, Product, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="lg:col-span-1"
          />
          <Select value={selectedSalesPerson} onValueChange={setSelectedSalesPerson}>
            <SelectTrigger><SelectValue placeholder="Filter by Salesperson" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Salespersons</SelectItem>
              {mockSalesPersons.map(sp => <SelectItem key={sp.id} value={sp.id}>{sp.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger><SelectValue placeholder="Filter by Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              {commissionStatuses.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
            </SelectContent>
          </Select>
          <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} className="w-full"/>
        </CardContent>
      </Card>

      {/* Commissions Table */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Commission Records</CardTitle>
          <CardDescription>Detailed list of sales commissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Salesperson</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Sale Amount</TableHead>
                  <TableHead className="text-right">Commission (%)</TableHead>
                  <TableHead className="text-right">Earned</TableHead>
                  <TableHead>Sale Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommissions.length > 0 ? filteredCommissions.map((comm) => (
                  <TableRow key={comm.id}>
                    <TableCell className="font-medium">{comm.salesPersonName}</TableCell>
                    <TableCell className="text-xs max-w-[200px] truncate" title={comm.productName}>{comm.productName}</TableCell>
                    <TableCell className="text-right">${comm.saleAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-right">{(comm.commissionRate * 100).toFixed(1)}%</TableCell>
                    <TableCell className="text-right font-semibold">${comm.commissionAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell><ClientFormattedDate isoDateString={comm.saleDate} formatString="MMM dd, yyyy" /></TableCell>
                    <TableCell><Badge variant={getStatusBadgeVariant(comm.status)}>{comm.status}</Badge></TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="icon" title="Edit Commission (mock)">
                            <Edit3 className="h-4 w-4" />
                        </Button>
                        {comm.status === "Approved" && (
                             <Button variant="ghost" size="icon" title="Mark as Paid (mock)">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                        )}
                         {comm.status === "Pending" && (
                             <Button variant="ghost" size="icon" title="Approve Commission (mock)">
                                <Clock className="h-4 w-4 text-blue-600" />
                            </Button>
                        )}
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">No commission records match your filters.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
         <CardFooter className="text-xs text-muted-foreground">
            Showing {filteredCommissions.length} commission records.
        </CardFooter>
      </Card>
      
       {/* Commission Chart */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Top Salesperson Commissions</CardTitle>
          <CardDescription>Visual overview of total commissions by top salespersons (based on current filters).</CardDescription>
        </CardHeader>
        <CardContent>
          {commissionChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={commissionChartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={appliedTheme === 'dark' ? "hsl(var(--border))" : "#e0e0e0"} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: appliedTheme === 'dark' ? 'hsl(var(--muted-foreground))' : '#555' }} interval={0} angle={-30} textAnchor="end" height={70}/>
                <YAxis tickFormatter={(value) => `$${(value as number / 1000)}k`} tick={{ fontSize: 12, fill: appliedTheme === 'dark' ? 'hsl(var(--muted-foreground))' : '#555' }} />
                <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Total Commission"]}
                    cursor={{ fill: appliedTheme === 'dark' ? "hsla(var(--muted), 0.5)" : "rgba(200, 200, 200, 0.3)"}}
                    contentStyle={{
                        backgroundColor: appliedTheme === 'dark' ? "hsl(var(--popover))" : "#fff",
                        borderColor: appliedTheme === 'dark' ? "hsl(var(--border))" : "#ccc",
                        borderRadius: "0.5rem",
                        color: appliedTheme === 'dark' ? "hsl(var(--popover-foreground))" : "#333"
                    }}
                 />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                <Bar dataKey="totalCommission" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground py-8">Not enough data to display chart. Adjust filters or add more commission records.</p>
          )}
        </CardContent>
      </Card>


      {/* Target Setting (Placeholder) */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center"><Target className="mr-2 h-5 w-5"/> Target Setting & Management</CardTitle>
          <CardDescription>Define and track sales and commission targets.</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground py-10">
          <p>This section will allow for setting team and individual sales targets, tracking progress against those targets, and managing commission structures.</p>
          <p className="mt-2 text-sm">(Full functionality for target setting is planned for a future update.)</p>
          <Button variant="outline" className="mt-4" disabled>Configure Targets (Coming Soon)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
