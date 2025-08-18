
import { useState } from "react";
import { useNews } from "../Services/HomeApi";
import Spinner from "../../Components/Spinner";
import { useNavigate } from "react-router-dom";
import { NewsCard } from "../ui/NewsCard";

function Home() {
  const { currentNews, isLoading } = useNews();
  const [SearchValue, setsearchValue] = useState("");

const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    if(SearchValue.trim()){
     navigate(`/${SearchValue}`);
    }
    

  }
  return (
    <div className="h-full">
     
      <div className="bg-neutral-400 shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-4">
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <input
                  className="flex-1 border border-gray-300 rounded-lg bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  type="search"
                  placeholder="Search news categories..."
                  value={SearchValue}
                  onChange={(e) => setsearchValue(e.target.value)}
                />
                <button 
                  type="submit"
                  className="button"
                 
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

     
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div >
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {currentNews.map((news) => (
          <NewsCard news = {news} key={news.article_id}/>
        ))}
      </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
