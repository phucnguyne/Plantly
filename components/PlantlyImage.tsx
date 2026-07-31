import { Image, ImageSourcePropType, useWindowDimensions } from "react-native";

type Props = {
  imgUrl?: string;
  size?: number;
};
export function PlantlyImage({ imgUrl, size }: Props) {
  const { width } = useWindowDimensions();

  const imageSize = size || Math.min(width / 1.5, 400);

  return (
    <Image
      source={imgUrl ? { uri: imgUrl } : require("@/assets/wiro.jpg")}
      style={[
        {
          width: imageSize,
          height: imageSize,
          borderRadius: 6,
        },
      ]}
    />
  );
}
