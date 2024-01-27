// get all elements with class zenlite
const zenliter = document.getElementById("zenlite");

const pages = import.meta.glob("./**/*.zlt", { as: "raw", eager: true });
console.log(pages);
// 监听路由变化
window.addEventListener("load", async function (_) {
  // 获取@/pages目录结构
  let path = window.location.pathname;
  console.log(path);
  if (path == "/") {
    path = "/index";
  }
  // 获取当前页面
  let currentPage = pages[`./pages${path}.zlt`];
  if (!currentPage) {
    // 尝试添加index
    path += path.endsWith("/") ? "index" : "/index";
    currentPage = pages[`./pages${path}.zlt`];
  }
  if (import.meta.env.DEV) {
    console.debug(`ZenRoute -> ${path}`);
  }
  if (zenliter) {
    zenliter.innerHTML = currentPage;
    build(zenliter);
  }
});

function htmlDecode(value: string) {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#47;/g, "/")
    .replace(/&#40;/g, "(")
    .replace(/&#41;/g, ")")
    .replace(/&#123;/g, "{")
    .replace(/&#125;/g, "}")
    .replace(/&#91;/g, "[")
    .replace(/&#93;/g, "]")
    .replace(/&#35;/g, "#")
    .replace(/&#37;/g, "%")
    .replace(/&#59;/g, ";")
    .replace(/&#43;/g, "+")
    .replace(/&#45;/g, "-")
    .replace(/&#42;/g, "*")
    .replace(/&#64;/g, "@")
    .replace(/&#36;/g, "$")
    .replace(/&#95;/g, "_");
  // 添加更多实体字符的解码规则
}

// loop through all elements
export function build(parent: HTMLElement | string) {
  if (typeof parent == "string") {
    parent = document.querySelector(parent) as HTMLElement;
  }
  if (parent.tagName == "SCRIPT") {
    eval(parent.innerHTML);
    return;
  }
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
        // @ts-ignore
        function width() {
          return window.innerWidth;
        }
        // @ts-ignore
        function height() {
          return window.innerHeight;
        }

        value = eval(htmlDecode(attribute.value));
      } catch (e) {
        console.log(e);
      }
      attributesMap[name] = value;
      parent.setAttribute(name, value);
    } else if (attribute.name.startsWith("@")) {
      if (attribute.name == "@click") {
        parent.style.setProperty("cursor", "pointer");
      }
      // 绑定事件
      const name = attribute.name.slice(1);
      const value = attribute.value;
      parent.addEventListener(name, (e) => {
        try {
          eval(value)(e);
        } catch (e) {
          console.log(e);
        }
      });
      // 删除这个属性
      parent.removeAttribute(attribute.name);
    }
  }

  if (attributesMap["if"] == false) {
    parent.style.setProperty("display", "none");
    return;
  }

  for (const attribute of attributes) {
    switch (attribute.name) {
      case "content":
        parent.innerHTML = attribute.value;
        break;
    }
    attributesMap[attribute.name] = attribute.value;
    parent.style.setProperty(attribute.name, attribute.value);
  }

  // get all children
  const children = parent.children;
  // loop through all children
  for (const child of children) {
    build(child as HTMLElement);
  }
  // changeTagName(parent, "div");
}
