import { Card } from '@/components/ui/card'
import type { SystemHealth } from '@/lib/types'
import { formatNumber } from '@/lib/data-generator'

interface SystemHealthProps {
  health: SystemHealth
}

export function SystemHealthBar({ health }: SystemHealthProps) {
  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-success'
    if (score >= 70) return 'text-warning'
    return 'text-destructive'
  }

  const stats = [
    { label: 'Uptime', value: `${health.uptime}%`, color: 'text-success' },
    { label: 'Active Alerts', value: health.activeAlerts, color: health.activeAlerts > 0 ? 'text-warning' : 'text-success' },
    { label: 'Events Processed', value: formatNumber(health.eventsProcessed), color: 'text-accent' },
    { label: 'Avg Response', value: `${health.averageResponseTime}ms`, color: 'text-info' },
    { label: 'Anomalies', value: health.anomaliesDetected, color: health.anomaliesDetected > 5 ? 'text-warning' : 'text-muted-foreground' }
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">System Health</h2>
          <p className="text-sm text-muted-foreground">Overall system performance and status</p>
        </div>
        <div className="text-right">
          <div className={`text-4xl font-bold font-mono ${getHealthColor(health.overall)}`}>
            {health.overall}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Health Score</div>
        </div>
      </div>

      <div className="w-full bg-secondary rounded-full h-3 mb-6 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${
            health.overall >= 90 ? 'bg-success' :
            health.overall >= 70 ? 'bg-warning' :
            'bg-destructive'
          }`}
          style={{ width: `${health.overall}%` }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-2xl font-bold font-mono ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
