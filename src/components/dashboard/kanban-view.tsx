
"use client";

import React from 'react';
import type { TaskGroup, Task, Assignee, Priority } from '@/lib/mock-data';
import { KanbanTaskCard } from './kanban-task-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


interface KanbanViewProps {
  taskGroups: TaskGroup[];
  availableStatuses: string[];
  assignees: Assignee[]; // Pass if needed by KanbanTaskCard for more details
  priorities: Priority[]; // Pass if needed
}

export function KanbanView({ taskGroups, availableStatuses, assignees, priorities }: KanbanViewProps) {
  return (
    <div className="space-y-6">
      {taskGroups.map(group => (
        <Card key={group.id} className="shadow-md">
          <CardHeader>
            <CardTitle className="font-headline text-lg">{group.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex gap-4">
                {availableStatuses.map(status => (
                  <div key={status} className="flex-shrink-0 w-72 bg-muted/50 rounded-lg p-3">
                    <h3 className="font-semibold mb-3 text-sm px-1 sticky top-0 bg-muted/50 py-1">{status}</h3>
                    <div className="space-y-3 min-h-[100px]">
                      {group.tasks
                        .filter(task => task.status === status)
                        .map(task => (
                          <KanbanTaskCard key={task.id} task={task} />
                        ))}
                      {group.tasks.filter(task => task.status === status).length === 0 && (
                        <p className="text-xs text-muted-foreground text-center py-4">No tasks in this status.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      ))}
       {taskGroups.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No task groups available for Kanban view.</p>
      )}
    </div>
  );
}
