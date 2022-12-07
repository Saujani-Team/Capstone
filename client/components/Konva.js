import React, { useEffect } from "react";
// import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";
// import Draw from "./Draw";

const Konva = () => {
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);
  const [elements, setElements] = React.useState([]);

  //   useEffect(() => {
  //     const rect = new Konva.Rect(10, 10, 100, 100);
  //     const line = new Konva.Line(10, 10, 110, 110);
  //   });

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };
  return (
    <div>
      {/* {this.props.isLoggedIn ? ( */}
      <div className="save-container">
        <button
          type="button"
          //   onClick={this.save.bind(this)}
        >
          Save Drawing
        </button>
      </div>
      {/* ) : null} */}
      <div className="collaboration-link-container">
        <button
          type="button"
          //   onClick={this.getLink.bind(this)}
        >
          Generate Link 🖇️
        </button>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        container="app"
        id="canvas"
      >
        <Layer>
          <Text text="Some text on canvas" fontSize={15} />
          <Rect
            x={20}
            y={50}
            width={100}
            height={100}
            fill="red"
            shadowBlur={10}
          />
          <Circle x={200} y={100} radius={50} fill="green" />

          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  );
};

const container = document.getElementById("app");
// const root = createRoot(container);
// root.render(<App />);

export default Konva;
