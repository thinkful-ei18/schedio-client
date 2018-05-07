import { API_BASE_URL } from '../../config';

export const TOGGLE_WIDGET_DISPLAY = 'TOGGLE_WIDGET_DISPLAY';
export const toggleWidgetDisplay = (widget, isShown) => ({
  type: TOGGLE_WIDGET_DISPLAY,
  widget,
  isShown
});
