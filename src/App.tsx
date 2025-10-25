import { useEffect, useState, useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Toaster, toast } from 'sonner'
import { 
  ChartLine, 
  Bell, 
  CloudArrowUp, 
  Lightbulb,
  Play,
  Pause,
  Database,
  Brain
} from '@phosphor-icons/react'
import { MetricCard } from '@/components/MetricCard'
import { EventStream } from '@/components/EventStream'
import { AlertCard } from '@/components/AlertCard'
import { RecommendationCard } from '@/components/RecommendationCard'
import { IntegrationCard } from '@/components/IntegrationCard'
import { SystemHealthBar } from '@/components/SystemHealthBar'
import { BackendServiceCard } from '@/components/BackendServiceCard'
import { BackendServiceDialog } from '@/components/BackendServiceDialog'
import { MLModelCard } from '@/components/MLModelCard'
import { DataPipelineVisualizer } from '@/components/DataPipelineVisualizer'
import {
  generateEvent,
  generateMetrics,
  generateAlerts,
  generateIntegrations,
  generateRecommendations,
  generateSystemHealth
} from '@/lib/data-generator'
import {
  generateBackendServices,
  generateMLModels,
  generatePipelineStages,
  updateServiceMetrics
} from '@/lib/backend-simulator'
import type { SystemEvent, MetricData, Alert as AlertType, BackendService } from '@/lib/types'

