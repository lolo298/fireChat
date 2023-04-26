import { identicon } from "minidenticons";
import { useMemo } from "react";

export const ProfilePicture = ({
  uid,
  username,
  saturation,
  lightness,
  ...props
}: ProfilePictureProps) => {
  const svgURI = useMemo(
    () => "data:image/svg+xml;utf8," + encodeURIComponent(identicon(uid, saturation, lightness)),
    [uid, saturation, lightness]
  );
  return <img src={svgURI} {...props} />;
};

interface ProfilePictureProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  uid: string;
  username: string;
  saturation: number;
  lightness: number;
}
