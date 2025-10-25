import type {
  BackendService,
  BackendServiceLog,
  BackendRequest,
  MLModelInfo,
  DataPipelineStage,
  BackendServiceType
} from './types'

export function generateBackendServices(): BackendService[] {
  return [
    {
      id: 'py-analytics-1',
      name: 'Python ML Analytics Engine',
      type: 'python',
      status: 'healthy',
      version: '3.11.5',
      endpoint: 'http://ml-analytics.internal',
      port: 8001,
      uptime: 847200000,
      requestCount: 145678,
      errorCount: 23,
      avgResponseTime: 125,
      cpuUsage: 45,
      memoryUsage: 62,
      lastHealthCheck: Date.now() - 5000,
      capabilities: [
        'Anomaly Detection',
        'Predictive Analytics',
        'Time Series Forecasting',
        'Pattern Recognition',
        'Data Classification'
      ],
      activeConnections: 12,
      throughput: 250
    },
    {
      id: 'py-processing-1',
      name: 'Python Data Processing Service',
      type: 'python',
      status: 'healthy',
      version: '3.11.5',
      endpoint: 'http://data-processor.internal',
      port: 8002,
      uptime: 720000000,
      requestCount: 567890,
      errorCount: 45,
      avgResponseTime: 85,
      cpuUsage: 38,
      memoryUsage: 55,
      lastHealthCheck: Date.now() - 3000,
      capabilities: [
        'ETL Pipeline',
        'Data Transformation',
        'Stream Processing',
        'Batch Processing',
        'Data Validation'
      ],
      activeConnections: 24,
      throughput: 820
    },
    {
      id: 'go-gateway-1',
      name: 'Go API Gateway',
      type: 'go',
      status: 'healthy',
      version: '1.21.5',
      endpoint: 'http://api-gateway.internal',
      port: 8080,
      uptime: 1209600000,
      requestCount: 2345678,
      errorCount: 156,
      avgResponseTime: 12,
      cpuUsage: 22,
      memoryUsage: 28,
      lastHealthCheck: Date.now() - 2000,
      capabilities: [
        'Request Routing',
        'Load Balancing',
        'Rate Limiting',
        'Authentication',
        'Circuit Breaking'
      ],
      activeConnections: 156,
      throughput: 3500
    },
    {
      id: 'go-collector-1',
      name: 'Go Event Collector',
      type: 'go',
      status: 'healthy',
      version: '1.21.5',
      endpoint: 'http://event-collector.internal',
      port: 9090,
      uptime: 1123200000,
      requestCount: 8901234,
      errorCount: 89,
      avgResponseTime: 8,
      cpuUsage: 18,
      memoryUsage: 32,
      lastHealthCheck: Date.now() - 4000,
      capabilities: [
        'High-throughput Ingestion',
        'Event Buffering',
        'Protocol Translation',
        'Data Compression',
        'Real-time Streaming'
      ],
      activeConnections: 342,
      throughput: 8500
    },
    {
      id: 'go-aggregator-1',
      name: 'Go Metrics Aggregator',
      type: 'go',
      status: 'healthy',
      version: '1.21.5',
      endpoint: 'http://metrics-aggregator.internal',
      port: 9091,
      uptime: 950400000,
      requestCount: 1234567,
      errorCount: 34,
      avgResponseTime: 15,
      cpuUsage: 25,
      memoryUsage: 35,
      lastHealthCheck: Date.now() - 6000,
      capabilities: [
        'Time-series Aggregation',
        'Statistical Analysis',
        'Downsampling',
        'Data Rollup',
        'Query Optimization'
      ],
      activeConnections: 45,
      throughput: 2100
    },
    {
      id: 'py-ml-trainer-1',
      name: 'Python ML Model Trainer',
      type: 'python',
      status: 'degraded',
      version: '3.11.5',
      endpoint: 'http://ml-trainer.internal',
      port: 8003,
      uptime: 432000000,
      requestCount: 23456,
      errorCount: 12,
      avgResponseTime: 2500,
      cpuUsage: 85,
      memoryUsage: 78,
      lastHealthCheck: Date.now() - 8000,
      capabilities: [
        'Model Training',
        'Hyperparameter Tuning',
        'Cross-validation',
        'Model Evaluation',
        'Feature Engineering'
      ],
      activeConnections: 3,
      throughput: 5
    }
  ]
}

