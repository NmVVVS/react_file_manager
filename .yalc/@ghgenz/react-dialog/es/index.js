import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, Component, createRef } from 'react';
import { FullscreenOutlined, MinusOutlined, FullscreenExitOutlined, CloseOutlined } from '@ant-design/icons';
import ReactDOM from 'react-dom/client';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ":root {\n  --header-height: 48px;\n  --footer-height: 48px;\n  --normal-radius: 8px;\n  --confirm-button-color: white;\n  --confirm-button-background-color: #1677ff;\n}\n\n.dialog-module_root__svyVq {\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.dialog-module_root__svyVq.dialog-module_normal__5-jmw {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 9;\n  background-color: rgba(0, 0, 0, 0.3);\n}\n.dialog-module_root__svyVq.dialog-module_fullScreen__KxbEq {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 9;\n  background-color: white;\n}\n.dialog-module_root__svyVq.dialog-module_fullScreen__KxbEq .dialog-module_container__nrTnt {\n  width: 100% !important;\n  height: 100%;\n  border-radius: 0;\n}\n.dialog-module_root__svyVq.dialog-module_fullScreen__KxbEq .dialog-module_container__nrTnt .dialog-module_body__nbtmv {\n  flex: 1;\n}\n.dialog-module_root__svyVq.dialog-module_fullScreen__KxbEq .dialog-module_container__nrTnt .dialog-module_footer__Jvk0G {\n  text-align: center;\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt {\n  background-color: white;\n  border-radius: var(--normal-radius);\n  display: flex;\n  flex-direction: column;\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_header__gpG2U {\n  display: flex;\n  justify-content: space-between;\n  height: var(--header-height);\n  border-bottom: 1px solid #eeeeee;\n  line-height: var(--header-height);\n  padding-left: 20px;\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_header__gpG2U .dialog-module_title__YJ1-D {\n  flex: 1;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_header__gpG2U .dialog-module_action__31NqO {\n  display: flex;\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_header__gpG2U .dialog-module_action__31NqO .dialog-module_actionItem__r7vxf {\n  width: var(--header-height);\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  background-color: transparent;\n  cursor: pointer;\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_header__gpG2U .dialog-module_action__31NqO .dialog-module_actionItem__r7vxf.dialog-module_min__s-dvc:hover, .dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_header__gpG2U .dialog-module_action__31NqO .dialog-module_actionItem__r7vxf.dialog-module_max__JrPQ-:hover {\n  background-color: #eeeeee;\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_header__gpG2U .dialog-module_action__31NqO .dialog-module_actionItem__r7vxf.dialog-module_close__QTOoi {\n  border-top-right-radius: var(--normal-radius);\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_header__gpG2U .dialog-module_action__31NqO .dialog-module_actionItem__r7vxf.dialog-module_close__QTOoi:hover {\n  background-color: rgb(232, 17, 35);\n  color: white;\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_footer__Jvk0G {\n  text-align: right;\n  border-top: 1px solid #eeeeee;\n  height: var(--footer-height);\n  line-height: var(--footer-height);\n  padding-right: 15px;\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_footer__Jvk0G .dialog-module_action__31NqO {\n  outline: none;\n  border: 0;\n  height: 32px;\n  width: 64px;\n  margin-inline: 5px;\n  border-radius: var(--normal-radius);\n  cursor: pointer;\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_footer__Jvk0G .dialog-module_close__QTOoi {\n  border: 1px solid #eeeeee;\n  background-color: white;\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_footer__Jvk0G .dialog-module_close__QTOoi:hover {\n  border-color: var(--confirm-button-background-color);\n  color: var(--confirm-button-background-color);\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_footer__Jvk0G .dialog-module_confirm__QcAmW {\n  border: 1px solid #eeeeee;\n  background-color: var(--confirm-button-background-color);\n  color: var(--confirm-button-color);\n}\n.dialog-module_root__svyVq .dialog-module_container__nrTnt .dialog-module_footer__Jvk0G .dialog-module_confirm__QcAmW:hover {\n  background-color: #4096ff;\n}\n\n.dialog-module_minContainer__k62Mg {\n  position: absolute;\n  z-index: 9;\n  right: 10px;\n  bottom: 10px;\n  width: 200px;\n  height: var(--header-height);\n  border: 1px solid #eeeeee;\n  background-color: white;\n  border-radius: var(--normal-radius);\n  display: flex;\n  justify-content: space-between;\n  line-height: var(--header-height);\n  padding-left: 10px;\n}\n.dialog-module_minContainer__k62Mg .dialog-module_title__YJ1-D {\n  flex: 1;\n  font-size: 14px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.dialog-module_minContainer__k62Mg .dialog-module_btn__LO81z {\n  width: var(--header-height);\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  background-color: transparent;\n  cursor: pointer;\n}\n.dialog-module_minContainer__k62Mg .dialog-module_btn__LO81z:hover {\n  background-color: #eeeeee;\n}";
var Style = {"root":"dialog-module_root__svyVq","normal":"dialog-module_normal__5-jmw","fullScreen":"dialog-module_fullScreen__KxbEq","container":"dialog-module_container__nrTnt","body":"dialog-module_body__nbtmv","footer":"dialog-module_footer__Jvk0G","header":"dialog-module_header__gpG2U","title":"dialog-module_title__YJ1-D","action":"dialog-module_action__31NqO","actionItem":"dialog-module_actionItem__r7vxf","min":"dialog-module_min__s-dvc","max":"dialog-module_max__JrPQ-","close":"dialog-module_close__QTOoi","confirm":"dialog-module_confirm__QcAmW","minContainer":"dialog-module_minContainer__k62Mg","btn":"dialog-module_btn__LO81z"};
styleInject(css_248z);

