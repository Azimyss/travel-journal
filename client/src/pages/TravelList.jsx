import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getTravels } from '../api/travels';
import TravelCard from '../components/TravelCard';

const TravelList = () => {
  const [travels, setTravels] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  const fetchTravels = async () => {
    try {
      const response = await getTravels(page, 10, sortBy, order);
      const newTravels = response.travels;
      
      if (page === 1) {
        setTravels(newTravels);
      } else {
        setTravels(prev => [...prev, ...newTravels]);
      }
      
      setHasMore(newTravels.length > 0 && page < response.totalPages);
    } catch (error) {
      console.error('Error fetching travels:', error);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchTravels();
  }, [sortBy, order]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setOrder('desc');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Путешествия</h1>
        <div className="flex gap-3">
          <button
            onClick={() => handleSort('location')}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ease-in-out shadow-sm hover:shadow
              ${sortBy === 'location' 
                ? 'bg-blue-700 text-white hover:bg-blue-800' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}`}
          >
            Место {sortBy === 'location' && (
              <span className="ml-1 font-semibold">{order === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
          <button
            onClick={() => handleSort('createdAt')}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ease-in-out shadow-sm hover:shadow
              ${sortBy === 'createdAt' 
                ? 'bg-blue-700 text-white hover:bg-blue-800' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}`}
          >
            Дата {sortBy === 'createdAt' && (
              <span className="ml-1 font-semibold">{order === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
        </div>
      </div>

      <InfiniteScroll
        dataLength={travels.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex space-x-4">
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        }
        endMessage={
          <p className="text-center py-8 text-gray-700 font-medium border-t border-gray-100 mt-4">
            Больше путешествий нет
          </p>
        }
      >
        <div className="grid grid-cols-1 gap-6">
          {travels.map((travel) => (
            <TravelCard key={travel._id} travel={travel} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default TravelList; 