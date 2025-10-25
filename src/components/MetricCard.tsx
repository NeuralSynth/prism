import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUp, ArrowDown, Minus } from '@phosphor-icons/react'
import { Line, LineChart, ResponsiveContainer } from 'recharts'
import type { MetricData } from '@/lib/types'

interface MetricCardProps {
  metric: MetricData
}

export function MetricCard({ metric }: MetricCardProps) {
  const statusColors = {
    normal: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5',
    critical: 'border-destructive/30 bg-destructive/5'
  }

  const trendIcons = {
    up: <ArrowUp className="text-success" weight="bold" />,
    down: <ArrowDown className="text-destructive" weight="bold" />,
    stable: <Minus className="text-muted-foreground" />
  }

  return (
    <Card className={`p-6 transition-all hover:shadow-lg ${statusColors[metric.status]}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {metric.name}
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold font-mono">
              {metric.value.toFixed(metric.unit === '%' ? 1 : 0)}
            </span>
            <span className="text-sm text-muted-foreground">{metric.unit}</span>
          </div>
        </div>
        <Badge variant={metric.status === 'normal' ? 'secondary' : 'destructive'}>
          {metric.status}
        </Badge>
      </div>

      <div className="flex items-center gap-2 mb-3">
        {trendIcons[metric.trend]}
        <span className={`text-sm font-medium ${
          metric.change > 0 ? 'text-success' : 
          metric.change < 0 ? 'text-destructive' : 
          'text-muted-foreground'
        }`}>
          {metric.change > 0 ? '+' : ''}{metric.change}% vs last hour
        </span>
      </div>

      <ResponsiveContainer width="100%" height={60}>
        <LineChart data={metric.history}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={
              metric.status === 'critical' ? 'oklch(0.65 0.24 25)' :
              metric.status === 'warning' ? 'oklch(0.75 0.15 75)' :
              'oklch(0.75 0.15 195)'
            }
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
