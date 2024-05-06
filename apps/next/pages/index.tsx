import { HomeScreen } from 'app/features/home/screen'
import Head from 'next/head'

export default function Page() {
  return (
    <div
      style={{
        backgroundImage: `url("https://i.pinimg.com/originals/6d/92/a1/6d92a112e82c8e19fd9e01ef6f0e9299.gif")`,
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Head>
        <title>Home</title>
      </Head>
      <HomeScreen />
    </div>
  )
}
