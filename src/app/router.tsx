import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { HomePage, homeLoader } from '@/pages/home/HomePage'
import { BlogPage, blogLoader } from '@/pages/blog/BlogPage'
import { BlogPostPage, postLoader } from '@/pages/blog/BlogPostPage'
import { VideosPage, videosLoader } from '@/pages/video/VideosPage'
import { FaqPage } from '@/pages/faq/FaqPage'
import { AboutPage } from '@/pages/about/AboutPage'
import { ContactsPage } from '@/pages/contacts/ContactsPage'
import { LoginPage, guestLoader } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { ProfilePage, authLoader } from '@/pages/auth/ProfilePage'
import { NotFoundPage, RouteError } from '@/pages/notfound/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage />, loader: homeLoader },
      { path: 'blog', element: <BlogPage />, loader: blogLoader },
      { path: 'blog/:id', element: <BlogPostPage />, loader: postLoader },
      { path: 'videos', element: <VideosPage />, loader: videosLoader },
      { path: 'faq', element: <FaqPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contacts', element: <ContactsPage /> },
      { path: 'login', element: <LoginPage />, loader: guestLoader },
      { path: 'register', element: <RegisterPage />, loader: guestLoader },
      { path: 'profile', element: <ProfilePage />, loader: authLoader },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
