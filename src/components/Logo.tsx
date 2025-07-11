import TextLoop from './TextLoop'
import { roles } from '@/constants'

const Logo = () => {
  return (
    <div>
      <a href="/">
        <h1>Priyobroto.</h1>
        <TextLoop words={roles} />
      </a>
    </div>
  )
}

export default Logo
