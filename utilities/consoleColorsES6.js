// Actions
export const Reset = "\x1b[0m"
export const Bright = "\x1b[1m"
export const Dim = "\x1b[2m"
export const Underscore = "\x1b[4m"
export const Blink = "\x1b[5m"
export const Reverse = "\x1b[7m"
export const Hidden = "\x1b[8m"

// Foregrounds
export const FgBlack = "\x1b[30m"
export const FgRed = "\x1b[31m"
export const FgGreen = "\x1b[32m"
export const FgYellow = "\x1b[33m"
export const FgBlue = "\x1b[34m"
export const FgMagenta = "\x1b[35m"
export const FgCyan = "\x1b[36m"
export const FgWhite = "\x1b[37m"

// Backgrounds
export const BgBlack = "\x1b[40m"
export const BgRed = "\x1b[41m"
export const BgGreen = "\x1b[42m"
export const BgYellow = "\x1b[43m"
export const BgBlue = "\x1b[44m"
export const BgMagenta = "\x1b[45m"
export const BgCyan = "\x1b[46m"
export const BgWhite = "\x1b[47m"

// Bright Foregrounds
export const brightBlack = "\x1b[30m\x1b[1m"
export const brightRed = "\x1b[31m\x1b[1m"
export const brightGreen = "\x1b[32m\x1b[1m"
export const brightYellow = "\x1b[33m\x1b[1m"
export const brightBlue = "\x1b[34m\x1b[1m"
export const brightMagenta = "\x1b[35m\x1b[1m"
export const brightCyan = "\x1b[36m\x1b[1m"
export const brightWhite = "\x1b[37m\x1b[1m"

// Basic Combos fgOnBg

export const BlackOnRed = "\x1b[41m\x1b[30m\x1b[1m"
export const BlackOnGreen = "\x1b[42m\x1b[30m\x1b[1m"
export const BlackOnYellow = "\x1b[43m\x1b[30m\x1b[1m"
export const BlackOnBlue = "\x1b[44m\x1b[30m\x1b[1m"
export const BlackOnMagenta = "\x1b[45m\x1b[30m\x1b[1m"
export const BlackOnCyan = "\x1b[46m\x1b[30m\x1b[1m"
export const BlackOnWhite = "\x1b[47m\x1b[30m\x1b[1m"


export const RedOnBlack = "\x1b[40m\x1b[31m\x1b[1m"
export const RedOnGreen = "\x1b[42m\x1b[31m\x1b[1m"
export const RedOnYellow = "\x1b[43m\x1b[31m\x1b[1m"
export const RedOnBlue = "\x1b[44m\x1b[31m\x1b[1m"
export const RedOnMagenta = "\x1b[45m\x1b[31m\x1b[1m"
export const RedOnCyan = "\x1b[46m\x1b[31m\x1b[1m"
export const RedOnWhite = "\x1b[47m\x1b[31m\x1b[1m"

export const greenOnBlack = "\x1b[40m\x1b[32m\x1b[1m"
export const greenOnRed = "\x1b[41m\x1b[32m\x1b[1m"
export const greenOnYellow = "\x1b[43m\x1b[32m\x1b[1m"
export const greenOnBlue = "\x1b[44m\x1b[32m\x1b[1m"
export const greenOnMagenta = "\x1b[45m\x1b[32m\x1b[1m"
export const greenOnCyan = "\x1b[46m\x1b[32m\x1b[1m"
export const greenOnWhite = "\x1b[47m\x1b[32m\x1b[1m"

export const yellowOnBlack = "\x1b[41m\x1b[33m\x1b[1m"
export const yellowOnRed = "\x1b[42m\x1b[33m\x1b[1m"
export const yellowOnGreen = "\x1b[43m\x1b[33m\x1b[1m"
export const yellowOnBlue = "\x1b[44m\x1b[33m\x1b[1m"
export const yellowOnMagenta = "\x1b[45m\x1b[33m\x1b[1m"
export const yellowOnCyan = "\x1b[46m\x1b[33m\x1b[1m"
export const yellowOnWhite = "\x1b[47m\x1b[33m\x1b[1m"

export const blueOnBlack = "\x1b[41m\x1b[34m\x1b[1m"
export const blueOnRed = "\x1b[42m\x1b[34m\x1b[1m"
export const blueOnGreen = "\x1b[43m\x1b[34m\x1b[1m"
export const blueOnYellow = "\x1b[44m\x1b[34m\x1b[1m"
export const blueOnMagenta = "\x1b[45m\x1b[34m\x1b[1m"
export const blueOnCyan = "\x1b[46m\x1b[34m\x1b[1m"
export const blueOnWhite = "\x1b[47m\x1b[34m\x1b[1m"

