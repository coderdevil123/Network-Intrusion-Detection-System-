"use client";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-lg">
      <h1 className="text-5xl font-bold mb-4">
        Network Intrusion Detection System 🚀
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mb-6">
        Monitor, detect and respond to malicious network activities in real-time
        using Machine Learning and Threat Intelligence.
      </p>
      <div className="space-x-4">
        <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium transition">
          Get Started
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition">
          Learn More
        </button>
      </div>
    </section>
  );
}
