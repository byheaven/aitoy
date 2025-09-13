'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductionPage() {
  const { t, language } = useLanguage();
  const isChinese = language === 'zh';
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  const userModels = [
    {
      id: 1,
      name: isChinese ? '我的第一个创作' : 'My First Creation',
      status: isChinese ? '已完成' : 'Completed',
      created: '2024-01-15',
    },
    {
      id: 2,
      name: isChinese ? '可爱小熊' : 'Cute Bear',
      status: isChinese ? '设计中' : 'In Design',
      created: '2024-01-18',
    },
    {
      id: 3,
      name: isChinese ? '科幻角色' : 'Sci-Fi Character',
      status: isChinese ? '已完成' : 'Completed',
      created: '2024-01-20',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {t('nav.production')}
          </h1>
          <p className="text-gray-600 mt-2">
            {isChinese
              ? '将您的3D设计转化为实体产品'
              : 'Transform your 3D designs into physical products'
            }
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Model Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {isChinese ? '我的3D模型' : 'My 3D Models'}
              </h2>

              <div className="space-y-3">
                {userModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                      selectedModel === model.id
                        ? 'border-primary-300 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🎨</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{model.name}</h3>
                        <p className="text-sm text-gray-600">{model.status}</p>
                        <p className="text-xs text-gray-500">{model.created}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button className="w-full mt-4 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                {isChinese ? '+ 创建新模型' : '+ Create New Model'}
              </button>
            </div>
          </div>

          {/* 3D Viewer and Customization */}
          <div className="lg:col-span-2">
            {selectedModel ? (
              <div className="space-y-6">
                {/* 3D Viewer */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    {isChinese ? '3D预览和编辑' : '3D Preview & Editing'}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* 3D Viewport */}
                    <div>
                      <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg border border-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🎭</div>
                          <p className="text-gray-600">
                            {isChinese ? '3D模型预览' : '3D Model Preview'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                          {isChinese ? '旋转' : 'Rotate'}
                        </button>
                        <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                          {isChinese ? '缩放' : 'Zoom'}
                        </button>
                        <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                          {isChinese ? '重置' : 'Reset'}
                        </button>
                      </div>
                    </div>

                    {/* Customization Panel */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isChinese ? '面部表情' : 'Facial Expression'}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {['😊', '😎', '🤔', '😴', '😮', '😆'].map((emoji, i) => (
                            <button
                              key={i}
                              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-xl transition-colors"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isChinese ? '颜色主题' : 'Color Theme'}
                        </label>
                        <div className="flex gap-2">
                          {['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400', 'bg-yellow-400'].map((color, i) => (
                            <button
                              key={i}
                              className={`w-8 h-8 rounded-full ${color} border-2 border-gray-300 hover:border-gray-500`}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isChinese ? '尺寸' : 'Size'}
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                          <option>{isChinese ? '小号 (5cm) - ¥29' : 'Small (5cm) - $4'}</option>
                          <option>{isChinese ? '中号 (8cm) - ¥49' : 'Medium (8cm) - $7'}</option>
                          <option>{isChinese ? '大号 (12cm) - ¥79' : 'Large (12cm) - $11'}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isChinese ? '材质' : 'Material'}
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                          <option>{isChinese ? 'PVC塑料 (标准)' : 'PVC Plastic (Standard)'}</option>
                          <option>{isChinese ? '树脂材质 (+¥20)' : 'Resin Material (+$3)'}</option>
                          <option>{isChinese ? '金属材质 (+¥50)' : 'Metal Material (+$7)'}</option>
                        </select>
                      </div>

                      <button className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                        {isChinese ? '保存更改' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Production Order */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    {isChinese ? '生产订单' : 'Production Order'}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {isChinese ? '订单详情' : 'Order Details'}
                      </h3>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isChinese ? '型号' : 'Model'}:</span>
                          <span className="font-medium">{userModels.find(m => m.id === selectedModel)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isChinese ? '尺寸' : 'Size'}:</span>
                          <span className="font-medium">{isChinese ? '中号 (8cm)' : 'Medium (8cm)'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isChinese ? '材质' : 'Material'}:</span>
                          <span className="font-medium">{isChinese ? 'PVC塑料' : 'PVC Plastic'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isChinese ? '数量' : 'Quantity'}:</span>
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">-</button>
                            <span className="w-12 text-center font-medium">1</span>
                            <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">+</button>
                          </div>
                        </div>
                        <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                          <span>{isChinese ? '总计' : 'Total'}:</span>
                          <span className="text-primary-600">{isChinese ? '¥49' : '$7'}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {isChinese ? '配送信息' : 'Shipping Information'}
                      </h3>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {isChinese ? '配送地址' : 'Shipping Address'}
                          </label>
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            rows={3}
                            placeholder={isChinese ? '请输入详细地址...' : 'Enter detailed address...'}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {isChinese ? '配送方式' : 'Shipping Method'}
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <option>{isChinese ? '标准配送 (7-14天) - 免费' : 'Standard Shipping (7-14 days) - Free'}</option>
                            <option>{isChinese ? '快速配送 (3-5天) - ¥15' : 'Express Shipping (3-5 days) - $2'}</option>
                            <option>{isChinese ? '特快配送 (1-2天) - ¥30' : 'Rush Shipping (1-2 days) - $4'}</option>
                          </select>
                        </div>

                        <div className="pt-3">
                          <p className="text-sm text-gray-600 mb-3">
                            {isChinese ? '预计生产时间：5-7个工作日' : 'Estimated production time: 5-7 business days'}
                          </p>
                          <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                            {isChinese ? '立即下单' : 'Place Order Now'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="text-6xl mb-4">🎭</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {isChinese ? '选择一个3D模型开始生产' : 'Select a 3D Model to Start Production'}
                </h2>
                <p className="text-gray-600">
                  {isChinese
                    ? '从左侧选择您已创建的3D模型，开始定制和生产流程。'
                    : 'Choose one of your created 3D models from the left to start the customization and production process.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}