export const magentaOnBlack = "\x1b[41m\x1b[35m\x1b[1m"
export const magentaOnRed = "\x1b[42m\x1b[35m\x1b[1m"
export const magentaOnGreen = "\x1b[43m\x1b[35m\x1b[1m"
export const magentaOnYellow = "\x1b[44m\x1b[35m\x1b[1m"
export const magentaOnBlue = "\x1b[45m\x1b[35m\x1b[1m"
export const magentaOnCyan = "\x1b[46m\x1b[35m\x1b[1m"
export const magentaOnWhite = "\x1b[47m\x1b[35m\x1b[1m"

export const cyanOnBlack = "\x1b[41m\x1b[36m\x1b[1m"
export const cyanOnRed = "\x1b[42m\x1b[36m\x1b[1m"
export const cyanOnGreen = "\x1b[43m\x1b[36m\x1b[1m"
export const cyanOnYellow = "\x1b[44m\x1b[36m\x1b[1m"
export const cyanOnBlue = "\x1b[45m\x1b[36m\x1b[1m"
export const cyanOnMagenta = "\x1b[46m\x1b[36m\x1b[1m"
export const cyanOnWhite = "\x1b[47m\x1b[36m\x1b[1m"

export const WhiteOnBlack = "\x1b[41m\x1b[37m\x1b[1m"
export const WhiteOnRed = "\x1b[42m\x1b[37m\x1b[1m"
export const WhiteOnGreen = "\x1b[43m\x1b[37m\x1b[1m"
export const WhiteOnYellow = "\x1b[44m\x1b[37m\x1b[1m"
export const WhiteOnBlue = "\x1b[45m\x1b[37m\x1b[1m"
export const WhiteOnMagenta = "\x1b[46m\x1b[37m\x1b[1m"
export const WhiteOnCyan = "\x1b[47m\x1b[37m\x1b[1m"

/*

*/

// Bright Combos


// module.exports = {
//   Reset,
//   Bright,
//   Dim,
//   Underscore,
//   Blink,
//   Reverse,
//   Hidden,
//   FgBlack,
//   FgRed,
//   FgGreen,
//   FgYellow,
//   FgBlue,
//   FgMagenta,
//   FgCyan,
//   FgWhite,
//   BgBlack,
//   BgRed,
//   BgGreen,
//   BgYellow,
//   BgBlue,
//   BgMagenta,
//   BgCyan,
//   BgWhite,
//   brightBlack,
//   brightRed,
//   brightGreen,
//   brightYellow,
//   brightBlue,
//   brightMagenta,
//   brightCyan,
//   brightWhite,
//   BlackOnRed,
//   BlackOnGreen,
//   BlackOnYellow,
//   BlackOnBlue,
//   BlackOnMagenta,
//   BlackOnCyan,
//   BlackOnWhite,
//   RedOnBlack,
//   RedOnGreen,
//   RedOnYellow,
//   RedOnBlue,
//   RedOnMagenta,
//   RedOnCyan,
//   RedOnWhite,
//   greenOnBlack,
//   greenOnRed,
//   greenOnYellow,
//   greenOnBlue,
//   greenOnMagenta,
//   greenOnCyan,
//   greenOnWhite,
//   yellowOnBlack,
//   yellowOnRed,
//   yellowOnGreen,
//   yellowOnBlue,
//   yellowOnMagenta,
//   yellowOnCyan,
//   yellowOnWhite,
//   blueOnBlack,
//   blueOnRed,
//   blueOnGreen,
//   blueOnYellow,
//   blueOnMagenta,
//   blueOnCyan,
//   blueOnWhite,
//   magentaOnBlack,
//   magentaOnRed,
//   magentaOnGreen,
//   magentaOnYellow,
//   magentaOnBlue,
//   magentaOnCyan,
//   magentaOnWhite,
//   cyanOnBlack,
//   cyanOnRed,
//   cyanOnGreen,
//   cyanOnYellow,
//   cyanOnBlue,
//   cyanOnMagenta,
//   cyanOnWhite,
//   WhiteOnBlack,
//   WhiteOnRed,
//   WhiteOnGreen,
//   WhiteOnYellow,
//   WhiteOnBlue,
//   WhiteOnMagenta,
//   WhiteOnCyan
// }
