/**
 * Lighten / Darkens a hex color code. Only works for 6 character hex codes!
 * @param color - hex color code to apply the function to
 * @param percent - positive/negative value between [-1,1] to lighten/darken color
 * @returns lightened/darkened hex code of the input color
 */
export function lighten(color: string, percent: number) {
    const num = parseInt(color.replace("#",""),16),
      amt = Math.round(2.55 * percent * 100),
      R = (num >> 16) + amt,
      B = (num >> 8 & 0x00FF) + amt,
      G = (num & 0x0000FF) + amt;
      return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
}
// export function LightenDarkenColor(color: string, amt: number) {
//     let usePound = false;
  
//     if (color[0] == "#") {
//         color = color.slice(1);
//         usePound = true;
//     }
 
//     const num = parseInt(color,16);
 
//     let _r = (num >> 16) + amt;
 
//     if (_r > 255) _r = 255;
//     else if  (_r < 0) _r = 0;
 
//     let _b = ((num >> 8) & 0x00FF) + amt;
 
//     if (_b > 255) _b = 255;
//     else if  (_b < 0) _b = 0;
 
//     let _g = (num & 0x0000FF) + amt;
 
//     if (_g > 255) _g = 255;
//     else if (_g < 0) _g = 0;

//     const [r, g, b]: any = [_r,_g,_b].map(_color => _color <= 15 ? `0${_color.toString(16)}` : _color.toString(16));
 
//     return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
// }
