import React from 'react';

const BackgroundExample: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-linear-to-br from-gray-50 to-gray-200" />
  );
};

export default BackgroundExample;
