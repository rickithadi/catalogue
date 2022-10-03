import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

const colorScheme = useColorScheme();
export default StyleSheet.create({
  createCatContainer: {
    alignContent: "space-around",
    flexDirection: "row",
  },
  spinner: {
    marginTop: 50,
    marginBottom: 50,
    // backgroundColor: "black",
    height: "100%",
  },
  loadingBG: {
    backgroundColor: Colors[colorScheme].background,
    // backgroundColor: "black",
    height: "100%",
  },
  createCatImageContainer: {
    flex: 2,
    alignItems: "center",
    alignSelf: "center",
    height: "100%",
    alignContent: "center",
    flexDirection: "row",
  },
  selectedImageContainer: {
    flexWrap: "wrap",
    padding: 20,
    paddingBottom: 2,
    paddingTop: 22,
    // padding: 12,
    // paddingTop: "5%",
    alignItems: "center",
    alignSelf: "center",
    height: 200,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  popCatParentContainer: {
    padding: 10,
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
  formVerticalEven: {
    // alignItems: "center",
    // alignContent: "space-between",
    // alignSelf: "auto",

    // justifyContent: "space-between",

    flexDirection: "row",
    alignItems: "flex-start",
  },

  evenlyVert: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
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
  createCatImage: {
    height: 100,
    width: 100,
  },
  imageOverlay: {
    position: "absolute",
    zIndex: 99,
    top: 2,
    right: 0,
  },

  catsAroundTextContainer: {
    padding: 20,
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
  selectedImagesContainer: {
    padding: 2,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  container: {
    flex: 2,
    height: "100%",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  formContainer: {
    paddingTop: 22,
    padding: 12,
    flex: 2,
    height: "100%",
    // alignItems: "stretch",
    // justifyContent: "flex-start",
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
    // textAlignVertical: "middle",
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    fontSize: 60,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },

  photoContainer: {
    height: 100,
    flex: 1,
  },
  inputGroup: {
    height: 40,
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
    // flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
});
