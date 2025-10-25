import type { 
  SystemEvent, 
  MetricData, 
  Alert, 
  Integration, 
  OptimizationRecommendation,
  SystemHealth,
  EventSeverity,
  EventType,
  MetricStatus
} from './types'

const EVENT_SOURCES = [
  'api-gateway',
  'auth-service', 
  'database-cluster',
  'payment-processor',
  'notification-service',
  'cdn-edge',
  'load-balancer',
  'cache-layer'
]

const EVENT_MESSAGES = {
  info: [
    'Request processed successfully',
    'Cache hit ratio optimal',
    'Background job completed',
    'Health check passed',
    'Configuration updated'
  ],
  warning: [
    'Response time elevated',
    'Memory usage at 75%',
    'Connection pool near limit',
    'Retry attempt initiated',
    'Rate limit approaching'
  ],
  critical: [
    'Service unavailable',
    'Database connection lost',
    'Authentication failure spike',
    'Disk space critically low',
    'Circuit breaker opened'
  ],
  success: [
    'Deployment completed',
    'Failover successful',
    'Auto-scaling triggered',
    'Backup completed',
    'Security patch applied'
  ]
}

export function generateEvent(): SystemEvent {
  const severity = getRandomSeverity()
  const type = getRandomEventType()
  const source = EVENT_SOURCES[Math.floor(Math.random() * EVENT_SOURCES.length)]
  const messages = EVENT_MESSAGES[severity]
  const message = messages[Math.floor(Math.random() * messages.length)]
  
  const isAnomaly = Math.random() < 0.05
  
  return {
    id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    source,
    type,
    severity: isAnomaly && severity !== 'critical' ? 'warning' : severity,
    message,
    metadata: generateMetadata(type),
    isAnomaly
  }
}

function getRandomSeverity(): EventSeverity {
  const rand = Math.random()
  if (rand < 0.6) return 'info'
  if (rand < 0.85) return 'success'
  if (rand < 0.95) return 'warning'
  return 'critical'
}

function getRandomEventType(): EventType {
  const types: EventType[] = ['api', 'database', 'system', 'security', 'user', 'performance']
  return types[Math.floor(Math.random() * types.length)]
}

function generateMetadata(type: EventType): Record<string, any> {
  switch (type) {
    case 'api':
      return {
        endpoint: '/api/v1/users',
        method: 'GET',
        statusCode: Math.random() < 0.9 ? 200 : 500,
        responseTime: Math.floor(Math.random() * 500) + 50
      }
    case 'database':
      return {
        query: 'SELECT',
        duration: Math.floor(Math.random() * 200) + 10,
        rowsAffected: Math.floor(Math.random() * 1000)
      }
    case 'system':
      return {
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100)
      }
    default:
      return {}
  }
}

export function generateMetrics(): MetricData[] {
  return [
    createMetric('CPU Usage', 'cpu', 65, 10, '%'),
    createMetric('Memory Usage', 'memory', 72, 8, '%'),
    createMetric('Response Time', 'latency', 145, -5, 'ms'),
    createMetric('Requests/sec', 'throughput', 1247, 15, 'req/s'),
    createMetric('Error Rate', 'errors', 0.8, -0.2, '%'),
    createMetric('Active Users', 'users', 3456, 12, 'users')
  ]
}

function createMetric(
  name: string, 
  id: string, 
  value: number, 
  change: number, 
  unit: string
): MetricData {
  const status: MetricStatus = 
    value > 80 ? 'critical' : 
    value > 70 ? 'warning' : 
    'normal'
  
  const history = Array.from({ length: 20 }, (_, i) => ({
    timestamp: Date.now() - (19 - i) * 60000,
    value: value + (Math.random() - 0.5) * 20
  }))
  
  const prediction = Array.from({ length: 10 }, (_, i) => ({
    timestamp: Date.now() + (i + 1) * 60000,
    value: value + change * (i + 1) + (Math.random() - 0.5) * 10
  }))
  
  return {
    id,
    name,
    value,
    unit,
    status,
    trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
    change,
    history,
    prediction
  }
}

