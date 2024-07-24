import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'

function PostCard({$id,featuredImage,title}) {
  return (
  <Link to={ `/post/${$id} `}>
    <div className='w-full bg-gray-100 rounded-xl p-4 '>
        <div className='w-full justify-centre mb-4'>
            <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl'></img>
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
    </div>
  </Link>
  )
}

export default PostCard
