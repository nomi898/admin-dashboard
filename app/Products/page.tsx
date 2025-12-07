import HeroSwiper from '@/Components/Products/Heroswiper'
import ProductGrid from '@/Components/Products/Productgrid'
import React from 'react'

const page = () => {
  return (
    <div className="w-full overflow-x-hidden max-w-full">
      <div className="w-full">
        <HeroSwiper />
        <ProductGrid />
      </div>
    </div>
  )
}

export default page
