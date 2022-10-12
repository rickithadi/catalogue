import { Text } from "react-native";

import AppStyles from "../styles/AppStyles";
import { Whereabouts } from "../types/types";

type Props = {
  whereAbouts: Whereabouts;
};
export const WhereAboutDisplay = ({ whereAbouts }: Props) => (
  <Text style={AppStyles.locationStyle}>
    {/* {JSON.stringify(whereAbouts)} */}
    {!whereAbouts && "No Whereabouts"}
    {!whereAbouts.address && "No Address"}
    {whereAbouts.address &&
      whereAbouts?.address[0] &&
      whereAbouts?.address[0].postalCode}
    ,{" "}
    {whereAbouts.address &&
      whereAbouts?.address[0] &&
      whereAbouts?.address[0].city}
  </Text>
);
