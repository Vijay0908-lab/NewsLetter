export function NewsCard({news}){
    return (
          <div
            key={news.article_id}
            className="w-full rounded-xl overflow-hidden shadow-lg bg-amber-50 text-gray-900 transition-transform transform hover:scale-102"
          >
            <a href={news.link}>
            <img src={news.image_url} className="w-full h-32 object-cover" alt={news.title} />
            <div className="p-4 font-sans-serif">
              <span className="font-extrabold text-base block">{news.title}</span>
              <p className="mt-2 text-xs line-clamp-3 ">{news.description}</p>
            </div>
            </a>
          </div>
    );
}