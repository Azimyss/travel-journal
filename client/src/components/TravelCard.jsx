import { MapPinIcon, UserIcon, CurrencyDollarIcon, BuildingLibraryIcon, MapIcon } from '@heroicons/react/24/outline';

const TravelCard = ({ travel }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">{travel.title}</h2>
        <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full">
          <UserIcon className="h-4 w-4 mr-2 text-gray-700" />
          <span className="text-sm font-medium">{travel.author}</span>
        </div>
      </div>
      
      <div className="flex items-center text-gray-700 mb-6 bg-gray-50 px-3 py-1.5 rounded-full w-fit">
        <MapPinIcon className="h-4 w-4 mr-2 text-gray-700" />
        <span className="text-sm font-medium">{travel.location}</span>
      </div>

      <div className="border-t border-gray-100 pt-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <CurrencyDollarIcon className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Расходы</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg">
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 mb-1">Транспорт</span>
            <span className="font-medium text-gray-900">${travel.cost.transport}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 mb-1">Жильё</span>
            <span className="font-medium text-gray-900">${travel.cost.accommodation}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 mb-1">Еда</span>
            <span className="font-medium text-gray-900">${travel.cost.food}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 mb-1">Прочее</span>
            <span className="font-medium text-gray-900">${travel.cost.other}</span>
          </div>
          <div className="col-span-2 pt-3 border-t border-gray-200">
            <span className="text-sm text-gray-700 mb-1">Всего</span>
            <div className="text-lg font-semibold text-blue-700">${travel.cost.total}</div>
          </div>
        </div>
      </div>

      {travel.heritageSites.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BuildingLibraryIcon className="h-5 w-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">Культурные места</h3>
          </div>
          <div className="space-y-3">
            {travel.heritageSites.map((site, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">{site.name}</h4>
                {site.description && (
                  <p className="text-sm text-gray-700">{site.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {travel.placesToVisit.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapIcon className="h-5 w-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">Места для посещения</h3>
          </div>
          <div className="space-y-3">
            {travel.placesToVisit.map((place, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">{place.name}</h4>
                {place.description && (
                  <p className="text-sm text-gray-700">{place.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelCard; 