export function generateMLModels(): MLModelInfo[] {
  return [
    {
      id: 'model-anomaly-1',
      name: 'Anomaly Detection (Isolation Forest)',
      type: 'anomaly-detection',
      version: '2.3.1',
      accuracy: 94.5,
      lastTrained: Date.now() - 172800000,
      predictionsCount: 45678,
      status: 'active'
    },
    {
      id: 'model-forecast-1',
      name: 'Load Forecasting (LSTM)',
      type: 'regression',
      version: '1.8.4',
      accuracy: 89.2,
      lastTrained: Date.now() - 86400000,
      predictionsCount: 23456,
      status: 'active'
    },
    {
      id: 'model-classify-1',
      name: 'Event Classification (Random Forest)',
      type: 'classification',
      version: '3.1.2',
      accuracy: 96.7,
      lastTrained: Date.now() - 259200000,
      predictionsCount: 78901,
      status: 'active'
    },
    {
      id: 'model-cluster-1',
      name: 'User Behavior Clustering (K-Means)',
      type: 'clustering',
      version: '1.5.0',
      accuracy: 82.3,
      lastTrained: Date.now() - 432000000,
      predictionsCount: 12345,
      status: 'idle'
    },
    {
      id: 'model-anomaly-2',
      name: 'Performance Anomaly (Autoencoder)',
      type: 'anomaly-detection',
      version: '1.2.0',
      accuracy: 0,
      lastTrained: 0,
      predictionsCount: 0,
      status: 'training'
    }
  ]
}

export function generatePipelineStages(): DataPipelineStage[] {
  return [
    {
      id: 'stage-ingest',
      name: 'Data Ingestion',
      type: 'ingestion',
      status: 'running',
      processedRecords: 145678,
      errorRate: 0.02,
      avgProcessingTime: 8
    },
    {
      id: 'stage-clean',
      name: 'Data Cleaning & Validation',
      type: 'transformation',
      status: 'running',
      processedRecords: 145234,
      errorRate: 0.31,
      avgProcessingTime: 15
    },
    {
      id: 'stage-enrich',
      name: 'Feature Enrichment',
      type: 'transformation',
      status: 'running',
      processedRecords: 144789,
      errorRate: 0.05,
      avgProcessingTime: 25
    },
    {
      id: 'stage-analyze',
      name: 'ML Analysis',
      type: 'analysis',
      status: 'running',
      processedRecords: 144678,
      errorRate: 0.08,
      avgProcessingTime: 125
    },
    {
      id: 'stage-output',
      name: 'Results Distribution',
      type: 'output',
      status: 'running',
      processedRecords: 144567,
      errorRate: 0.01,
      avgProcessingTime: 12
    }
  ]
}

export function generateServiceLogs(serviceId: string, count: number = 10): BackendServiceLog[] {
  const logs: BackendServiceLog[] = []
  const service = generateBackendServices().find(s => s.id === serviceId)
  
  if (!service) return logs

  const logMessages = {
    python: [
      'Processing batch of 1000 records',
      'Model inference completed in 125ms',
      'Cache hit rate: 87%',
      'Feature extraction pipeline completed',
      'Anomaly detected in metric stream',
      'Model performance evaluation completed',
      'Database connection pool healthy',
      'Memory usage: 62% - Normal',
      'Training job queued for execution',
      'Prediction accuracy: 94.5%'
    ],
    go: [
      'Request processed: 200 OK',
      'Connection pool size: 45/100',
      'Circuit breaker state: CLOSED',
      'Goroutines active: 234',
      'Request rate: 3500 req/s',
      'Health check passed',
      'Message queue consumer running',
      'Load balancer updated backend pool',
      'TLS handshake completed',
      'Metrics exported to aggregator'
    ]
  }

  const messages = logMessages[service.type]
  const levels: Array<'debug' | 'info' | 'warning' | 'error'> = ['info', 'info', 'info', 'debug', 'warning', 'error']

  for (let i = 0; i < count; i++) {
    const level = levels[Math.floor(Math.random() * levels.length)]
    logs.push({
      id: `log-${Date.now()}-${i}`,
      serviceId,
      timestamp: Date.now() - (count - i) * 5000,
      level,
      message: messages[Math.floor(Math.random() * messages.length)],
      metadata: level === 'error' ? { stack: 'Error stack trace...' } : undefined
    })
  }

  return logs.sort((a, b) => b.timestamp - a.timestamp)
}

