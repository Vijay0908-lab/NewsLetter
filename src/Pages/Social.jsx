import Spinner from "../../Components/Spinner";
import { useNews } from "../Services/HomeApi";
import { NewsCard } from "../ui/NewsCard";


function Social() {
  const{SocialData, socialLoading} = useNews();

  return  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
       
          {socialLoading ? (
            <div className="flex items-center justify-center h-64">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              

        {SocialData.map((news) => (
          
            <NewsCard news = {news} key={news.article_id}/>
        
         
        ))}
       
      </div>
          )}
        
      </div>;
}

export default Social;
