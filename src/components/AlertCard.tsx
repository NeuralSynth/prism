import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock, XCircle } from '@phosphor-icons/react'
import type { Alert } from '@/lib/types'
import { formatTimestamp } from '@/lib/data-generator'

interface AlertCardProps {
  alert: Alert
  onAcknowledge?: (id: string) => void
  onResolve?: (id: string) => void
}

export function AlertCard({ alert, onAcknowledge, onResolve }: AlertCardProps) {
  const severityColors = {
    info: 'border-l-info',
    success: 'border-l-success',
    warning: 'border-l-warning',
    critical: 'border-l-destructive'
  }

  const statusIcons = {
    active: <XCircle size={18} className="text-destructive" weight="fill" />,
    acknowledged: <Clock size={18} className="text-warning" weight="fill" />,
    resolved: <CheckCircle size={18} className="text-success" weight="fill" />
  }

  return (
    <Card className={`p-6 border-l-4 ${severityColors[alert.severity]}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg">{alert.title}</h3>
            <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}>
              {alert.severity}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {statusIcons[alert.status]}
          <span className="text-xs text-muted-foreground capitalize">{alert.status}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Source:</span>
          <span className="font-mono text-xs">{alert.source}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Priority:</span>
          <Badge variant="outline">{alert.priority}/10</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Affected:</span>
          <div className="flex gap-1 flex-wrap">
            {alert.affectedSystems.map(system => (
              <Badge key={system} variant="secondary" className="text-xs">
                {system}
              </Badge>
            ))}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {formatTimestamp(alert.timestamp)}
        </div>
      </div>

      {alert.recommendedAction && (
        <div className="p-3 bg-accent/10 rounded-md mb-4">
          <p className="text-xs font-medium text-accent-foreground mb-1">Recommended Action</p>
          <p className="text-sm">{alert.recommendedAction}</p>
        </div>
      )}

      <div className="flex gap-2">
        {alert.status === 'active' && (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onAcknowledge?.(alert.id)}
          >
            Acknowledge
          </Button>
        )}
        {alert.status !== 'resolved' && (
          <Button 
            size="sm"
            onClick={() => onResolve?.(alert.id)}
          >
            Resolve
          </Button>
        )}
      </div>
    </Card>
  )
}
