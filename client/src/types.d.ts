import '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    github?: Palette['primary'];
  }
  interface PaletteOptions {
    github?: PaletteOptions['primary'];
  }
}