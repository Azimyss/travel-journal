import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTravel } from '../api/travels';
import { UserIcon, MapPinIcon, CurrencyDollarIcon, BuildingLibraryIcon, MapIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const AddTravel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    location: '',
    cost: {
      transport: 0,
      accommodation: 0,
      food: 0,
      other: 0
    },
    heritageSites: [{ name: '', description: '' }],
    placesToVisit: [{ name: '', description: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('cost.')) {
      const costField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        cost: {
          ...prev.cost,
          [costField]: Number(value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (index, field, subfield, value, arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [subfield]: value } : item
      )
    }));
  };

  const addArrayItem = (arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { name: '', description: '' }]
    }));
  };

  const removeArrayItem = (index, arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const calculateTotalCost = () => {
    const { transport, accommodation, food, other } = formData.cost;
    return transport + accommodation + food + other;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const totalCost = calculateTotalCost();
      // Добавляем общую стоимость в данные
      const travelData = { ...formData, cost: { ...formData.cost, total: totalCost } };
      await createTravel(travelData);
      navigate('/');
    } catch (error) {
      console.error('Error creating travel:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Добавить путешествие</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
        {/* Основная информация */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <UserIcon className="h-5 w-5 text-gray-500" />
                Ваше имя
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Название путешествия</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MapPinIcon className="h-5 w-5 text-gray-500" />
                Место
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Расходы */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Расходы</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Транспорт</label>
              <input
                type="number"
                name="cost.transport"
                value={formData.cost.transport}
                onChange={handleChange}
                min="0"
                className="block w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Жильё</label>
              <input
                type="number"
                name="cost.accommodation"
                value={formData.cost.accommodation}
                onChange={handleChange}
                min="0"
                className="block w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Еда</label>
              <input
                type="number"
                name="cost.food"
                value={formData.cost.food}
                onChange={handleChange}
                min="0"
                className="block w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Прочее</label>
              <input
                type="number"
                name="cost.other"
                value={formData.cost.other}
                onChange={handleChange}
                min="0"
                className="block w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>
          
          {/* Итоговая стоимость */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-medium">Итоговая стоимость:</span>
              <span className="text-lg font-semibold text-blue-600">${calculateTotalCost()}</span>
            </div>
          </div>
        </div>

        {/* Культурные места */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BuildingLibraryIcon className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Культурные места</h3>
            </div>
            <button
              type="button"
              onClick={() => addArrayItem('heritageSites')}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Добавить место
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.heritageSites.map((site, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 mr-4">
                    <input
                      type="text"
                      value={site.name}
                      onChange={(e) => handleArrayChange(index, 'heritageSites', 'name', e.target.value, 'heritageSites')}
                      placeholder="Название места"
                      className="block w-full rounded-lg border-gray-200 bg-white py-2.5 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'heritageSites')}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
                <textarea
                  value={site.description}
                  onChange={(e) => handleArrayChange(index, 'heritageSites', 'description', e.target.value, 'heritageSites')}
                  placeholder="Описание места"
                  className="block w-full rounded-lg border-gray-200 bg-white py-2.5 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  rows="2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Места для посещения */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <MapIcon className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Места для посещения</h3>
            </div>
            <button
              type="button"
              onClick={() => addArrayItem('placesToVisit')}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Добавить место
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.placesToVisit.map((place, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 mr-4">
                    <input
                      type="text"
                      value={place.name}
                      onChange={(e) => handleArrayChange(index, 'placesToVisit', 'name', e.target.value, 'placesToVisit')}
                      placeholder="Название места"
                      className="block w-full rounded-lg border-gray-200 bg-white py-2.5 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'placesToVisit')}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
                <textarea
                  value={place.description}
                  onChange={(e) => handleArrayChange(index, 'placesToVisit', 'description', e.target.value, 'placesToVisit')}
                  placeholder="Описание места"
                  className="block w-full rounded-lg border-gray-200 bg-white py-2.5 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  rows="2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Кнопка отправки */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Сохранить путешествие
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTravel;
