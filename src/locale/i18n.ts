import i18next from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import en from './languages/en';
import vi from './languages/vi';

i18next.use(reactI18nextModule).init({
  lng: 'vi',
  debug: true,
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
});

export default i18next;
