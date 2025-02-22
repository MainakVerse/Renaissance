declare module "*.svg" {
  import React from "react";
  import { SVGProps } from "react";
  const SVG: React.FC<SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module "*.svg?url" {
  const content: {
    src: string;
    height: number;
    width: number;
    blurWidth: number;
    blurHeight: number;
  };
  export default content;
}
