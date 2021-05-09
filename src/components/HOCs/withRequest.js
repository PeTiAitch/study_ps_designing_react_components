const withRequest = () => (Component) => {
  return () => {
    return <Component></Component>;
  };
};

export default withRequest;