export function generateAlerts(): Alert[] {
  return [
    {
      id: 'alt-001',
      timestamp: Date.now() - 300000,
      severity: 'critical',
      title: 'Database Response Time Spike',
      description: 'Query performance degraded by 300% in the last 5 minutes',
      source: 'database-cluster',
      status: 'active',
      priority: 10,
      affectedSystems: ['api-gateway', 'database-cluster'],
      recommendedAction: 'Check for slow queries and consider adding indexes'
    },
    {
      id: 'alt-002',
      timestamp: Date.now() - 600000,
      severity: 'warning',
      title: 'Memory Usage Trending High',
      description: 'Memory usage has been above 75% for 10 minutes',
      source: 'api-gateway',
      status: 'acknowledged',
      priority: 7,
      affectedSystems: ['api-gateway'],
      recommendedAction: 'Consider horizontal scaling or investigate memory leaks'
    },
    {
      id: 'alt-003',
      timestamp: Date.now() - 900000,
      severity: 'warning',
      title: 'Unusual Traffic Pattern Detected',
      description: 'AI detected anomalous request pattern from new IP range',
      source: 'load-balancer',
      status: 'active',
      priority: 6,
      affectedSystems: ['load-balancer', 'api-gateway'],
      recommendedAction: 'Review security logs and consider rate limiting'
    }
  ]
}

export function generateIntegrations(): Integration[] {
  return [
    {
      id: 'int-001',
      name: 'AWS CloudWatch',
      type: 'cloud-monitoring',
      status: 'active',
      lastSync: Date.now() - 30000,
      eventsCollected: 45678,
      icon: 'cloud'
    },
    {
      id: 'int-002',
      name: 'PostgreSQL Database',
      type: 'database',
      status: 'active',
      lastSync: Date.now() - 15000,
      eventsCollected: 23456,
      icon: 'database'
    },
    {
      id: 'int-003',
      name: 'Kubernetes Cluster',
      type: 'orchestration',
      status: 'active',
      lastSync: Date.now() - 45000,
      eventsCollected: 67890,
      icon: 'containers'
    },
    {
      id: 'int-004',
      name: 'Redis Cache',
      type: 'cache',
      status: 'active',
      lastSync: Date.now() - 20000,
      eventsCollected: 12345,
      icon: 'lightning'
    }
  ]
}

export function generateRecommendations(): OptimizationRecommendation[] {
  return [
    {
      id: 'rec-001',
      category: 'cost',
      title: 'Right-size Database Instance',
      description: 'Current database instance is over-provisioned. CPU usage averages 25% over 30 days.',
      impact: 'high',
      estimatedSavings: '$1,200/month',
      implementation: 'Downgrade from db.r5.4xlarge to db.r5.2xlarge during maintenance window',
      priority: 9
    },
    {
      id: 'rec-002',
      category: 'performance',
      title: 'Implement Query Caching',
      description: 'Detected 15 frequently repeated queries that could be cached',
      impact: 'high',
      implementation: 'Add Redis caching layer for top queries with 5-minute TTL',
      priority: 8
    },
    {
      id: 'rec-003',
      category: 'reliability',
      title: 'Enable Auto-Scaling',
      description: 'Traffic patterns show predictable peaks that could benefit from auto-scaling',
      impact: 'medium',
      implementation: 'Configure auto-scaling group with min:2, max:8, target CPU:70%',
      priority: 7
    },
    {
      id: 'rec-004',
      category: 'security',
      title: 'Rotate Access Keys',
      description: 'Some API keys have not been rotated in over 90 days',
      impact: 'medium',
      implementation: 'Implement automated key rotation policy using secrets manager',
      priority: 6
    }
  ]
}

export function generateSystemHealth(): SystemHealth {
  return {
    overall: 87,
    uptime: 99.97,
    activeAlerts: 3,
    eventsProcessed: 145678,
    averageResponseTime: 145,
    anomaliesDetected: 8
  }
}

export function detectAnomaly(value: number, history: number[]): boolean {
  if (history.length < 5) return false
  
  const mean = history.reduce((a, b) => a + b, 0) / history.length
  const variance = history.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / history.length
  const stdDev = Math.sqrt(variance)
  
  const zScore = Math.abs((value - mean) / stdDev)
  return zScore > 2.5
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return date.toLocaleDateString()
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
