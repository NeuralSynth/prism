import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Activity, 
  Database, 
  TrendUp, 
  Clock,
  CheckCircle,
  Warning,
  XCircle,
  Play
} from '@phosphor-icons/react'
import type { BackendService } from '@/lib/types'
import { formatUptime, getServiceTypeIcon } from '@/lib/backend-simulator'

interface BackendServiceCardProps {
  service: BackendService
  onClick?: (service: BackendService) => void
}

export function BackendServiceCard({ service, onClick }: BackendServiceCardProps) {
  const getStatusColor = () => {
    switch (service.status) {
      case 'healthy': return 'bg-success'
      case 'degraded': return 'bg-warning'
      case 'down': return 'bg-destructive'
      case 'starting': return 'bg-info'
      default: return 'bg-muted'
    }
  }

  const getStatusIcon = () => {
    switch (service.status) {
      case 'healthy': return <CheckCircle size={16} weight="fill" className="text-success" />
      case 'degraded': return <Warning size={16} weight="fill" className="text-warning" />
      case 'down': return <XCircle size={16} weight="fill" className="text-destructive" />
      case 'starting': return <Play size={16} weight="fill" className="text-info" />
    }
  }

  const getStatusLabel = () => {
    return service.status.charAt(0).toUpperCase() + service.status.slice(1)
  }

  return (
    <Card 
      className="hover:border-accent transition-colors cursor-pointer group"
      onClick={() => onClick?.(service)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getServiceTypeIcon(service.type)}</span>
            <div>
              <CardTitle className="text-base group-hover:text-accent transition-colors">
                {service.name}
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                {service.type.toUpperCase()} v{service.version} • Port {service.port}
              </CardDescription>
            </div>
          </div>
          {getStatusIcon()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${service.status === 'healthy' ? 'animate-pulse-glow' : ''}`} />
          <span className="text-sm font-medium">{getStatusLabel()}</span>
          <span className="text-xs text-muted-foreground ml-auto">
            <Clock size={12} className="inline mr-1" />
            {formatUptime(service.uptime)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground text-xs mb-1">Requests</div>
            <div className="font-mono font-semibold">
              {service.requestCount.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs mb-1">Avg Response</div>
            <div className="font-mono font-semibold">
              {service.avgResponseTime}ms
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs mb-1">Throughput</div>
            <div className="font-mono font-semibold flex items-center gap-1">
              <TrendUp size={14} className="text-success" />
              {service.throughput}/s
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs mb-1">Connections</div>
            <div className="font-mono font-semibold flex items-center gap-1">
              <Activity size={14} className="text-accent" />
              {service.activeConnections}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">CPU</span>
              <span className="font-mono font-medium">{service.cpuUsage.toFixed(1)}%</span>
            </div>
            <Progress 
              value={service.cpuUsage} 
              className="h-1.5"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Memory</span>
              <span className="font-mono font-medium">{service.memoryUsage.toFixed(1)}%</span>
            </div>
            <Progress 
              value={service.memoryUsage} 
              className="h-1.5"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground mb-2">Capabilities</div>
          <div className="flex flex-wrap gap-1">
            {service.capabilities.slice(0, 3).map((cap) => (
              <Badge key={cap} variant="secondary" className="text-xs">
                {cap}
              </Badge>
            ))}
            {service.capabilities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{service.capabilities.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {service.errorCount > 0 && (
          <div className="pt-2 border-t border-border">
            <div className="flex items-center gap-2 text-xs">
              <Warning size={14} className="text-warning" />
              <span className="text-muted-foreground">
                {service.errorCount} errors logged
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
