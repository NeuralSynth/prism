import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Brain, ChartLine, CircleNotch, CheckCircle } from '@phosphor-icons/react'
import type { MLModelInfo } from '@/lib/types'

interface MLModelCardProps {
  model: MLModelInfo
}

export function MLModelCard({ model }: MLModelCardProps) {
  const getTypeLabel = () => {
    return model.type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const getStatusColor = () => {
    switch (model.status) {
      case 'active': return 'text-success'
      case 'training': return 'text-warning'
      case 'idle': return 'text-muted-foreground'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = () => {
    switch (model.status) {
      case 'active': return <CheckCircle size={16} weight="fill" className="text-success" />
      case 'training': return <CircleNotch size={16} weight="bold" className="text-warning animate-spin" />
      case 'idle': return <CircleNotch size={16} weight="bold" className="text-muted-foreground" />
    }
  }

  const formatTimeSince = (timestamp: number) => {
    if (timestamp === 0) return 'Never'
    const diff = Date.now() - timestamp
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor((diff % 86400000) / 3600000)
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return 'Recently'
  }

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain size={20} weight="bold" className="text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm leading-tight">
                {model.name}
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                {getTypeLabel()} • v{model.version}
              </CardDescription>
            </div>
          </div>
          {getStatusIcon()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant={model.status === 'active' ? 'default' : 'secondary'} className="text-xs">
            {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatTimeSince(model.lastTrained)}
          </span>
        </div>

        {model.status !== 'training' && model.accuracy > 0 && (
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground">Accuracy</span>
              <span className="font-mono font-semibold">{model.accuracy.toFixed(1)}%</span>
            </div>
            <Progress 
              value={model.accuracy} 
              className="h-2"
            />
          </div>
        )}

        {model.status === 'training' && (
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground">Training Progress</span>
              <span className="font-mono font-semibold">45%</span>
            </div>
            <Progress 
              value={45} 
              className="h-2"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
          <div>
            <div className="text-muted-foreground text-xs mb-1">Predictions</div>
            <div className="font-mono text-sm font-semibold flex items-center gap-1">
              <ChartLine size={14} className="text-accent" />
              {model.predictionsCount.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs mb-1">Type</div>
            <div className="text-xs font-medium">
              {getTypeLabel()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
