---
config:
  theme: neo
  layout: dagre
  look: neo
---

flowchart TD
A["DeviceTable Component"] -- Props --> B["columns"] & C["data"]
B -- Type --> D["DataTableProps"]
C -- Type --> D
E["使用時に指定した型"] -- TData に反映 --> D
E -- TValue に反映 --> D
