type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className='flex w-full shadow-sm p-3 text-xl  font-bold'>
        <div className='flex-[3]'>
            Logo
        </div>
        <div className='flex-[2]'>
            Home
        </div>

    </div>
  )
}