var Dialog = function (props) {
    var _a = useState(false), isFullScreen = _a[0], setFullScreen = _a[1];
    var _b = useState(false), isMin = _b[0], setMin = _b[1];
    var width = "30%", bodyPadding = "20px", min = props.min || true, max = props.max || true;
    if (props.width !== undefined) {
        if (typeof props.width === "number") {
            width = "".concat(props.width, "px");
        }
        else {
            width = props.width;
        }
    }
    if (props.bodyPadding !== undefined) {
        if (typeof props.bodyPadding === "number") {
            bodyPadding = "".concat(props.bodyPadding, "px");
        }
        else {
            bodyPadding = props.bodyPadding;
        }
    }
    if (props.visible === false) {
        return null;
    }
    if (isMin) {
        return jsxs("div", __assign({ className: Style.minContainer }, { children: [jsx("div", __assign({ className: Style.title }, { children: props.title })), jsx("button", __assign({ className: [Style.actionItem, Style.max, Style.btn].join(' '), onClick: function () { return setMin(false); } }, { children: jsx(FullscreenOutlined, {}) }))] }));
    }
    return jsx("div", __assign({ className: [Style.root, isFullScreen ? Style.fullScreen : Style.normal].join(' ') }, { children: jsxs("div", __assign({ className: Style.container, style: { width: width } }, { children: [jsxs("div", __assign({ className: Style.header }, { children: [jsx("div", __assign({ className: Style.title }, { children: props.title })), jsxs("div", __assign({ className: Style.action }, { children: [min ? jsx("button", __assign({ className: [Style.actionItem, Style.min].join(' '), onClick: function () { return setMin(true); } }, { children: jsx(MinusOutlined, {}) })) : null, max ? jsx("button", __assign({ className: [Style.actionItem, Style.max].join(' '), onClick: function () { return setFullScreen(!isFullScreen); } }, { children: isFullScreen ? jsx(FullscreenExitOutlined, {}) : jsx(FullscreenOutlined, {}) })) : null, jsx("button", __assign({ className: [Style.actionItem, Style.close].join(' '), onClick: props.onClose }, { children: jsx(CloseOutlined, {}) }))] }))] })), jsx("div", __assign({ className: Style.body, style: { padding: bodyPadding } }, { children: props.children })), jsxs("div", __assign({ className: Style.footer }, { children: [jsx("button", __assign({ className: [Style.action, Style.close].join(' '), onClick: props.onClose }, { children: "\u5173\u95ED" })), jsx("button", __assign({ className: [Style.action, Style.confirm].join(' '), onClick: props.onOk }, { children: "\u786E\u8BA4" }))] }))] })) }));
};

