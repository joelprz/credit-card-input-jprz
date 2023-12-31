import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import InfoButton from "../components/InfoButton.js";


let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

act(() => {
    render(<InfoButton/>, container);
});

expect(container.textContent).toBe("&#x3f;");