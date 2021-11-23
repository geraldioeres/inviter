import React from 'react'
import Activity from '../components/Activity'
import CategorySlide from '../components/CategorySlide'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <CategorySlide />
            <Activity />
        </div>
    )
}

export default Home
