
"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTaskGroups as initialTaskGroups, type TaskGroup, type Task, assignees as initialAssignees, priorities as initialPriorities, statuses as initialStatuses } from "@/lib/mock-data";
import { PlusCircle, ListChecks, KanbanSquare, CalendarRange } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { TableView } from './table-view';
import { KanbanView } from './kanban-view';
import { RoadmapView } from './roadmap-view';

export type ViewMode = "table" | "board" | "roadmap";

export function TaskBoardClient() {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>(initialTaskGroups);
  const [availableStatuses, setAvailableStatuses] = useState<string[]>(initialStatuses);
  const [currentView, setCurrentView] = useState<ViewMode>("table");
  const { toast } = useToast();

  // Drag and Drop state - specific to TableView for now
  const [draggedTaskInfo, setDraggedTaskInfo] = useState<{groupId: string, taskId: string} | null>(null);

  const handleUpdateTask = (groupId: string, taskId: string, field: keyof Task | 'timeline', value: any) => {
    setTaskGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.map(task => {
                if (task.id === taskId) {
                  if (field === 'timeline') {
                    const range = value as import('react-day-picker').DateRange | undefined;
                    return {
                      ...task,
                      startDate: range?.from ? range.from.toISOString().split('T')[0] : task.startDate,
                      endDate: range?.to ? range.to.toISOString().split('T')[0] : undefined,
                    };
                  }
                  return { ...task, [field as keyof Task]: value };
                }
                return task;
              }),
            }
          : group
      )
    );
  };
  
  const handleAddTask = (groupId: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      name: 'New Task',
      assignee: initialAssignees[0],
      status: availableStatuses[0] || 'To Do',
      startDate: new Date().toISOString().split('T')[0],
      progress: 0,
      priority: 'Medium',
    };
    setTaskGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId ? {...group, tasks: [...group.tasks, newTask]} : group
      )
    );
  };

  const handleDeleteTask = (groupId: string, taskId: string) => {
     setTaskGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.filter(task => task.id !== taskId),
            }
          : group
      )
    );
  };

  const handleAddNewStatus = () => {
    const newStatusName = window.prompt("Enter new status name:");
    if (newStatusName && newStatusName.trim() !== "") {
      const trimmedStatus = newStatusName.trim();
      if (!availableStatuses.find(s => s.toLowerCase() === trimmedStatus.toLowerCase())) {
        setAvailableStatuses(prev => [...prev, trimmedStatus]);
        toast({ title: "Status Added", description: `"${trimmedStatus}" has been added to available statuses.` });
      } else {
        toast({ title: "Status Exists", description: `"${trimmedStatus}" already exists.`, variant: "destructive" });
      }
    }
  };

  const handleAddGroup = () => {
    const newGroup: TaskGroup = {
       id: `group-${Date.now()}`,
       name: 'New Group',
       tasks: [],
     };
     setTaskGroups(prev => [...prev, newGroup]);
  };

  // Drag handlers for TableView
  const handleDragStart = (groupId: string, taskId: string) => {
    if (currentView === 'table') {
      setDraggedTaskInfo({ groupId, taskId });
    }
  };

  const handleDrop = (targetGroupId: string, targetTaskId: string | null) => { // targetTaskId can be null if dropping on group header or empty area
    if (!draggedTaskInfo || currentView !== 'table') return;
    
    // Simplified: only allow reordering within the same group for now via table
    if (draggedTaskInfo.groupId !== targetGroupId) {
      console.warn("Cross-group drag-and-drop not implemented yet for table view.");
      setDraggedTaskInfo(null);
      return;
    }
    if (targetTaskId && draggedTaskInfo.taskId === targetTaskId) {
      setDraggedTaskInfo(null);
      return;
    }

    setTaskGroups(prevGroups =>
      prevGroups.map(group => {
        if (group.id === targetGroupId) {
          const tasks = [...group.tasks];
          const draggedItemIndex = tasks.findIndex(t => t.id === draggedTaskInfo.taskId);
          if (draggedItemIndex === -1) return group; // Should not happen
          
          const [draggedItem] = tasks.splice(draggedItemIndex, 1);
          
          if (targetTaskId) {
            const targetItemIndex = tasks.findIndex(t => t.id === targetTaskId);
            if (targetItemIndex === -1) { // Dropped on a non-task area, or target task not found
                tasks.push(draggedItem); // Add to end or handle as needed
            } else {
                tasks.splice(targetItemIndex, 0, draggedItem);
            }
          } else {
             tasks.push(draggedItem); // If dropped on group without specific task target, add to end
          }
          return { ...group, tasks };
        }
        return group;
      })
    );
    setDraggedTaskInfo(null);
  };

  const handleDragEnd = () => {
    if (currentView === 'table') {
      setDraggedTaskInfo(null);
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as ViewMode)}>
          <TabsList>
            <TabsTrigger value="table" className="gap-1">
              <ListChecks className="h-4 w-4" /> Table
            </TabsTrigger>
            <TabsTrigger value="board" className="gap-1">
              <KanbanSquare className="h-4 w-4" /> Board
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="gap-1">
              <CalendarRange className="h-4 w-4" /> Roadmap
            </TabsTrigger>
          </TabsList>
        </Tabs>
         <Button variant="outline" onClick={handleAddGroup}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Group
        </Button>
      </div>

      <TabsContent value="table" className={currentView !== 'table' ? 'hidden' : ''}>
        {taskGroups.map((group) => (
          <Card key={group.id} className="shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.01] mb-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold font-headline">{group.name}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => handleAddTask(group.id)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <TableView
                taskGroup={group}
                tasks={group.tasks}
                availableStatuses={availableStatuses}
                assignees={initialAssignees}
                priorities={initialPriorities}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                onAddNewStatus={handleAddNewStatus}
                draggedTaskInfo={draggedTaskInfo}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
              />
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="board" className={currentView !== 'board' ? 'hidden' : ''}>
        <KanbanView
          taskGroups={taskGroups}
          availableStatuses={availableStatuses}
          assignees={initialAssignees}
          priorities={initialPriorities}
        />
      </TabsContent>

      <TabsContent value="roadmap" className={currentView !== 'roadmap' ? 'hidden' : ''}>
        <RoadmapView taskGroups={taskGroups} />
      </TabsContent>
    </div>
  );
}
