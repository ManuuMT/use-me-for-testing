import React, { useRef, useEffect } from "react";
import "./App.css";

function App() {
  const refElement = useRef(null);
  const refResizer = useRef(null);
  const widthResize = true;
  const heightResize = false;

  useEffect(() => {
    const element = refElement.current;
    const styles = window.getComputedStyle(element);
    let width = parseInt(styles.width);
    let height = parseInt(styles.height);
    let x = 0;
    let y = 0;

    const HandleMouseDown = (event) => {
      x = event.clientX;
      y = event.clientY;
      document.addEventListener("mousemove", HandleMouseMove);
      document.addEventListener("mouseup", HandleMouseUp);
    };

    const HandleMouseMove = (event) => {
      if (widthResize) {
        const dx = event.clientX - x;
        x = event.clientX;
        width = width + dx;
        element.style.width = `${width}px`;
      }
      if (heightResize) {
        const dy = event.clientY - y;
        height = height + dy;
        y = event.clientY;
        element.style.height = `${height}px`;
      }
    };

    const HandleMouseUp = () => {
      document.removeEventListener("mousemove", HandleMouseMove);
    };

    // Add mouse down event listener
    const resizer = refResizer.current;
    resizer.addEventListener("mousedown", HandleMouseDown);

    return () => {
      resizer.removeEventListener("mousedown", HandleMouseDown);
    };
  }, []);

  return (
    <div className="container">
      <div ref={refElement} className="element">
        <div ref={refResizer} className="resizer"></div>
      </div>
    </div>
  );
}

export default App;
