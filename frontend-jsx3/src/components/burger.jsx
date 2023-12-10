import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import { GrStorage } from "react-icons/gr";
import Storage from './storage'
function Burger() {
  const [show, setShow] = useState(null);
  const target = useRef(null);

  return (
    <>
  
   
    <div style={{ margin:'35px' }}>
      <Button variant="danger" ref={target} onMouseOver={() => setShow(!show)}>
      <GrStorage />
      </Button>
      </div>
      <Overlay target={target.current} show={show} placement="right">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: "absolute",
              backgroundColor: "rgba(255, 100, 100, 0.85)",
              padding: "5px 10px",
              color: "white",
              borderRadius: 3,
              ...props.style,
            }}
          >
           <Storage/>
          </div>
        )}
      </Overlay>
    </>
  );
}

export default Burger;
