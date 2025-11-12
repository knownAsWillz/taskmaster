import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Task['status']) => void;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    variant: 'secondary' as const,
    icon: Clock,
  },
  'in-progress': {
    label: 'In Progress',
    variant: 'default' as const,
    icon: Clock,
  },
  completed: {
    label: 'Completed',
    variant: 'outline' as const,
    icon: CheckCircle2,
  },
};

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const config = statusConfig[task.status];
  const StatusIcon = config.icon;
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'completed';

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <CardTitle className="text-xl">{task.title}</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge 
                variant={config.variant}
                className={task.status === 'completed' ? 'bg-success text-success-foreground' : ''}
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {config.label}
              </Badge>
              {task.due_date && (
                <Badge variant={isOverdue ? 'destructive' : 'outline'} className="gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(task.due_date), 'MMM dd, yyyy')}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(task)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      {task.description && (
        <CardContent>
          <CardDescription className="text-base">{task.description}</CardDescription>
          {task.status !== 'completed' && (
            <div className="mt-4 flex gap-2">
              {task.status === 'pending' && (
                <Button
                  size="sm"
                  onClick={() => onStatusChange(task.id, 'in-progress')}
                  variant="outline"
                >
                  Start Task
                </Button>
              )}
              {task.status === 'in-progress' && (
                <Button
                  size="sm"
                  onClick={() => onStatusChange(task.id, 'completed')}
                  className="bg-success hover:bg-success/90 text-success-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Mark Complete
                </Button>
              )}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};
