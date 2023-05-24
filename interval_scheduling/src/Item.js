import React, { useState } from 'react';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import './styles/Item.css'
import Draggable from 'react-draggable';

const Item = (props) => {
  const calculaMargin = (id) => (id-1) * 80;
  
  const[width, setWidth] = useState(props.width)
  const[x, setX] = useState(props.x)

  const increaseWidth = () => {
    if (width+x < 1800) {
      const newWidth = width + 120
      props.onWidthChange({ id: props.id, width: newWidth })
      setWidth(newWidth)
    }
  };
  
  const decreaseWidth = () => {
    if (width > 120) {
      const newWidth = width - 120
      props.onWidthChange({ id: props.id, width: newWidth })
      setWidth(newWidth)
    }
  };

  const handleDrag = (e, { x, y }) => {
    props.onXChange({ id: props.id, x: x })
    setX(x)
  };

  return (
    <Draggable axis="x" grid={[120, 120]} bounds={{ left: 0, right: 1800 - width }} onDrag={handleDrag}>
      <div
        className="item"
        style={{
          width: `${width}px`,
          marginTop: `${calculaMargin(props.id)}px`,
          backgroundColor: `${props.color}`
        }}
      >
        <div className="controls">
          <AiFillPlusCircle className="size_button" size={30} color="white" onClick={increaseWidth} />
          <AiFillMinusCircle className="size_button" size={30} color="white" onClick={decreaseWidth} />
        </div>
        <p className="title">
          Atividade {props.id}
        </p>
      </div>
    </Draggable>
  );
};

export default Item;
