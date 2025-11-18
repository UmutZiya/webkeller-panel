'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, User, Briefcase } from 'lucide-react';

interface DraggableAppointmentProps {
  id: string;
  customerName: string;
  serviceName: string;
  staffName: string;
  time: string;
  status: string;
}

export function DraggableAppointment({
  id,
  customerName,
  serviceName,
  staffName,
  time,
  status
}: DraggableAppointmentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500 border-blue-600';
      case 'completed':
        return 'bg-green-500 border-green-600';
      case 'cancelled':
        return 'bg-red-500 border-red-600';
      default:
        return 'bg-yellow-500 border-yellow-600';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        ${getStatusColor(status)} text-white p-3 rounded-lg shadow-sm cursor-grab active:cursor-grabbing
        hover:shadow-md transition-all duration-200 border-l-4
        ${isDragging ? 'opacity-50 rotate-3 scale-105 shadow-lg z-50' : 'hover:scale-102'}
      `}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 opacity-80" />
          <span className="text-xs font-medium">{time}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <User className="w-3 h-3 opacity-80" />
          <span className="text-sm font-semibold truncate">{customerName}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Briefcase className="w-3 h-3 opacity-80" />
          <span className="text-xs opacity-90 truncate">{serviceName}</span>
        </div>
        
        <div className="text-xs opacity-75 truncate">
          👤 {staffName}
        </div>
      </div>
      
      {isDragging && (
        <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse" />
      )}
    </div>
  );
}