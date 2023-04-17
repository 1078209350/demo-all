import React from "react";
import DynamicComponent from "@src/components/utils/Dynamic/DynamicComponent";

class Header extends DynamicComponent {
  render() {
    return (
        <div>
          <p>This is Home</p>
        </div>
    );
  }
}

export default Header;
