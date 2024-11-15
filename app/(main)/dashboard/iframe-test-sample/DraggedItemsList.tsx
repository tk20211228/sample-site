type DraggedItem = {
  id: string;
  url: string;
  html: string;
};

interface DraggedItemsListProps {
  items: DraggedItem[];
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
}

export function DraggedItemsList({
  items,
  onDrop,
  onDragOver,
}: DraggedItemsListProps) {
  return (
    <div
      className="border border-dashed border-gray-300 p-4 min-w-[200px]"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <h2 className="text-lg font-bold mb-4">ドラッグされたアイテム</h2>
      {items.map((item) => (
        <div key={item.id} className="mb-2">
          <img src={item.url} alt="" className="max-w-full h-auto" />
        </div>
      ))}
    </div>
  );
}
