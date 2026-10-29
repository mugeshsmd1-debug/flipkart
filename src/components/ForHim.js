import React from 'react';
import FlipkartProductList from './FlipkartProductList';

const ForHim = () => {
  return (
    <FlipkartProductList
      pageTitle="Men's Grooming & Daily Care"
      defaultFilterFn={(item) =>
        (item.type?.toLowerCase().includes('wash') ||
         item.type?.toLowerCase().includes('scrub') ||
         item.type === 'gift') &&
        item.type !== 'iGPosts'
      }
    />
  );
};

export default ForHim;
