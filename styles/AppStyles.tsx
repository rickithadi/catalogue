import { StyleSheet } from "react-native";

export default StyleSheet.create({
  popCatParentContainer: {
    padding: 20,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  popCatHeaderContainer: {
    alignItems: "center",
    alignContent: "space-between",
    alignSelf: "auto",

    justifyContent: "space-between",
    flexDirection: "row",
  },

  catsAroundCard: {
    margin: 2,
    height: 200,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#007DA310",
    borderRadius: 5,
    overflow: "hidden",
  },
  catsAroundContainer: {
    flexDirection: "column",
  },
  catsAroundImageContainer: {
    flex: 2,
  },
  image: {
    flex: 1,
  },


  catsAroundTextContainer: {
    padding:20,
    flex: 2,
  },

  popCatCardTextContainer: {
    flex: 1,
    alignItems: "flex-start",
    alignContent: "flex-start",
    flexDirection: "column-reverse",
  },

  popCatCard: {
    flex: 1,
    borderRadius: 4,
    flexDirection: "column-reverse",
    overflow: "hidden",
    margin: 2,
    height: 182,
    width: 120,
  },
  popCatBigText: {
    fontFamily: "LondrinaSolid_400Regular",
    color: "white",
    paddingBottom: 0,
    fontSize: 16,
    textTransform: "capitalize",


  },
  popCatsmallText: {

    fontFamily: "RobotoMono_400Regular",
    color: "white",
    paddingBottom: 0,
    fontSize: 12,
    textTransform: "capitalize",


  },
  bannerContainer: {
    height: 200,
  },
  container: {
    flex: 1,
    height: 100,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  bannerTextContainer: {
    padding: 10,
    flexWrap: "nowrap",
    maxWidth: 200,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "center",
    alignSelf: "auto",
  },
  cardRow: {
    marginBottom: 2,
    marginTop: 2,
  },
  icon: {
    width: 15,
    height: 15,
    padding: 5,
    marginRight: 5,
    textAlignVertical: "middle",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  nothing: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "LondrinaSolid_400Regular",
    color: "#007DA3",
    textTransform: "capitalize",
  },
  locationStyle: {
    fontSize: 24,
    fontFamily: "LondrinaSolid_400Regular",
  },

  smallButtonText: {
    fontSize: 12,
    fontFamily: "RobotoMono_400Regular",
  },
  smallText: {
    fontSize: 10,
    fontFamily: "RobotoMono_400Regular",
  },

  bannerTitle: {
    fontFamily: "LondrinaSolid_400Regular",
    color: "white",
    padding: 20,
    paddingBottom: 0,
    fontSize: 24,
    textTransform: "capitalize",
  },
  bannersubText: {
    fontFamily: "RobotoMono_400Regular",
    color: "white",
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 16,
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  logo: {
    resizeMode: "contain",
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
  },

  noPadding: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginVertical: 4,
  },
  fillSpace: {
    flex: 1,
  },
  rightAligned: {
    justifyContent: "flex-end",
  },
  topMargin: {
    marginTop: 16,
  },
  bottomMargin: {
    marginBottom: 16,
  },
  rightMargin: {
    marginRight: 16,
  },
  leftMargin: {
    marginLeft: 16,
  },
  backgroundCover: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    opacity: 0.7,
    padding: 16,
  },
  lightText: {
    color: "#fff",
  },
  errorText: {
    color: "#ff0000",
  },
  header: {
    fontSize: 20,
    alignSelf: "center",
  },
  textInput: {
    alignSelf: "stretch",
    padding: 8,
    borderBottomWidth: 2,
    marginVertical: 8,
  },
  lightTextInput: {
    borderBottomColor: "#ffffff",
  },
  darkTextInput: {
    borderBottomColor: "#000000",
  },
  inlineTextButton: {
    color: "#87F1FF",
  },
  pressedInlineTextButton: {
    color: "#87F1FF",
    opacity: 0.6,
  },
  button: {
    backgroundColor: "#87F1FF",
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 60,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
