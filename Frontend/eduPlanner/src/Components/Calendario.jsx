import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function Calendario() {
    const [date, setDate] = useState(new Date());
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col relative overflow-hidden">
            <Header/>
            <main className='p-16 flex flex-col justify-center items-center'>
                <h1 className='text-white font-semibold pb-4'>React Calendar</h1>
                <Calendar
                    onChange={setDate}
                    value={date}
                />
                <p className='text-white'>Fecha seleccionada: {date.toDateString()}</p>
            </main>
            <Footer/>            
        </div>
    )
}

export default Calendario