function App() {
  const [events, setEvents] = useLocalStorage<SystemEvent[]>('system-events', [])
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [alerts, setAlerts] = useLocalStorage<AlertType[]>('system-alerts', [])
  const [integrations] = useState(generateIntegrations())
  const [recommendations] = useState(generateRecommendations())
  const [systemHealth, setSystemHealth] = useState(generateSystemHealth())
  const [selectedEvent, setSelectedEvent] = useState<SystemEvent | null>(null)
  const [isStreaming, setIsStreaming] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  
  const [backendServices, setBackendServices] = useState(generateBackendServices())
  const [selectedService, setSelectedService] = useState<BackendService | null>(null)
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false)
  const [mlModels] = useState(generateMLModels())
  const [pipelineStages] = useState(generatePipelineStages())

  useEffect(() => {
    setMetrics(generateMetrics())
    
    if (!events || events.length === 0) {
      const initialEvents = Array.from({ length: 10 }, generateEvent)
        .sort((a, b) => b.timestamp - a.timestamp)
      setEvents(initialEvents)
    }

    if (!alerts || alerts.length === 0) {
      setAlerts(generateAlerts())
    }
  }, [])

  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setMetrics(generateMetrics())
    }, 3000)

    return () => clearInterval(metricsInterval)
  }, [])

  useEffect(() => {
    const servicesInterval = setInterval(() => {
      setBackendServices(currentServices => 
        currentServices.map(service => updateServiceMetrics(service))
      )
    }, 5000)

    return () => clearInterval(servicesInterval)
  }, [])

  useEffect(() => {
    if (!isStreaming) return

    const eventInterval = setInterval(() => {
      const newEvent = generateEvent()
      
      setEvents((currentEvents) => {
        const updated = [newEvent, ...(currentEvents || [])].slice(0, 100)
        return updated
      })

      if (newEvent.isAnomaly || newEvent.severity === 'critical') {
        toast.error('Anomaly Detected', {
          description: `${newEvent.source}: ${newEvent.message}`,
          duration: 5000
        })
      }

      setSystemHealth((current) => ({
        ...current,
        eventsProcessed: current.eventsProcessed + 1,
        anomaliesDetected: newEvent.isAnomaly ? current.anomaliesDetected + 1 : current.anomaliesDetected
      }))
    }, 2000)

    return () => clearInterval(eventInterval)
  }, [isStreaming, setEvents])

  const handleAcknowledgeAlert = useCallback((id: string) => {
    setAlerts((currentAlerts) => {
      if (!currentAlerts) return []
      return currentAlerts.map(alert =>
        alert.id === id ? { ...alert, status: 'acknowledged' as const } : alert
      )
    })
    toast.success('Alert Acknowledged')
  }, [setAlerts])

  const handleResolveAlert = useCallback((id: string) => {
    setAlerts((currentAlerts) => {
      if (!currentAlerts) return []
      return currentAlerts.map(alert =>
        alert.id === id ? { ...alert, status: 'resolved' as const } : alert
      )
    })
    toast.success('Alert Resolved')
  }, [setAlerts])

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming)
    toast.info(isStreaming ? 'Event streaming paused' : 'Event streaming resumed')
  }

  const handleServiceClick = (service: BackendService) => {
    setSelectedService(service)
    setServiceDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
              <div className="p-2 bg-primary rounded-lg">
                <Brain size={24} className="text-primary-foreground" weight="bold" />
              </div>
                <h1 className="text-xl font-bold">Digital Exhaust Analytics</h1>
                <p className="text-xs text-muted-foreground">Real-time System Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-success animate-pulse-glow' : 'bg-muted-foreground'}`} />
                <span className="text-sm text-muted-foreground">
                  {isStreaming ? 'Live' : 'Paused'}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleStreaming}
              >
                {isStreaming ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
                {isStreaming ? 'Pause' : 'Resume'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <SystemHealthBar health={systemHealth} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto">
            <TabsTrigger value="overview" className="gap-2">
              <ChartLine size={18} />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
            <TabsTrigger value="events" className="gap-2">
              <Brain size={18} />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
              <Bell size={18} />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="backend" className="gap-2">
              <Database size={18} />
              <span className="hidden sm:inline">Backend</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <Lightbulb size={18} />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <CloudArrowUp size={18} />
              <span className="hidden sm:inline">Integrations</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">System Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {metrics.map(metric => (
                  <MetricCard key={metric.id} metric={metric} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Recent Events</h2>
                <div className="h-[500px]">
                  <EventStream 
                    events={events?.slice(0, 20) || []} 
                    onEventClick={setSelectedEvent}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Active Alerts</h2>
                <div className="space-y-4">
                  {(alerts || []).filter(a => a.status !== 'resolved').slice(0, 3).map(alert => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                      onAcknowledge={handleAcknowledgeAlert}
                      onResolve={handleResolveAlert}
                    />
                  ))}
                  {(alerts || []).filter(a => a.status !== 'resolved').length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No active alerts</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <h2 className="text-2xl font-bold mb-4">Event Stream</h2>
            <div className="h-[700px]">
              <EventStream 
                events={events || []} 
                onEventClick={setSelectedEvent}
              />
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <h2 className="text-2xl font-bold mb-4">Alert Management</h2>
            <div className="space-y-4">
              {(alerts || []).map(alert => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onAcknowledge={handleAcknowledgeAlert}
                  onResolve={handleResolveAlert}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backend" className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Backend Services</h2>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Python Services: </span>
                    <span className="font-semibold">
                      {backendServices.filter(s => s.type === 'python').length}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Go Services: </span>
                    <span className="font-semibold">
                      {backendServices.filter(s => s.type === 'go').length}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {backendServices.map(service => (
                  <BackendServiceCard 
                    key={service.id} 
                    service={service}
                    onClick={handleServiceClick}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Machine Learning Models</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mlModels.map(model => (
                  <MLModelCard key={model.id} model={model} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Data Processing Pipeline</h2>
              <DataPipelineVisualizer stages={pipelineStages} />
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <h2 className="text-2xl font-bold mb-4">AI-Powered Recommendations</h2>
            <div className="space-y-4">
              {recommendations.map(rec => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="integrations">
            <h2 className="text-2xl font-bold mb-4">Data Source Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map(integration => (
                <IntegrationCard key={integration.id} integration={integration} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
            <DialogDescription>
              Detailed information about this system event
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Message</h3>
                <p>{selectedEvent.message}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Source</h3>
                  <p className="font-mono text-sm">{selectedEvent.source}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Type</h3>
                  <p className="uppercase text-sm">{selectedEvent.type}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Severity</h3>
                  <p className="capitalize text-sm">{selectedEvent.severity}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Timestamp</h3>
                  <p className="text-sm">{new Date(selectedEvent.timestamp).toLocaleString()}</p>
                </div>
              </div>
              {selectedEvent.metadata && Object.keys(selectedEvent.metadata).length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Metadata</h3>
                  <pre className="p-4 bg-muted rounded-lg text-xs overflow-auto">
                    {JSON.stringify(selectedEvent.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <BackendServiceDialog 
        service={selectedService}
        open={serviceDialogOpen}
        onOpenChange={setServiceDialogOpen}
      />
    </div>
  )
}

export default App
