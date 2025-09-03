import { useState } from 'react';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import DraggableItem from './draggable-item'; // 自定义Draggable组件

const DraggableList = ({ isEdit }) => {
  const [items, setItems] = useState([
    { id: '1', x: 800, y: 600, content: '可拖拽元素 1' },
    { id: '2', x: 1000, y: 1000, content: '可拖拽元素 2' },
    { id: '3', x: 800, y: 800, content: '可拖拽元素 3' },
  ]);

  const sensors = useSensors(
    useSensor(MouseSensor, { enabled: false }), // 明确禁用传感器
    useSensor(TouchSensor, { enabled: false })
  );

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    setItems(items.map(item => {
      if (item.id === active.id) {
        return {
          ...item,
          x: item.x + delta.x,
          y: item.y + delta.y
        };
      }
      return item;
    }));
  };

  const getItem = () => items.map(item => (
    <DraggableItem 
      key={item.id}
      id={item.id}
      style={{
        position: 'absolute',
        left: item.x,
        top: item.y,
        width: '120px',
        padding: '10px',
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'move',
        userSelect: 'none'
      }}
    >
      {item.content}
    </DraggableItem>
  ))

  return (
    <div style={{ 
      position: 'relative', 
      width: '2000px', 
      height: '2000px', 
      border: '1px solid #ccc',
      overflow: 'hidden',
      backgroundColor: '#fafafa',
      backgroundImage: "linear-gradient(#eee 1px, transparent 1px),linear-gradient(90deg, #eee 1px, transparent 1px)",
      backgroundSize: "10px 10px",
    }}>

      {!isEdit
        ? <>{getItem()}</>
        : <DndContext
            enabled={false}
            sensors={sensors}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
          >
            {getItem()}
          </DndContext>
      }
      
    </div>
  );
}

export default DraggableList;