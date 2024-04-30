import pl from './messages/pl.json';
import en from './messages/en.json';

type Messages = typeof pl & typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
