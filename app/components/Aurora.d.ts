import type { CSSProperties } from "react";

export interface AuroraProps {
  colorStops?: [string, string, string];
  amplitude?: number;
  blend?: number;
  time?: number;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

export default function Aurora(props: AuroraProps): React.JSX.Element;
