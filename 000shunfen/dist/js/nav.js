"use strict";function options(n,t){for(var o=0;o<n.length;o++)n[o].arr=o,n[o].onmouseover=function(){for(var o=0;o<t.length;o++)t[o].style.display="none",n[o].id="";t[this.arr].style.display="block",this.id="active"},n[o].onmouseout=function(){t[this.arr].style.display="none"}}function levelMeum(o,n){o.onmouseover=function(){n.style.display="block"},o.onmouseout=function(){n.style.display="none"}}