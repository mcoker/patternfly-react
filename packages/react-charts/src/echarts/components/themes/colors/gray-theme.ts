import chart_theme_gray_ColorScale_100 from '@patternfly/react-tokens/dist/esm/chart_theme_gray_ColorScale_100';
import chart_theme_gray_ColorScale_200 from '@patternfly/react-tokens/dist/esm/chart_theme_gray_ColorScale_200';
import chart_theme_gray_ColorScale_300 from '@patternfly/react-tokens/dist/esm/chart_theme_gray_ColorScale_300';
import chart_theme_gray_ColorScale_400 from '@patternfly/react-tokens/dist/esm/chart_theme_gray_ColorScale_400';
import chart_theme_gray_ColorScale_500 from '@patternfly/react-tokens/dist/esm/chart_theme_gray_ColorScale_500';
import { ColorTheme } from '../color-theme';
import { getComputedStyleValue } from '../../utils/styles';

/**
 * Gray color theme -- see https://docs.google.com/document/d/1cw10pJFXWruB1SA8TQwituxn5Ss6KpxYPCOYGrH8qAY/edit
 *
 * @private Not intended as public API and subject to change
 */
export const getGrayColorTheme = () =>
  ColorTheme({
    COLOR_SCALE: [
      getComputedStyleValue(chart_theme_gray_ColorScale_100),
      getComputedStyleValue(chart_theme_gray_ColorScale_200),
      getComputedStyleValue(chart_theme_gray_ColorScale_300),
      getComputedStyleValue(chart_theme_gray_ColorScale_400),
      getComputedStyleValue(chart_theme_gray_ColorScale_500)
    ]
  });
