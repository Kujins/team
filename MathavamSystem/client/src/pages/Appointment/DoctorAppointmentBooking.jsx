import React, { useState, useEffect } from 'react';

// Hardcoded data to simulate doctor availability from an admin panel.
const doctors = [
  {
    id: 'dr-smith',
    name: 'Dr. Umasankar Ravimohan',
    specialty: 'General Practitioner',
    imageUrl: 'https://placehold.co/100x100/A3E635/FFFFFF',
    availability: {
      dates: ['2025-08-25', '2025-08-27', '2025-08-28', '2025-08-29', '2025-08-30', '2025-08-31', '2025-09-01'],
      times: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
    },
  },
  {
    id: 'dr-jones',
    name: 'Dr. Siyamala ravichandran',
    specialty: 'Therapist',
    imageUrl: 'https://placehold.co/100x100/38BDF8/FFFFFF',
    availability: {
      dates: ['2025-08-26', '2025-08-28', '2025-08-30', '2025-09-02', '2025-09-03'],
      times: ['01:30 PM', '02:30 PM', '03:30 PM', '04:30 PM'],
    },
  },
  {
    id: 'dr-doe',
    name: 'Dr. Umasankar Ravimohan',
    specialty: 'Therapist',
    imageUrl: 'https://placehold.co/100x100/818CF8/FFFFFF',
    availability: {
      dates: ['2025-08-25', '2025-08-29', '2025-09-01', '2025-09-03', '2025-09-04'],
      times: ['10:30 AM', '11:30 AM', '03:00 PM', '04:00 PM'],
    },
  },
];

const pastAppointments = [
  {
    id: 1,
    patientName: 'Abishan',
    doctorName: 'Dr. Siyamala ravichandran',
    date: 'August 15, 2025',
    time: '09:00 AM',
    status: 'Confirmed'
  },
  {
    id: 2,
    patientName: 'Nirojan',
    doctorName: 'Dr. Umasankar Ravimohan',
    date: 'July 28, 2025',
    time: '02:30 PM',
    status: 'Pending'
  },
];

