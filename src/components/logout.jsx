function LogOut(props) {
  const LogOut = () => {
    props.history.replace("/");
  };
  const styleDiv = { position: "fixed", top: "1px", right: "1px" };
  return (
    <div style={styleDiv}>
      <button className="btn  btn-danger" onClick={LogOut}>
        LogOut
      </button>
    </div>
  );
}

export default LogOut;
