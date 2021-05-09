function SpecialMessage({ children }) {
  // could get this from something like a push notification.
  const specialMessage = "Talk on Angular Cancelled at 10:30AM";
  return children({ specialMessage });
}

export default SpecialMessage;
