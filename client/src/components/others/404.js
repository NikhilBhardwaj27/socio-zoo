import React from "react";
import { Result, Button } from "antd";
import { connect } from "react-redux";

const NotFound = (props) => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapDispatchToProps)(NotFound);