const DoctorAppoinmentBooking = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [view, setView] = useState('booking');

  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageType, setMessageType] = useState('info'); // 'info' or 'success'

  useEffect(() => {
    setSelectedDate(null);
    setSelectedTime(null);
  }, [selectedDoctor]);

  const showMessage = (title, content, type = 'info') => {
    setMessageTitle(title);
    setMessageContent(content);
    setMessageType(type);
    setIsMessageVisible(true);
  };

  const handleCloseMessage = () => {
    setIsMessageVisible(false);
    setMessageTitle('');
    setMessageContent('');
    setMessageType('info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !contact || !selectedDoctor || !selectedDate || !selectedTime) {
      showMessage(
        "Missing Information",
        "Please fill out all required fields to request your appointment.",
        "info"
      );
      return;
    }

    const finalData = {
      patientName: name,
      patientContact: contact,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
    };

    console.log('Appointment request submitted:', finalData);

    showMessage(
      "Success!",
      "Your appointment request was successful. You will receive a confirmation via SMS.",
      "success"
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 max-w-full mx-auto">
        <div className="flex justify-center w-full bg-slate-100 border-b border-slate-200 rounded-t-xl">
          <button
            onClick={() => setView('booking')}
            className={`flex-1 py-4 px-6 font-semibold transition-colors
              ${view === 'booking' ? 'bg-white text-blue-600 border-b-4 border-blue-600' : 'text-slate-700 hover:bg-slate-200'}
            `}
          >
            Book Appointment
          </button>
          <button
            onClick={() => setView('history')}
            className={`flex-1 py-4 px-6 font-semibold transition-colors
              ${view === 'history' ? 'bg-white text-blue-600 border-b-4 border-blue-600' : 'text-slate-700 hover:bg-slate-200'}
            `}
          >
            Appointment History
          </button>
        </div>

        <div className="p-8">
          {view === 'booking' && (
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Book Your Appointment</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <div className="relative">
                      
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
                    <div className="relative">
                      
                      <input
                        type="tel"
                        id="contact"
                        name="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                        placeholder="Enter your contact number"
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Select a Doctor</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {doctors.map(doctor => (
                      <button
                        key={doctor.id}
                        type="button"
                        onClick={() => setSelectedDoctor(doctor)}
                        className={`relative bg-white p-4 rounded-xl shadow-sm border-2 flex items-center space-x-4 transition-all duration-200
                          ${selectedDoctor?.id === doctor.id ? 'border-blue-600 ring-4 ring-blue-100' : 'border-slate-200 hover:border-blue-400'}
                        `}
                      >
                        <div className="text-left">
                          <span className="block text-lg font-medium text-slate-800">{doctor.name}</span>
                          <span className="block text-sm text-slate-500">{doctor.specialty}</span>
                        </div>
                       
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-8 pt-4 border-t border-slate-200">
                  {/* Conditional message */}
                  {!selectedDoctor && (
                    <p className="text-sm text-red-500 font-medium text-center ">
                      Please select a doctor above to view available dates and times.
                    </p>
                  )}

                  {/* Date Selection with Horizontal Scroll */}
                  <div className={`${!selectedDoctor ? 'opacity-50' : ''}`}>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Choose a Date</h3>
                    <div className="flex overflow-x-auto whitespace-nowrap gap-4 pb-2">
                      {selectedDoctor ? (
                        selectedDoctor.availability.dates.map((date, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setSelectedDate(date)}
                            className={`flex-none w-28 h-28 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200
                              ${selectedDate === date ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'}
                            `}
                          >
                            <span className="text-sm font-semibold uppercase">{new Date(date).toLocaleString('en-US', { weekday: 'short' })}</span>
                            <span className="text-3xl font-bold">{new Date(date).getDate()}</span>
                            <span className="text-xs">{new Date(date).toLocaleString('en-US', { month: 'short' })}</span>
                          </button>
                        ))
                      ) : (
                        // Display disabled placeholder dates
                        Array.from({ length: 3 }).map((_, index) => (
                          <button key={index} disabled className="flex-none w-28 h-28 flex flex-col items-center justify-center p-3 rounded-xl border-2 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed">
                            <span className="text-sm font-semibold uppercase">--</span>
                            <span className="text-3xl font-bold">--</span>
                            <span className="text-xs">--</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <div className={`${!selectedDoctor ? 'opacity-50' : ''}`}>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Choose a Time</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {selectedDoctor ? (
                        selectedDoctor.availability.times.map((slot, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`py-3 px-4 rounded-full border-2 text-sm font-medium transition-colors
                              ${selectedTime === slot ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'}
                            `}
                          >
                            {slot}
                          </button>
                        ))
                      ) : (
                        Array.from({ length: 4 }).map((_, index) => (
                          <button key={index} disabled className="py-3 px-4 rounded-full border-2 text-sm font-medium border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed">
                            --:-- --
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Request Appointment
                  </button>
                </div>
              </form>
            </div>
          )}

          {view === 'history' && (
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Appointment History</h2>
              <div className="overflow-x-auto rounded-lg shadow-sm border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        #
                      </th>
                      
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Doctor Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {pastAppointments.length > 0 ? (
                      pastAppointments.map((appt, index) => (
                        <tr key={appt.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                            {index + 1}
                          </td>                       
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            {appt.doctorName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            {appt.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            {appt.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(appt.status)}`}>
                              {appt.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-slate-500">
                          You have no past appointments.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {isMessageVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-lg shadow-xl p-6 w-full max-w-sm text-center
            ${messageType === 'success' ? 'bg-white text-slate-800' : 'bg-white text-slate-800'}`}>
            {messageType === 'success' && (
              <svg className="mx-auto h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <h3 className="text-xl font-bold mb-2">{messageTitle}</h3>
            <p className="mb-6">{messageContent}</p>
            <div className="text-right">
              <button
                onClick={handleCloseMessage}
                className="px-6 py-2 rounded-full font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppoinmentBooking;