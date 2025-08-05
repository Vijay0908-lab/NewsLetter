
function CurrentNews({currentNews}) {

   

    return (
        <div>
          <ul>
            {currentNews.map((news)=>(
                <li key= {news.id}>{news.country}</li>
            ))}
          </ul>
        </div>
    )
}

export default CurrentNews;
