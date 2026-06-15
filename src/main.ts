import './styles/main.scss';
import { initForm, initSlider, initMason } from './modules';
import './modules';

document.addEventListener('DOMContentLoaded', () => {
  initForm();
  initSlider();
  setTimeout(initMason, 100);
});
