import { Required, Allow } from '@tsed/common';

export class EditAppearanceModel {
  @Allow() successMode: string;
  @Allow() successCustomRedirect: string;
  @Allow() successTickBackground: string;
  @Allow() successTickColor: string;
  @Allow() successText: string;
  @Allow() successButtonColor: string;
  @Allow() successBackgroundColor: string;
  @Allow() successDots: boolean;

  @Allow() errorMode: string;
  @Allow() errorCustomRedirect: string;
  @Allow() errorIconBackground: string;
  @Allow() errorIconColor: string;
  @Allow() errorButtonColor: string;
  @Allow() errorBackgroundColor: string;
  @Allow() errorDots: boolean;
}
