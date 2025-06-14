
"use client";

import React from 'react';
import type { Task } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';

interface KanbanTaskCardProps {
  task: Task;
}

const getPriorityBadgeVariant = (priority: Task['priority']): React.ComponentProps<typeof Badge>['variant'] => {
  switch (priority) {
    case 'Low': return 'outline';
    case 'Medium': return 'secondary';
    case 'High': return 'destructive';
    default: return 'default';
  }
};

export function KanbanTaskCard({ task }: KanbanTaskCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow bg-card">
      <CardHeader className="p-3 pb-1">
        <CardTitle className="text-sm font-semibold">{task.name}</CardTitle>
        <div className="flex items-center justify-between mt-1">
            <Badge variant={getPriorityBadgeVariant(task.priority)} className="text-xs">{task.priority}</Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Avatar className="h-5 w-5">
                    <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} data-ai-hint="person avatar"/>
                    <AvatarFallback className="text-xs">{task.assignee.fallback}</AvatarFallback>
                </Avatar>
                <span>{task.assignee.name}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-2 text-xs">
        {task.startDate && (
             <p className="text-muted-foreground mb-2">
                Start: {format(new Date(task.startDate), "MMM dd")}
                {task.endDate && ` - End: ${format(new Date(task.endDate), "MMM dd")}`}
            </p>
        )}
        <div className="flex items-center gap-2">
            <Progress value={task.progress} className="h-1.5 flex-grow" />
            <span className="text-muted-foreground">{task.progress}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
