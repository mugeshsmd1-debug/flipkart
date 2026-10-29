import React from 'react';
import FlipkartProductList from './FlipkartProductList';

const Under10 = () => {
  return (
    <FlipkartProductList
      pageTitle="Under ₹999 Super Deals"
      defaultFilterFn={(item) => item.price > 10 && item.price <= 20 && item.type !== 'iGPosts'}
    />
  );
};

export default Under10;
