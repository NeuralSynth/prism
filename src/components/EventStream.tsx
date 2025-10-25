import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MagnifyingGlass, Warning, CheckCircle, Info, XCircle } from '@phosphor-icons/react'
import type { SystemEvent, EventSeverity, EventType } from '@/lib/types'
import { formatTimestamp } from '@/lib/data-generator'
import { useState } from 'react'

interface EventStreamProps {
  events: SystemEvent[]
  onEventClick?: (event: SystemEvent) => void
}

export function EventStream({ events, onEventClick }: EventStreamProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState<EventSeverity | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<EventType | 'all'>('all')

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.source.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === 'all' || event.severity === severityFilter
    const matchesType = typeFilter === 'all' || event.type === typeFilter
    return matchesSearch && matchesSeverity && matchesType
  })

  const severityIcons = {
    info: <Info size={20} className="text-info" weight="fill" />,
    success: <CheckCircle size={20} className="text-success" weight="fill" />,
    warning: <Warning size={20} className="text-warning" weight="fill" />,
    critical: <XCircle size={20} className="text-destructive" weight="fill" />
  }

  const severityColors = {
    info: 'border-info/30 bg-info/5',
    success: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5',
    critical: 'border-destructive/30 bg-destructive/5'
  }

  return (
    <Card className="flex flex-col h-full">
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={severityFilter} onValueChange={(value) => setSeverityFilter(value as any)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as any)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="api">API</SelectItem>
              <SelectItem value="database">Database</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No events match your filters</p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => onEventClick?.(event)}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.01] animate-slide-up ${severityColors[event.severity]}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {severityIcons[event.severity]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{event.message}</span>
                      {event.isAnomaly && (
                        <Badge variant="destructive" className="text-xs">AI Detected</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-mono">{event.source}</span>
                      <span>•</span>
                      <span className="uppercase">{event.type}</span>
                      <span>•</span>
                      <span>{formatTimestamp(event.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}
