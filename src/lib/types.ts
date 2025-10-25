export type EventSeverity = 'info' | 'warning' | 'critical' | 'success'
export type EventType = 'api' | 'database' | 'system' | 'security' | 'user' | 'performance'
export type AlertStatus = 'active' | 'acknowledged' | 'resolved'
export type MetricStatus = 'normal' | 'warning' | 'critical'

export interface SystemEvent {
  id: string
  timestamp: number
  source: string
  type: EventType
  severity: EventSeverity
  message: string
  metadata?: Record<string, any>
  isAnomaly?: boolean
}

export interface MetricData {
  id: string
  name: string
  value: number
  unit: string
  status: MetricStatus
  trend: 'up' | 'down' | 'stable'
  change: number
  history: Array<{ timestamp: number; value: number }>
  prediction?: Array<{ timestamp: number; value: number }>
}

export interface Alert {
  id: string
  timestamp: number
  severity: EventSeverity
  title: string
  description: string
  source: string
  status: AlertStatus
  priority: number
  affectedSystems: string[]
  recommendedAction?: string
}

export interface Integration {
  id: string
  name: string
  type: string
  status: 'active' | 'inactive' | 'error'
  lastSync: number
  eventsCollected: number
  icon: string
}

export interface OptimizationRecommendation {
  id: string
  category: 'performance' | 'cost' | 'security' | 'reliability'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  estimatedSavings?: string
  implementation: string
  priority: number
}

export interface SystemHealth {
  overall: number
  uptime: number
  activeAlerts: number
  eventsProcessed: number
  averageResponseTime: number
  anomaliesDetected: number
}

export type BackendServiceType = 'python' | 'go'
export type BackendServiceStatus = 'healthy' | 'degraded' | 'down' | 'starting'

export interface BackendService {
  id: string
  name: string
  type: BackendServiceType
  status: BackendServiceStatus
  version: string
  endpoint: string
  port: number
  uptime: number
  requestCount: number
  errorCount: number
  avgResponseTime: number
  cpuUsage: number
  memoryUsage: number
  lastHealthCheck: number
  capabilities: string[]
  activeConnections: number
  throughput: number
}

export interface BackendServiceLog {
  id: string
  serviceId: string
  timestamp: number
  level: 'debug' | 'info' | 'warning' | 'error'
  message: string
  metadata?: Record<string, any>
}

export interface BackendRequest {
  id: string
  serviceId: string
  timestamp: number
  method: string
  endpoint: string
  statusCode: number
  responseTime: number
  size: number
}

export interface MLModelInfo {
  id: string
  name: string
  type: 'classification' | 'regression' | 'clustering' | 'anomaly-detection'
  version: string
  accuracy: number
  lastTrained: number
  predictionsCount: number
  status: 'active' | 'training' | 'idle'
}

export interface DataPipelineStage {
  id: string
  name: string
  type: 'ingestion' | 'transformation' | 'analysis' | 'output'
  status: 'running' | 'idle' | 'error'
  processedRecords: number
  errorRate: number
  avgProcessingTime: number
}
