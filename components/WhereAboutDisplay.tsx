import { Text } from "react-native";

import AppStyles from "../styles/AppStyles";
import { Whereabouts } from "../types/types";

type Props = {
  whereAbouts: Whereabouts;
};
export const WhereAboutDisplay = ({ whereAbouts }: Props) => (
  <Text style={AppStyles.locationStyle}>
    fuck you
    {JSON.stringify(whereAbouts)}
    {!whereAbouts && "No where abouts"}
    {!whereAbouts.address && "No address"}
    {whereAbouts.address &&
      whereAbouts?.address[0] &&
      whereAbouts?.address[0].postalCode}
    ,
    {whereAbouts.address &&
      whereAbouts?.address[0] &&
      whereAbouts?.address[0].city}
  </Text>
);
