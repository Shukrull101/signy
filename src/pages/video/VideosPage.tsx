import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { VIDEOS, type VideoItem } from '@/entities/video'
import { postsApi } from '@/shared/api/endpoints'
import { toArticle, type Article } from '@/entities/article'
import { VideoCard } from '@/widgets/video/VideoCard'
import { VideoModal } from '@/widgets/video/VideoModal'
import { ArticleCard } from '@/widgets/blog/ArticleCard'
import { SubscribeBlock } from '@/widgets/home/SubscribeBlock'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import { Section, SectionTitle } from '@/shared/ui/Section'
import { useLanguage } from '@/shared/i18n/LanguageContext'

export const videosLoader = async (): Promise<{ articles: Article[] }> => {
  try { return { articles: (await postsApi.list()).slice(10, 13).map(toArticle) } } catch { return { articles: [] } }
}

export function VideosPage() {
  const { t } = useLanguage()
  const { articles } = useLoaderData() as Awaited<ReturnType<typeof videosLoader>>
  const [video, setVideo] = useState<VideoItem | null>(null)
  const [first, ...rest] = VIDEOS
  return (
    <>
      <div className="container-x pb-12">
        <Breadcrumbs items={[{ label: 'Видеоинструкции' }]} />
        <h1 className="mb-2 mt-4 text-3xl sm:text-4xl">{t('videoTitle')}</h1>
        <p className="mb-6 text-sm text-ink-soft">{t('videoSubtitle')}</p>
        {first && <VideoCard v={first} big onPlay={setVideo} />}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">{rest.slice(0, 4).map((v) => <VideoCard key={v.id} v={v} onPlay={setVideo} />)}</div>
      </div>
      {articles.length > 0 && (
        <Section tone="mint">
          <SectionTitle>Новые статьи</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{articles.map((a) => <ArticleCard key={a.id} a={a} />)}</div>
        </Section>
      )}
      <SubscribeBlock />
      <VideoModal video={video} onClose={() => setVideo(null)} />
    </>
  )
}
