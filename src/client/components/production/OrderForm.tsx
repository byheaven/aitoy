import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface OrderFormProps {
  modelData: {
    modelUrl: string;
    customizations: {
      eyeStyle: string;
      mouthStyle: string;
      accessories: string[];
    };
  };
}

const OrderForm: React.FC<OrderFormProps> = () => {
  const [quantity, setQuantity] = useState(1);
  const [material, setMaterial] = useState('pla');
  const [size, setSize] = useState('medium');
  const [sharedOnSocial, setSharedOnSocial] = useState(false);

  const basePrice = 299;
  const discount = sharedOnSocial ? 0.1 : 0;
  const totalPrice = basePrice * quantity * (1 - discount);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">生产订单</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              数量
            </label>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                -
              </motion.button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center border border-gray-200 rounded-lg px-3 py-2"
              />
              <motion.button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              打印材料
            </label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            >
              <option value="pla">PLA (环保材料)</option>
              <option value="abs">ABS (高强度)</option>
              <option value="resin">树脂 (高精度)</option>
              <option value="nylon">尼龙 (柔韧)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              尺寸
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['small', 'medium', 'large'].map((s) => (
                <motion.button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                    size === s
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s === 'small' ? '小号 (8cm)' : s === 'medium' ? '中号 (12cm)' : '大号 (16cm)'}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="social-share"
                checked={sharedOnSocial}
                onChange={(e) => setSharedOnSocial(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="social-share" className="flex-1">
                <div className="font-medium text-sm">分享获得折扣</div>
                <div className="text-xs text-gray-600 mt-1">
                  分享到小红书或Instagram可获得10%折扣
                </div>
              </label>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">单价</span>
                <span>¥{basePrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">数量</span>
                <span>×{quantity}</span>
              </div>
              {sharedOnSocial && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>社交分享折扣</span>
                  <span>-10%</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>总计</span>
                <span className="text-primary-500">¥{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              收货地址
            </label>
            <textarea
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 resize-none"
              placeholder="请输入详细收货地址..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              联系电话
            </label>
            <input
              type="tel"
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              placeholder="请输入手机号码"
            />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <motion.button
            className="w-full btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            确认下单
          </motion.button>
          
          <div className="text-center text-xs text-gray-500">
            预计生产时间：3-5个工作日
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-4">
        <h3 className="font-semibold text-sm mb-2">📦 生产说明</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• 3D打印采用高精度工业级设备</li>
          <li>• 支持多种材料和后处理工艺</li>
          <li>• 提供质量保证和售后服务</li>
          <li>• 批量订购可享受更多优惠</li>
        </ul>
      </div>
    </div>
  );
};

export default OrderForm;