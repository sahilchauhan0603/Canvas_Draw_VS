"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function FeatureSectionPage() {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Toggle FAQ answer visibility
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {/* New Features Section */}
      <section 
        className="bg-gray-200 py-16"
        style={{
          backgroundImage: `url('/bg3.png')`, // Replace with your image path
        }}
      >
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Exciting Features of Drawing App
          </motion.h2>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pl-4 pr-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            {/* Feature 1 */}
            <div className="bg-gray-200 p-3 rounded-lg shadow-lg hover:scale-105 transform transition-all">
              <img
                src="/Feature1.png"
                alt="Drawing Tools"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">Powerful Drawing Tools</h3>
              <p className="text-gray-500 mt-2">
                Create stunning artwork with our wide range of tools, brushes, and effects. Perfect for beginners and professionals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-200 p-3 rounded-lg shadow-lg hover:scale-105 transform transition-all">
              <img
                src="/art.jpg"
                alt="Canvas"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">Personalized Canvas</h3>
              <p className="text-gray-500 mt-2">
                Start drawing on a blank canvas or use our pre-built templates. Your creativity knows no bounds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-200 p-3 rounded-lg shadow-lg hover:scale-105 transform transition-all">
              <img
                src="/sm.jpeg"
                alt="Sharing"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">Share Your Creations</h3>
              <p className="text-gray-500 mt-2">
                Easily share your artwork with friends and the world. Post on social media or export your masterpiece.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section 
        className="bg-gray-200 py-16"
        style={{
          backgroundImage: `url('/bg3.png')`, // Replace with your image path
        }}
        >
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-lg shadow-lg">
              <div
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleFAQ(0)}
              >
                <h3 className="text-xl font-semibold text-gray-700">How do I start drawing?</h3>
                <span className="text-gray-500">{activeIndex === 0 ? "-" : "+"}</span>
              </div>
              {activeIndex === 0 && (
                <motion.div
                  className="p-6 text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Simply click on the Canvas section, and you will be presented with a blank canvas where you can start drawing immediately.
                </motion.div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-lg shadow-lg">
              <div
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleFAQ(1)}
              >
                <h3 className="text-xl font-semibold text-gray-700">Can I save my artwork?</h3>
                <span className="text-gray-500">{activeIndex === 1 ? "-" : "+"}</span>
              </div>
              {activeIndex === 1 && (
                <motion.div
                  className="p-6 text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Yes! You can save your artwork by clicking on the Save button on the top-right corner. You can download your image or save it to the cloud.
                </motion.div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-lg shadow-lg">
              <div
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleFAQ(2)}
              >
                <h3 className="text-xl font-semibold text-gray-700">Can I share my drawings?</h3>
                <span className="text-gray-500">{activeIndex === 2 ? "-" : "+"}</span>
              </div>
              {activeIndex === 2 && (
                <motion.div
                  className="p-6 text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Absolutely! Once you’re happy with your drawing, you can share it on social media platforms like Facebook, Twitter, and Instagram, or even email it to your friends.
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Last Section */}
      <section
        className="relative py-20"
        style={{
          backgroundImage: `url('/bg3.png')`, // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-800 to-transparent opacity-90"></div>
      
        <div className="relative container mx-auto text-center text-white">
          {/* Title */}
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Discover Your Creativity with Canvas
          </motion.h2>
      
          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Dive into our powerful drawing canvas to unleash your imagination. Whether you&apos;re a beginner or a professional, the canvas is tailored for your creative needs. Explore endless possibilities and bring your ideas to life!
          </motion.p>
      
          {/* Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-2xl transform transition-all hover:brightness-125"
              onClick={() => alert("Redirecting to create an account...")} // Replace with your actual navigation logic
            >
              <LoginLink>Make Account</LoginLink>
            </motion.button>
          </motion.div>
        </div>
      
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Decorative bubbles */}
          <motion.div
            className="absolute w-32 h-32 bg-blue-400 rounded-full blur-xl opacity-30"
            style={{ top: "10%", left: "15%" }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-24 h-24 bg-purple-400 rounded-full blur-xl opacity-30"
            style={{ bottom: "15%", right: "20%" }}
            animate={{ y: [0, 30, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
          />
        </div>
      </section>

    </div>
  );
}
