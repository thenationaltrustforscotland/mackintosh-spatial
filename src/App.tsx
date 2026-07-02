import { useEffect, useState } from 'react'
import { BrowseView } from './views/BrowseView'
import { IndexPage } from './views/IndexPage'
import { SpatialView } from './views/SpatialView'
import { TimelineView } from './views/TimelineView'

/** First path segment of the hash decides the view. */
function currentRoute(): string {
  return window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean)[0] ?? ''
}

function App() {
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(currentRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (route === 'spatial') return <SpatialView />
  if (route === 'browse') return <BrowseView />
  if (route === 'timeline') return <TimelineView />
  return <IndexPage />
}

export default App
