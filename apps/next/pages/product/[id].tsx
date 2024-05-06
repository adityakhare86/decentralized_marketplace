import { ProductScreen } from 'app/features/product/product-screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      <ProductScreen />
    </>
  )
}
