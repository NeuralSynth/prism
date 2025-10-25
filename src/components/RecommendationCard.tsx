import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, TrendUp, ShieldCheck, CurrencyDollar } from '@phosphor-icons/react'
import type { OptimizationRecommendation } from '@/lib/types'

interface RecommendationCardProps {
  recommendation: OptimizationRecommendation
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const categoryIcons = {
    performance: <TrendUp size={24} className="text-accent" weight="duotone" />,
    cost: <CurrencyDollar size={24} className="text-success" weight="duotone" />,
    security: <ShieldCheck size={24} className="text-warning" weight="duotone" />,
    reliability: <Lightbulb size={24} className="text-info" weight="duotone" />
  }

  const impactColors = {
    high: 'text-destructive',
    medium: 'text-warning',
    low: 'text-muted-foreground'
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-all">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-secondary rounded-lg">
          {categoryIcons[recommendation.category]}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg">{recommendation.title}</h3>
            <Badge variant="outline" className={impactColors[recommendation.impact]}>
              {recommendation.impact} impact
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {recommendation.description}
          </p>
          {recommendation.estimatedSavings && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full mb-3">
              <span className="text-sm font-semibold">💰 {recommendation.estimatedSavings}</span>
            </div>
          )}
          <div className="p-3 bg-muted/50 rounded-md">
            <p className="text-xs font-medium text-muted-foreground mb-1">Implementation</p>
            <p className="text-sm">{recommendation.implementation}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
