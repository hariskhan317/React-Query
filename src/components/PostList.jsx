import './post.css'

const PostList = (postData) => { 
    return (
        <>
            {postData?.isError && <>error cant show posts</>}
            {postData?.isLoading && <>Loading</>}
            {<>{postData?.postData?.data?.map((item) => (
                <> 
                    <div className='posts' key={item.id}>
                        <h5>{item.id}. {item.title}</h5>
                        {item?.tags?.map((tag, index) => (
                            <div className='tags' key={index}>{tag}</div>
                        ))} 
                    </div>
                </>
            ))}</>}
        </>

    )
}

export default PostList
