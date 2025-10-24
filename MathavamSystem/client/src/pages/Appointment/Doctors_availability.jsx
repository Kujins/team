import React, { useState, useReducer, useEffect, useCallback } from "react";
import axios from "axios"; 
import { Edit, Trash2, PlusCircle, Check, X, Loader2, Save } from "lucide-react";

const AVAILABILITY_API = `http://localhost:5000/api/availability`;

const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

// --- Reducer and Helpers (Unchanged) ---
function availabilityReducer(state, action) {
  switch(action.type) {
    case "ADD_TIME_SLOT":
      // Add check for conflict before adding
      const time12hToAdd = action.time.trim();
      if(state.some(slot => slot.day === action.day && slot.time === time12hToAdd)) {
          alert("Time slot already exists on this day.");
          return state;
      }
      return [...state, { day: action.day, time: time12hToAdd }];
    case "REMOVE_TIME_SLOT":
      return state.filter(slot => !(slot.day === action.day && slot.time === action.time));
    case "UPDATE_TIME_SLOT":
      const newTime12h = action.newTime.trim();
      // Check for conflict (time change to an existing slot, but exclude itself)
      if(state.some(slot => slot.day === action.day && slot.time === newTime12h && action.oldTime !== newTime12h)) {
          alert("Time slot already exists on this day.");
          return state;
      }
      return state.map(slot => slot.day === action.day && slot.time === action.oldTime ? { ...slot, time: newTime12h } : slot);
    case "SET_INITIAL_STATE":
      return action.payload || [];
    default:
      return state;
  }
}

