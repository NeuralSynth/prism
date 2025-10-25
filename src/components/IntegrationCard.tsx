import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock } from '@phosphor-icons/react'
import type { Integration } from '@/lib/types'
import { formatTimestamp } from '@/lib/data-generator'

interface IntegrationCardProps {
  integration: Integration
}

export function IntegrationCard({ integration }: IntegrationCardProps) {
  const statusConfig = {
    active: {
      icon: <CheckCircle size={20} className="text-success" weight="fill" />,
      color: 'text-success',
      label: 'Active'
    },
    inactive: {
      icon: <Clock size={20} className="text-muted-foreground" weight="fill" />,
      color: 'text-muted-foreground',
      label: 'Inactive'
    },
    error: {
      icon: <XCircle size={20} className="text-destructive" weight="fill" />,
      color: 'text-destructive',
      label: 'Error'
    }
  }

  const status = statusConfig[integration.status]

  return (
    <Card className="p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{integration.name}</h3>
          <p className="text-sm text-muted-foreground capitalize">{integration.type.replace('-', ' ')}</p>
        </div>
        <div className="flex items-center gap-2">
          {status.icon}
          <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Events Collected</span>
          <span className="font-mono font-semibold">{integration.eventsCollected.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Last Sync</span>
          <span className="text-sm">{formatTimestamp(integration.lastSync)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Badge variant="secondary" className="text-xs">
          {integration.type}
        </Badge>
      </div>
    </Card>
  )
}
