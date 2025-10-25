import { useState, useEffect } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowClockwise, 
  Code, 
  ChartLine, 
  Terminal,
  CheckCircle,
  Warning,
  XCircle,
  Info
} from '@phosphor-icons/react'
import type { BackendService, BackendServiceLog, BackendRequest } from '@/lib/types'
import { 
  generateServiceLogs, 
  generateServiceRequests, 
  getServiceTypeIcon,
  formatUptime,
  formatBytes
} from '@/lib/backend-simulator'

interface BackendServiceDialogProps {
  service: BackendService | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BackendServiceDialog({ service, open, onOpenChange }: BackendServiceDialogProps) {
  const [logs, setLogs] = useState<BackendServiceLog[]>([])
  const [requests, setRequests] = useState<BackendRequest[]>([])

  useEffect(() => {
    if (service && open) {
      setLogs(generateServiceLogs(service.id, 50))
      setRequests(generateServiceRequests(service.id, 30))
    }
  }, [service, open])

  if (!service) return null

  const getLogLevelColor = (level: BackendServiceLog['level']) => {
    switch (level) {
      case 'debug': return 'text-muted-foreground'
      case 'info': return 'text-info'
      case 'warning': return 'text-warning'
      case 'error': return 'text-destructive'
    }
  }

  const getLogLevelIcon = (level: BackendServiceLog['level']) => {
    switch (level) {
      case 'debug': return <Code size={14} />
      case 'info': return <Info size={14} weight="fill" />
      case 'warning': return <Warning size={14} weight="fill" />
      case 'error': return <XCircle size={14} weight="fill" />
    }
  }

  const getStatusCodeColor = (code: number) => {
    if (code >= 200 && code < 300) return 'text-success'
    if (code >= 400 && code < 500) return 'text-warning'
    if (code >= 500) return 'text-destructive'
    return 'text-muted-foreground'
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{getServiceTypeIcon(service.type)}</span>
            {service.name}
          </DialogTitle>
          <DialogDescription>
            {service.type.toUpperCase()} v{service.version} • {service.endpoint}:{service.port}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="flex-1 overflow-auto space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Service Status</span>
                      <Badge variant={service.status === 'healthy' ? 'default' : 'destructive'}>
                        {service.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Uptime</span>
                      <span className="text-sm font-mono">{formatUptime(service.uptime)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Health Check</span>
                      <span className="text-sm font-mono">{formatTimestamp(service.lastHealthCheck)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Resource Usage</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">CPU Usage</span>
                        <span className="font-mono font-semibold">{service.cpuUsage.toFixed(1)}%</span>
                      </div>
                      <Progress value={service.cpuUsage} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Memory Usage</span>
                        <span className="font-mono font-semibold">{service.memoryUsage.toFixed(1)}%</span>
                      </div>
                      <Progress value={service.memoryUsage} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Performance Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Requests</span>
                      <span className="text-sm font-mono font-semibold">
                        {service.requestCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Error Count</span>
                      <span className="text-sm font-mono font-semibold text-destructive">
                        {service.errorCount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg Response Time</span>
                      <span className="text-sm font-mono font-semibold">
                        {service.avgResponseTime}ms
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Throughput</span>
                      <span className="text-sm font-mono font-semibold">
                        {service.throughput} req/s
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Connections</span>
                      <span className="text-sm font-mono font-semibold">
                        {service.activeConnections}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <ArrowClockwise size={14} className="mr-2" />
                  Restart Service
                </Button>
                <Button size="sm" variant="outline">
                  <Terminal size={14} className="mr-2" />
                  Open Console
                </Button>
                <Button size="sm" variant="outline">
                  <ChartLine size={14} className="mr-2" />
                  View Metrics
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[400px] rounded-lg border border-border bg-muted/20 p-4">
              <div className="space-y-2 font-mono text-xs">
                {logs.map((log) => (
                  <div 
                    key={log.id} 
                    className={`flex items-start gap-2 p-2 rounded hover:bg-muted/50 ${getLogLevelColor(log.level)}`}
                  >
                    <span className="text-muted-foreground shrink-0">
                      {formatTimestamp(log.timestamp)}
                    </span>
                    <span className="shrink-0">{getLogLevelIcon(log.level)}</span>
                    <span className="uppercase shrink-0 w-16">{log.level}</span>
                    <span className="flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="requests" className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {requests.map((req) => (
                  <div 
                    key={req.id} 
                    className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <Badge variant={req.statusCode < 400 ? 'default' : 'destructive'} className="w-14 justify-center font-mono">
                      {req.statusCode}
                    </Badge>
                    <Badge variant="outline" className="w-16 justify-center font-mono">
                      {req.method}
                    </Badge>
                    <code className="flex-1 text-sm">{req.endpoint}</code>
                    <span className={`font-mono text-sm ${getStatusCodeColor(req.statusCode)}`}>
                      {req.responseTime}ms
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {formatBytes(req.size)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(req.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="capabilities" className="flex-1 overflow-auto space-y-4 mt-4">
            <div>
              <h3 className="font-semibold mb-3">Service Capabilities</h3>
              <div className="grid gap-2">
                {service.capabilities.map((capability, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/20"
                  >
                    <CheckCircle size={16} weight="fill" className="text-success shrink-0" />
                    <span className="text-sm font-medium">{capability}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Configuration</h3>
              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <pre className="text-xs font-mono overflow-auto">
{`{
  "service": "${service.name}",
  "type": "${service.type}",
  "version": "${service.version}",
  "endpoint": "${service.endpoint}",
  "port": ${service.port},
  "max_connections": ${service.activeConnections * 10},
  "timeout": 30000,
  "retry_attempts": 3,
  "health_check_interval": 10000
}`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
