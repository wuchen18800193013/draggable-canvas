import { useState, useRef, useEffect } from 'react';

const DraggableWrapper = ({ children, width, height, isEdit }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (isEdit) return;
    // 只响应左键点击
    if (e.button !== 0) return;
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    // 防止文本选中
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isEdit) return;
    if (!isDragging) return;
    const offsetX = e.clientX - startPos.x;
    const offsetY = e.clientY - startPos.y;
    setPosition({
      x: offsetX > 0 ? 0 : (offsetX < -1000 ? -1000 : offsetX),
      y: offsetX > 0 ? 0 : (offsetY < -1000 ? -1000 : offsetY),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 添加全局事件监听
  useEffect(() => {
    if (isEdit) return;
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startPos, isEdit]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        border: '1px solid #ccc',
        margin: 'auto',
      }}
    >
      <div
        style={{
          position: 'absolute',
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: '100%',
          height: '100%'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DraggableWrapper;