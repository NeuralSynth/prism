import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowRight, 
  CheckCircle, 
  CircleNotch, 
  Warning,
  Database,
  Wrench,
  ChartLine,
  Export
} from '@phosphor-icons/react'
import type { DataPipelineStage } from '@/lib/types'

interface DataPipelineVisualizerProps {
  stages: DataPipelineStage[]
}

export function DataPipelineVisualizer({ stages }: DataPipelineVisualizerProps) {
  const getStageIcon = (type: DataPipelineStage['type']) => {
    switch (type) {
      case 'ingestion': return <Database size={20} weight="bold" />
      case 'transformation': return <Wrench size={20} weight="bold" />
      case 'analysis': return <ChartLine size={20} weight="bold" />
      case 'output': return <Export size={20} weight="bold" />
    }
  }

  const getStatusIcon = (status: DataPipelineStage['status']) => {
    switch (status) {
      case 'running': return <CheckCircle size={14} weight="fill" className="text-success" />
      case 'idle': return <CircleNotch size={14} weight="bold" className="text-muted-foreground" />
      case 'error': return <Warning size={14} weight="fill" className="text-destructive" />
    }
  }

  const getStatusColor = (status: DataPipelineStage['status']) => {
    switch (status) {
      case 'running': return 'border-success/50 bg-success/5'
      case 'idle': return 'border-muted bg-muted/5'
      case 'error': return 'border-destructive/50 bg-destructive/5'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database size={20} weight="bold" />
          Data Processing Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stages.map((stage, index) => (
            <div key={stage.id}>
              <div className={`p-4 border-2 rounded-lg ${getStatusColor(stage.status)} transition-colors`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded-lg">
                      {getStageIcon(stage.type)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-2">
                        {stage.name}
                        {getStatusIcon(stage.status)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {stage.type.charAt(0).toUpperCase() + stage.type.slice(1)}
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant={stage.status === 'running' ? 'default' : stage.status === 'error' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {stage.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="text-muted-foreground mb-1">Processed</div>
                    <div className="font-mono font-semibold">
                      {stage.processedRecords.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Error Rate</div>
                    <div className="font-mono font-semibold">
                      {stage.errorRate.toFixed(2)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Avg Time</div>
                    <div className="font-mono font-semibold">
                      {stage.avgProcessingTime}ms
                    </div>
                  </div>
                </div>

                {stage.status === 'running' && (
                  <div className="mt-3">
                    <Progress value={75} className="h-1" />
                  </div>
                )}
              </div>

              {index < stages.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight size={20} weight="bold" className="text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground text-xs mb-1">Total Throughput</div>
              <div className="font-mono font-semibold">
                {Math.floor(stages[0]?.processedRecords / 60)} records/sec
              </div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs mb-1">Pipeline Health</div>
              <div className="font-semibold text-success">
                {stages.every(s => s.status === 'running') ? 'Healthy' : 'Degraded'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
