
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '../App.css'

function Home() {
    return (
        <>
            <div style={{ 
                backgroundImage: `../background.jpg`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh' 
                }}>
            </div>
            <nav>
                <Link to='/'>Home</Link>
            </nav>
            <div>
                <h1>Welcome to ENVibe. Now let's get started.</h1>
            </div>
        </>
    )
}