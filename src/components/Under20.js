import React from 'react';
import FlipkartProductList from './FlipkartProductList';

const Under20 = () => {
  return (
    <FlipkartProductList
      pageTitle="Under ₹499 Budget Store"
      defaultFilterFn={(item) => item.price <= 10 && item.type !== 'iGPosts'}
    />
  );
};

export default Under20;
