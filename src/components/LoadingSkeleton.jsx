import React from 'react'

const LoadingSkeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  )
}

export const ProductSkeleton = () => {
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
      <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden border border-gray-200">
        <LoadingSkeleton className="w-full h-full" />
      </div>
      <div className="p-5">
        <LoadingSkeleton className="h-4 w-3/4 mb-2" />
        <LoadingSkeleton className="h-3 w-full mb-4" />
        <div className="flex items-center justify-between">
          <LoadingSkeleton className="h-6 w-20" />
          <LoadingSkeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export const CategorySkeleton = () => {
  return (
    <div className="group">
      <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600">
        <div className="relative rounded-[1.2rem] overflow-hidden ring-1 ring-black/5 bg-gray-100 shadow-sm">
          <div className="aspect-[4/3] w-full">
            <LoadingSkeleton className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton
