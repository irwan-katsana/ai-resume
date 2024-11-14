import React, { useState } from 'react';
import { Code } from 'lucide-react';
import type { ResumeScore } from '../types';

const sampleJobDescription = `Join Our Team as a Mobile Application Android Developer!

Are you passionate about creating innovative mobile solutions that enhance user experiences? We're seeking a skilled developer with 1-3 years of Android expertise to join our dynamic team. As a key player, you'll not only design and build cutting-edge mobile applications using Flutter but also provide essential support for our existing native apps on both Android and iOS platforms (good to have).

Why Us?

Innovative Environment: Be at the forefront of mobile technology by working with Flutter and other cross-platform development tools like React Native.
Collaborative Culture: Engage with a diverse team of UI/UX designers, product managers, QA testers, and system analysts to ensure top-notch app quality and functionality.
Continuous Learning: Stay ahead of the curve with opportunities for ongoing training and development, keeping your skills sharp in a rapidly evolving field.
Impactful Work: See your creations come to life and make a real difference as you contribute to maintaining, debugging, and updating mobile apps that are used by thousands.
Supportive Community: Enjoy a supportive work environment where your ideas are valued, and teamwork is paramount.

What You'll Do:

Design and Develop: Bring your creativity and technical expertise to the table as you design and build mobile applications that meet user requirements and exceed expectations.
Support and Troubleshoot: Be the go-to expert for resolving issues with existing native apps, ensuring they run smoothly and flawlessly.
Collaborate and Communicate: Work closely with various teams to ensure seamless integration, timely delivery, and exceptional performance of mobile applications.
Maintain and Improve: Take ownership of app maintenance, including bug fixes, version updates, and performance optimization, to deliver a seamless user experience.
Train and Support: Share your knowledge and expertise with both internal and external users, providing training and assistance as needed.
Be Responsive: Stay on top of on-call duties, promptly addressing and resolving any issues that arise to ensure uninterrupted app functionality.

Requirements:

Bachelor's degree in Computer Science/IT or related field.
1-3 years of Android development experience, with practical knowledge of Flutter preferred.
Familiarity with cross-platform development tools like React Native is a plus.
Strong understanding of RESTful APIs, AWS technologies, and UI/UX standards.
Proven track record in performance tuning, memory optimization, and crash analysis.
Experience working with software development tools such as Git and Jira.`;

const sampleResume = `Ramadhan Kamarulazam (Mobile Developer)
ramadanazam93@gmail.com +60132678469
https://github.com/dhanazam https://www.linkedin.com/in/ramadhan-norkamarulazam-21934812b/

Summary
Mobile developer with 6 years of professional experience software development. My goal is to contribute as Mobile developer to your projects involving the Flutter, Android ecosystem and React Native.

Languages: Dart, Kotlin, Java, Typescript, Swift
Frameworks: Flutter, Android Studio, Xcode, Git
Flutter: Bloc, MaterialUI
Android: Nav/View, MVVM, ModelView, Dagger Hilt, View & Data Binding, LifeCycle, Paging Library, LiveData, Room, Coroutines, Xml, Retrofit
Other tools: AppCenter & Codepush, Firebase

CelcomDigi- Flutter & React Native Developer APRIL 2023 – SEPT 2024
● Implemented Flutter Method Channel for both Android (using Kotlin) and iOS (using Swift) by cloning the Razer SDK repository.
● Set up Flutter flavors with multiple Firebase environments
● Using BLoC for state management to separate business logic from the UI layer
● Implement fetching data over the network and loading it as the user scrolls using the bloc library
● Implement CI/CD with Codemagic to automate the release process
● Implement a refresh & access token mechanism using a Dio interceptor

Torum- React Native Developer JAN 2024 - APRIL 2024
● Developed a cryptocurrency payment app using various cryptocurrencies.

Archisoft Global Sdn Bhd - React Native & Android OCT 2019 – Dec 2022
● Setup a CI/CD process with App Center and Codepush
● Implemented push notification with Firebase
● Improved App performance by reducing unnecessary renders
● Handling environment specific configurations in app
● Suggested system design API to improve performance app
● Implemented pagination in app to load more data dynamically

Education
University institute Teknologi MARA – BSc Computational Mathematics.
2014-2017`;

const sampleResponse: ResumeScore = {
  candidateInfo: {
    fullName: "Ramadhan Kamarulazam",
    email: "ramadanazam93@gmail.com",
    contactNumber: "+60132678469",
    currentTitle: "Mobile Developer",
    totalExperience: "6 years",
    longestEmployment: "3 years 3 months (Archisoft Global)",
    salaryExpectations: null
  },
  overallScore: 85,
  categories: [
    { name: "Educational Background", score: 17, maxScore: 20 },
    { name: "Work Experience", score: 30, maxScore: 35 },
    { name: "Technical Skills", score: 28, maxScore: 30 },
    { name: "Alignment with Job Description", score: 10, maxScore: 15 }
  ],
  fullAnalysis: {
    educationalBackground: "Bachelor's in Computational Mathematics with relevant coursework for mobile development.",
    workExperience: "6 years of mobile development experience across Flutter, React Native, and Android native development.",
    technicalSkills: "Proficient in Flutter, React Native, Android (Kotlin/Java), and iOS (Swift). Strong understanding of mobile development architecture and best practices.",
    alignmentWithJobDescription: "Exceeds the required 1-3 years experience, with expertise in all required technologies including Flutter and React Native."
  },
  summary: "Highly qualified mobile developer with extensive experience in both Flutter and React Native. Strong technical background and proven track record in delivering complex mobile applications."
};

interface DevModeButtonProps {
  onSampleDataLoad: (data: ResumeScore) => void;
  onSampleTextLoad: (jobDescription: string, resume: string) => void;
}

export function DevModeButton({ onSampleDataLoad, onSampleTextLoad }: DevModeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        title="Development Mode"
      >
        <Code className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Development Mode</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    onSampleDataLoad(sampleResponse);
                    setIsOpen(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Load Sample Analysis
                </button>
                <button
                  onClick={() => {
                    onSampleTextLoad(sampleJobDescription, sampleResume);
                    setIsOpen(false);
                  }}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Load Sample Texts
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Sample Response Structure:</h4>
                <pre className="text-xs overflow-auto max-h-96">
                  {JSON.stringify(sampleResponse, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}