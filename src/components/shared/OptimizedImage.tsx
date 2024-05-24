import { LazyLoadImage } from "react-lazy-load-image-component";
import { cn } from "../../utils/tailwindMerge";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  height?: number;
  width?: number;
};

const OptimizedImage = ({ src, alt, className, height, width }: Props) => {
  return (
    <LazyLoadImage
      alt={alt || "img"}
      height={height}
      src={src}
      width={width}
      //   effect="blur"
      className={cn("object-contain", className)}
    />
  );
};

export default OptimizedImage;
