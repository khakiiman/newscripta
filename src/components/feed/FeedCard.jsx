const FeedCard = ({item}) => {
  
    
  return (
    <div className='h-full w-full relative'>
        <img src={item?.elements[0]?.assets[1]?.file} className='h-full w-full object-cover' />
        <div className='absolute h-full w-full bg-black bg-opacity-40 top-0 left-0 text-left text-white'>
            <div className='p-6 absolute bottom-0 left-0'>
                <h2 className='text-xl font-semibold leading-8 hover:underline my-2'>
                    <a href={item.webUrl} target='blank'>
                        {item.webTitle}
                    </a>
                </h2>
            </div>
        </div>
    </div>
  )
}


export default FeedCard;