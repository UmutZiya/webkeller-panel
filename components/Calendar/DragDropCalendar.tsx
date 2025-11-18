'use client';

import React, { useState, useMemo } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { format, addDays, startOfWeek, isSameDay, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useApp, Appointment } from '@/contexts/AppContext';
import { DraggableAppointment } from './DraggableAppointment';
import { DroppableTimeSlot } from './DroppableTimeSlot';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';

export function DragDropCalendar() {
  const { appointments, updateAppointment, businesses, services, staff, customers } = useApp();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [activeId, setActiveId] = useState<string | null>(null);
  
  // Debug: appointments değişikliklerini takip et
  React.useEffect(() => {
    console.log('DragDropCalendar - Appointments updated:', appointments.length);
    
    // Eğer randevu varsa, ilk randevunun haftasına git
    if (appointments.length > 0) {
      const firstApt = appointments[0];
      const aptDate = new Date(firstApt.date);
      console.log('Moving to appointment week:', format(aptDate, 'dd/MM/yyyy'));
      setCurrentWeek(aptDate);
    }
  }, [appointments]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Haftalık günler
  const weekDays = useMemo(() => {
    const start = startOfWeek(currentWeek, { locale: tr });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [currentWeek]);

  // Çalışma saatleri (15 dakikalık dilimler)
  const workingHours = useMemo(() => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeSlot);
      }
    }
    return slots;
  }, []);

  // Randevuları günlere göre grupla
  const appointmentsByDay = useMemo(() => {
    const grouped: { [key: string]: Appointment[] } = {};
    
    weekDays.forEach(day => {
      const dayKey = format(day, 'yyyy-MM-dd');
      grouped[dayKey] = appointments.filter(apt => {
        try {
          const aptDate = typeof apt.date === 'string' ? parseISO(apt.date) : new Date(apt.date);
          return isSameDay(aptDate, day);
        } catch {
          return false;
        }
      });
    });
    
    return grouped;
  }, [appointments, weekDays]);

  const getAppointmentInfo = (appointment: Appointment) => {
    const customer = customers.find(c => c.id === appointment.customerId);
    const service = services.find(s => s.id === appointment.serviceId);
    const staffMember = staff.find(s => s.id === appointment.staffId);
    
    try {
      const aptDate = typeof appointment.date === 'string' ? parseISO(appointment.date) : new Date(appointment.date);
      return {
        customerName: customer?.name || 'Bilinmeyen Müşteri',
        serviceName: service?.name || 'Bilinmeyen Hizmet',
        staffName: staffMember?.name || 'Bilinmeyen Personel',
        time: format(aptDate, 'HH:mm'),
      };
    } catch {
      return {
        customerName: customer?.name || 'Bilinmeyen Müşteri',
        serviceName: service?.name || 'Bilinmeyen Hizmet',
        staffName: staffMember?.name || 'Bilinmeyen Personel',
        time: '00:00',
      };
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    const appointmentId = active.id as string;
    const dropData = over.data.current;
    
    if (dropData?.type === 'timeslot') {
      const { date, time } = dropData;
      const appointment = appointments.find(apt => apt.id === appointmentId);
      
      if (appointment) {
        // Yeni tarih ve saat oluştur
        const [hours, minutes] = time.split(':');
        const newDate = new Date(date);
        newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        // Çakışma kontrolü
        const hasConflict = appointments.some(apt => {
          try {
            const aptDate = typeof apt.date === 'string' ? parseISO(apt.date) : new Date(apt.date);
            return apt.id !== appointmentId &&
              apt.staffId === appointment.staffId &&
              isSameDay(aptDate, newDate) &&
              format(aptDate, 'HH:mm') === time;
          } catch {
            return false;
          }
        });

        if (hasConflict) {
          alert('Bu saatte aynı personel için başka bir randevu var!');
          setActiveId(null);
          return;
        }

        // Geçmiş tarih kontrolü
        if (newDate < new Date()) {
          alert('Geçmiş tarihe randevu taşıyamazsınız!');
          setActiveId(null);
          return;
        }

        // Randevuyu güncelle
        updateAppointment(appointmentId, { date: newDate });
      }
    }
    
    setActiveId(null);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prev => addDays(prev, direction === 'next' ? 7 : -7));
  };

  const activeAppointment = activeId ? appointments.find(apt => apt.id === activeId) : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Randevu Takvimi
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Randevuları sürükleyip farklı saatlere taşıyabilirsiniz
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            
            <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {format(weekDays[0], 'dd MMM', { locale: tr })} - {format(weekDays[6], 'dd MMM yyyy', { locale: tr })}
              </span>
            </div>
            
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            
            <button
              onClick={() => setCurrentWeek(new Date())}
              className="px-3 py-2 text-xs bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              Bugüne Git
            </button>
            
            {appointments.length > 0 && (
              <button
                onClick={() => {
                  const latestApt = appointments[0];
                  const aptDate = new Date(latestApt.date);
                  setCurrentWeek(aptDate);
                }}
                className="px-3 py-2 text-xs bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                Son Randevuya Git
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="p-6">
          <div className="grid grid-cols-8 gap-2">
            {/* Time Column Header */}
            <div className="text-center py-3">
              <Clock className="w-4 h-4 text-gray-400 mx-auto" />
            </div>
            
            {/* Day Headers */}
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="text-center py-3">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {format(day, 'EEE', { locale: tr })}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {format(day, 'dd MMM', { locale: tr })}
                </div>
              </div>
            ))}

            {/* Time Slots */}
            {workingHours.map((time) => (
              <React.Fragment key={time}>
                {/* Time Label */}
                <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {time}
                </div>
                
                {/* Day Slots */}
                {weekDays.map((day) => {
                  const dayKey = format(day, 'yyyy-MM-dd');
                  const dayAppointments = appointmentsByDay[dayKey] || [];
                  const timeAppointments = dayAppointments.filter(apt => {
                    try {
                      const aptDate = typeof apt.date === 'string' ? new Date(apt.date) : apt.date;
                      const aptTime = format(aptDate, 'HH:mm');
                      return aptTime === time;
                    } catch {
                      return false;
                    }
                  });

                  return (
                    <DroppableTimeSlot
                      key={`${dayKey}-${time}`}
                      date={dayKey}
                      time={time}
                      appointments={timeAppointments}
                      getAppointmentInfo={getAppointmentInfo}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeAppointment && (
            <div className="bg-blue-500 text-white p-3 rounded-lg shadow-lg opacity-90 transform rotate-3">
              <div className="font-medium text-sm">
                {getAppointmentInfo(activeAppointment).customerName}
              </div>
              <div className="text-xs opacity-90">
                {getAppointmentInfo(activeAppointment).serviceName}
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}