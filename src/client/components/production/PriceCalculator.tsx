import React from 'react';
import { motion } from 'framer-motion';

interface PriceCalculatorProps {
  customizations: {
    eyeStyle: string;
    mouthStyle: string;
    accessories: string[];
  };
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ customizations }) => {
  const basePrice = 299;
  const accessoryPrice = 20;
  const customizationPrice = customizations.accessories.length * accessoryPrice;
  const totalPrice = basePrice + customizationPrice;

  return (
    <motion.div
      className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="font-semibold text-sm mb-3">💰 价格计算</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">基础价格</span>
          <span className="font-medium">¥{basePrice}</span>
        </div>
        {customizations.accessories.length > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">配饰 ({customizations.accessories.length}个)</span>
            <span className="font-medium">¥{customizationPrice}</span>
          </div>
        )}
        <div className="flex justify-between pt-2 border-t border-purple-200">
          <span className="font-semibold">总计</span>
          <span className="font-bold text-primary-500">¥{totalPrice}</span>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-600">
        * 批量订购5件以上享8折优惠
      </div>
    </motion.div>
  );
};

export default PriceCalculator;