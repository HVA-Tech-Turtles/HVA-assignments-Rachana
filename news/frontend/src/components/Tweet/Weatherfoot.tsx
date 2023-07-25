const count=[
    {likes:'2,001'},
    {Comments:'3,456'},
    {retweets:'4567'},
    {shares:'5432'}
]

function Weatherfoot(){
    return(
        <>
        <ul className="likes">
            <li><span className='fas fa-heart'></span>3,098</li>
            <li><span className='fas fa-comment'></span>2,001</li>
            <li><span className='fas fa-retweet'></span>987</li>
            <li><span className='fas fa-share'></span>648</li>
        </ul>
        </>
    )
}

export  default Weatherfoot;