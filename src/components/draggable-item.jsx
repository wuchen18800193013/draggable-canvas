import { useDraggable } from '@dnd-kit/core';

const DraggableItem = ({ id, style, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const transformStyle = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        ...transformStyle,
        zIndex: transform ? 999 : 'auto',
      }}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}

export default DraggableItem;