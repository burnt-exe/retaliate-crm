
"use client";

import React from 'react';
import type { DateRange } from 'react-day-picker';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import type { TaskGroup, Task, Assignee, Priority } from "@/lib/mock-data";
import { MoreHorizontal, Edit2, Trash2, GripVertical, Check, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableViewProps {
  taskGroup: TaskGroup;
  tasks: Task[];
  availableStatuses: string[];
  assignees: Assignee[];
  priorities: Priority[];
  onUpdateTask: (groupId: string, taskId: string, field: keyof Task | 'timeline', value: any) => void;
  onDeleteTask: (groupId: string, taskId: string) => void;
  onAddNewStatus: () => void;
  draggedTaskInfo: {groupId: string, taskId: string} | null;
  onDragStart: (groupId: string, taskId: string) => void;
  onDrop: (targetGroupId: string, targetTaskId: string | null) => void;
  onDragEnd: () => void;
}

const getStatusBadgeVariant = (status: Task['status']): React.ComponentProps<typeof Badge>['variant'] => {
  switch (status.toLowerCase()) {
    case 'to do': return 'outline';
    case 'in progress': return 'secondary';
    case 'review': return 'default';
    case 'done': return 'outline'; 
    default: return 'default';
  }
};

const getPriorityBadgeVariant = (priority: Task['priority']): React.ComponentProps<typeof Badge>['variant'] => {
  switch (priority) {
    case 'Low': return 'outline';
    case 'Medium': return 'secondary';
    case 'High': return 'destructive';
    default: return 'default';
  }
};

export function TableView({
  taskGroup,
  tasks,
  availableStatuses,
  assignees,
  priorities,
  onUpdateTask,
  onDeleteTask,
  onAddNewStatus,
  draggedTaskInfo,
  onDragStart,
  onDrop,
  onDragEnd,
}: TableViewProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead className="min-w-[250px]">Task Name</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Timeline</TableHead>
          <TableHead className="w-[150px]">Progress</TableHead>
          <TableHead className="w-12 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody
        onDragOver={(e) => e.preventDefault()} // Allow dropping
        onDrop={() => onDrop(taskGroup.id, null)} // Handle drop on empty area of group
      >
        {tasks.map((task) => (
          <TableRow 
            key={task.id} 
            draggable={true}
            onDragStart={() => onDragStart(taskGroup.id, task.id)}
            onDragOver={(e) => e.preventDefault()} 
            onDrop={(e) => {
                e.stopPropagation(); // Prevent drop event from bubbling to parent TableBody
                onDrop(taskGroup.id, task.id);
            }}
            onDragEnd={onDragEnd}
            className={cn(
              "hover:bg-muted/50 transition-colors",
              draggedTaskInfo?.taskId === task.id && "opacity-50 bg-slate-200 dark:bg-slate-700"
            )}
          >
            <TableCell className="cursor-grab p-1 text-center">
              <GripVertical className="h-5 w-5 text-muted-foreground inline-block" />
            </TableCell>
            <TableCell>
              <Input 
                value={task.name} 
                onChange={(e) => onUpdateTask(taskGroup.id, task.id, 'name', e.target.value)}
                className="border-none focus:ring-0 focus:border-0 p-0 h-auto bg-transparent"
              />
            </TableCell>
            <TableCell>
              <Select 
                value={task.assignee.name}
                onValueChange={(value) => {
                    const selectedAssignee = assignees.find(a => a.name === value);
                    if(selectedAssignee) onUpdateTask(taskGroup.id, task.id, 'assignee', selectedAssignee);
                }}
              >
                <SelectTrigger className="w-[150px] border-none focus:ring-0 focus:border-0 p-0 h-auto bg-transparent [&_svg]:ml-auto">
                   <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} data-ai-hint="person avatar"/>
                        <AvatarFallback>{task.assignee.fallback}</AvatarFallback>
                    </Avatar>
                    <SelectValue placeholder="Assignee" />
                   </div>
                </SelectTrigger>
                <SelectContent>
                    {assignees.map(a => (
                        <SelectItem key={a.name} value={a.name}>
                             <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={a.avatarUrl} alt={a.name} data-ai-hint="person avatar"/>
                                    <AvatarFallback>{a.fallback}</AvatarFallback>
                                </Avatar>
                                {a.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-auto min-w-[100px] border-none focus:ring-0 focus:border-0 p-0 h-auto bg-transparent justify-start hover:bg-transparent">
                    <Badge variant={getStatusBadgeVariant(task.status)} className="rounded-full px-2 py-0.5 text-xs cursor-pointer">
                      {task.status === 'Done' && <Check className="mr-1 h-3 w-3" />}
                      {task.status}
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuRadioGroup 
                    value={task.status} 
                    onValueChange={(value) => onUpdateTask(taskGroup.id, task.id, 'status', value)}
                  >
                    {availableStatuses.map(s => (
                      <DropdownMenuRadioItem key={s} value={s}>
                        <Badge variant={getStatusBadgeVariant(s)} className="rounded-full px-2 py-0.5 text-xs w-full justify-start">
                          {s === 'Done' && <Check className="mr-1 h-3 w-3" />}
                          {s}
                        </Badge>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={onAddNewStatus}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Status
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell>
                <Select
                    value={task.priority}
                    onValueChange={(value: Task['priority']) => onUpdateTask(taskGroup.id, task.id, 'priority', value)}
                >
                    <SelectTrigger className="w-[100px] border-none focus:ring-0 focus:border-0 p-0 h-auto bg-transparent [&_svg]:ml-auto">
                        <Badge variant={getPriorityBadgeVariant(task.priority)} className="rounded-full px-2 py-0.5 text-xs">
                            <SelectValue placeholder="Priority" />
                        </Badge>
                    </SelectTrigger>
                    <SelectContent>
                    {priorities.map(p => (
                        <SelectItem key={p} value={p}>
                        <Badge variant={getPriorityBadgeVariant(p)} className="rounded-full px-2 py-0.5 text-xs">{p}</Badge>
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell>
               <DateRangePicker 
                  dateRange={{ 
                    from: task.startDate ? new Date(task.startDate) : undefined, 
                    to: task.endDate ? new Date(task.endDate) : undefined 
                  }}
                  onDateRangeChange={(range) => onUpdateTask(taskGroup.id, task.id, 'timeline', range)}
                  className="w-full border-none focus:ring-0 focus:border-0 p-0 h-auto bg-transparent [&_button]:p-0 [&_button]:h-auto [&_button]:justify-start [&_button]:font-normal"
                  popoverAlign="start"
                />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress value={task.progress} className="w-full h-2" />
                <span className="text-xs text-muted-foreground">{task.progress}%</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem> // onClick={() => setEditingTask(task)} // Future: Modal Edit
                    <Edit2 className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={() => onDeleteTask(taskGroup.id, task.id)} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
     {tasks.length === 0 && (
        <p className="text-center text-muted-foreground py-4">No tasks in this group yet.</p>
    )}
  );
}
