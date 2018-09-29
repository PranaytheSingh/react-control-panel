export default (theme, id) => `
.control-panel-range-${id}::-webkit-slider-runnable-track {
  width: 100%;
  height: 20px;
  cursor: ew-resize;
  background: ${theme.background2};
}

.control-panel-range-${id}::-webkit-slider-thumb {
  height: 20px;
  width: 10px;
  background: ${theme.foreground1};
  cursor: ew-resize;
  -webkit-appearance: none;
  margin-top: 0px;
}

.control-panel-range-${id}:focus::-webkit-slider-runnable-track {
  background: ${theme.background2};
  outline: none;
}

.control-panel-range-${id}::-moz-range-track {
  width: 100%;
  height: 20px;
  cursor: ew-resize;
  background: ${theme.background2};
}

.control-panel-range-${id}::-moz-range-thumb {
  border: 0px solid rgba(0, 0, 0, 0);
  height: 20px;
  width: 10px;
  border-radius: 0px;
  background: ${theme.foreground1};
  cursor: ew-resize;
}

.control-panel-range-${id}::-ms-track {
  width: 100%;
  height: 20px;
  cursor: ew-resize;
  background: transparent;
  border-color: transparent;
  color: transparent;
}

.control-panel-range-${id}::-ms-fill-lower {
  background: ${theme.foreground1};
}

.control-panel-range-${id}::-ms-fill-upper {
  background: ${theme.foreground1};
}

.control-panel-range-${id}::-ms-thumb {
  width: 10px;
  border-radius: 0px;
  background: ${theme.foreground1};
  cursor: ew-resize;
  height: 20px;
}

.control-panel-range-${id}:focus::-ms-fill-lower {
  background: ${theme.foreground1};
  outline: none;
}

.control-panel-range-${id}:focus::-ms-fill-upper {
  background: ${theme.foreground1};
  outline: none;
}

.control-panel-range-${id} {
  -webkit-appearance: none;
  width: 47.5%;
  margin: 0px 0;
  margin-top: 2px;
}

.control-panel-range-${id}:focus {
  outline: none;
}
`;