// Helper: 24h (e.g., "14:30") to 12h AM/PM (e.g., "2:30 PM")
const formatTime = (time24) => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${minutes.padStart(2, '0')} ${ampm}`;
};

// Helper: 12h (e.g., "2:30 PM") to 24h (e.g., "14:30") for <input type="time"> value
const formatTime24 = (time12) => {
  if (!time12) return "";
  const [timePart, ampmPart] = time12.split(" ");
  if (!timePart || !ampmPart) return "";
  const [hour, minute] = timePart.split(":");
  let h = parseInt(hour);

  if (ampmPart === "PM" && h !== 12) h += 12;
  if (ampmPart === "AM" && h === 12) h = 0;

  return `${h.toString().padStart(2,'0')}:${minute.padStart(2, '0')}`;
};

// --- Component Start ---
const Doctors_availability = () => {
  // State for the list of doctors (for the selection buttons)
  const [doctorList, setDoctorList] = useState([]); 
  // State for the currently selected doctor's ID
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  // State to hold the selected doctor's NAME (fetched from API)
  const [selectedDoctorName, setSelectedDoctorName] = useState(""); 
  
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Reducer for managing the weekly availability slots
  const [weeklyAvailability, dispatch] = useReducer(availabilityReducer, []);

  // State for adding/editing slots
  const [editingSlot, setEditingSlot] = useState(null);
  const [newTimeValue, setNewTimeValue] = useState(""); // 24h format for edit input
  const [newTimeInput, setNewTimeInput] = useState(""); // 24h format for add input

  // 1. Initial Doctor List Fetch (on mount)
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(DOCTORS_API);
        setDoctorList(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        alert("Failed to load doctor list. Check the Doctors API endpoint.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // 2. Fetch Availability when a Doctor is Selected
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedDoctorId) {
        setSelectedDoctorName("");
        dispatch({ type: "SET_INITIAL_STATE", payload: [] });
        return;
      }
      
      setIsLoading(true);
      try {
        // Fetch availability from the new normalized endpoint
        const response = await axios.get(`${AVAILABILITY_API}/${selectedDoctorId}`);
        
        // The controller now returns both name and weekly schedule
        setSelectedDoctorName(response.data.doctorName || "Unknown Doctor");
        dispatch({ type: "SET_INITIAL_STATE", payload: response.data.weekly });
        
        setSelectedDay("Monday");
      } catch (error) {
        console.error("Error fetching doctor availability:", error);
        alert("Failed to load doctor availability.");
      } finally {
        setIsLoading(false);
        setEditingSlot(null);
        setNewTimeInput("");
        setNewTimeValue("");
      }
    };
    fetchAvailability();
  }, [selectedDoctorId]);

  // Utility to get and sort slots for the currently viewed day
  const getSlotsForDay = useCallback((day) => weeklyAvailability
    .filter(slot => slot.day === day)
    .map(slot => slot.time)
    .sort((a,b) => {
        // Simple time comparison for correct sorting of 12h AM/PM strings
        const dateA = new Date(`2000/01/01 ${a}`);
        const dateB = new Date(`2000/01/01 ${b}`);
        return dateA - dateB;
    }), [weeklyAvailability]);


  // Handler to persist changes to the backend
  const handleSave = async () => {
    if(!selectedDoctorId){ 
        alert("Please select a doctor first!"); 
        return; 
    }
    
    setIsSaving(true);
    try {
        // Send the complete current weeklyAvailability array to the PUT endpoint
        const payload = { weekly: weeklyAvailability };
        const response = await axios.put(`${AVAILABILITY_API}/${selectedDoctorId}`, payload);
        
        // Re-dispatch the returned data to ensure state is clean/synced
        dispatch({ type: "SET_INITIAL_STATE", payload: response.data.availability });
        
        alert("Availability saved successfully!");
    } catch (error) {
        console.error("Error saving availability:", error.response?.data?.message || error.message);
        alert(`Failed to save availability. Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setIsSaving(false);
    }
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    if(!newTimeInput) return;
    
    // Convert 24h input to 12h format for storage
    const time12h = formatTime(newTimeInput);
    
    dispatch({ type: "ADD_TIME_SLOT", day: selectedDay, time: time12h });
    setNewTimeInput("");
  };

  const handleUpdateSlot = () => {
    if(!newTimeValue || !editingSlot) return;
    
    // Convert 24h input to 12h format for storage
    const updatedFormattedTime = formatTime(newTimeValue);

    dispatch({ 
        type: "UPDATE_TIME_SLOT", 
        day: selectedDay, 
        oldTime: editingSlot.time, 
        newTime: updatedFormattedTime 
    });
    setEditingSlot(null);
    setNewTimeValue("");
  };

  // When clicking the Edit icon
  const handleEditClick = (time12h) => {
    setEditingSlot({ day: selectedDay, time: time12h });
    
    // Convert 12h time back to 24h time for the <input type="time"> value
    const time24h = formatTime24(time12h);
    setNewTimeValue(time24h);
  };


  return (
    <div className="bg-blue-50 min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200">

        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Doctor Availability Management 🗓️</h1>

        {/* Doctor Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {isLoading && doctorList.length === 0 ? (
            <div className="flex items-center text-blue-500">
                <Loader2 size={24} className="animate-spin mr-2"/> Fetching Doctors...
            </div>
          ) : (
            doctorList.map(doctor => (
              <button 
                key={doctor.doctorId} 
                type="button" 
                onClick={() => setSelectedDoctorId(doctor.doctorId)}
                className={`flex-1 min-w-[200px] p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                  selectedDoctorId === doctor.doctorId 
                    ? "border-blue-600 bg-blue-50 shadow-md scale-105" 
                    : "border-slate-300 hover:border-blue-400"
                }`}
              >
                <h3 className="text-lg font-bold text-slate-800">{doctor.name}</h3>
                <p className="text-sm text-slate-500">{doctor.specialization}</p>
              </button>
            ))
          )}
        </div>

        {!selectedDoctorId && <p className="text-red-600 text-center font-medium mb-6">Please select a doctor to view or add availability.</p>}

        {selectedDoctorId && (
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h2 className="text-2xl font-extrabold text-blue-700 mb-4 text-center border-b pb-2">
                Editing Schedule for: {selectedDoctorName}
            </h2>

            {isLoading ? (
                 <div className="flex items-center justify-center p-8">
                     <Loader2 size={32} className="animate-spin text-blue-500 mr-2"/>
                     <span className="text-blue-500 text-lg font-medium">Loading Availability...</span>
                 </div>
            ) : (
                <>
                    {/* Day Tabs */}
                    <div className="flex flex-wrap gap-2 mb-4 border-b border-slate-300">
                    {daysOfWeek.map(day => (
                        <button key={day} onClick={()=>setSelectedDay(day)}
                        className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
                            selectedDay===day ? "bg-white text-blue-600 border-b-2 border-blue-600 -mb-[1px]" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        }`}
                        >
                        {day}
                        </button>
                    ))}
                    </div>

                    {/* Availability Editor */}
                    <div className="p-4 bg-white rounded-lg shadow-inner border border-slate-200 min-h-[200px]">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Availability for {selectedDay}</h3>

                        {/* Add Slot Form */}
                        <form onSubmit={handleAddSlot} className="flex flex-wrap gap-2 items-center mb-6">
                            <input type="time" value={newTimeInput} onChange={e=>setNewTimeInput(e.target.value)}
                            className="p-2 border rounded-md shadow-sm" required
                            />
                            <button type="submit" className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                <PlusCircle size={16}/> Add Slot
                            </button>
                        </form>

                        {/* Time Slots List */}
                        <div className="flex flex-wrap gap-2">
                            {getSlotsForDay(selectedDay).length>0 ? getSlotsForDay(selectedDay).map(time => (
                            <div key={time} className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-sm">
                                {editingSlot?.day===selectedDay && editingSlot?.time===time ? (
                                // Edit Mode
                                <>
                                    <input type="time" value={newTimeValue} onChange={e=>setNewTimeValue(e.target.value)} className="p-1 border rounded"/>
                                    <button className="text-green-600 hover:text-green-800" onClick={handleUpdateSlot}><Check size={16}/></button>
                                    <button className="text-red-600 hover:text-red-800" onClick={()=>{ setEditingSlot(null); setNewTimeValue(""); }}><X size={16}/></button>
                                </>
                                ) : (
                                // View Mode
                                <>
                                    <span className="text-slate-700 font-medium">{time}</span>
                                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEditClick(time)}><Edit size={16}/></button>
                                    <button className="text-red-500 hover:text-red-700" onClick={()=>dispatch({type:"REMOVE_TIME_SLOT",day:selectedDay,time})}><Trash2 size={16}/></button>
                                </>
                                )}
                            </div>
                            )) : <span className="text-slate-400 italic">No time slots added for this day.</span>}
                        </div>
                    </div>

                    {/* Weekly Overview */}
                    <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Weekly Overview</h3>
                    <div className="space-y-4">
                        {daysOfWeek.map(day => {
                        const slots = getSlotsForDay(day);
                        return (
                            <div key={day} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                            <span className="font-semibold text-slate-700 min-w-[100px]">{day}:</span>
                            <div className="flex flex-wrap gap-2">
                                {slots.length>0 ? slots.map(time=>(
                                <span key={time} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">{time}</span>
                                )) : <span className="text-slate-400 italic">No slots assigned</span>}
                            </div>
                            </div>
                        )
                        })}
                    </div>
                    </div>
                </>
            )}

            {/* Save Button */}
            <div className="mt-8 text-center">
              <button onClick={handleSave} disabled={isSaving || isLoading || !selectedDoctorId}
                className={`px-8 py-3 bg-blue-600 text-white font-medium rounded-full shadow-lg transition-colors flex items-center justify-center mx-auto ${isSaving || isLoading || !selectedDoctorId ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'}`}>
                {isSaving ? (
                    <>
                        <Loader2 size={20} className="animate-spin mr-2"/> 
                        Saving...
                    </>
                ) : (
                    <>
                        <Save size={20} className="mr-2"/>
                        Save All Changes
                    </>
                )}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Doctors_availability;