'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableAppointment } from './DraggableAppointment';
import { Appointment } from '@/contexts/AppContext';
import { Plus } from 'lucide-react';

interface DroppableTimeSlotProps {
  date: string;
  time: string;
  appointments: Appointment[];
  getAppointmentInfo: (appointment: Appointment) => {
    customerName: string;
    serviceName: string;
    staffName: string;
    time: string;
  };
}

export function DroppableTimeSlot({
  date,
  time,
  appointments,
  getAppointmentInfo
}: DroppableTimeSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `${date}-${time}`,
    data: {
      type: 'timeslot',
      date,
      time,
    },
  });

  const appointmentIds = appointments.map(apt => apt.id);

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-[80px] p-2 border border-gray-200 dark:border-gray-700 rounded-lg
        transition-all duration-200 relative
        ${isOver 
          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600 border-2 border-dashed' 
          : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
        }
      `}
    >
      <SortableContext items={appointmentIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {appointments.map((appointment) => {
            const info = getAppointmentInfo(appointment);
            return (
              <DraggableAppointment
                key={appointment.id}
                id={appointment.id}
                customerName={info.customerName}
                serviceName={info.serviceName}
                staffName={info.staffName}
                time={info.time}
                status={appointment.status}
              />
            );
          })}
        </div>
      </SortableContext>

      {/* Empty slot indicator */}
      {appointments.length === 0 && !isOver && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs">
            <Plus className="w-3 h-3" />
            <span>Boş slot</span>
          </div>
        </div>
      )}

      {/* Drop indicator */}
      {isOver && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
            Buraya bırak
          </div>
        </div>
      )}
    </div>
  );
}