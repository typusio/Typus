type ApperacneMode = 'Our' | 'Custom';

export interface Appearance {
  successMode: ApperacneMode;
  successCustomRedirect: string;
  successTickBackground: string;
  successTickColor: string;
  successText: string;
  successBackgroundColor: string;
  successDots: boolean;
  errorMode: ApperacneMode;
  errorCustomRedirect: string;
  errorIconBackground: string;
  errorIconColor: string;
  errorBackgroundColor: string;
  errorDots: boolean;
}
