import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ErrorBoundary } from '@/components/layout/ErrorBoundary'
import { HomePage } from '@/pages/HomePage'
import { GradeHomePage } from '@/pages/GradeHomePage'
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

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <Routes>
          {/* 首页 */}
          <Route path="/" element={<HomePage />} />
          
          {/* 年级主页 */}
          <Route path="/grade/:gradeId" element={<GradeHomePage />} />
          
          {/* 单词学习 */}
          <Route path="/grade/:gradeId/words" element={<WordsPage />} />
          <Route path="/grade/:gradeId/words/:unitId" element={<WordsPage />} />
          
          {/* 音标学习 */}
          <Route path="/grade/:gradeId/phonics" element={<PhonicsPage />} />
          
          {/* 句子学习 */}
          <Route path="/grade/:gradeId/sentences" element={<SentencePage />} />
          
          {/* 情景对话 */}
          <Route path="/grade/:gradeId/dialogue" element={<DialoguePage />} />
          
          {/* 闯关游戏 */}
          <Route path="/grade/:gradeId/adventure" element={<AdventurePage />} />
          <Route path="/grade/:gradeId/adventure/:levelId" element={<LevelPlayPage />} />
          
          {/* 模拟考试 */}
          <Route path="/grade/:gradeId/exam" element={<ExamPage />} />
          
          {/* 题库中心 */}
          <Route path="/grade/:gradeId/practice" element={<ExamPage />} />
          
          {/* 学习报告 */}
          <Route path="/report" element={<ReportPage />} />
          
          {/* 错题本 */}
          <Route path="/wrongbook" element={<WrongBookPage />} />
          
          {/* 资源导航 */}
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </ErrorBoundary>
  )
}
