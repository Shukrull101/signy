import { Link, useLoaderData } from 'react-router-dom'
import { postsApi } from '@/shared/api/endpoints'
import { toArticle, type Article } from '@/entities/article'
import { VIDEOS } from '@/entities/video'
import { HeroSlider } from '@/widgets/hero/HeroSlider'
import { Advantages } from '@/widgets/home/Advantages'
import { ProductBlocks } from '@/widgets/home/ProductBlocks'
import { Tariffs } from '@/widgets/home/Tariffs'
import { Counter } from '@/widgets/home/Counter'
import { PartnersSlider } from '@/widgets/home/PartnersSlider'
import { PopularQuestions } from '@/widgets/home/PopularQuestions'
import { SubscribeBlock } from '@/widgets/home/SubscribeBlock'
import { ArticleCard } from '@/widgets/blog/ArticleCard'
import { VideoCard } from '@/widgets/video/VideoCard'
import { VideoModal } from '@/widgets/video/VideoModal'
import { Section, SectionTitle } from '@/shared/ui/Section'
import { useState } from 'react'
import type { VideoItem } from '@/entities/video'

export const homeLoader = async (): Promise<{ articles: Article[] }> => {
  try { return { articles: (await postsApi.list()).slice(0, 3).map(toArticle) } } catch { return { articles: [] } }
}

export function HomePage() {
  const { articles } = useLoaderData() as Awaited<ReturnType<typeof homeLoader>>
  const [video, setVideo] = useState<VideoItem | null>(null)
  const main = VIDEOS[0]!
  return (
    <>
      <HeroSlider />
      <Advantages />
      <ProductBlocks />
      <Tariffs />
      <Counter />
      <Section><PartnersSlider /></Section>
      {articles.length > 0 && (
        <Section tone="mint">
          <SectionTitle>Интересно пишем про</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{articles.map((a) => <ArticleCard key={a.id} a={a} />)}</div>
          <p className="mt-8 text-center"><Link to="/blog" className="btn-outline">Все статьи</Link></p>
        </Section>
      )}
      <Section>
        <SectionTitle>Познакомимся вживую?</SectionTitle>
        <div className="mx-auto max-w-3xl"><VideoCard v={main} big onPlay={setVideo} /></div>
      </Section>
      <PopularQuestions />
      <SubscribeBlock />
      <VideoModal video={video} onClose={() => setVideo(null)} />
    </>
  )
}
