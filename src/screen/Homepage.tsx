
import Navbar from './components/navbar'
import SearchSection from './components/SearchSection'

type Props = {}

export default function Homepage({}: Props) {
  return (
    <div className='min-h-screen font-[Rubik]'>
        <Navbar />
        <SearchSection />
    </div>
  )
}