
"use client";

import React from 'react';
import type { TaskGroup, Task } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface RoadmapViewProps {
  taskGroups: TaskGroup[];
}

const getPriorityBadgeVariant = (priority: Task['priority']): React.ComponentProps<typeof Badge>['variant'] => {
  switch (priority) {
    case 'Low': return 'outline';
    case 'Medium': return 'secondary';
    case 'High': return 'destructive';
    default: return 'default';
  }
};

export function RoadmapView({ taskGroups }: RoadmapViewProps) {
  return (
    <div className="space-y-6">
      {taskGroups.map(group => (
        <Card key={group.id} className="shadow-md">
          <CardHeader>
            <CardTitle className="font-headline text-lg">{group.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {group.tasks.length > 0 ? (
              <ul className="space-y-3">
                {group.tasks
                  .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                  .map(task => (
                    <li key={task.id} className="p-3 border rounded-md hover:bg-muted/30 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-sm">{task.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {format(new Date(task.startDate), 'MMM dd, yyyy')}
                                {task.endDate ? ` - ${format(new Date(task.endDate), 'MMM dd, yyyy')}` : ' (No end date)'}
                            </p>
                        </div>
                        <Badge variant={getPriorityBadgeVariant(task.priority)} className="text-xs shrink-0">{task.priority}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} data-ai-hint="person avatar"/>
                          <AvatarFallback className="text-xs">{task.assignee.fallback}</AvatarFallback>
                        </Avatar>
                        <span>{task.assignee.name}</span>
                        <span className="mx-1 text-muted-foreground/50">•</span>
                        <span>Status: {task.status}</span>
                         <span className="mx-1 text-muted-foreground/50">•</span>
                        <span>Progress: {task.progress}%</span>
                      </div>
                    </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No tasks in this group for roadmap view.</p>
            )}
          </CardContent>
        </Card>
      ))}
      {taskGroups.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No task groups available for roadmap view.</p>
      )}
    </div>
  );
}
