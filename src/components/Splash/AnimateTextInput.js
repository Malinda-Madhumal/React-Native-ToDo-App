import { Text } from "react-native";
import React from "react";
import { COLORS } from "../../constant/theme";

export default function AnimateTextInput(props) {
  // for the text that's display the screen as a text.
  const [text, setText] = React.useState("");
  // for cursor color because we want to change it according to the animation.
  const [cursorColor, setCursorColor] = React.useState("transparent");
  // for how much index that include inside the text.
  const [textIndex, setTextIndex] = React.useState(0);
  // for how much messages include inside the text.
  const [messageIndex, setMessageIndex] = React.useState(0);
  // for timeout that will helps us to change the time out on our need.
  const [timeouts, setTimeouts] = React.useState({
    typingTimeout: undefined,
    cursorTimeout: undefined,
    firstLineTimeout: undefined,
    secondLineTimeout: undefined,
  });

  const textRef = React.useRef(text);
  textRef.current = text;

  const cursorRef = React.useRef(cursorColor);
  cursorRef.current = cursorColor;

  const messageIndexRef = React.useRef(messageIndex);
  messageIndexRef.current = messageIndex;

  const textIndexRef = React.useRef(textIndex);
  textIndexRef.current = textIndex;

  const timeoutRef = React.useRef(timeouts);
  timeoutRef.current = timeouts;

  const typingAnimation = () => {
    /* 
     Check the current text index position is less than the props.text of current messageIndexRef array's length.
     If it's then update the text state to when typing every timeout to change the the text.
     And set the text index to keep increment by the current text index position.
     */
    if (textIndexRef.current < props.text[messageIndexRef.current].length) {
      setText(
        textRef.current +
          props.text[messageIndexRef.current].charAt(textIndexRef.current)
      );
      setTextIndex(textIndexRef.current + 1);

      /*
      Create a new update timeout within spread operation so we can copy the all properties of the cross all over the timeout reference.
      Create the new typing timeout because to move to next character and the current element that we at and give 50 milliseconds delay to before the next one called.
      */
      const updateTimeout = { ...timeoutRef.current };
      updateTimeout.typingTimeout = setTimeout(typingAnimation, 50);
      setTimeouts(updateTimeout);

      /* 
      Check if current message index position is less than the length of text property, and if it's we set the message index state to keep increment by the current message index position.
      Set the text index position to 0 because we are increment the current message index position one by one
       */
    } else if (messageIndexRef.current + 1 < props.text.length) {
      setMessageIndex(messageIndexRef.current + 1);
      setTextIndex(0);

      /*
      1.Create a new update timeout to change the timeouts.
      2.And first we update the first line timeout with new function call newLineAnimation and 120 milliseconds of delay to execute before the next one called.
      3.And same as the first line animation we update the seconde line timeout with newLineAnimation and it's 200 milliseconds of delay.
      4.Finally we update the the typing timeout because we want to go back again once newLineAnimation finish and it's 280 millisecons of delay because we want to first appear the 2 lines of text.
      */
      const updateTimeout = { ...timeoutRef.current };
      updateTimeout.firstLineTimeout = setTimeout(newLineAnimation, 120);
      updateTimeout.secondLineTimeout = setTimeout(newLineAnimation, 200);
      updateTimeout.typingTimeout = setTimeout(typingAnimation, 280);
      setTimeouts(updateTimeout);
    } else {
      /*
      In here we clear the interval of cursor timeout because we don't want to blink the cursor once the typing effect is done.
      And we set the cursor color to "transparent" to make sure the cursor is not visible on the screen.
      */
      clearInterval(timeoutRef.current.cursorTimeout);
      setCursorColor("transparent");

      // call the onComplete function so we can render to the user once the typing animation is done like buttons etc.
      if (props.onComplete) {
        props.onComplete();
      }
    }
  };

  const newLineAnimation = () => {
    setText(textRef.current);
  };

  const cursorAnimation = () => {
    // Check the cursor color is equal to the transparent and we set it to any colors, because we want to change the cursor color when the typing effect is start and we want to change it back to transparent when the typing effect is done.
    if (cursorRef.current === "transparent") {
      setCursorColor(COLORS.red);
    } else {
      setCursorColor("transparent");
    }
  };

  React.useEffect(() => {
    let updatetimeout = { ...timeoutRef.current };
    updatetimeout.typingTimeout = setTimeout(typingAnimation, 500);
    updatetimeout.cursorTimeout = setInterval(cursorAnimation, 250);
    setTimeouts(updatetimeout);

    /*
    We are clear the time out so that's going to be basically make sure the timeout still not going once component unmount. 
    And we clear the interval of cursor timeout because it not a timeout it's a interval because it's blinking according to the typing timeout.
    */
    return () => {
      clearTimeout(timeoutRef.current.typingTimeout);
      clearTimeout(timeoutRef.current.firstLineTimeout);
      clearTimeout(timeoutRef.current.secondLineTimeout);
      clearInterval(timeoutRef.current.cursorTimeout);
    };
  }, []);

  return (
    <Text
      onLayout={props.onLayout}
      style={{
        fontSize: 28,
        color: COLORS.red,
        fontFamily: "PopinsBold",
        maxWidth: 255,
      }}
    >
      {text}
      <Text
        style={{
          color: cursorColor,
        }}
      >
        |
      </Text>
    </Text>
  );
}