var dialogInstanceMap = new Map();
function ensureUniqDialogInstance(dialogId) {
    if (dialogInstanceMap.has(dialogId)) {
        throw new Error("Duplicate dialog id found: ".concat(dialogId));
    }
}
function addDialogInstance(dialogId, ref) {
    dialogInstanceMap.set(dialogId, ref);
}
var StandaloneDialog = /** @class */ (function (_super) {
    __extends(StandaloneDialog, _super);
    function StandaloneDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            visible: true,
        };
        _this.closeOptions = {};
        _this.onClosed = function () {
            var _a = _this.props, root = _a.root, onClose = _a.options.onClose, container = _a.container;
            var _b = _this.closeOptions.triggerOnClose, triggerOnClose = _b === void 0 ? true : _b;
            if (triggerOnClose && onClose) {
                onClose();
            }
            root.unmount();
            document.body.removeChild(container);
        };
        _this.onClose = function (e) {
            _this.close({
                triggerOnClose: e !== false,
            });
        };
        return _this;
    }
    StandaloneDialog.prototype.close = function (options) {
        if (options === void 0) { options = {}; }
        this.closeOptions = options;
        this.setState({
            visible: false,
        });
    };
    StandaloneDialog.prototype.componentWillUnmount = function () {
        var dialogId = this.props.options.dialogId;
        dialogInstanceMap.delete(dialogId);
    };
    StandaloneDialog.prototype.render = function () {
        var options = this.props.options;
        var visible = this.state.visible;
        return (jsx(Dialog, __assign({}, options, { 
            // onClose={this.onClose}
            onClose: this.onClosed, visible: visible })));
    };
    return StandaloneDialog;
}(Component));
function closeDialog(dialogId, options) {
    if (options === void 0) { options = {}; }
    var dialog = dialogInstanceMap.get(dialogId);
    if (!dialog) {
        return;
    }
    var wrapper = dialog.current;
    if (!wrapper) {
        return;
    }
    wrapper.close(options);
}
/*
  打开一个dialog，返回值是一个用来关闭dialog的函数。
*/
function openDialog(options) {
    // if (!isBrowser) return noop;
    if (options === void 0) { options = {}; }
    var _a = options.dialogId, dialogId = _a === void 0 ? new Date().valueOf().toString() : _a; options.parentComponent;
    ensureUniqDialogInstance(dialogId);
    var container = document.createElement('div');
    document.body.insertBefore(container, null);
    // 确保多次调用close不会报错
    var closeHandler = function (triggerOnClose) {
        if (triggerOnClose === void 0) { triggerOnClose = true; }
        closeDialog(dialogId, {
            triggerOnClose: triggerOnClose,
        });
    };
    var root = ReactDOM.createRoot(container);
    // ReactDOM.createRoot(container).unmount()
    // const render = ReactDOM.createRoot(container).render;
    // const render = parentComponent ? ReactDOM.unstable_renderSubtreeIntoContainer.bind(
    // 				ReactDOM,
    // 				parentComponent
    // 		)
    // 		: ReactDOM.render;
    var ref = createRef();
    // 不要依赖render的返回值，以后可能行为会改变
    root.render(jsx(StandaloneDialog, { ref: ref, options: __assign(__assign({}, options), { dialogId: dialogId }), container: container, root: root }));
    addDialogInstance(dialogId, ref);
    return closeHandler;
}

export { closeDialog, Dialog as default, openDialog };
