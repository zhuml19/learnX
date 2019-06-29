import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Navigation } from "react-native-navigation";
import AntDesign from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import RaisedButton from "../components/RaisedButton";
import TextField from "../components/TextField";
import Colors from "../constants/Colors";
import { dummyPassword, dummyUsername } from "../helpers/dummy";
import { getTranslation } from "../helpers/i18n";
import { showToast } from "../helpers/toast";
import { login } from "../redux/actions/auth";
import { setCurrentSemester } from "../redux/actions/currentSemester";
import { setMockStore } from "../redux/actions/root";
import { getAllSemesters } from "../redux/actions/semesters";
import { IPersistAppState } from "../redux/types/state";
import { INavigationScreen } from "../types/NavigationScreen";

interface ILoginScreenProps {
  readonly loggedIn: boolean;
  readonly loginError?: Error | null;
  readonly semesters: readonly string[];
  readonly getAllSemestersError?: Error | null;
  readonly login: (username: string, password: string) => void;
  readonly setMockStore: () => void;
  readonly setCurrentSemester: (semesterId: string) => void;
  readonly getAllSemesters: () => void;
}

const LoginScreen: INavigationScreen<ILoginScreenProps> = props => {
  const {
    loggedIn,
    semesters,
    login,
    loginError,
    setMockStore,
    setCurrentSemester,
    getAllSemesters,
    getAllSemestersError
  } = props;

  const [loginButtonPressed, setLoginButtonPressed] = useState(false);
  useEffect(() => {
    if (loginButtonPressed && loginError) {
      showToast(getTranslation("loginFailure"), 1500);
      setLoginButtonPressed(false);
    }
  }, [loginError]);

  useEffect(() => {
    if (loggedIn) {
      showToast(getTranslation("fetchingSemesters"), 1500);
      getAllSemesters();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && semesters.length !== 0) {
      setCurrentSemester(semesters[0]);
      Keyboard.dismiss();
      Navigation.dismissModal("login");
    }
  }, [semesters.length]);

  useEffect(() => {
    if (getAllSemestersError) {
      showToast(getTranslation("networkError"), 1500);
      setLoginButtonPressed(false);
    }
  }, [getAllSemestersError]);

  const usernameTextFieldRef = useRef<typeof TextInput>();
  const passwordTextFieldRef = useRef<typeof TextInput>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(
        {
          duration: 800,
          create: {
            delay: 200,
            property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.easeInEaseOut
          },
          update: {
            property: LayoutAnimation.Properties.scaleXY,
            type: LayoutAnimation.Types.easeOut
          }
        },
        () =>
          usernameTextFieldRef.current &&
          (usernameTextFieldRef.current as any).getNode().focus()
      );
      setFormVisible(true);
    }, 800);
  }, []);

  const [logoSize, setLogoSize] = useState(160);
  const onLogoPress = () => {
    if (logoSize >= 200) {
      LayoutAnimation.spring();
      setLogoSize(160);
    } else {
      LayoutAnimation.spring();
      setLogoSize(oldSize => oldSize + 10);
    }
  };

  const handleKeyboardNext = () =>
    passwordTextFieldRef.current &&
    (passwordTextFieldRef.current as any).getNode().focus();

  const handleUsernameChange = (text: string) => setUsername(text);

  const handlePasswordChange = (text: string) => setPassword(text);

  const handleDummyUser = (username: string, password: string) => {
    if (username === dummyUsername && password === dummyPassword) {
      setMockStore();
      return;
    }
  };

  const onLoginButtonPress = () => {
    Keyboard.dismiss();
    setLoginButtonPressed(true);

    if (username && password) {
      handleDummyUser(username, password);
      login(username, password);
    } else {
      showToast(getTranslation("completeCredentials"), 1500);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={onLogoPress}>
          <Image
            style={{ height: logoSize, width: logoSize }}
            source={require("../assets/images/MaskedAppIcon.png")}
          />
        </TouchableWithoutFeedback>
        {formVisible && (
          <View
            style={{
              marginTop: 30,
              marginBottom: 30,
              alignItems: "center"
            }}
          >
            <TextField
              icon={<AntDesign name="user" size={25} color={Colors.theme} />}
              tintColor={Colors.theme}
              textContentType="username"
              returnKeyType="next"
              placeholder={getTranslation("username")}
              placeholderTextColor={Colors.lightTheme}
              onSubmitEditing={handleKeyboardNext}
              ref={usernameTextFieldRef}
              value={username}
              onChangeText={handleUsernameChange}
            />
            <TextField
              containerStyle={{ marginTop: 20 }}
              icon={<AntDesign name="key" size={25} color={Colors.theme} />}
              tintColor={Colors.theme}
              textContentType="password"
              secureTextEntry={true}
              returnKeyType="done"
              placeholder={getTranslation("password")}
              placeholderTextColor={Colors.lightTheme}
              ref={passwordTextFieldRef}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <RaisedButton
              style={{
                backgroundColor: Colors.theme,
                width: 100,
                height: 40,
                marginTop: 30
              }}
              textStyle={{ color: "white" }}
              onPress={onLoginButtonPress}
            >
              {getTranslation("login")}
            </RaisedButton>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: IPersistAppState) => ({
  loggedIn: state.auth.loggedIn,
  loginError: state.auth.error,
  semesters: state.semesters.items,
  getAllSemestersError: state.semesters.error
});

const mapDispatchToProps = {
  login: (username: string, password: string) => login(username, password),
  setMockStore,
  setCurrentSemester: (semesterId: string) => setCurrentSemester(semesterId),
  getAllSemesters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
