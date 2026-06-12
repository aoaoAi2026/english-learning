import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ErrorBoundary } from '@/components/layout/ErrorBoundary'
import { SoundInit } from '@/components/ui/SoundInit'
import { HomePage } from '@/pages/HomePage'
import { WordsPage } from '@/pages/WordsPage'
import { PhonicsPage } from '@/pages/PhonicsPage'
import { SentencePage } from '@/pages/SentencePage'
import { DialoguePage } from '@/pages/DialoguePage'
import { AdventurePage } from '@/pages/AdventurePage'
import { LevelPlayPage } from '@/pages/LevelPlayPage'
import { ExamPage } from '@/pages/ExamPage'
import { ReportPage } from '@/pages/ReportPage'
import { WrongBookPage } from '@/pages/WrongBookPage'
import { ResourcesPage } from '@/pages/ResourcesPage'
import { DailyCheckInPage } from '@/pages/DailyCheckInPage'
import { GamesHubPage } from '@/pages/games/GamesHubPage'
import { MemoryMatchPage } from '@/pages/games/MemoryMatchPage'
import { SpellingBeePage } from '@/pages/games/SpellingBeePage'
import { WordSearchPage } from '@/pages/games/WordSearchPage'
import { WordScramblePage } from '@/pages/games/WordScramblePage'
import { SpinWheelPage } from '@/pages/games/SpinWheelPage'
import { GradeHomePage } from '@/pages/GradeHomePage'

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <SoundInit />
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/daily-checkin" element={<DailyCheckInPage />} />
          <Route path="/words" element={<WordsPage />} />
          <Route path="/phonics" element={<PhonicsPage />} />
          <Route path="/sentences" element={<SentencePage />} />
          <Route path="/dialogue" element={<DialoguePage />} />
          <Route path="/adventure" element={<AdventurePage />} />
          <Route path="/adventure/:levelId" element={<LevelPlayPage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/wrongbook" element={<WrongBookPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/games" element={<GamesHubPage />} />
          <Route path="/games/memory" element={<MemoryMatchPage />} />
          <Route path="/games/spelling" element={<SpellingBeePage />} />
          <Route path="/games/wordsearch" element={<WordSearchPage />} />
          <Route path="/games/scramble" element={<WordScramblePage />} />
          <Route path="/games/spinwheel" element={<SpinWheelPage />} />

          {/* 年级子路由 */}
          <Route path="/grade/:gradeId" element={<GradeHomePage />} />
          <Route path="/grade/:gradeId/words" element={<WordsPage />} />
          <Route path="/grade/:gradeId/phonics" element={<PhonicsPage />} />
          <Route path="/grade/:gradeId/sentences" element={<SentencePage />} />
          <Route path="/grade/:gradeId/dialogue" element={<DialoguePage />} />
          <Route path="/grade/:gradeId/adventure" element={<AdventurePage />} />
          <Route path="/grade/:gradeId/adventure/:levelId" element={<LevelPlayPage />} />
          <Route path="/grade/:gradeId/exam" element={<ExamPage />} />
          <Route path="/grade/:gradeId/games" element={<GamesHubPage />} />
          <Route path="/grade/:gradeId/games/memory" element={<MemoryMatchPage />} />
          <Route path="/grade/:gradeId/games/spelling" element={<SpellingBeePage />} />
          <Route path="/grade/:gradeId/games/wordsearch" element={<WordSearchPage />} />
          <Route path="/grade/:gradeId/games/scramble" element={<WordScramblePage />} />
          <Route path="/grade/:gradeId/games/spinwheel" element={<SpinWheelPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </ErrorBoundary>
  )
}
