// get all elements with class ticking-ui
const tickingElements = document.getElementsByClassName("ticking-ui");

function primaryColor() {
  return "#ff0000ff";
}

function time() {
  return new Date().getTime();
}

function screenWidth() {
  return window.innerWidth;
}

function screenHeight() {
  return window.innerHeight;
}

// loop through all elements
function build(parent: HTMLElement) {
  if (parent.tagName != "DIV") {
    // get all attributes
    const attributes = parent.attributes;

    const attributesMap = {} as any;
    for (const attribute of attributes) {
      attributesMap[attribute.name] = attribute.value;
    }

    for (const attribute of attributes) {
      if (attribute.name.startsWith(":")) {
        const name = attribute.name.slice(1);
        let value = "";
        try {
          value = eval(attribute.value);
        } catch {}
        attributesMap[name] = value;
        parent.setAttribute(name, value);
      }
    }

    const value = attributesMap["value"];
    const all = attributesMap["all"];
    const shape = attributesMap["shape"];
    let color = attributesMap["color"];
    color = ARGBStringToRGBA(color);
    const shadows = attributesMap["shadows"];
    let width = attributesMap["width"];
    let height = attributesMap["height"];
    const top = attributesMap["top"];
    const right = attributesMap["right"];
    const bottom = attributesMap["bottom"];
    const left = attributesMap["left"];
    const x = attributesMap["x"];
    const y = attributesMap["y"];
    const scale = attributesMap["scale"];
    const originx = attributesMap["originx"];
    const originy = attributesMap["originy"];
    const alignment = attributesMap["alignment"];
    const direction = attributesMap["direction"];
    const content = attributesMap["content"];
    const borderradius = attributesMap["borderradius"];

    const mainaxisalignment = attributesMap["mainaxisalignment"];

    const crossaxisalignment = attributesMap["crossaxisalignment"];

    switch (mainaxisalignment) {
      case "start":
        parent.style.setProperty("justify-content", "flex-start");
        break;
      case "end":
        parent.style.setProperty("justify-content", "flex-end");
        break;
      case "center":
        parent.style.setProperty("justify-content", "center");
        break;
      case "spaceBetween":
        parent.style.setProperty("justify-content", "space-between");
        break;
      case "spaceAround":
        parent.style.setProperty("justify-content", "space-around");
        break;
      case "spaceEvenly":
        parent.style.setProperty("justify-content", "space-evenly");
        break;
    }

    switch (crossaxisalignment) {
      case "start":
        parent.style.setProperty("align-items", "flex-start");
        break;
      case "end":
        parent.style.setProperty("align-items", "flex-end");
        break;
      case "center":
        parent.style.setProperty("align-items", "center");
        break;
      case "stretch":
        parent.style.setProperty("align-items", "stretch");
        break;
      case "baseline":
        parent.style.setProperty("align-items", "baseline");
        break;
    }

    switch (parent.tagName.toLowerCase()) {
      case "padding":
        if (all) {
          parent.style.setProperty("padding", all);
          break;
        }
        parent.style.setProperty("padding-top", top ?? "0px");
        parent.style.setProperty("padding-right", right ?? "0px");
        parent.style.setProperty("padding-bottom", bottom ?? "0px");
        parent.style.setProperty("padding-left", left ?? "0px");

        break;
      case "color":
        let c = content ?? value ?? parent.innerHTML;
        // 转换为rgba
        c = ARGBStringToRGBA(c);
        parent.style.setProperty("background-color", c);
        parent.innerHTML = "";
        break;
      case "spacer":
        parent.style.setProperty("flex", "1");
        break;
      case "arcclipper":
        const start = attributesMap["start"];
        const sweep = attributesMap["sweep"];

        const startAngle = (start ?? 0) / 180 * Math.PI;
        const sweepAngle = (sweep ?? 0) / 180 * Math.PI;

        // 描绘出100个点，然后连接起来，使用clip-path，polygon

        const points = ['50% 50%'];
        const step = sweepAngle / 100;
        for (let i = 0; i <= 100; i++) {
          const angle = startAngle + step * i;
          const x = Math.cos(angle) * 50 + 50;
          const y = Math.sin(angle) * 50 + 50;
          points.push(`${x}% ${y}%`);
        }

        parent.style.setProperty("clip-path", `polygon(${points.join(",")})`);



        break;
      case "scale":
        if (originx || originy) {
          parent.style.setProperty(
            "transform-origin",
            `${originx ?? "0"} ${originy ?? "0"}`
          );
        }
        if (x || y) {
          parent.style.setProperty(
            "transform",
            `scale(${x ?? "1"}, ${y ?? "1"})`
          );
        } else {
          parent.style.setProperty("transform", `scale(${scale ?? "1"})`);
        }

        if (alignment) {
          parent.style.setProperty("align-self", alignment);
        }

        break;

      case "rotate":
        if (x || y) {
          parent.style.setProperty(
            "transform-origin",
            `${x ?? "0"} ${y ?? "0"}`
          );
        }
        if (alignment) {
          switch (alignment) {
            case "center":
              parent.style.setProperty("transform-origin", "50% 50%");
              break;
          }
        }
        const angle = attributesMap["angle"];
        parent.style.setProperty("transform", `rotate(${angle}deg)`);

        break;
      case "align":
        switch (alignment) {
          case "topLeft":
            parent.style.setProperty("align-self", "flex-start");
            parent.style.setProperty("justify-self", "flex-start");
            break;
          case "topCenter":
            parent.style.setProperty("align-self", "flex-start");
            parent.style.setProperty("justify-self", "center");
            break;
          case "topRight":
            parent.style.setProperty("align-self", "flex-start");
            parent.style.setProperty("justify-self", "flex-end");
            break;
          case "centerLeft":
            parent.style.setProperty("align-self", "center");
            parent.style.setProperty("justify-self", "flex-start");
            break;
          case "center":
            parent.style.setProperty("align-self", "center");
            parent.style.setProperty("justify-self", "center");
            break;
          case "centerRight":
            parent.style.setProperty("align-self", "center");
            parent.style.setProperty("justify-self", "flex-end");
            break;
          case "bottomLeft":
            parent.style.setProperty("align-self", "flex-end");
            parent.style.setProperty("justify-self", "flex-start");
            break;
          case "bottomCenter":
            parent.style.setProperty("align-self", "flex-end");
            parent.style.setProperty("justify-self", "center");
            break;
          case "bottomRight":
            parent.style.setProperty("align-self", "flex-end");
            parent.style.setProperty("justify-self", "flex-end");
            break;

          default:
            parent.style.setProperty("align-self", alignment);
            parent.style.setProperty("justify-self", alignment);
            break;
        }
        break;
      case "square":
        const size = attributesMap["size"] ?? attributesMap["dimension"];
        parent.style.setProperty("width", size + "px");
        parent.style.setProperty("height", size + "px");
        break;
      case "flex":
        // return Flex(
        //   direction: attributes['direction'] ?? Axis.horizontal,
        //   mainAxisAlignment:
        //       attributes['mainaxisalignment'] ?? MainAxisAlignment.center,
        //   crossAxisAlignment:
        //       attributes['crossaxisalignment'] ?? CrossAxisAlignment.center,
        //   mainAxisSize: attributes['mainaxissize'] ?? MainAxisSize.max,
        //   clipBehavior: attributes['clipbehavior'] ?? Clip.none,
        //   children: children,
        // );

        parent.style.setProperty("display", "flex");
        parent.style.setProperty("flex-direction", direction ?? "row");
        break;
      case "border":
        parent.style.setProperty("border-width", (width ?? "0") + "px");
        parent.style.setProperty("border-color", color ?? "black");
        parent.style.setProperty("border-style", "solid");
        if (shape === "circle") {
          parent.style.setProperty("border-radius", "50%");
          break;
        }
        if (shadows) {
          parent.style.setProperty("box-shadow", shadows);
        }

        break;
      case "box":
      case "container":
        if (shape === "circle") {
          parent.style.setProperty("border-radius", "50%");
        }
        if (borderradius) {
          parent.style.setProperty("border-radius", borderradius + "px");
        }
        if (color) {
          parent.style.setProperty("background-color", color);
        }
        if (shadows) {
          parent.style.setProperty("box-shadow", shadows);
        }
        if (width) {
          parent.style.setProperty("width", width + "px");
        }
        if (height) {
          parent.style.setProperty("height", height + "px");
        }
        break;
      default:
        for (const attribute of attributes) {
          switch (attribute.name) {
            case "content":
              parent.innerHTML = attribute.value;
              break;
            case "alignment":
              switch (parent.tagName.toLowerCase()) {
                case "stack":
                  parent.style.setProperty("align-items", attribute.value);
                  break;
              }
              break;
          }
          attributesMap[attribute.name] = attribute.value;
          parent.style.setProperty(attribute.name, attribute.value);
        }
    }
  }
  // get all children
  const children = parent.children;
  // loop through all children
  for (const child of children) {
    build(child as HTMLElement);
  }
  // changeTagName(parent, "div");
}

function changeTagName(element: HTMLElement, newTagName: string) {
  // 创建新的元素
  var newElement = document.createElement(newTagName);

  // 复制旧元素的属性
  for (var i = 0; i < element.attributes.length; i++) {
    newElement.setAttribute(
      element.attributes[i].name,
      element.attributes[i].value
    );
  }

  // 复制旧元素的子节点
  while (element.firstChild) {
    newElement.appendChild(element.firstChild);
  }

  // 替换旧元素
  element.parentNode?.replaceChild(newElement, element);
}

for (const parent of tickingElements) {
  const children = parent.children;
  // loop through all children
  for (const child of children) {
    build(child as HTMLElement);
  }
}

function ARGBStringToRGBA(argb: string) {
  if (argb == undefined) return undefined;
  if (argb.length == 9) {
    const a = parseInt(argb.slice(1, 3), 16) / 255;
    const r = parseInt(argb.slice(3, 5), 16);
    const g = parseInt(argb.slice(5, 7), 16);
    const b = parseInt(argb.slice(7, 9), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  } else {
    return argb;
  }
}
