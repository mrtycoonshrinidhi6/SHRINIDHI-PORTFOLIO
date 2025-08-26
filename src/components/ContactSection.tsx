'use client'
import { useState } from 'react'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'
import ProfileCard from './ProfileCard'

export default function ContactSection() {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full gap-12 px-4">
      {!showProfile ? (
        <div
          onClick={() => setShowProfile(true)}
          className="cursor-pointer"
        >
          {/* Floating badge animation */}
          <div className="w-40 sm:w-44 md:w-52 h-40 sm:h-44 md:h-52 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl animate-bounce cursor-pointer">
            <p className="text-white font-semibold text-center px-4 text-base sm:text-lg md:text-xl">
              Tap to Reveal Profile
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-12 w-full max-w-3xl">
          {/* Profile Card */}
          <ProfileCard
            avatarUrl="/avatar.jpg" // place your picture in /public/avatar.jpg
            name="Shrinidhi H V"
            title="ML Engineer / Full Stack Developer"
            handle="shrinidhihv"
            status="Available"
            contactText="Contact Me"
            showUserInfo={true}
            enableTilt={true}
            className="w-full sm:w-96 md:w-[28rem]" // responsive card width
            onContactClick={() =>
              (window.location.href = 'mailto:yourmail@example.com')
            }
          />

          {/* Social Links */}
          <div className="flex flex-wrap gap-6 justify-center">
            <a
              href="https://www.linkedin.com/in/mr-tycoon-shrinidhi/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-white/10 backdrop-blur-md hover:bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg transition"
            >
              <FaLinkedin size={20} /> LinkedIn
            </a>
            <a
              href="https://github.com/mrtycoonshrinidhi6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-white/10 backdrop-blur-md hover:bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold shadow-lg transition"
            >
              <FaGithub size={20} /> GitHub
            </a>
            <a
              href="https://x.com/mr_tycoon006"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-white/10 backdrop-blur-md hover:bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold shadow-lg transition"
            >
              <FaTwitter size={20} /> X
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
