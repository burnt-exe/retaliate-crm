
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { mockTaskGroups, TaskGroup, Task, statuses, priorities, assignees } from "@/lib/mock-data";
import { PlusCircle, MoreHorizontal, Edit2, Trash2, GripVertical, Check } from "lucide-react";

const getStatusBadgeVariant = (status: Task['status']): React.ComponentProps<typeof Badge>['variant'] => {
  switch (status) {
    case 'To Do':
      return 'outline';
    case 'In Progress':
      return 'secondary';
    case 'Review':
      return 'default';
    case 'Done':
      return 'outline'; // Will add a check icon
    default:
      return 'default';
  }
};

const getPriorityBadgeVariant = (priority: Task['priority']): React.ComponentProps<typeof Badge>['variant'] => {
  switch (priority) {
    case 'Low':
      return 'outline';
    case 'Medium':
      return 'secondary';
    case 'High':
      return 'destructive';
    default:
      return 'default';
  }
};

export function TaskBoardClient() {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>(mockTaskGroups);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleUpdateTask = (groupId: string, taskId: string, field: keyof Task, value: any) => {
    setTaskGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.map(task =>
                task.id === taskId ? { ...task, [field]: value } : task
              ),
            }
          : group
      )
    );
  };
  
  const handleAddTask = (groupId: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      name: 'New Task',
      assignee: assignees[0],
      status: 'To Do',
      dueDate: new Date().toISOString().split('T')[0],
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


  return (
    <div className="space-y-6">
      {taskGroups.map((group) => (
        <Card key={group.id} className="shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.01]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold font-headline">{group.name}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => handleAddTask(group.id)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow><TableHead className="w-12"></TableHead><TableHead className="min-w-[250px]">Task Name</TableHead><TableHead>Assignee</TableHead><TableHead>Status</TableHead><TableHead>Priority</TableHead><TableHead>Due Date</TableHead><TableHead className="w-[150px]">Progress</TableHead><TableHead className="w-12 text-right">Actions</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {group.tasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="cursor-grab p-1 text-center">
                      <GripVertical className="h-5 w-5 text-muted-foreground inline-block" />
                    </TableCell>
                    <TableCell>
                      <Input 
                        value={task.name} 
                        onChange={(e) => handleUpdateTask(group.id, task.id, 'name', e.target.value)}
                        className="border-none focus:ring-0 focus:border-0 p-0 h-auto bg-transparent"
                      />
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={task.assignee.name}
                        onValueChange={(value) => {
                            const selectedAssignee = assignees.find(a => a.name === value);
                            if(selectedAssignee) handleUpdateTask(group.id, task.id, 'assignee', selectedAssignee);
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
                      <Select
                        value={task.status}
                        onValueChange={(value: Task['status']) => handleUpdateTask(group.id, task.id, 'status', value)}
                      >
                        <SelectTrigger className="w-auto min-w-[100px] border-none focus:ring-0 focus:border-0 p-0 h-auto bg-transparent [&_svg]:ml-auto">
                            <Badge variant={getStatusBadgeVariant(task.status)} className="rounded-full px-2 py-0.5 text-xs">
                                {task.status === 'Done' && <Check className="mr-1 h-3 w-3" />}
                                <SelectValue placeholder="Status" />
                            </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map(s => (
                            <SelectItem key={s} value={s}>
                              <Badge variant={getStatusBadgeVariant(s)} className="rounded-full px-2 py-0.5 text-xs">
                                {s === 'Done' && <Check className="mr-1 h-3 w-3" />}
                                {s}
                              </Badge>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                        <Select
                            value={task.priority}
                            onValueChange={(value: Task['priority']) => handleUpdateTask(group.id, task.id, 'priority', value)}
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
                       <DatePicker 
                          date={new Date(task.dueDate)}
                          onDateChange={(date) => handleUpdateTask(group.id, task.id, 'dueDate', date?.toISOString().split('T')[0] || '')}
                          className="w-full border-none focus:ring-0 focus:border-0 p-0 h-auto bg-transparent [&_button]:p-0 [&_button]:h-auto [&_button]:justify-start [&_button]:font-normal"
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
                          <DropdownMenuItem onClick={() => setEditingTask(task)}>
                            <Edit2 className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteTask(group.id, task.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             {group.tasks.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No tasks in this group yet.</p>
            )}
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" className="w-full" onClick={() => {
         const newGroup: TaskGroup = {
            id: `group-${Date.now()}`,
            name: 'New Group',
            tasks: [],
          };
          setTaskGroups(prev => [...prev, newGroup]);
      }}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Group
      </Button>
    </div>
  );
}