export function generateServiceRequests(serviceId: string, count: number = 20): BackendRequest[] {
  const requests: BackendRequest[] = []
  const service = generateBackendServices().find(s => s.id === serviceId)
  
  if (!service) return requests

  const endpoints = {
    python: [
      '/api/v1/predict',
      '/api/v1/analyze',
      '/api/v1/train',
      '/api/v1/evaluate',
      '/api/v1/features'
    ],
    go: [
      '/api/v1/events',
      '/api/v1/metrics',
      '/api/v1/health',
      '/api/v1/config',
      '/api/v1/stats'
    ]
  }

  const methods = ['GET', 'POST', 'PUT', 'DELETE']
  const statusCodes = [200, 200, 200, 200, 201, 204, 400, 404, 500]
  const serviceEndpoints = endpoints[service.type]

  for (let i = 0; i < count; i++) {
    const statusCode = statusCodes[Math.floor(Math.random() * statusCodes.length)]
    const responseTime = service.type === 'python' 
      ? Math.floor(Math.random() * 200) + 50
      : Math.floor(Math.random() * 30) + 5

    requests.push({
      id: `req-${Date.now()}-${i}`,
      serviceId,
      timestamp: Date.now() - (count - i) * 2000,
      method: methods[Math.floor(Math.random() * methods.length)],
      endpoint: serviceEndpoints[Math.floor(Math.random() * serviceEndpoints.length)],
      statusCode,
      responseTime,
      size: Math.floor(Math.random() * 50000) + 1000
    })
  }

  return requests.sort((a, b) => b.timestamp - a.timestamp)
}

export function updateServiceMetrics(service: BackendService): BackendService {
  const variation = (base: number, range: number) => 
    base + (Math.random() - 0.5) * range

  return {
    ...service,
    cpuUsage: Math.max(0, Math.min(100, variation(service.cpuUsage, 10))),
    memoryUsage: Math.max(0, Math.min(100, variation(service.memoryUsage, 8))),
    avgResponseTime: Math.max(1, variation(service.avgResponseTime, service.type === 'python' ? 30 : 5)),
    activeConnections: Math.max(0, Math.floor(variation(service.activeConnections, 10))),
    throughput: Math.max(0, Math.floor(variation(service.throughput, service.type === 'python' ? 50 : 200))),
    lastHealthCheck: Date.now(),
    requestCount: service.requestCount + Math.floor(Math.random() * 100)
  }
}

export function simulateBackendCall(
  serviceId: string, 
  endpoint: string, 
  method: string = 'POST'
): Promise<BackendRequest> {
  return new Promise((resolve) => {
    const service = generateBackendServices().find(s => s.id === serviceId)
    
    if (!service) {
      throw new Error(`Service ${serviceId} not found`)
    }

    const responseTime = service.type === 'python'
      ? Math.floor(Math.random() * 200) + 50
      : Math.floor(Math.random() * 30) + 5

    setTimeout(() => {
      resolve({
        id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        serviceId,
        timestamp: Date.now(),
        method,
        endpoint,
        statusCode: Math.random() > 0.95 ? 500 : 200,
        responseTime,
        size: Math.floor(Math.random() * 50000) + 1000
      })
    }, responseTime)
  })
}

export function getServiceTypeColor(type: BackendServiceType): string {
  return type === 'python' ? 'text-blue-400' : 'text-cyan-400'
}

export function getServiceTypeIcon(type: BackendServiceType): string {
  return type === 'python' ? '🐍' : '🔷'
}

export function formatUptime(ms: number): string {
  const days = Math.floor(ms / 86400000)
  const hours = Math.floor((ms % 86400000) / 3600000)
  return `${days}d ${hours}h`
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)} MB`
  return `${(bytes / 1073741824).toFixed(1)} GB`
}
