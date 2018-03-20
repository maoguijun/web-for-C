import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'body': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'fontSize': [{ 'unit': 'px', 'value': 100 }],
    'WebkitTextSizeAdjust': 'none',
    'fontFamily': '"微软雅黑", "Microsoft YaHei", Helvetica, "Helvetica Neue", Tahoma, Arial, sans-serif'
  },
  'html': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }]
  },
  'body': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }]
  },
  'body': {
    'background': '#6b6b6c url("../public/1.png") no-repeat top center',
    'backgroundSize': 'cover',
    'backgroundAttachment': 'fixed'
  },
  'clearfix:before': {
    'content': '""',
    'display': 'table'
  },
  'clearfix:after': {
    'content': '""',
    'display': 'table'
  },
  'clearfix:after': {
    'clear': 'both',
    'overflow': 'hidden'
  },
  'clearfix': {
    '*zoom': '1',
    // IE 6/7
  },
  // ***************************** 字体设置 *****************************
  'fontFace': {
    'fontFamily': ''iconfont'',
    'src': 'url('./myfont/iconfont.eot')',
    'src': 'url('./myfont/iconfont.eot?#iefix') format('embedded-opentype'),
	url('./myfont/iconfont.woff') format('woff'),
	url('./myfont/iconfont.ttf') format('truetype'),
	url('./myfont/iconfont.svg#iconfont') format('svg')'
  },
  'iconfont': {
    'fontFamily': '"iconfont" !important',
    'fontSize': [{ 'unit': 'px', 'value': 16 }],
    'fontStyle': 'normal',
    'WebkitFontSmoothing': 'antialiased',
    'WebkitTextStrokeWidth': '0.2px',
    'MozOsxFontSmoothing': 'grayscale'
  },
  // ***************************** input字体设置 *****************************
  'input#mark::-webkit-input-placeholder': {
    // WebKit browsers
    'color': 'red',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'input#mark:-moz-placeholder': {
    // Mozilla Firefox 4 to 18
    'color': 'red',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'input#mark::-moz-placeholder': {
    // Mozilla Firefox 19+
    'color': 'red',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'input#mark:-ms-input-placeholder': {
    // Internet Explorer 10+
    'color': 'red',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  // ***************************** 字体设置 *****************************
  'a': {
    'textDecoration': 'none',
    'cursor': 'pointer'
  },
  'i': {
    'fontStyle': 'normal'
  },
  'em': {
    'fontStyle': 'normal'
  },
  'span': {
    'fontStyle': 'normal'
  },
  'img': {
    'display': 'block',
    'border': [{ 'unit': 'string', 'value': 'none' }]
  },
  'button': {
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'outline': 'none'
  },
  'li': {
    'listStyle': 'none'
  },
  'fl': {
    'float': 'left !important'
  },
  'fr': {
    'float': 'right !important'
  },
  'h1': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'h2': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'h3': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'h4': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'h5': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'p': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'ul': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'biaodan input': {
    'display': 'inline-block!important',
    'outline': 'none'
  },
  'biaodan textarea': {
    'display': 'inline-block!important',
    'outline': 'none'
  },
  'biaodan one': {
    'display': 'inline-block!important',
    'outline': 'none'
  },
  'gray': {
    'color': '#93999f'
  },
  'gray1': {
    'color': '#b7b7b7'
  },
  'gray1:hover': {
    'color': '#fff'
  },
  'gray2': {
    'color': '#7d7d7d'
  },
  'one': {
    'width': [{ 'unit': '%H', 'value': 0.11 }],
    'textAlign': 'right'
  },
  'logo': {
    'marginTop': [{ 'unit': 'px', 'value': 10 }]
  },
  'logo1': {
    'width': [{ 'unit': 'rem', 'value': 2.3 }],
    'verticalAlign': 'text-bottom',
    'display': 'inline-block'
  },
  'bold': {
    'fontWeight': '700'
  },
  'tdmm': {
    'width': [{ 'unit': '%H', 'value': 0.22 }]
  },
  'black': {
    'color': '#333'
  },
  'size34': {
    'width': [{ 'unit': 'rem', 'value': 3.4 }]
  },
  'all-rt button': {
    'borderRadius': '5px',
    'cursor': 'pointer'
  },
  'all-rt a': {
    'borderRadius': '5px',
    'cursor': 'pointer'
  },
  'edit': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }]
  },
  'main': {
    'width': [{ 'unit': 'rem', 'value': 12.8 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'padding': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 0 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.23 }]
  },
  'main title': {
    'height': [{ 'unit': 'rem', 'value': 1 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 1 }]
  },
  'main title p': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.42 }],
    'color': 'white',
    'fontFamily': ''arial'',
    'display': 'inline-block',
    'float': 'left'
  },
  'main p span': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }],
    'letterSpacing': [{ 'unit': 'px', 'value': 1 }]
  },
  'main biaodan': {
    'margin': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 10 }, { 'unit': 'string', 'value': 'auto' }],
    'background': 'white',
    'borderRadius': '10px'
  },
  'main biaodan zhangjie': {
    'padding': [{ 'unit': 'px', 'value': 14 }, { 'unit': 'px', 'value': 40 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 35 }],
    'borderBottom': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#f5f5f5' }]
  },
  'main biaodan zhangjie ul': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.3 }]
  },
  'biaodan zhangjie i': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.12 }]
  },
  'zhangjie yaoqiu': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.18 }],
    'marginTop': [{ 'unit': 'rem', 'value': 0.15 }]
  },
  'yaoqiu p': {
    'width': [{ 'unit': '%H', 'value': 0.9 }],
    'verticalAlign': 'top',
    'display': 'inline-block',
    'color': '#666666',
    'lineHeight': [{ 'unit': 'rem', 'value': 0.3 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'biaodan a': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }],
    'color': '#ec8378',
    'display': 'block'
  },
  'biaodan h3': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.22 }],
    'margin': [{ 'unit': 'px', 'value': 13 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 0 }],
    'color': '#333',
    'fontWeight': '400'
  },
  'biaodan span': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.13 }],
    'display': 'block',
    'color': '#a0a0a0',
    'letterSpacing': [{ 'unit': 'px', 'value': 0.5 }]
  },
  'biaodan bd-body': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.22 }],
    'padding': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 50 }, { 'unit': 'px', 'value': 16 }],
    'color': '#898989'
  },
  'bd-body bd-title': {
    'marginBottom': [{ 'unit': 'px', 'value': 4 }]
  },
  'bd-title one': {
    'width': [{ 'unit': '%H', 'value': 0.08 }]
  },
  'neirong one': {
    'width': [{ 'unit': '%H', 'value': 0.08 }]
  },
  'bd-body bd-title button': {
    'background': '#d7d7d7',
    'color': 'white',
    'borderRadius': '2px',
    'fontSize': [{ 'unit': 'rem', 'value': 0.1 }]
  },
  'bd-body bd-title input': {
    'width': [{ 'unit': '%H', 'value': 0.86 }],
    'height': [{ 'unit': 'rem', 'value': 0.35 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 0.35 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.18 }],
    'textIndent': '8px',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#e6e5e5' }],
    'borderRadius': '3px'
  },
  'txt': {
    'padding': [{ 'unit': 'rem', 'value': 0.15 }, { 'unit': 'rem', 'value': 0.1 }, { 'unit': 'rem', 'value': 0.1 }, { 'unit': 'rem', 'value': 1.1 }]
  },
  'txt #file': {
    'position': 'absolute',
    'overflow': 'hidden',
    'left': [{ 'unit': 'px', 'value': 0 }],
    'top': [{ 'unit': 'px', 'value': 0 }],
    'opacity': '0'
  },
  'txt upload': {
    'padding': [{ 'unit': 'px', 'value': 4 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 4 }, { 'unit': 'px', 'value': 10 }],
    'height': [{ 'unit': 'px', 'value': 20 }],
    'lineHeight': [{ 'unit': 'px', 'value': 20 }],
    'borderRadius': '5px',
    'background': '#e0301e',
    'color': 'white',
    'display': 'inline-block',
    'textAlign': 'center',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }],
    'fontWeight': '300'
  },
  'txt size': {
    'display': 'inline-block!important'
  },
  'txt-sm': {
    'marginTop': [{ 'unit': 'px', 'value': 10 }],
    'overflow': 'hidden',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#e6e5e5' }],
    'padding': [{ 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 0 }],
    'height': [{ 'unit': 'rem', 'value': 0.35 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 0.35 }],
    'width': [{ 'unit': '%H', 'value': 0.86 }],
    'marginLeft': [{ 'unit': 'rem', 'value': 1.1 }],
    'borderRadius': '3px'
  },
  'biaodan bd-body txt-sm li': {
    'float': 'left',
    'marginRight': [{ 'unit': '%H', 'value': 0.24 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.13 }],
    'color': '#b8b8b8'
  },
  'bd-body txt-sm ligongju': {
    'marginRight': [{ 'unit': '%H', 'value': 0.03 }],
    'float': 'right'
  },
  'txt-sm iname': {
    'lineHeight': [{ 'unit': 'rem', 'value': 0.25 }],
    'background': '#ffe5e6',
    'borderRadius': '5px',
    'color': '#ff868b',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'red' }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.1 }],
    'textAlign': 'center',
    'padding': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 1 }],
    'marginLeft': [{ 'unit': 'rem', 'value': 0.1 }],
    'verticalAlign': 'middle'
  },
  'bd-body txt-sm ligongju i': {
    'margin': [{ 'unit': '%V', 'value': 0.12 }, { 'unit': '%H', 'value': 0.12 }, { 'unit': '%V', 'value': 0.12 }, { 'unit': '%H', 'value': 0.12 }]
  },
  'neirong textarea': {
    'width': [{ 'unit': '%H', 'value': 0.846 }],
    'height': [{ 'unit': 'rem', 'value': 2.3 }],
    'verticalAlign': 'top',
    'outline': 'none',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#e6e5e5' }],
    'overflow': 'hidden',
    'padding': [{ 'unit': 'px', 'value': 8 }, { 'unit': 'px', 'value': 8 }, { 'unit': 'px', 'value': 8 }, { 'unit': 'px', 'value': 8 }],
    'borderRadius': '3px',
    'marginLeft': [{ 'unit': 'px', 'value': 4 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }],
    'color': '#333'
  },
  'button': {
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'save': {
    'width': [{ 'unit': '%H', 'value': 0.4 }],
    'margin': [{ 'unit': 'px', 'value': 30 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }]
  },
  'save button': {
    'width': [{ 'unit': '%H', 'value': 0.4 }],
    'height': [{ 'unit': 'rem', 'value': 0.5 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.16 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#ccc' }],
    'borderRadius': '5px',
    'color': '#bcbcbc'
  },
  // 注册
  'prop': {
    'width': [{ 'unit': 'rem', 'value': 4.2 }],
    'position': 'absolute',
    'left': [{ 'unit': '%H', 'value': 0.5 }],
    'marginLeft': [{ 'unit': 'rem', 'value': -2.1 }],
    'marginTop': [{ 'unit': 'rem', 'value': 1.1 }]
  },
  'prop-title': {
    'color': 'white',
    'height': [{ 'unit': 'rem', 'value': 1 }]
  },
  'prop-title a': {
    'display': 'inline-block',
    'verticalAlign': 'text-top'
  },
  'prop-title apwc': {
    'marginTop': [{ 'unit': 'rem', 'value': 0.15 }]
  },
  'prop-title h3': {
    'fontSize': [{ 'unit': 'px', 'value': 0 }],
    'display': 'inline-block',
    'textAlign': 'right',
    'letterSpacing': [{ 'unit': 'px', 'value': 2 }],
    'verticalAlign': 'text-top',
    'marginLeft': [{ 'unit': 'rem', 'value': 0.3 }]
  },
  'prop-title span': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.16 }],
    'display': 'block',
    'letterSpacing': [{ 'unit': 'px', 'value': 0 }],
    'fontWeight': '300',
    'lineHeight': [{ 'unit': 'rem', 'value': 0.4 }]
  },
  'prop-body': {
    'height': [{ 'unit': 'rem', 'value': 4 }],
    'background': 'white',
    'fontSize': [{ 'unit': 'rem', 'value': 0.3 }],
    'padding': [{ 'unit': 'rem', 'value': 0.4 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 0.12 }, { 'unit': 'px', 'value': 0 }],
    'borderRadius': '4px',
    'marginTop': [{ 'unit': 'rem', 'value': 0.2 }]
  },
  'prop-body p': {
    'textAlign': 'center',
    'color': '#333',
    'margin': [{ 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 0 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.2 }]
  },
  'form': {
    'width': [{ 'unit': '%H', 'value': 0.8 }],
    'margin': [{ 'unit': 'px', 'value': 35 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'position': 'relative'
  },
  '#regist': {
    'width': [{ 'unit': 'rem', 'value': 3.4 }]
  },
  'form input': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': 'rem', 'value': 0.46 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 0.46 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#e1e1e1' }],
    'borderRadius': '5px',
    'textIndent': '8px'
  },
  'form label': {
    'position': 'absolute',
    'top': [{ 'unit': 'rem', 'value': 0.15 }],
    'right': [{ 'unit': 'px', 'value': 5 }],
    'color': '#c4bfbf'
  },
  '#regist label': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.13 }]
  },
  'labeltwo': {
    'top': [{ 'unit': 'rem', 'value': 0.75 }]
  },
  'input[type="text"]': {
    'borderBottom': [{ 'unit': 'string', 'value': 'none' }]
  },
  'input[type=submit]': {
    'marginTop': [{ 'unit': 'rem', 'value': 0.5 }],
    'height': [{ 'unit': 'rem', 'value': 0.5 }],
    'background': '#e0301e',
    'color': 'white',
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'width': [{ 'unit': '%H', 'value': 1.01 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.18 }]
  },
  'prop-body mima': {
    'color': '#e0301e',
    'fontSize': [{ 'unit': 'rem', 'value': 0.18 }],
    'marginTop': [{ 'unit': 'rem', 'value': 0.2 }]
  },
  'prop-body mima a': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  // 登录步骤
  'prop-login': {
    'width': [{ 'unit': 'rem', 'value': 10 }],
    'borderRadius': '5px',
    'fontSize': [{ 'unit': 'rem', 'value': 0.2 }],
    'left': [{ 'unit': '%H', 'value': 0.5 }],
    'position': 'absolute',
    'marginLeft': [{ 'unit': 'rem', 'value': -5 }],
    'marginTop': [{ 'unit': 'rem', 'value': 0.65 }]
  },
  'prop-login login-pop': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': 'rem', 'value': 4.5 }],
    'background': 'white',
    'padding': [{ 'unit': 'px', 'value': 25 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 25 }, { 'unit': 'px', 'value': 0 }],
    'marginTop': [{ 'unit': 'px', 'value': 30 }],
    'borderRadius': '6px'
  },
  'login-pop ul': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 0.8 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 0.8 }],
    'overflow': 'hidden'
  },
  'login-top': {
    'position': 'relative',
    'color': 'white',
    'height': [{ 'unit': 'px', 'value': 100 }]
  },
  'login-top alogo1': {
    'position': 'absolute',
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'left': [{ 'unit': 'px', 'value': 0 }]
  },
  'login-top login-res': {
    'position': 'absolute',
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'right': [{ 'unit': 'px', 'value': 0 }]
  },
  'login-top login-res a': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'login-top learn': {
    'display': 'block',
    'fontWeight': '300',
    'fontSize': [{ 'unit': 'rem', 'value': 0.16 }]
  },
  'login-top img-logo': {
    'textAlign': 'right',
    'width': [{ 'unit': 'rem', 'value': 2.3 }],
    'marginLeft': [{ 'unit': 'rem', 'value': -1.3 }],
    'left': [{ 'unit': '%H', 'value': 0.5 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'position': 'absolute'
  },
  'login-top img-logo a': {
    'display': 'block',
    'marginBottom': [{ 'unit': 'px', 'value': 6 }]
  },
  'login-pop ul li': {
    'float': 'left',
    'width': [{ 'unit': '%H', 'value': 0.33333333330000003 }],
    'position': 'relative',
    'textAlign': 'center'
  },
  'login-pop ul li num': {
    'position': 'relative',
    'zIndex': '2',
    'background': 'white',
    'width': [{ 'unit': 'px', 'value': 50 }],
    'height': [{ 'unit': 'px', 'value': 26 }],
    'lineHeight': [{ 'unit': 'px', 'value': 26 }],
    'textAlign': 'center',
    'display': 'inline-block',
    'color': '#d4d4d4'
  },
  'login-pop ul li p': {
    'color': '#dedede'
  },
  'num em': {
    'fontStyle': 'italic',
    'fontSize': [{ 'unit': 'rem', 'value': 0.34 }],
    'fontWeight': '700',
    'fontFamily': 'Georgia'
  },
  'num i': {
    'position': 'absolute',
    'width': [{ 'unit': 'px', 'value': 5 }],
    'height': [{ 'unit': 'px', 'value': 5 }],
    'background': '#d4d4d4',
    'borderRadius': '5px',
    'top': [{ 'unit': '%V', 'value': 0.5 }],
    'marginTop': [{ 'unit': 'px', 'value': -1.3 }]
  },
  'round1': {
    'right': [{ 'unit': 'px', 'value': -3 }]
  },
  'round3': {
    'right': [{ 'unit': 'px', 'value': -3 }]
  },
  'round2': {
    'left': [{ 'unit': 'px', 'value': -3 }]
  },
  'round4': {
    'left': [{ 'unit': 'px', 'value': -3 }]
  },
  'round4': {
    'width': [{ 'unit': 'px', 'value': 0 }]
  },
  'line': {
    'height': [{ 'unit': 'px', 'value': 1 }],
    'background': '#dbdbdb',
    'display': 'inline-block',
    'width': [{ 'unit': '%H', 'value': 0.5 }],
    'top': [{ 'unit': 'px', 'value': 13 }],
    'position': 'absolute',
    'zIndex': '1'
  },
  'login-pop on line': {
    'background': 'red'
  },
  'on i': {
    'background': 'red'
  },
  'login-pop on p': {
    'color': 'red'
  },
  'on em': {
    'color': 'red'
  },
  'lbg-l': {
    'left': [{ 'unit': 'px', 'value': 0 }]
  },
  'lbg-r': {
    'right': [{ 'unit': 'px', 'value': 0 }]
  },
  'lbg-txt': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'login-form': {
    'position': 'relative',
    'paddingLeft': [{ 'unit': 'rem', 'value': 0.5 }],
    'overflow': 'hidden'
  },
  'login-form input': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#e1e1e1' }]
  },
  'login-form label': {
    'position': 'absolute',
    'right': [{ 'unit': 'rem', 'value': 2.6 }],
    'top': [{ 'unit': 'rem', 'value': 0.2 }],
    'zIndex': '100',
    'fontSize': [{ 'unit': 'rem', 'value': 0.13 }]
  },
  // 验证码
  'code': {
    'fontFamily': ''[Cuisine]'',
    'color': '#000',
    'fontSize': [{ 'unit': 'rem', 'value': 0.2 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 0.47 }],
    'fontStyle': 'italic',
    'width': [{ 'unit': 'rem', 'value': 1 }],
    'height': [{ 'unit': 'rem', 'value': 0.47 }],
    'letterSpacing': [{ 'unit': 'px', 'value': 1 }],
    'textAlign': 'center',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#e1e1e1' }],
    'borderRadius': '3px',
    'verticalAlign': 'middle',
    'display': 'inline-block',
    'float': 'right'
  },
  'login-form a': {
    'color': '#e0301e',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'login-form #inputCode': {
    'width': [{ 'unit': 'rem', 'value': 2.26 }],
    'display': 'inline-block'
  },
  'login-form div': {
    'width': [{ 'unit': '%H', 'value': 0.8 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }]
  },
  'login-form #email': {
    'width': [{ 'unit': 'rem', 'value': 3.4 }],
    'display': 'inline-block'
  },
  'login-form div span': {
    'width': [{ 'unit': '%H', 'value': 0.2 }],
    'display': 'inline-block',
    'float': 'left',
    'textAlign': 'center',
    'lineHeight': [{ 'unit': 'rem', 'value': 0.5 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.15 }]
  },
  'yanzheng': {
    'width': [{ 'unit': 'rem', 'value': 3.44 }],
    'display': 'inline-block'
  },
  'login-form #comfir': {
    'marginTop': [{ 'unit': 'rem', 'value': 0.3 }],
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'outline': 'none',
    'textAlign': 'center',
    'width': [{ 'unit': 'rem', 'value': 3.44 }],
    'marginLeft': [{ 'unit': '%H', 'value': 0.26 }],
    'display': 'block',
    'fontWeight': '700'
  },
  'login-form2 #comfir': {
    'marginTop': [{ 'unit': 'rem', 'value': 0.3 }],
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'outline': 'none',
    'textAlign': 'center',
    'width': [{ 'unit': 'rem', 'value': 3.44 }],
    'marginLeft': [{ 'unit': '%H', 'value': 0.26 }],
    'display': 'block',
    'fontWeight': '700'
  },
  'login-form3 #comfir': {
    'marginTop': [{ 'unit': 'rem', 'value': 0.3 }],
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'outline': 'none',
    'textAlign': 'center',
    'width': [{ 'unit': 'rem', 'value': 3.44 }],
    'marginLeft': [{ 'unit': '%H', 'value': 0.26 }],
    'display': 'block',
    'fontWeight': '700'
  },
  'login-form2': {
    'width': [{ 'unit': '%H', 'value': 0.5 }]
  },
  'login-form3': {
    'width': [{ 'unit': '%H', 'value': 0.5 }]
  },
  'login-form2 table': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'borderCollapse': 'separate',
    'borderSpacing': '13px',
    'marginLeft': [{ 'unit': 'rem', 'value': -0.5 }]
  },
  'login-form3 table': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'borderCollapse': 'separate',
    'borderSpacing': '13px',
    'marginLeft': [{ 'unit': 'rem', 'value': -0.5 }]
  },
  'login-form2 table tr': {
    'height': [{ 'unit': 'rem', 'value': 0.5 }]
  },
  'login-form2 table yx td': {
    'color': '#666',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'login-form2 tr yxyz': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.15 }],
    'textAlign': 'center'
  },
  'login-form2 table td label': {
    'top': [{ 'unit': 'rem', 'value': 0.95 }],
    'right': [{ 'unit': 'rem', 'value': 0.75 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.13 }]
  },
  'login-form2 #email2': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#ccc' }],
    'borderRadius': '4px'
  },
  'login-form2 #comfir': {
    'marginLeft': [{ 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'login-form3 #comfir': {
    'marginLeft': [{ 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'login-form2 tdyz': {
    'textAlign': 'right',
    'color': '#e0301e',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }],
    'display': 'block'
  },
  'login-form3 input': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#e1e1e1' }]
  },
  'login-form3 mm': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.15 }],
    'textAlign': 'center'
  },
  'login-form3 x1': {
    'top': [{ 'unit': 'rem', 'value': 0.35 }],
    'right': [{ 'unit': 'rem', 'value': 0.75 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.13 }]
  },
  'login-form3 x2': {
    'top': [{ 'unit': 'rem', 'value': 1 }],
    'right': [{ 'unit': 'rem', 'value': 0.75 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.13 }]
  },
  // 全部作业
  'all': {
    'width': [{ 'unit': 'rem', 'value': 14 }],
    'height': [{ 'unit': 'rem', 'value': 10 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.23 }]
  },
  'all-title': {
    'color': 'white',
    'marginTop': [{ 'unit': 'px', 'value': 20 }],
    'position': 'relative'
  },
  'all-title logo': {
    // width: 2.3rem;
    'display': 'inline-block',
    'verticalAlign': 'middle'
  },
  'all-title pwc': {
    'position': 'absolute',
    'right': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }]
  },
  'all-title span': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.13 }],
    'fontWeight': '300',
    'verticalAlign': 'bottom',
    'display': 'inline-block'
  },
  'all-prop': {
    'background': '#e9e9e9',
    'marginTop': [{ 'unit': 'px', 'value': 20 }],
    'height': [{ 'unit': 'rem', 'value': 7 }],
    'overflow': 'hidden',
    'borderRadius': '6px'
  },
  'all-prop all-left': {
    'float': 'left',
    'width': [{ 'unit': '%H', 'value': 0.16 }],
    'height': [{ 'unit': '%V', 'value': 1 }],
    'background': '#e9e9e9',
    'textAlign': 'center',
    'padding': [{ 'unit': 'px', 'value': 30 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'all-left apeople': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'width': [{ 'unit': 'rem', 'value': 0.8 }],
    'height': [{ 'unit': 'rem', 'value': 0.8 }],
    'borderRadius': '.4rem',
    'overflow': 'hidden',
    'display': 'block',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'white' }]
  },
  'all-left apeople img': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }]
  },
  'all-left span': {
    'display': 'block',
    'margin': [{ 'unit': 'px', 'value': 6 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 6 }, { 'unit': 'px', 'value': 0 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }],
    'fontWeight': '700'
  },
  'all-left spanallen': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.18 }]
  },
  'all-left ul': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'overflow': 'hidden',
    'marginTop': [{ 'unit': 'rem', 'value': 0.35 }]
  },
  'all-left ul li': {
    'padding': [{ 'unit': 'rem', 'value': 0.1 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 0.1 }, { 'unit': 'px', 'value': 0 }],
    'cursor': 'pointer'
  },
  'all-left ul liactive': {
    'background': '#b9b9b9'
  },
  'all-left ul li:hover': {
    'background': '#b9b9b9'
  },
  'all-left ul liactive a': {
    'color': 'white'
  },
  'all-left ul liactive i': {
    'color': 'white'
  },
  'all-left ul li:hover a': {
    'color': 'white'
  },
  'all-left ul li:hover i': {
    'color': 'white'
  },
  'all-left ul li a i': {
    'width': [{ 'unit': 'rem', 'value': 0.4 }],
    'height': [{ 'unit': 'rem', 'value': 0.3 }],
    'display': 'inline-block',
    'fontSize': [{ 'unit': 'rem', 'value': 0.26 }],
    'color': '#918f8f'
  },
  'all-left ul li a': {
    'display': 'block',
    'width': [{ 'unit': '%H', 'value': 0.59 }],
    'textAlign': 'left',
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'color': '#333',
    'fontSize': [{ 'unit': 'rem', 'value': 0.16 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 0.23 }]
  },
  'all-right': {
    'width': [{ 'unit': '%H', 'value': 0.84 }],
    'height': [{ 'unit': '%V', 'value': 1 }],
    'background': 'white',
    'padding': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 0 }],
    'float': 'left'
  },
  'all-rt button': {
    'width': [{ 'unit': '%H', 'value': 0.85 }],
    'background': '#f3f3f3',
    'height': [{ 'unit': 'rem', 'value': 0.45 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 0.45 }],
    'textAlign': 'left',
    'color': '#5a5a5a',
    'verticalAlign': 'middle',
    'textIndent': '8px',
    'fontSize': [{ 'unit': 'rem', 'value': 0.13 }]
  },
  'all-rt': {
    'paddingLeft': [{ 'unit': 'px', 'value': 20 }]
  },
  'all-rt a': {
    'width': [{ 'unit': 'rem', 'value': 1.3 }],
    'background': '#e0301e',
    'height': [{ 'unit': 'rem', 'value': 0.45 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 0.45 }],
    'textAlign': 'center',
    'color': 'white',
    'display': 'inline-block',
    'fontSize': [{ 'unit': 'rem', 'value': 0.16 }],
    'verticalAlign': 'middle',
    'marginLeft': [{ 'unit': 'rem', 'value': 0.2 }]
  },
  'all-right table': {
    'borderCollapse': 'collapse',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'marginTop': [{ 'unit': 'rem', 'value': 0.34 }],
    'marginBottom': [{ 'unit': 'rem', 'value': 2 }]
  },
  'add-pop table': {
    'borderCollapse': 'collapse',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'marginTop': [{ 'unit': 'rem', 'value': 0.34 }],
    'marginBottom': [{ 'unit': 'rem', 'value': 2 }]
  },
  'all-right table#tbl tbody tr': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#e7e3e3' }],
    'borderLeft': [{ 'unit': 'string', 'value': 'none' }],
    'borderRight': [{ 'unit': 'string', 'value': 'none' }],
    'cursor': 'pointer'
  },
  'add-pop table tbody tr': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#e7e3e3' }],
    'borderLeft': [{ 'unit': 'string', 'value': 'none' }],
    'borderRight': [{ 'unit': 'string', 'value': 'none' }],
    'cursor': 'pointer'
  },
  'all-right table tbody tr:hover': {
    'backgroundColor': '#f7f7f7'
  },
  'all-right table#tbl th': {
    'textAlign': 'left',
    'fontWeight': '400',
    'color': '#7d7c7c',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }],
    'padding': [{ 'unit': 'px', 'value': 19 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 19 }, { 'unit': 'px', 'value': 0 }]
  },
  'all-right table#tbl td': {
    'textAlign': 'left',
    'fontWeight': '400',
    'color': '#7d7c7c',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }],
    'padding': [{ 'unit': 'px', 'value': 19 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 19 }, { 'unit': 'px', 'value': 0 }]
  },
  'all-right table#tbl tr i': {
    'width': [{ 'unit': 'rem', 'value': 0.23 }],
    'height': [{ 'unit': 'rem', 'value': 0.24 }],
    'background': 'url("../public/wenjian.png")',
    'backgroundSize': '100%',
    'display': 'inline-block',
    'verticalAlign': 'middle'
  },
  'all-right table#tbl rt01': {
    'width': [{ 'unit': '%H', 'value': 0.4 }],
    'paddingLeft': [{ 'unit': 'px', 'value': 20 }]
  },
  'all-right table tr:nth-child(even)': {
    'background': '#fdfdfd'
  },
  'all-right table se': {
    'background': '#f7f7f7'
  },
  'all-right table#tbl rt02': {
    'width': [{ 'unit': '%H', 'value': 0.17 }]
  },
  'all-right table#tbl rt03': {
    'width': [{ 'unit': '%H', 'value': 0.28 }]
  },
  // 中间弹窗
  'add-pop': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.23 }],
    'width': [{ 'unit': 'rem', 'value': 11 }],
    'background': 'white',
    'position': 'absolute',
    'left': [{ 'unit': '%H', 'value': 0.5 }],
    'top': [{ 'unit': 'rem', 'value': 1 }],
    'marginLeft': [{ 'unit': 'rem', 'value': -5.5 }],
    'paddingTop': [{ 'unit': 'px', 'value': 10 }],
    'borderRadius': '5px',
    'zIndex': '2'
  },
  'add-pop p': {
    'textAlign': 'center',
    'fontSize': [{ 'unit': 'rem', 'value': 0.24 }],
    'fontStyle': 'italic',
    'textAlign': 'center',
    'position': 'relative',
    'paddingBottom': [{ 'unit': 'px', 'value': 8 }]
  },
  'oone': {
    'height': [{ 'unit': 'rem', 'value': 4.5 }],
    'width': [{ 'unit': '%H', 'value': 0.9 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'overflowY': 'scroll',
    'overflowX': 'hidden'
  },
  // 滚动条
  '::-webkit-scrollbar': {
    'width': [{ 'unit': 'px', 'value': 8 }],
    'position': 'absolute',
    'right': [{ 'unit': 'px', 'value': -10 }]
  },
  '::-webkit-scrollbar-thumb:vertical': {
    'borderRadius': '4px',
    'WebkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,.3)',
    'backgroundColor': 'rgba(129,129,129,0.5)'
  },
  'add-pop table tbody': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#e7e3e3' }]
  },
  'add-pop table': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.2 }]
  },
  'modal-table-allWorks': {
    'width': [{ 'unit': '%H', 'value': 0.9 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }]
  },
  'rt01': {
    'width': [{ 'unit': '%H', 'value': 0.45 }]
  },
  'modal-table-allWorks rt01': {
    'width': [{ 'unit': '%H', 'value': 0.46 }]
  },
  'modal-table-allWorks rt02': {
    'width': [{ 'unit': '%H', 'value': 0.16 }]
  },
  'add-pop table td': {
    'padding': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 15 }],
    'color': '#9c9a9a',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'add-pop table th': {
    'padding': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 15 }],
    'color': '#9c9a9a',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'add-pop table th': {
    'textAlign': 'left'
  },
  'add-pop swiper-container': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 25 }, { 'unit': 'px', 'value': 0 }]
  },
  'add-pop a': {
    'display': 'block',
    'textAlign': 'right',
    'fontStyle': 'normal',
    'marginRight': [{ 'unit': '%H', 'value': 0.02 }]
  },
  'add-pop swiper-slide': {
    'height': [{ 'unit': 'rem', 'value': 4.5 }]
  },
  'add-pop swiper-slide p aback': {
    'display': 'inline-block',
    'color': '#e2473a',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }],
    'float': 'left',
    'position': 'absolute',
    'left': [{ 'unit': 'rem', 'value': 0.5 }]
  },
  'add-pop swiper-container-horizontal>swiper-pagination-bullets': {
    'bottom': [{ 'unit': 'px', 'value': 0 }]
  },
  'swiper-pagination-custom': {
    'bottom': [{ 'unit': 'px', 'value': 0 }]
  },
  'swiper-pagination-fraction': {
    'bottom': [{ 'unit': 'px', 'value': 0 }]
  },
  'pop-bg': {
    // width:100%;height:100%;
    // position: absolute;
    'position': 'fixed',
    'top': [{ 'unit': '%V', 'value': 0 }],
    'right': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'left': [{ 'unit': '%H', 'value': 0 }],
    'opacity': '.5',
    'background': '#000',
    'zIndex': '1'
  },
  'add-pop page1': {
    'width': [{ 'unit': '%H', 'value': 0.05 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }]
  },
  'add-pop ul': {
    'textAlign': 'center',
    'overflow': 'hidden'
  },
  'add-pop ul li': {
    'width': [{ 'unit': 'px', 'value': 10 }],
    'height': [{ 'unit': 'px', 'value': 10 }],
    'borderRadius': '5px',
    'background': '#d7d7d7'
  },
  'add-pop licurrent': {
    'background': '#e0301e'
  },
  // 草稿箱
  'caogao': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 17 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 17 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.2 }],
    'color': '#4d555d'
  },
  'fenlei': {
    'background': '#f3f3f3',
    'textAlign': 'left',
    'padding': [{ 'unit': 'px', 'value': 8 }, { 'unit': 'px', 'value': 8 }, { 'unit': 'px', 'value': 8 }, { 'unit': 'px', 'value': 8 }],
    'borderRadius': '5px',
    'color': '#bcbcbc',
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'fenlei': {
    'color': '#b3b3b3'
  },
  'baog': {
    'marginBottom': [{ 'unit': 'rem', 'value': 0.4 }]
  },
  'bg-title': {
    'padding': [{ 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 8 }, { 'unit': 'px', 'value': 0 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.15 }]
  },
  'baog1': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#ccc' }],
    'borderRadius': '5px',
    'marginTop': [{ 'unit': 'px', 'value': 5 }],
    'padding': [{ 'unit': 'px', 'value': 12 }, { 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 12 }, { 'unit': 'px', 'value': 20 }]
  },
  'baog1 p': {
    'padding': [{ 'unit': 'px', 'value': 4 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 4 }, { 'unit': 'px', 'value': 0 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'baog1 bg-time': {
    'marginTop': [{ 'unit': 'px', 'value': 6 }]
  },
  'baog1 work-name': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.18 }],
    'display': 'inline-block'
  },
  'baog1 work-name i': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }],
    'color': '#666'
  },
  'baog1 done-submit': {
    'float': 'right',
    'color': '#989898'
  },
  'baog1 file-name': {
    'width': [{ 'unit': 'px', 'value': 32 }],
    'height': [{ 'unit': 'px', 'value': 24 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#ff5057' }],
    'background': '#ffe5e6',
    'borderRadius': '3px',
    'color': '#ff9396',
    'padding': [{ 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 3 }]
  },
  'baog1 yulan': {
    'verticalAlign': 'middle',
    'fontSize': [{ 'unit': 'rem', 'value': 0.22 }],
    'display': 'inline-block',
    'color': '#cdcdcd'
  },
  'baog-title': {
    'borderTop': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#ccc' }],
    'marginTop': [{ 'unit': 'px', 'value': 13 }],
    'color': '#7d7d7d',
    'padding': [{ 'unit': 'px', 'value': 18 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 18 }, { 'unit': 'px', 'value': 36 }],
    'lineHeight': [{ 'unit': 'px', 'value': 23 }]
  },
  'baog2': {
    'overflow': 'hidden',
    'marginTop': [{ 'unit': 'px', 'value': 15 }]
  },
  'baog2 jiantou': {
    'float': 'left',
    'width': [{ 'unit': '%H', 'value': 0.06 }]
  },
  'baog2 jiantou img': {
    'margin': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 20 }, { 'unit': 'string', 'value': 'auto' }]
  },
  'huifu': {
    'padding': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }],
    'width': [{ 'unit': '%H', 'value': 0.91 }],
    'float': 'right',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#ccc' }],
    'borderRadius': '3px'
  },
  'huifu time': {
    'textAlign': 'right',
    'margin': [{ 'unit': '%V', 'value': 0.015 }, { 'unit': '%H', 'value': 0.01 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'huifu txt1': {
    'marginLeft': [{ 'unit': '%H', 'value': 0.06 }],
    'marginTop': [{ 'unit': 'px', 'value': 7 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'huifu h5': {
    'textAlign': 'right'
  },
  'huifu h5 a': {
    'background': '#e0301e',
    'color': 'white',
    'padding': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 2 }],
    'margin': [{ 'unit': 'px', 'value': 12 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 12 }, { 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': 'rem', 'value': 1.3 }],
    'textAlign': 'center',
    'float': 'right',
    'borderRadius': '5px',
    'fontSize': [{ 'unit': 'rem', 'value': 0.16 }]
  },
  'huifu h5 yun': {
    'fontSize': [{ 'unit': 'px', 'value': 22 }],
    'verticalAlign': 'middle',
    'fontWeight': '400'
  },
  'all-rt a yun': {
    'fontSize': [{ 'unit': 'px', 'value': 22 }],
    'verticalAlign': 'middle',
    'fontWeight': '400'
  },
  'huifu hf': {
    'padding': [{ 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }],
    'overflow': 'hidden'
  },
  'huifu hf p': {
    'float': 'left'
  },
  'huifu hf a': {
    'width': [{ 'unit': 'px', 'value': 43 }],
    'height': [{ 'unit': 'px', 'value': 43 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#ccc' }],
    'display': 'inline-block',
    'borderRadius': '28px',
    'overflow': 'hidden',
    'verticalAlign': 'middle'
  },
  'huifu hf span': {
    'display': 'inline-block',
    'verticalAlign': 'middle',
    'marginLeft': [{ 'unit': 'px', 'value': 6 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 0.22 }]
  },
  'huifu hf span i': {
    'display': 'block',
    'fontSize': [{ 'unit': 'rem', 'value': 0.18 }]
  },
  'huifu hf span em': {
    'color': '#999',
    'fontSize': [{ 'unit': 'rem', 'value': 0.14 }]
  },
  'hf xiugai': {
    'float': 'right',
    'color': '#e0301e'
  },
  'hf green': {
    'color': '#39b54a'
  }
});
