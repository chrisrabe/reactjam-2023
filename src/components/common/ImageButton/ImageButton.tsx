import React from 'react';

interface ImageButtonProps {
  onClick: () => void;
  image: string;
  width: number;
  height: number;
}

const ImageButton: React.FC<ImageButtonProps> = ({ onClick, image, width, height }) => {

  return (
    <button onClick={onClick} style={{ border: 'none', background: 'none', width, height }}>
      <img src={image} alt="Button" style={{width: 'inherit', height: 'inherit'}} />
    </button>
  );
};

export default ImageButton;
