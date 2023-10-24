type Node = {
  title: string;
  radius: number;
  id: string;
  vx?: number;
  vy?: number;
  x?: number;
  y?: number;
};

type Link = {
  index?: number;
  source:
    | number
    | {
        id: string;
        index: number;
        title: string;
        vx: number;
        vy: number;
        x: number;
        y: number;
      };
  target:
    | number
    | {
        id: string;
        index: number;
        title: string;
        vx: number;
        vy: number;
        x: number;
        y: number;
      };
};

type GraphProps = {
  nodes: Node[];
  links: Link[];
  showNodeHandler: () => {};
};

type NodeViewProps = {
  id: string;
  title: string;
  index: number;
  X: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
};
