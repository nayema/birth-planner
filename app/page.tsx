'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Baby, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-pink-500 flex items-center justify-center">
              <Baby className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Birth Planner
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Create your personalized birth preferences plan
          </p>
          <p className="text-gray-500">
            Your voice matters. Plan your ideal birth experience.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            How it works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Heart, text: 'Stage 1: Labour', bgColor: 'bg-pink-100', iconColor: 'text-pink-600' },
              { icon: Baby, text: 'Stage 2: Birthing', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
              { icon: Sparkles, text: 'Stage 3: Placenta', bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
              { icon: Baby, text: 'Stage 4: Newborn', bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
            ].map((stage, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-16 h-16 rounded-full ${stage.bgColor} mx-auto mb-3 flex items-center justify-center transition-transform hover:scale-110`}>
                  <stage.icon className={stage.iconColor} size={24} />
                </div>
                <p className="text-sm font-medium text-gray-700">{stage.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/stage1"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold bg-pink-500 text-white hover:bg-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
